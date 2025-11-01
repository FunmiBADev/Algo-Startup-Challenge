# CareBox Pack - POC for the Algo Startup Challenge Oct 2025

## Overview

A mobile-responsive TypeScript React web application demonstrating Algorand blockchain integration for wellness tracking, achievement badges, and NFT claiming with automatic ALGO airdrops. This project showcases how blockchain technology can be seamlessly integrated into wellness applications to reward user consistency with verifiable on-chain achievements.

**Purpose**: Proof of Concept for Algorand Startup Challenge demonstrating:

- Automatic ALGO airdrops for first-time users (0.5 ALGO for wallet activation)
- ARC-3 compliant NFT achievement badges
- Year-based achievements with annual reset and archive system
- Seamless UX requiring no blockchain knowledge

**Current State**: Fully functional with separate frontend and backend deployments.

## Project Architecture

### Tech Stack

**Frontend**:

- React 18 + TypeScript
- Vite 5.x for building
- Tailwind CSS for styling
- `@txnlab/use-wallet-react` for Algorand wallet integration (Pera & Defly)
- Framer Motion for animations
- Deployed on Vercel as static site with environment variables

**Backend**:

- Express.js API server
- Pinata SDK for IPFS storage
- AlgoSDK for blockchain transactions
- CORS-enabled for cross-origin requests
- Deployed on Vercel as serverless functions

**Blockchain**:

- Algorand TestNet
- ARC-3 NFT standard
- Public AlgoNode API endpoints

### Project Structure

This project consists of **two separate repositories**:

1. **Frontend**: `Algo-CareBoxPack-PoC/`
2. **Backend**: `Algo-NFT-Server/algo-nft-backend/` (separate GitHub repo)

#### Frontend Directory

```
Algo-CareBoxPack-PoC/
├── src/                      # React application source
│   ├── components/          # UI components (modals, navigation, views)
│   ├── contexts/            # State management (Streak, Theme, Toast)
│   ├── services/            # NFT & blockchain services
│   ├── config/              # Achievement badges configuration
│   ├── badges/metadata/     # ARC-3 JSON metadata files
│   └── utils/               # Utility functions
├── docs/                    # Project documentation
├── vercel.json              # Vercel deployment config
├── package.json             # Frontend dependencies
└── vite.config.ts           # Vite build configuration
```

#### Backend Directory

```
Algo-NFT-Server/algo-nft-backend/
├── backend/
│   ├── app.js              # Express app & routes
│   ├── airdropService.js   # ALGO airdrop logic
│   ├── index.js            # Vercel serverless entry
│   ├── server.js           # Local development server
│   └── package.json        # Backend dependencies
├── vercel.json              # Vercel deployment config
└── README.md                # Backend documentation
```

## Configuration

### Frontend (Algo-CareBoxPack-PoC/.env)

The frontend requires environment variables for Algorand network and backend API:

```env
# Algorand Network
VITE_ALGOD_NETWORK=testnet
VITE_ALGOD_SERVER=https://testnet-api.algonode.cloud
VITE_ALGOD_PORT=443
VITE_ALGOD_TOKEN=

# Backend API URL (Vercel deployment or localhost)
VITE_API_URL=https://algo-nft-backend.vercel.app
```

**Local Development**: Set `VITE_API_URL=http://localhost:3001`

### Backend (Algo-NFT-Server/algo-nft-backend/backend/.env)

**Required Environment Variables**:

1. **Pinata API Credentials** (for NFT image/metadata storage):

   - Sign up at https://pinata.cloud
   - Add `PINATA_JWT` to `.env`

2. **Funded Wallet Mnemonic** (for ALGO airdrops):
   - Create TestNet wallet using Pera or AlgoKit
   - Fund it at https://bank.testnet.algorand.network/
   - Add 25-word mnemonic to `FUNDED_WALLET_MNEMONIC`

**Optional Configuration**:

- `ALLOWED_ORIGINS`: CORS origins (default: \*)

## Running the Application

### Local Development

**Start Backend**:

```bash
cd Algo-NFT-Server/algo-nft-backend/backend
npm install
npm run dev
# Backend runs on http://localhost:3001
```

**Start Frontend**:

```bash
cd Algo-CareBoxPack-PoC
npm install
npm run dev
# Frontend runs on http://localhost:5173
```

Make sure `VITE_API_URL=http://localhost:3001` in frontend `.env`

### Production Deployment

Both frontend and backend are deployed separately on Vercel:

- **Frontend**: https://algo-careboxpack-poc.vercel.app
- **Backend**: https://algo-nft-backend.vercel.app

See `docs/4-vercel-deployment.md` for detailed deployment instructions.

## Key Features

### Implemented

- ✅ Wallet connection (Pera & Defly wallets)
- ✅ Streak tracking with POC mode (simulate different streak lengths)
- ✅ Achievement badge system (6 tiers: 10, 30, 60, 90, 180, 365 days)
- ✅ NFT claiming with blockchain transactions
- ✅ Automatic ALGO airdrops for new users
- ✅ Toast notifications for user feedback
- ✅ IPFS integration via Pinata
- ✅ Mobile-responsive design
- ✅ Separate frontend/backend deployment architecture
- ✅ Serverless backend on Vercel

### Testing the POC

1. Use the POC dropdown to set your streak (e.g., 10 days)
2. Navigate to Achievements view
3. Click "Claim NFT Badge" on eligible badge
4. Connect Pera or Defly wallet (TestNet)
5. Approve the transaction
6. Verify NFT appears in your wallet

## Documentation

Detailed documentation available in `Algo-CareBoxPack-PoC/docs/`:

- **[README.md](docs/README.md)** - Documentation index
- **[1-airdrop-setup.md](docs/1-airdrop-setup.md)** - Complete airdrop system setup
- **[2-nft-integration-complete.md](docs/2-nft-integration-complete.md)** - NFT integration guide
- **[3-poc-status.md](docs/3-poc-status.md)** - Current implementation status
- **[4-vercel-deployment.md](docs/4-vercel-deployment.md)** - Vercel deployment guide

Backend documentation in `Algo-NFT-Server/algo-nft-backend/backend/README.md`

## API Endpoints

### Backend API (Base URL: `VITE_API_URL`)

- `GET /` - Health check
- `GET /health` - Health check (alternative)
- `POST /api/airdrop` - Send 0.5 ALGO airdrop to address
- `POST /api/pin-image` - Upload image to IPFS (unused in current POC)

## External Resources

- **TestNet Faucet**: https://bank.testnet.algorand.network/
- **TestNet Explorer**: https://testnet.explorer.algorand.org/
- **Pinata Dashboard**: https://app.pinata.cloud/
- **Algorand Developer Docs**: https://developer.algorand.org/
- **Vercel Dashboard**: https://vercel.com

## Security Notes

- All `.env` files are gitignored
- Never commit API keys or wallet mnemonics
- Use TestNet only for development
- Funded wallet should only contain TestNet ALGOs
- Environment variables managed via Vercel dashboard in production

## Deployment

The project uses **Vercel** for both frontend and backend:

- **Frontend**: Static site deployment on Vercel
- **Backend**: Serverless functions on Vercel
- **Separate Projects**: Frontend and backend deployed as independent Vercel projects
- **Environment Variables**: Managed per-project in Vercel dashboard

See `docs/4-vercel-deployment.md` for complete deployment instructions.
