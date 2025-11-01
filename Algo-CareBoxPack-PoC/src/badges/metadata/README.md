# NFT Metadata Files

ARC-3 compliant JSON metadata for 2025 POC achievement badges.

## Upload to Pinata

Upload each JSON file to Pinata to get IPFS metadata URLs for NFT minting.

### Using Pinata Web UI

1. Go to https://app.pinata.cloud/pinmanager
2. Click "Upload" → "File"
3. Upload each JSON file individually
4. Copy the IPFS hash for each file
5. Update the `metadataUrl` fields in `src/config/achievementBadges.ts`

### Metadata Files

1. `getting_started_10days_2025.json` → 10 Days Getting Started badge
2. `monthly_warrior_30days_2025.json` → 30 Days Monthly Warrior badge
3. `consistency_champion_60days_2025.json` → 60 Days Consistency Champion badge
4. `quarterly_master_90days_2025.json` → 90 Days Quarterly Master badge
5. `half_year_hero_180days_2025.json` → 180 Days Half-Year Hero badge
6. `annual_legend_365days_2025.json` → 365 Days Annual Legend badge

### Expected IPFS URLs Format

After uploading, you'll get URLs like:
```
ipfs://QmXXXXXXXXXXXX/metadata-file-name.json
```

Add these to the `metadataUrl` field in the badge config.

### Alternative: Script Upload

You can also upload these programmatically using the Pinata API or a script, but for POC the web UI is simplest.

