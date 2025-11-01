/**
 * Airdrop Service for Onboarding Rewards
 * 
 * This service handles ALGO airdrops to first-time badge claimants.
 * It tracks which addresses have received onboarding rewards to prevent duplicate airdrops.
 */

import algosdk from 'algosdk'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '.env') })

// Airdrop configuration
const AIRDROP_AMOUNT_ALGO = 0.5 // 0.5 ALGO covers wallet activation + transaction fees
const AIRDROP_TRACKING_KEY = 'airdrop_recipients'

// Track recipients (in production, use a database instead of in-memory Map)
const airdropRecipients = new Map()

/**
 * Check if an address has already received an onboarding airdrop
 */
export function hasReceivedAirdrop(address) {
  return airdropRecipients.has(address)
}

/**
 * Send ALGO airdrop to an address
 * @param {string} recipientAddress - Algorand wallet address to receive airdrop
 * @returns {Promise<Object>} Transaction result
 */
export async function sendAirdrop(recipientAddress) {
  console.log(`🚀 Airdrop request received for: ${recipientAddress}`)

  // Check if already received
  if (hasReceivedAirdrop(recipientAddress)) {
    throw new Error('Address has already received onboarding airdrop')
  }

  // Validate funded wallet configuration
  const fundedWalletMnemonic = process.env.FUNDED_WALLET_MNEMONIC
  if (!fundedWalletMnemonic) {
    throw new Error('FUNDED_WALLET_MNEMONIC not configured in environment')
  }

  // Recover funded wallet from mnemonic
  const fundedAccount = algosdk.mnemonicToSecretKey(fundedWalletMnemonic)
  const fundedAddress = fundedAccount.addr.toString() // Convert Address object to string
  console.log(`✅ Funded wallet recovered: ${fundedAddress}`)

  // Get Algod config from environment
  const algodConfig = getAlgodConfigFromEnvironment()
  const algodClient = new algosdk.Algodv2(
    algodConfig.token,
    algodConfig.server,
    algodConfig.port
  )

  // Check funded wallet balance
  const accountInfo = await algodClient.accountInformation(fundedAddress).do()
  const balanceAlgos = Number(accountInfo.amount) / 1e6 // Convert microalgos to algos

  console.log(`📊 Wallet Balance Check:`)
  console.log(`   Funding Address: ${fundedAddress}`)
  console.log(`   Current Balance: ${balanceAlgos} ALGO`)
  console.log(`   Required for Airdrop: ${AIRDROP_AMOUNT_ALGO} ALGO`)

  if (balanceAlgos < AIRDROP_AMOUNT_ALGO) {
    throw new Error(
      `Funded wallet has insufficient balance: ${balanceAlgos} ALGO (need ${AIRDROP_AMOUNT_ALGO} ALGO)`
    )
  }

  // Get suggested parameters
  console.log(`📝 Preparing transaction...`)
  const suggestedParams = await algodClient.getTransactionParams().do()
  console.log(`✅ Got suggested params`)

  // Create payment transaction
  console.log(`🔨 Creating payment transaction:`)
  console.log(`   From: ${fundedAddress}`)
  console.log(`   To: ${recipientAddress}`)
  console.log(`   Amount: ${AIRDROP_AMOUNT_ALGO} ALGO`)
  
  const paymentTxn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
    suggestedParams,
    sender: fundedAddress,
    receiver: recipientAddress,
    amount: BigInt(Math.floor(AIRDROP_AMOUNT_ALGO * 1e6)), // Convert to microalgos as BigInt
    note: new Uint8Array(
      Buffer.from('CareBox Pack - Onboarding Reward')
    )
  })
  console.log(`✅ Transaction created successfully`)

  // Sign transaction
  const signedTxn = paymentTxn.signTxn(fundedAccount.sk)

  // Send transaction
  const result = await algodClient.sendRawTransaction(signedTxn).do()

  // Wait for confirmation
  const confirmedTxn = await algosdk.waitForConfirmation(
    algodClient,
    result.txid,
    4
  )

  // Track recipient
  airdropRecipients.set(recipientAddress, {
    timestamp: Date.now(),
    txid: result.txid,
    amount: AIRDROP_AMOUNT_ALGO
  })

  console.log(`✅ Airdrop successful!`)
  console.log(`   Amount Sent: ${AIRDROP_AMOUNT_ALGO} ALGO`)
  console.log(`   Recipient: ${recipientAddress}`)
  console.log(`   Transaction ID: ${result.txid}`)
  console.log(`   Remaining Balance: ${(balanceAlgos - AIRDROP_AMOUNT_ALGO).toFixed(6)} ALGO`)

  return {
    success: true,
    txid: result.txid,
    amount: AIRDROP_AMOUNT_ALGO,
    recipientAddress
  }
}

/**
 * Get Algod configuration from environment variables
 */
function getAlgodConfigFromEnvironment() {
  const network = process.env.ALGOD_NETWORK || 'testnet'

  if (network === 'localnet') {
    return {
      server: process.env.ALGOD_SERVER || 'http://localhost',
      port: process.env.ALGOD_PORT || 4001,
      token: process.env.ALGOD_TOKEN || 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
    }
  }

  if (network === 'testnet') {
    return {
      server: process.env.ALGOD_SERVER || 'https://testnet-api.algonode.cloud',
      port: process.env.ALGOD_PORT || 443,
      token: process.env.ALGOD_TOKEN || ''
    }
  }

  if (network === 'mainnet') {
    return {
      server: process.env.ALGOD_SERVER || 'https://mainnet-api.algonode.cloud',
      port: process.env.ALGOD_PORT || 443,
      token: process.env.ALGOD_TOKEN || ''
    }
  }

  throw new Error(`Unsupported network: ${network}`)
}

/**
 * Get statistics about airdrops sent
 */
export function getAirdropStats() {
  return {
    totalRecipients: airdropRecipients.size,
    totalAlgosSent: airdropRecipients.size * AIRDROP_AMOUNT_ALGO,
    recipients: Array.from(airdropRecipients.entries()).map(([address, data]) => ({
      address,
      ...data
    }))
  }
}

