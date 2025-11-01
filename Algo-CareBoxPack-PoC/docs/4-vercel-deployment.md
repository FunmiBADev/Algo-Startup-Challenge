# Vercel Deployment Guide

This guide explains how to deploy the CareBox Pack POC to Vercel with separate frontend and backend projects.

## Prerequisites

1. GitHub account with your code in two repositories:
   - Frontend: `Algo-CareBoxPack-PoC`
   - Backend: `algo-nft-backend` (in `Algo-NFT-Server` directory)
2. Vercel account (sign up at https://vercel.com - free)
3. Completed backend setup:
   - Pinata JWT for IPFS storage
   - Funded wallet mnemonic for airdrops

## Architecture Overview

The project uses **separate deployments** for frontend and backend:

- **Frontend**: React/Vite static site deployed on Vercel
- **Backend**: Express.js serverless functions deployed on Vercel
- **Connection**: Frontend connects to backend via `VITE_API_URL` environment variable

This architecture provides:

- Independent scaling
- Separate GitHub repositories
- Isolated environment variables
- Faster frontend deployments

## Deployment Steps

### Part 1: Deploy Backend

#### 1.1 Push Backend to GitHub

```bash
cd Algo-NFT-Server/algo-nft-backend
git init  # if not already initialized
git add .
git commit -m "Ready for Vercel deployment"
# Push to your GitHub repository
git remote add origin https://github.com/your-username/algo-nft-backend.git
git push -u origin main
```

#### 1.2 Deploy Backend to Vercel

1. Go to https://vercel.com and sign in
2. Click **"Add New..."** → **"Project"**
3. Import your `algo-nft-backend` repository
4. Vercel will auto-detect configuration from `vercel.json`

#### 1.3 Configure Backend Settings

**Framework Preset:** `Other` or auto-detected from `vercel.json`

**Build and Output Settings:**

- Build Command: (None - serverless functions)
- Output Directory: `.`
- Install Command: `cd backend && npm install`

**Root Directory:** Leave as `.` (root)

#### 1.4 Add Backend Environment Variables

Click **"Environment Variables"** and add:

**`PINATA_JWT`** (Required)

```
your_pinata_jwt_token_here
```

**`FUNDED_WALLET_MNEMONIC`** (Required)

```
your 25 word mnemonic phrase here separated by spaces
```

**`ALGOD_NETWORK`** (Optional - defaults to testnet)

```
testnet
```

**`ALGOD_SERVER`** (Optional)

```
https://testnet-api.algonode.cloud
```

**`ALGOD_PORT`** (Optional)

```
443
```

**`ALLOWED_ORIGINS`** (Optional - leave as default)

```
*
```

> **Important:** After adding variables, select **"Production", "Preview", and "Development"** for each one.

#### 1.5 Deploy Backend

1. Click **"Deploy"**
2. Wait for build to complete (typically 1-2 minutes)
3. Note the deployment URL: `https://algo-nft-backend.vercel.app`
4. Test the health endpoint: `https://algo-nft-backend.vercel.app/health`

Expected response:

```json
{
  "ok": true,
  "ts": 1234567890123
}
```

### Part 2: Deploy Frontend

#### 2.1 Push Frontend to GitHub

```bash
cd Algo-Startup-Challenge/Algo-CareBoxPack-PoC
git init  # if not already initialized
git add .
git commit -m "Ready for Vercel deployment"
# Push to your GitHub repository
git remote add origin https://github.com/your-username/algo-careboxpack-poc.git
git push -u origin main
```

#### 2.2 Deploy Frontend to Vercel

1. Go to https://vercel.com and sign in
2. Click **"Add New..."** → **"Project"**
3. Import your `algo-careboxpack-poc` repository
4. Vercel will auto-detect Vite configuration

#### 2.3 Configure Frontend Settings

**Framework Preset:** `Vite` (auto-detected)

**Build and Output Settings:**

- Build Command: `npm run build` (default)
- Output Directory: `dist` (default)
- Install Command: `npm install`

**Root Directory:** Leave as `.` (root)

#### 2.4 Add Frontend Environment Variables

Click **"Environment Variables"** and add:

**`VITE_API_URL`** (Required)

```
https://algo-nft-backend.vercel.app
```

Replace with your actual backend URL from Part 1.

**Algorand Network Variables** (Optional - has defaults):

**`VITE_ALGOD_NETWORK`**

```
testnet
```

**`VITE_ALGOD_SERVER`**

```
https://testnet-api.algonode.cloud
```

**`VITE_ALGOD_PORT`**

```
443
```

**`VITE_INDEXER_SERVER`** (Optional)

```
https://testnet-idx.algonode.cloud
```

**`VITE_INDEXER_PORT`** (Optional)

```
443
```

> **Important:** After adding variables, select **"Production", "Preview", and "Development"** for each one.

#### 2.5 Deploy Frontend

1. Click **"Deploy"**
2. Wait for build to complete (typically 2-3 minutes)
3. Vercel will provide a URL: `https://algo-careboxpack-poc.vercel.app`

### Part 3: Test Complete System

1. Visit your frontend URL
2. Connect your wallet (Pera or Defly)
3. Try claiming a badge to test:
   - Airdrop (10-day badge for first-time users)
   - NFT minting
   - IPFS image loading

## Configuration Files

### Backend: `algo-nft-backend/vercel.json`

```json
{
  "version": 2,
  "builds": [
    {
      "src": "backend/index.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "backend/index.js"
    }
  ]
}
```

### Frontend: `Algo-CareBoxPack-PoC/vercel.json`

```json
{
  "version": 2,
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "vite"
}
```

## Environment Detection

The frontend automatically connects to the backend via `VITE_API_URL`:

- **Production**: Uses `VITE_API_URL` from Vercel environment variables
- **Local Development**: Uses `http://localhost:3001` if `VITE_API_URL` is set locally

See `src/components/modals/ClaimModal.tsx` for the `resolveBackendBase()` logic.

## Troubleshooting

### Backend Build Fails

**Error:** "Cannot find module '@pinata/sdk'"

**Solution:** Check that `backend/package.json` has all required dependencies. Vercel should install them automatically from the `backend/` directory.

**Error:** "Module not found"

**Solution:** Verify `vercel.json` points to `backend/index.js` as the entry point.

### Backend Airdrop Fails

**Error:** "Failed to send airdrop"

**Checks:**

1. Verify `FUNDED_WALLET_MNEMONIC` is set correctly in Vercel environment variables
2. Check wallet has sufficient TestNet ALGOs
3. Verify mnemonic is 25 words, Algorand-format
4. Check deployment logs in Vercel dashboard for specific errors
5. Visit `https://your-backend.vercel.app/health` to verify backend is running

### Frontend Can't Connect to Backend

**Error:** "Failed to fetch" or "Network error"

**Checks:**

1. Verify `VITE_API_URL` is set correctly in frontend environment variables
2. Ensure backend is deployed and accessible
3. Test backend health endpoint directly: `curl https://your-backend.vercel.app/health`
4. Check browser console for specific error messages
5. Verify CORS is working (backend allows all origins by default)

### CORS Errors

**Error:** "Access to fetch blocked by CORS policy"

**Solution:** Backend already configured to allow all origins (`ALLOWED_ORIGINS=*`). If you encounter this, check that environment variable is set in backend Vercel project.

### NFT Minting Fails

**Error:** "Transaction signing failed"

**Checks:**

1. User must connect a wallet (Pera or Defly)
2. User must approve transaction in wallet popup
3. Check browser console for wallet connection errors
4. Verify TestNet configuration is correct

**Error:** "Failed to pin image to IPFS"

**Checks:**

1. Verify `PINATA_JWT` is set correctly in backend Vercel environment variables
2. Confirm JWT token is valid and not expired
3. Check Pinata account is active
4. Review backend Vercel function logs for detailed errors

### Images Not Loading

**Symptoms:** Placeholder icons instead of NFT images

**Checks:**

1. Verify IPFS URLs are correct in `src/config/achievementBadges.ts`
2. Test IPFS URLs directly in browser
3. Check if Pinata gateway is working: `https://gateway.pinata.cloud/ipfs/...`
4. Ensure metadata was uploaded to Pinata correctly

## Monitoring

### Vercel Dashboard

Access your project dashboards:

- **Backend**: https://vercel.com/your-username/algo-nft-backend
- **Frontend**: https://vercel.com/your-username/algo-careboxpack-poc

View deployments, logs, analytics, update environment variables, and configure custom domains.

### Function Logs

**Backend Logs:**

1. Go to Vercel dashboard → Backend project
2. Navigate to **"Functions"** tab
3. Select a function (e.g., `/api/airdrop`)
4. View real-time logs

**Frontend Logs:**

1. Browser console will show:
   - Wallet connection status
   - NFT minting progress
   - Toast notifications
   - Error messages
2. Vercel dashboard → Frontend project → **"Deployments"** → View build logs

## Custom Domains (Optional)

1. Go to Vercel dashboard → Your project → Settings
2. Click **"Domains"**
3. Add your custom domain
4. Follow DNS configuration instructions
5. Enable automatic SSL certificates

Works for both frontend and backend independently.

## CI/CD

Vercel automatically redeploys when you push to GitHub:

- **`main` branch** → Production deployment
- **Other branches** → Preview deployments

Each branch gets its own URL and can have different environment variables.

**Note:** When you update the backend, you may want to deploy the frontend to clear any cached references.

## Cost

Vercel Hobby Plan (free) includes:

- Unlimited deployments
- Automatic HTTPS
- Global CDN
- 100GB bandwidth/month
- Serverless functions (100GB-hours/month)
- Environment variables
- Preview deployments

Perfect for production-ready demos and projects.

## Local Development with Separate Projects

### Backend

```bash
cd Algo-NFT-Server/algo-nft-backend/backend
npm install
npm run dev
# Backend runs on http://localhost:3001
```

### Frontend

```bash
cd Algo-Startup-Challenge/Algo-CareBoxPack-PoC
npm install
# Set VITE_API_URL=http://localhost:3001 in .env
npm run dev
# Frontend runs on http://localhost:5173
```

## Additional Resources

- Vercel Documentation: https://vercel.com/docs
- Serverless Functions Guide: https://vercel.com/docs/functions
- Environment Variables: https://vercel.com/docs/projects/environment-variables
- Vite Deployment: https://vitejs.dev/guide/static-deploy.html#vercel

## Next Steps

After successful deployment:

1. **Test all features** thoroughly
2. **Monitor function logs** for errors
3. **Set up custom domains** if desired
4. **Share your demo** with the provided URLs
5. **Add analytics** if needed (Vercel provides basic analytics)
6. **Update environment variables** as needed via Vercel dashboard
