# CareBox Pack POC - Documentation

This directory contains comprehensive project documentation.

## Documentation Index

1. **[1-airdrop-setup.md](1-airdrop-setup.md)** - Complete guide to setting up the automatic ALGO airdrop system

2. **[2-nft-integration-complete.md](2-nft-integration-complete.md)** - NFT integration status, testing guide, and troubleshooting

3. **[3-poc-status.md](3-poc-status.md)** - Current POC implementation status and demo preparation

4. **[4-vercel-deployment.md](4-vercel-deployment.md)** - Complete guide to deploying on Vercel with separate frontend/backend projects

5. **[0-wallet-mnemonic-setup.md](0-wallet-mnemonic-setup.md)** - Guide to setting up the funded wallet for airdrops (⚠️ Contains sensitive information)

## Quick Links

- **Main README**: [../README.md](../README.md) - Project overview
- **Frontend Project**: `Algo-CareBoxPack-PoC/` - React/Vite application
- **Backend Project**: [algo-nft-backend](https://github.com/FunmiBADev/algo-nft-backend) - Express.js serverless API

## Document Overview

### Setup Guides

- **[1-airdrop-setup.md](1-airdrop-setup.md)**: Step-by-step instructions for configuring the ALGO airdrop system, including wallet funding, environment variables, and testing.

### Implementation Status

- **[2-nft-integration-complete.md](2-nft-integration-complete.md)**: NFT integration details, metadata setup, IPFS configuration, and testing procedures.

- **[3-poc-status.md](3-poc-status.md)**: Current implementation status, what's complete, what needs setup, and demo preparation checklist.

### Deployment

- **[4-vercel-deployment.md](4-vercel-deployment.md)**: Complete deployment guide for Vercel with separate frontend/backend projects, environment variables, troubleshooting, and monitoring.

### Security

- **[0-wallet-mnemonic-setup.md](0-wallet-mnemonic-setup.md)**: Sensitive mnemonic setup guide (⚠️ Do not commit to public repositories).

## Architecture Overview

The project uses a **split architecture**:

- **Frontend**: React/TypeScript app deployed on Vercel as a static site
- **Backend**: Express.js API deployed on Vercel as serverless functions
- **Connection**: Frontend communicates with backend via `VITE_API_URL` environment variable

Both projects are deployed independently for better scaling and isolation.

## Getting Started

1. Read the [Main README](../README.md) for project overview
2. Set up backend: [1-airdrop-setup.md](1-airdrop-setup.md)
3. Configure frontend: [Backend README](https://github.com/FunmiBADev/algo-nft-backend)
4. Deploy to Vercel: [4-vercel-deployment.md](4-vercel-deployment.md)
5. Test POC: [3-poc-status.md](3-poc-status.md)

## Support

For issues or questions:

1. Check the relevant documentation file
2. Review troubleshooting sections
3. Check deployment logs in Vercel dashboard
4. Verify environment variables are set correctly
