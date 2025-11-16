import { sha512_256 } from 'js-sha512'
import algosdk from 'algosdk'
import { AlgorandClient } from '@algorandfoundation/algokit-utils'
import {
  getAchievementTypeByMilestone,
  getBadgeConfig
} from '../config/achievementBadges'
import { getAlgodConfigFromViteEnvironment } from '../utils/network/getAlgoClientConfigs'

/**
 * Get ARC-3 compliant metadata hash
 */
function getMetadataHash(metadataUrl: string): Uint8Array {
  const hash = sha512_256(metadataUrl)
  return new Uint8Array(
    hash.match(/.{1,2}/g)!.map(byte => parseInt(byte, 16))
  )
}

/**
 * Mint an achievement NFT badge
 * @param milestone - Days milestone (10, 30, 60, 90, 180, 365)
 * @param year - Year for the badge (default: current year)
 * @param metadataUrl - IPFS URL to metadata JSON
 * @param senderAddress - User's Algorand wallet address
 * @param transactionSigner - SignedTransaction object or signer function
 * @returns Asset ID of the minted NFT
 */
export async function mintAchievementNFT(
  milestone: number,
  year: number,
  metadataUrl: string,
  senderAddress: string,
  transactionSigner: algosdk.TransactionSigner
): Promise<number> {
  console.log('\n🎨 ========== NFT SERVICE: MINT START ==========')
  console.log('📊 Input parameters:')
  console.log('   Milestone:', milestone, '(type:', typeof milestone, ')')
  console.log('   Year:', year, '(type:', typeof year, ')')
  console.log('   Metadata URL:', metadataUrl, '(type:', typeof metadataUrl, ')')
  console.log('   Sender Address:', senderAddress, '(type:', typeof senderAddress, ')')
  console.log('   Transaction Signer type:', typeof transactionSigner)

  // Get badge configuration
  const achievementType = getAchievementTypeByMilestone(milestone)
  if (!achievementType) {
    throw new Error(`No achievement type found for milestone: ${milestone}`)
  }

  const badgeConfig = getBadgeConfig(achievementType, year)
  if (!badgeConfig) {
    throw new Error(`No badge config found for ${achievementType} in year ${year}`)
  }

  // Get Algod config from environment
  const algodConfig = getAlgodConfigFromViteEnvironment()

  // Create Algorand client using algokit-utils
  const algorand = AlgorandClient.fromConfig({ algodConfig })

  // Prepare asset name and unit name with year
  const assetName = `${badgeConfig.name} ${year}`
  const unitName = `${badgeConfig.unit}-${year}`

  // Get metadata hash for ARC-3 compliance
  const metadataHash = getMetadataHash(metadataUrl)

  console.log('📝 Creating NFT with metadata URL:', metadataUrl)
  console.log('📝 Asset creation parameters:')
  console.log('   total: 1n (BigInt)')
  console.log('   decimals: 0')
  console.log('   assetName:', assetName)
  console.log('   unitName:', unitName)
  console.log('   url:', metadataUrl)
  console.log('   metadataHash length:', metadataHash.length)

  // Create NFT asset using algokit-utils
  let createNFTResult
  try {
    console.log('🚀 Calling algorand.send.assetCreate...')
    createNFTResult = await algorand.send.assetCreate({
      sender: senderAddress,
      signer: transactionSigner,
      total: 1n, // NFT: single copy
      decimals: 0, // Indivisible
      assetName,
      unitName,
      url: metadataUrl,
      metadataHash,
      defaultFrozen: false
    })
    console.log('✅ Asset creation call completed')
  } catch (createError: any) {
   console.warn('❌ Error during asset creation:')
   console.warn('   Error type:', typeof createError)
   console.warn('   Error message:', createError?.message)
   console.warn('   Error stack:', createError?.stack)
   console.warn('   Full error:', createError)
    throw createError
  }

  console.log('✅ NFT created! Result received')
  console.log('📊 createNFTResult type:', typeof createNFTResult)
  console.log('📊 createNFTResult.assetId:', createNFTResult.assetId)
  console.log('📊 createNFTResult.assetId type:', typeof createNFTResult.assetId)

  // Return the asset ID (converted from bigint to number)
  const assetId = createNFTResult.assetId
  console.log('🔍 Checking assetId...')
  console.log('   assetId value:', assetId)
  console.log('   assetId type:', typeof assetId)
  console.log('   assetId is null?', assetId === null)
  console.log('   assetId is undefined?', assetId === undefined)
  
  // Check for null/undefined explicitly (don't use !assetId with BigInt as BigInt(0) is falsy)
  if (assetId === null || assetId === undefined) {
   console.warn('❌ No assetId in createNFTResult (null or undefined)')
    // BigInt can't be stringified, so convert it first
    try {
      const resultForLog: any = {}
      for (const key in createNFTResult) {
        const value = (createNFTResult as any)[key]
        if (typeof value === 'bigint') {
          resultForLog[key] = value.toString()
        } else {
          resultForLog[key] = value
        }
      }
     console.warn('📋 Full result:', JSON.stringify(resultForLog, null, 2))
    } catch (e) {
     console.warn('📋 Result (stringified):', String(createNFTResult))
     console.warn('📋 Stringify error:', e)
    }
    throw new Error('Failed to get asset ID from transaction')
  }

  // Handle BigInt conversion properly
  let assetIdNumber: number
  if (typeof assetId === 'bigint') {
    console.log('🔢 Converting BigInt to Number...')
    assetIdNumber = Number(assetId)
    console.log('🔢 BigInt value:', assetId.toString())
    console.log('🔢 Number value:', assetIdNumber)
  } else if (typeof assetId === 'number') {
    console.log('🔢 AssetId is already a number')
    assetIdNumber = assetId
  } else if (typeof assetId === 'string') {
    console.log('🔢 Converting string to Number...')
    assetIdNumber = Number.parseInt(assetId, 10)
  } else {
   console.warn('❌ Unexpected assetId type:', typeof assetId)
   console.warn('📋 AssetId value:', assetId)
    // Try to convert anyway
    assetIdNumber = Number(assetId)
  }

  if (Number.isNaN(assetIdNumber)) {
   console.warn('❌ AssetId conversion resulted in NaN')
   console.warn('📋 Original assetId:', assetId)
    throw new Error(`Failed to convert asset ID to number: ${assetId}`)
  }

  console.log('🎉 Final Asset ID (number):', assetIdNumber)
  console.log('✅ NFT SERVICE: MINT SUCCESS')
  console.log('🎨 ========== NFT SERVICE: MINT END ==========\n')

  // Convert bigint to number for return value
  return assetIdNumber
}

/**
 * Get the IPFS metadata URL for a badge
 * @param milestone - Days milestone
 * @param year - Year for the badge
 * @returns IPFS metadata URL
 */
export function getBadgeMetadataUrl(milestone: number, year: number): string {
  const achievementType = getAchievementTypeByMilestone(milestone)
  if (!achievementType) {
    throw new Error(`No achievement type found for milestone: ${milestone}`)
  }

  const badgeConfig = getBadgeConfig(achievementType, year)
  if (!badgeConfig) {
    throw new Error(`No badge config found for ${achievementType} in year ${year}`)
  }

  // Return metadataUrl from badge config
  return (badgeConfig as any).metadataUrl || `ipfs://TODO_metadata_${milestone}_${year}`
}

