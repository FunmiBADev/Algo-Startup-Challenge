# CareBox Pack - Algorand Wellness NFT POC

## Overview

A mobile-responsive TypeScript React web application demonstrating Algorand blockchain integration for wellness tracking, achievement badges, and NFT claiming with automatic ALGO airdrops. This project showcases how blockchain technology can be seamlessly integrated into wellness applications to reward user consistency with verifiable on-chain achievements.

**Purpose**: Proof of Concept for Algorand Startup Challenge demonstrating:
- Automatic ALGO airdrops for first-time users (0.5 ALGO for wallet activation)
- ARC-3 compliant NFT achievement badges
- Year-based achievements with annual reset and archive system
- Seamless UX requiring no blockchain knowledge

**Current State**: Fully functional in Replit environment with both frontend and backend running concurrently.

## Recent Changes

### 2025-11-01: Replit Environment Setup
- Configured Vite dev server to run on port 5000 (0.0.0.0) for Replit webview
- Updated backend to run on localhost:3001 to avoid port conflicts
- Created basic environment configuration files with TestNet defaults
- Set up concurrent workflow to run both frontend and backend together
- Configured deployment settings for VM-based deployment
- Added .gitignore to protect environment variables

## Project Architecture

### Tech Stack

**Frontend**:
- React 18 + TypeScript
- Vite 5.x for building
- Tailwind CSS for styling
- `@txnlab/use-wallet-react` for Algorand wallet integration (Pera & Defly)
- Framer Motion for animations

**Backend**:
- Express.js API server
- Pinata SDK for IPFS storage
- AlgoSDK for blockchain transactions
- CORS-enabled for cross-origin requests

**Blockchain**:
- Algorand TestNet
- ARC-3 NFT standard
- Public AlgoNode API endpoints

### Directory Structure

```
Algo-CareBoxPack-PoC/
├── src/                      # Frontend React application
│   ├── components/          # UI components (modals, navigation, views)
│   ├── contexts/            # State management (Streak, Theme, Toast)
│   ├── services/            # NFT & blockchain services
│   ├── config/              # Achievement badges configuration
│   └── utils/               # Utility functions
├── backend/                 # Express.js backend
│   ├── app.js              # Express app configuration
│   ├── server.js           # Server entry point
│   ├── airdropService.js   # ALGO airdrop logic
│   └── index.js            # Vercel serverless function
├── docs/                    # Comprehensive documentation
└── src/badges/metadata/     # Badge metadata JSON files
```

## User Preferences

None specified yet.

## Configuration

### Frontend (Algo-CareBoxPack-PoC/.env)
The frontend is pre-configured to use Algorand TestNet public endpoints. No API keys required for basic functionality.

```env
VITE_ALGOD_SERVER=https://testnet-api.algonode.cloud
VITE_ALGOD_PORT=443
VITE_ALGOD_NETWORK=testnet
```

### Backend (Algo-CareBoxPack-PoC/backend/.env)

**Required for Full Functionality**:

1. **Pinata API Credentials** (for NFT image/metadata storage):
   - Sign up at https://pinata.cloud
   - Add `PINATA_JWT` to backend/.env
   - Or add both `PINATA_API_KEY` and `PINATA_API_SECRET`

2. **Funded Wallet Mnemonic** (for ALGO airdrops):
   - Create TestNet wallet using Pera or AlgoKit
   - Fund it at https://bank.testnet.algorand.network/
   - Add 25-word mnemonic to `FUNDED_WALLET_MNEMONIC` in backend/.env

**Optional Configuration**:
- `PORT`: Backend port (default: 3001)
- `ALLOWED_ORIGINS`: CORS origins (default: *)

## Running the Application

The application runs automatically in Replit. Both frontend and backend start concurrently:
- **Frontend**: http://localhost:5000 (visible in webview)
- **Backend**: http://localhost:3001 (internal API)

The frontend automatically detects the Replit environment and connects to the backend API.

## Key Features

### Implemented
- ✅ Wallet connection (Pera & Defly wallets)
- ✅ Streak tracking with POC mode (simulate different streak lengths)
- ✅ Achievement badge system (6 tiers: 10, 30, 60, 90, 180, 365 days)
- ✅ NFT claiming with blockchain transactions
- ✅ Automatic ALGO airdrops for new users
- ✅ Duplicate airdrop prevention
- ✅ Toast notifications for user feedback
- ✅ IPFS integration via Pinata
- ✅ Mobile-responsive design

### Testing the POC
1. Use the POC dropdown to set your streak (e.g., 10 days)
2. Navigate to Achievements view
3. Click "Claim NFT Badge" on eligible badge
4. Connect Pera or Defly wallet (TestNet)
5. Approve the transaction
6. Verify NFT appears in your wallet

## Documentation

Detailed documentation available in `Algo-CareBoxPack-PoC/docs/`:
- `1-airdrop-setup.md` - Complete airdrop system setup guide
- `2-nft-integration-complete.md` - NFT integration and testing
- `3-poc-status.md` - Current implementation status
- `backend/README.md` - Backend setup and API documentation

## External Resources

- **TestNet Faucet**: https://bank.testnet.algorand.network/
- **TestNet Explorer**: https://testnet.explorer.algorand.org/
- **Pinata Dashboard**: https://app.pinata.cloud/
- **Algorand Developer Docs**: https://developer.algorand.org/

## Security Notes

- All `.env` files are gitignored
- Never commit API keys or wallet mnemonics
- Use TestNet only for development
- Funded wallet should only contain TestNet ALGOs

## Deployment

The project is configured for Replit Deployments using VM-based deployment to keep the backend API continuously running. Both frontend and backend deploy as a single unit.
