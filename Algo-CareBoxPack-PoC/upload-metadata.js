/**
 * Upload NFT metadata JSON files to Pinata
 * Run: node upload-metadata.js
 */

require('dotenv').config({ path: './backend/.env' })
const fs = require('fs')
const path = require('path')
const FormData = require('form-data')
const https = require('https')

const PINATA_JWT = process.env.PINATA_JWT
const PINATA_UPLOAD_URL = 'https://api.pinata.cloud/pinning/pinFileToIPFS'

if (!PINATA_JWT) {
  console.error('❌ Error: PINATA_JWT not found in backend/.env')
  process.exit(1)
}

const metadataDir = path.join(__dirname, 'src', 'badges', 'metadata')
const metadataFiles = [
  'getting_started_10days_2025.json',
  'monthly_warrior_30days_2025.json',
  'consistency_champion_60days_2025.json',
  'quarterly_master_90days_2025.json',
  'half_year_hero_180days_2025.json',
  'annual_legend_365days_2025.json'
]

function uploadToPinata(filePath, fileName) {
  return new Promise((resolve, reject) => {
    const form = new FormData()
    form.append('file', fs.createReadStream(filePath))

    const options = {
      hostname: 'api.pinata.cloud',
      path: '/pinning/pinFileToIPFS',
      method: 'POST',
      headers: {
        ...form.getHeaders(),
        'Authorization': `Bearer ${PINATA_JWT}`
      }
    }

    const req = https.request(options, (res) => {
      let data = ''

      res.on('data', (chunk) => {
        data += chunk
      })

      res.on('end', () => {
        if (res.statusCode === 200) {
          const result = JSON.parse(data)
          const ipfsHash = result.IpfsHash
          const metadataUrl = `ipfs://${ipfsHash}`
          resolve(metadataUrl)
        } else {
          reject(new Error(`Pinata API error: ${res.statusCode} - ${data}`))
        }
      })
    })

    req.on('error', (error) => {
      reject(error)
    })

    form.pipe(req)
  })
}

async function uploadAll() {
  console.log('🚀 Starting metadata upload to Pinata...\n')

  const results = {}

  for (const fileName of metadataFiles) {
    const filePath = path.join(metadataDir, fileName)
    
    if (!fs.existsSync(filePath)) {
      console.log(`⚠️  Skipping ${fileName} (file not found)`)
      continue
    }

    try {
      console.log(`📤 Uploading ${fileName}...`)
      const metadataUrl = await uploadToPinata(filePath, fileName)
      results[fileName] = metadataUrl
      console.log(`✅ ${fileName}`)
      console.log(`   → ${metadataUrl}\n`)
    } catch (error) {
      console.error(`❌ Failed to upload ${fileName}:`, error.message)
      results[fileName] = null
    }
  }

  console.log('\n📋 Summary:')
  console.log('=' .repeat(70))
  
  for (const [fileName, url] of Object.entries(results)) {
    if (url) {
      console.log(`✅ ${fileName}`)
      console.log(`   ${url}`)
    } else {
      console.log(`❌ ${fileName} - FAILED`)
    }
  }

  console.log('\n✨ Upload complete!')
  console.log('\n📝 Next step: Copy these URLs and add them to achievementBadges.ts')
}

uploadAll().catch(error => {
  console.error('Fatal error:', error)
  process.exit(1)
})

