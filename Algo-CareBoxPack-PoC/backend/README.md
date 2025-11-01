# Backend Setup - CareBox Pack POC

Express.js backend for NFT minting and ALGO airdrops.

## Quick Setup

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Configure environment**:

   ```bash
   cp .env.template .env
   # Edit .env with your credentials
   ```

3. **Run the server**:
   ```bash
   npm start
   ```

Server runs on `http://localhost:3001` by default.

## Required Environment Variables

### Pinata Configuration (Required)

Get credentials from https://pinata.cloud

```env
PINATA_JWT=your_pinata_jwt_token_here
```

### Airdrop Configuration (Required)

For the onboarding airdrop feature to work:

```env
FUNDED_WALLET_MNEMONIC=your_25_word_mnemonic_phrase_here
```

**Setup Steps**:

1. Create a TestNet wallet (Pera or AlgoKit)
2. Fund it from https://bank.testnet.algorand.network/
3. Add the mnemonic to `.env`

### Algorand Network Configuration

```env
ALGOD_NETWORK=testnet
ALGOD_SERVER=https://testnet-api.algonode.cloud
ALGOD_PORT=443
ALGOD_TOKEN=
```

### Server Configuration (Optional)

```env
PORT=3001
ALLOWED_ORIGINS=*
```

## API Endpoints

### Health Check

- `GET /health` - Server status

### NFT Minting

- `POST /api/pin-image` - Upload image to IPFS

### Airdrop Service

- `POST /api/airdrop` - Send 0.5 ALGO to recipient

## Development

```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

## Security

- Never commit `.env` files to version control
- Store mnemonic phrases securely
- Use TestNet ALGOs only for development

## Troubleshooting

**Backend won't start**: Check all required `.env` variables are set

**Airdrop fails**: Verify funded wallet has sufficient ALGOs

**IPFS errors**: Confirm Pinata credentials are valid
