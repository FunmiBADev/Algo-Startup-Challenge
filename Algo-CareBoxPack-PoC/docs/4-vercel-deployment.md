# Vercel Deployment Guide

This guide explains how to deploy the CareBox Pack POC to Vercel (free hosting with automatic HTTPS).

## Prerequisites

1. GitHub account with your code pushed to a repository
2. Vercel account (sign up at https://vercel.com - free)
3. Completed backend setup:
   - Pinata JWT for IPFS storage
   - Funded wallet mnemonic for airdrops

## Deployment Steps

### 1. Push Your Code to GitHub

If you haven't already:

```bash
git add .
git commit -m "Ready for Vercel deployment"
git push origin main
```

### 2. Connect to Vercel

1. Go to https://vercel.com and sign in
2. Click **"Add New..."** → **"Project"**
3. Import your GitHub repository
4. Vercel will auto-detect Vite configuration

### 3. Configure Project Settings

Vercel will show configuration. Use these settings:

**Framework Preset:** `Vite` (auto-detected)

**Build and Output Settings:**

- Build Command: `npm run build` (default)
- Output Directory: `dist` (default)
- Install Command: `npm install && cd backend && npm install`

**Root Directory:** Leave as `.` (root)

### 4. Add Environment Variables

Click **"Environment Variables"** to add secrets:

#### Backend Variables

Add these **exact names**:

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

#### Frontend Variables (Optional)

Only add if you need custom Algorand network config:

**`VITE_ALGOD_SERVER`**

```
https://testnet-api.algonode.cloud
```

**`VITE_ALGOD_PORT`**

```
443
```

**`VITE_ALGOD_NETWORK`**

```
testnet
```

> **Important:** After adding variables, select **"Production", "Preview", and "Development"** for each one.

### 5. Deploy

1. Click **"Deploy"**
2. Wait for build to complete (typically 2-5 minutes)
3. Vercel will provide a URL like: `https://your-project-name.vercel.app`

### 6. Test Your Deployment

1. Visit the provided URL
2. Connect your wallet (Pera or Defly)
3. Try claiming a badge to test:
   - Airdrop (10-day badge for first-time users)
   - NFT minting
   - IPFS image loading

## Configuration Files

### `vercel.json`

This project includes a `vercel.json` that:

- Routes `/api/*` requests to backend functions
- Configures backend as Node.js 20.x runtime
- Sets up proper build and install commands

No changes needed unless you want to customise deployment.

### Environment Detection

The frontend automatically detects Vercel deployment and routes API calls to `/api/*` instead of `localhost:3001`.

See `src/components/modals/ClaimModal.tsx` for the `resolveBackendBase()` logic.

## Troubleshooting

### Build Fails

**Error:** "Missing dependencies"

**Solution:** Ensure `backend/package.json` has all required dependencies. The install command runs `npm install` in both root and backend directories.

**Error:** "Cannot find module '@pinata/sdk'"

**Solution:** Check that backend dependencies are properly installed. Vercel should handle this automatically.

### Airdrop Fails

**Error:** "Failed to send airdrop"

**Checks:**

1. Verify `FUNDED_WALLET_MNEMONIC` is set correctly in Vercel environment variables
2. Check wallet has sufficient TestNet ALGOs
3. Verify mnemonic is 25 words, Algorand-format
4. Check deployment logs in Vercel dashboard for specific errors

### NFT Minting Fails

**Error:** "Failed to pin image to IPFS"

**Checks:**

1. Verify `PINATA_JWT` is set correctly in Vercel environment variables
2. Confirm JWT token is valid and not expired
3. Check Pinata account is active
4. Review Vercel function logs for detailed errors

**Error:** "Transaction signing failed"

**Checks:**

1. User must connect a wallet (Pera or Defly)
2. User must approve transaction in wallet popup
3. Check browser console for wallet connection errors

### Images Not Loading

**Symptoms:** Placeholder icons instead of NFT images

**Checks:**

1. Verify IPFS URLs are correct in `src/config/achievementBadges.ts`
2. Test IPFS URLs directly in browser
3. Check if Pinata gateway is working: `https://gateway.pinata.cloud/ipfs/...`
4. Ensure metadata was uploaded to Pinata correctly

### CORS Errors

**Error:** "Access to fetch blocked by CORS policy"

**Solution:** Backend already configured to allow all origins (`ALLOWED_ORIGINS=*`). If you encounter this, check that environment variable is set in Vercel.

## Monitoring

### Vercel Dashboard

Access your project dashboard:

- **URL:** https://vercel.com/your-username/your-project
- View deployments, logs, analytics
- Update environment variables
- Configure custom domains

### Function Logs

1. Go to Vercel dashboard
2. Click on your project
3. Navigate to **"Functions"** tab
4. Select a function (e.g., `/api/airdrop`)
5. View real-time logs

### Frontend Logs

Browser console will show:

- Wallet connection status
- NFT minting progress
- Toast notifications
- Error messages

## Custom Domain (Optional)

1. Go to Vercel dashboard → Your project → Settings
2. Click **"Domains"**
3. Add your custom domain
4. Follow DNS configuration instructions
5. Enable automatic SSL certificates

## CI/CD

Vercel automatically redeploys when you push to GitHub:

- **`main` branch** → Production deployment
- **Other branches** → Preview deployments

Each branch gets its own URL and can have different environment variables.

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

## Additional Resources

- Vercel Documentation: https://vercel.com/docs
- Serverless Functions Guide: https://vercel.com/docs/functions
- Environment Variables: https://vercel.com/docs/projects/environment-variables
- Vite Deployment: https://vitejs.dev/guide/static-deploy.html#vercel

## Next Steps

After successful deployment:

1. **Test all features** thoroughly
2. **Monitor function logs** for errors
3. **Set up custom domain** if desired
4. **Share your demo** with the provided URL
5. **Add analytics** if needed (Vercel provides basic analytics)
