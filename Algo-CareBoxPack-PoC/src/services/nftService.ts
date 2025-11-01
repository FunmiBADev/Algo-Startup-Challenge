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
  console.log('🎨 Starting NFT mint for milestone:', milestone, 'year:', year)

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

  // Create NFT asset using algokit-utils
  const createNFTResult = await algorand.send.assetCreate({
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

  console.log('✅ NFT created! Result:', createNFTResult)

  // Return the asset ID (converted from bigint to number)
  const assetId = createNFTResult.assetId
  if (!assetId) {
    throw new Error('Failed to get asset ID from transaction')
  }

  const assetIdNumber = Number(assetId)
  console.log('🎉 Asset ID:', assetIdNumber)

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

