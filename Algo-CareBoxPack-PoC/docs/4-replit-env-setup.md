# Replit Environment Variables Setup

This guide explains how to configure environment variables in Replit for the CareBox Pack POC.

## Where to Find Replit Secrets

In Replit, environment variables are managed through the **Secrets (Lock Icon)** tool in the left sidebar.

### Steps to Access Secrets:

1. **Look for the Lock Icon** in the left sidebar of your Replit editor
2. Click on it to open the Secrets panel
3. You'll see two tabs: **"Secrets"** and **"Files"**
4. Use the **"Secrets"** tab to add environment variables

## Required Environment Variables

### Backend Secrets (For NFTs & Airdrops)

Add these in the Replit Secrets panel with these **exact names**:

#### 1. **PINATA_JWT** (Required for NFT image storage)

```env
PINATA_JWT=your_pinata_jwt_token_here
```

**How to Get This**:

- Sign up at https://pinata.cloud
- Navigate to **"API Keys"** in your dashboard
- Generate a JWT token
- Copy and paste it into Replit Secrets

#### 2. **FUNDED_WALLET_MNEMONIC** (Required for airdrops)

```env
FUNDED_WALLET_MNEMONIC=your 25 word mnemonic phrase here separated by spaces
```

**How to Set This Up**:

- See [Wallet Setup Guide](0-wallet-mnemonic-setup.md)
- Generate a 25-word Algorand-specific mnemonic
- Fund the wallet with TestNet ALGOs at https://bank.testnet.algonode.network/
- Add the mnemonic to Replit Secrets

#### 3. **Algorand Network Configuration** (Optional - defaults provided)

```env
ALGOD_NETWORK=testnet
ALGOD_SERVER=https://testnet-api.algonode.cloud
ALGOD_PORT=443
ALGOD_TOKEN=
```

#### 4. **Server Configuration** (Optional)

```env
PORT=3001
ALLOWED_ORIGINS=*
```

### Frontend Environment Variables (Optional)

The frontend uses public Algorand TestNet endpoints by default. If you need custom configuration:

```env
VITE_ALGOD_SERVER=https://testnet-api.algonode.cloud
VITE_ALGOD_PORT=443
VITE_ALGOD_NETWORK=testnet
```

## How Replit Secrets Work

Replit automatically:

1. **Injects secrets as environment variables** to your running application
2. **Stores them securely** (not visible in code or logs)
3. **Makes them available** via `process.env.SECRET_NAME` in Node.js
4. **Syncs them** with deployed versions

## Important Notes

### Security

- **Never commit `.env` files** containing real secrets
- **Use Replit Secrets** for all production credentials
- **TestNet ALGOs only** - real ALGOs should never be used in development

### Replit Auto-Secrets

Replit automatically provides these environment variables:

- `REPLIT_SLUG` - Your project slug
- `REPL_OWNER` - Your username
- `REPL_ID` - Unique Repl identifier

You don't need to add these - they're available automatically.

### Accessing Secrets in Your Code

```javascript
// Backend (Node.js)
const pinataJWT = process.env.PINATA_JWT

// Frontend (Vite)
const network = import.meta.env.VITE_ALGOD_NETWORK
```

## Troubleshooting

### Secrets Not Working

1. **Check the name** - must match exactly (case-sensitive)
2. **Restart your Repl** after adding/modifying secrets
3. **Check the console** for environment variable errors

### Backend Won't Start

Verify all required secrets are set:

- `PINATA_JWT` ✓
- `FUNDED_WALLET_MNEMONIC` ✓

### Airdrop Fails

Check your funded wallet:

- Verify mnemonic is correct (25 words)
- Confirm wallet has sufficient ALGOs (check balance at https://testnet.algoexplorer.io/)

### IPFS Errors

Verify Pinata credentials:

- JWT token is valid and not expired
- Pinata account is active

## Additional Resources

- Replit Secrets Documentation: https://docs.replit.com/hosting/deployments/using-secrets
- Algorand TestNet Faucet: https://bank.testnet.algonode.network/
- Pinata Documentation: https://docs.pinata.cloud/

## Visual Guide

```
Replit Editor Left Sidebar:
┌─────────────────────┐
│ 📁 Files            │
│ 🔍 Search           │
│ 🔒 Secrets ← Click  │
│ 📊 Analytics        │
│ ⚙️  Settings        │
└─────────────────────┘

Secrets Panel:
┌─────────────────────────────────┐
│ Secrets          Files           │
├─────────────────────────────────┤
│                                   │
│ Key: PINATA_JWT                   │
│ Value: eyJhbG... [Hidden]         │
│ [Edit] [Delete]                   │
│                                   │
│ [+ New Secret]                    │
│                                   │
└─────────────────────────────────┘
```
