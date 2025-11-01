# CareBox Pack - Algorand Wellness NFT POC

A mobile-responsive TypeScript React web application demonstrating Algorand blockchain integration for wellness tracking, achievement badges, and NFT claiming with automatic ALGO airdrops.

## 🎯 What This POC Demonstrates

- **Automatic ALGO Airdrops**: First-time users receive 0.5 ALGO for wallet activation
- **ARC-3 Compliant NFTs**: Achievement badges as verifiable on-chain rewards
- **Year-Based Achievements**: Streak tracking that resets annually with archive system
- **Seamless UX**: No blockchain knowledge required for wellness users
- **Real Wallet Integration**: Pera & Defly wallet support with TestNet deployment

## 🚀 Quick Start

### Prerequisites

- Node.js >= 20.0
- npm >= 9.0
- Pinata account (for IPFS)
- TestNet wallet (Pera or Defly)

### Installation

```bash
# Install dependencies
npm install

# Install backend dependencies
npm run backend:install
```

### Configuration

1. **Frontend Setup**:

   ```bash
   cp .env.template .env
   # Edit .env with your TestNet configuration
   ```

2. **Backend Setup**:
   ```bash
   cd backend
   cp .env.template .env
   # Edit .env with Pinata credentials and funded wallet mnemonic
   cd ..
   ```

See [backend/README.md](backend/README.md) for detailed backend configuration.

### Run the Application

```bash
# Start both frontend and backend
npm run dev:full
```

This starts:

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:3001`

Or run separately:

```bash
# Terminal 1: Frontend
npm run dev

# Terminal 2: Backend
npm run backend:dev
```

## 📚 Documentation

All documentation is organised in the `docs/` directory:

- **[1-airdrop-setup.md](docs/1-airdrop-setup.md)** - Complete airdrop system setup
- **[2-nft-integration-complete.md](docs/2-nft-integration-complete.md)** - NFT integration status and testing guide
- **[3-poc-status.md](docs/3-poc-status.md)** - Current POC implementation status
- **[4-vercel-deployment.md](docs/4-vercel-deployment.md)** - Vercel deployment guide
- See [docs/README.md](docs/README.md) for full documentation index

## 🏗️ Project Structure

```
Algo-CareBoxPack-PoC/
├── src/                      # Frontend React application
│   ├── components/          # UI components
│   ├── contexts/            # State management
│   ├── services/            # NFT & blockchain services
│   ├── config/              # Configuration files
│   └── ...
├── backend/                 # Express.js backend
│   ├── app.js              # Main server
│   ├── airdropService.js   # ALGO airdrop logic
│   └── ...
├── docs/                    # Documentation
│   ├── 0-wallet-mnemonic-setup.md
│   ├── 1-airdrop-setup.md
│   ├── 2-nft-integration-complete.md
│   ├── 3-poc-status.md
│   └── 4-vercel-deployment.md
├── README.md               # This file
└── backend/README.md       # Backend setup guide
```

## 🔧 Tech Stack

### Frontend

- React 18 + TypeScript
- Vite for building
- Tailwind CSS for styling
- `@txnlab/use-wallet-react` for wallet integration
- Framer Motion for animations

### Backend

- Express.js
- Pinata SDK for IPFS
- AlgoSDK for blockchain transactions
- CORS-enabled API

### Blockchain

- Algorand TestNet
- ARC-3 NFT standard
- Pera & Defly wallets

## 🌐 Deployment

### Vercel Deployment (Recommended)

**Free, production-ready deployment with automatic HTTPS and CDN.**

The project is configured for Vercel deployment:

1. Push your code to GitHub
2. Import project in Vercel: https://vercel.com
3. Add environment variables (see deployment guide)
4. Deploy automatically on git push

**See [4-vercel-deployment.md](docs/4-vercel-deployment.md) for complete setup instructions.**

Features:

- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Serverless functions for backend
- ✅ Environment variable management
- ✅ Preview deployments per branch
- ✅ Built-in analytics
- ✅ Custom domain support

## 🎮 Testing the POC

1. Set your streak to 10 days using the POC dropdown
2. Navigate to Achievements view
3. Click "Claim NFT Badge" on the 10-day badge
4. Connect Pera or Defly wallet
5. Approve the transaction
6. Verify NFT in your wallet

## 📋 Key Features

- **Onboarding Airdrop**: Automatic 0.5 ALGO for first-time users
- **Duplicate Prevention**: Smart tracking prevents abuse
- **Toast Notifications**: Real-time user feedback
- **Wallet Management**: Visible connection status with disconnect option
- **IPFS Integration**: Decentralised image and metadata storage
- **TestNet Ready**: Full integration with Algorand TestNet

## 📞 Support

For issues or questions:

- Check [backend/README.md](backend/README.md) for backend setup
- Review docs in `docs/` directory
- Verify environment variables are configured correctly

## 🎓 Algorand Resources

- TestNet Faucet: https://bank.testnet.algorand.network/
- TestNet Explorer: https://testnet.explorer.algorand.org/
- Pinata Dashboard: https://app.pinata.cloud/pinmanager
- Algorand Docs: https://developer.algorand.org/

## 📄 License

This is a POC for the Algorand Startup Challenge.
