# POC Airdrop Implementation

## What's Been Implemented

### 1. Frontend Airdrop Tracking (`src/contexts/StreakContext.tsx`)

**How it works:**

- User's airdrop status is stored in browser **localStorage**
- Key: `hasReceivedOnboardingAirdrop` = `"true"` or `undefined`
- Persists across all sessions and years
- One-time only per user (permanent)

**Functions:**

```typescript
// Check if user has received airdrop
hasReceivedOnboardingAirdrop() // Returns boolean

// Mark airdrop as received (after successful backend call)
markOnboardingAirdropReceived() // Saves to localStorage
```

**Benefits:**

- ✅ Simple boolean check
- ✅ No server-side tracking needed
- ✅ Works offline after initial setup
- ✅ POC-ready implementation

### 2. Backend Airdrop Service (`backend/airdropService.js`)

Handles sending ALGO from funded wallet to user:

**Features:**

- Sends 0.5 ALGO to recipient
- Uses funded wallet mnemonic from environment
- Signs and broadcasts transactions
- Basic duplicate prevention (in-memory)

**API Endpoint:**

```
POST /api/airdrop
Body: { "recipientAddress": "KMWAKUYGD6RD63..." }
Response: { "success": true, "txid": "...", "amount": 0.5 }
```

### 3. Frontend NFT Service (`src/services/nftService.ts`)

Handles minting achievement NFT badges:

- Creates ARC-3 compliant NFTs
- Generates metadata hash
- Signs and broadcasts transactions
- Returns asset ID

### 4. Configuration Files

- **backend/.env**: Add `FUNDED_WALLET_MNEMONIC` and network config
- **backend/README.md**: Setup instructions

## Next Steps

### 1. Set Up Funded Wallet

Create a TestNet wallet and fund it:

1. Create wallet using Pera Wallet or AlgoKit
2. Get the 25-word mnemonic phrase
3. Fund with TestNet ALGOs: https://bank.testnet.algorand.network/
4. Recommended: 10-20 ALGOs for testing

### 2. Configure Backend Environment

Edit `backend/.env`:

```env
# Your existing Pinata config
PINATA_JWT=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Airdrop Configuration - ADD YOUR MNEMONIC
FUNDED_WALLET_MNEMONIC=your 25 word mnemonic phrase goes here in this exact format

# Algorand Network
ALGOD_NETWORK=testnet
ALGOD_SERVER=https://testnet-api.algonode.cloud
ALGOD_PORT=443
ALGOD_TOKEN=
```

### 3. Upload Metadata to Pinata

You've already deleted the metadata JSON files - that's correct. Now:

1. Upload the 6 metadata JSON files to Pinata web interface
2. Get IPFS URLs for each
3. Update `src/config/achievementBadges.ts` with `metadataUrl` field

Example:

```typescript
getting_started: {
  2025: {
    name: 'Getting Started NFT',
    unit: 'GS',
    milestone: 10,
    description: '...',
    icon: '🌱',
    colour: 'blue',
    imageUrl: 'ipfs://bafybeihmv5ec4bimu5yld5wfadc7a6yurlbkpnimiv7uq3ti54eejrwkze/10DaysGetStartedPOC.png',
    metadataUrl: 'ipfs://QmXXX...your_hash.json'  // ADD THIS
  }
},
```

### 4. Integrate Into ClaimModal

Update `ClaimModal.tsx` to:

1. Use real wallet connection from `@txnlab/use-wallet-react`
2. Call airdrop API for first-time claimants
3. Mint NFT using NFT service
4. Update UI with real transaction status

### 5. Test the Complete Flow

```bash
# Terminal 1: Start backend
cd backend
npm start

# Terminal 2: Start frontend
cd ..
npm run dev

# Test: Set streak to 10 days, click CLAIM
```

## Complete Flow

### First-Time User (10-Day Badge Claim)

1. User clicks "CLAIM" on 10-day badge
2. Frontend checks wallet connection
3. Frontend checks `hasReceivedOnboardingAirdrop()` - returns `false`
4. Frontend calls `POST /api/airdrop` with user's address
5. Backend sends 0.5 ALGO from funded wallet
6. Frontend calls `markOnboardingAirdropReceived()` - saves to localStorage
7. Frontend mints NFT using `mintAchievementNFT()`
8. Success modal shows NFT asset ID

### Subsequent Claims

1. User clicks "CLAIM" on any badge
2. Frontend checks `hasReceivedOnboardingAirdrop()` - returns `true`
3. Frontend skips airdrop API call
4. Frontend mints NFT directly
5. Success modal shows NFT asset ID

## Important Notes

- **Security**: Never commit `FUNDED_WALLET_MNEMONIC` to git
- **Testing**: Use TestNet only
- **Storage**: localStorage persists airdrop status permanently
- **Monitoring**: Watch funded wallet balance and refill when needed

## What's Ready

✅ Frontend airdrop tracking (localStorage)  
✅ Backend airdrop service  
✅ NFT minting service  
✅ Configuration templates  
✅ Documentation

## What's Pending

⏳ Upload metadata to Pinata  
⏳ Add metadataUrl to config  
⏳ Integrate wallet in ClaimModal  
⏳ Connect airdrop + NFT flow  
⏳ End-to-end testing

## Need Help?

- `backend/README.md` for backend setup
- `POC_STATUS.md` for overall status
- TestNet faucet: https://bank.testnet.algorand.network/
