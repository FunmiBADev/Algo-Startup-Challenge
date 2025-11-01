// Shared Express app (no .listen here)
import express from 'express'
import cors from 'cors'
import multer from 'multer'
import pinataSDK from '@pinata/sdk'
import dotenv from 'dotenv'
import { Readable } from 'stream'
import path from 'path'
import { fileURLToPath } from 'url'
import { sendAirdrop, hasReceivedAirdrop, getAirdropStats } from './airdropService.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
dotenv.config({ path: path.resolve(__dirname, '.env') })

const app = express()

// Allow local + prod (comma-separated in env), or * by default for dev
const allowedOrigins = (process.env.ALLOWED_ORIGINS || '*')
  .split(',')
  .map(o => o.trim())

app.use(cors({
  origin: (origin, cb) => {
    if (!origin) return cb(null, true) // same-origin or curl
    if (allowedOrigins.includes('*')) return cb(null, true)
    if (allowedOrigins.includes(origin)) return cb(null, true)

    // ✅ Extra: allow any frontend on vercel.app (great for student forks)
    try {
      const host = new URL(origin).hostname
      if (host.endsWith('.vercel.app')) return cb(null, true)
    } catch (_) {}

    return cb(null, false)
  },
  credentials: false,
}))

app.use(express.json())


// Pinata client
const pinata = process.env.PINATA_JWT
  ? new pinataSDK({ pinataJWTKey: process.env.PINATA_JWT })
  : new pinataSDK(process.env.PINATA_API_KEY, process.env.PINATA_API_SECRET)

// Optional: test credentials at cold start
;(async () => {
  try {
    const auth = await pinata.testAuthentication?.()
    console.log('Pinata auth OK:', auth || 'ok')
  } catch (e) {
    console.error('Pinata authentication FAILED. Check env vars.', e)
  }
})()

// health
app.get('/health', (_req, res) => {
  res.set('Cache-Control', 'no-store')
  res.json({ ok: true, ts: Date.now() })
})

// uploads
const upload = multer({ storage: multer.memoryStorage() })

app.post('/api/pin-image', upload.single('file'), async (req, res) => {
  try {
    const file = req.file
    if (!file) return res.status(400).json({ error: 'No file uploaded' })

    const stream = Readable.from(file.buffer)
    // @ts-ignore give Pinata a filename
    stream.path = file.originalname || 'upload'

    const imageOptions = { pinataMetadata: { name: file.originalname || 'CareBox Pack Achievement Badge' } }
    const imageResult = await pinata.pinFileToIPFS(stream, imageOptions)
    const imageUrl = `ipfs://${imageResult.IpfsHash}`

    const metadata = {
      name: 'CareBox Pack Achievement NFT',
      description: 'Achievement badge NFT for wellness consistency milestones',
      image: imageUrl,
      properties: {},
    }
    const jsonOptions = { pinataMetadata: { name: 'CareBox Pack Achievement Metadata' } }
    const jsonResult = await pinata.pinJSONToIPFS(metadata, jsonOptions)
    const metadataUrl = `ipfs://${jsonResult.IpfsHash}`

    res.status(200).json({ metadataUrl })
  } catch (error) {
    const msg =
      error?.response?.data?.error ||
      error?.response?.data ||
      error?.message ||
      'Failed to pin to IPFS.'
    res.status(500).json({ error: msg })
  }
})

// Airdrop endpoints
app.post('/api/airdrop', async (req, res) => {
  try {
    const { recipientAddress } = req.body
    if (!recipientAddress) {
      return res.status(400).json({ error: 'recipientAddress is required' })
    }

    // Check if already received
    if (hasReceivedAirdrop(recipientAddress)) {
      return res.status(400).json({ 
        error: 'Address has already received onboarding airdrop',
        alreadyReceived: true 
      })
    }

    // Send airdrop
    const result = await sendAirdrop(recipientAddress)
    res.status(200).json(result)
  } catch (error) {
    const msg = error?.message || 'Failed to send airdrop'
    console.error('Airdrop error:', msg)
    res.status(500).json({ error: msg })
  }
})

app.get('/api/airdrop/stats', (_req, res) => {
  const stats = getAirdropStats()
  res.status(200).json(stats)
})

export default app

