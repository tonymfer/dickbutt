# R2 Deployment Runbook

Step-by-step guide for building and deploying assets to R2.

## Prerequisites

- [ ] Node.js 18+ installed
- [ ] sharp package installed (`npm install`)
- [ ] ffmpeg installed (`brew install ffmpeg`)
- [ ] rclone installed (`brew install rclone`)
- [ ] R2 credentials configured (see R2_ENV_TEMPLATE.md)
- [ ] Source assets at `/Users/tomo/Documents/dickbutt-assets/`

## Step 1: Build Assets

Generate thumbnails and index files:

```bash
npm run assets:build
```

This will:
1. Process all images from the source directory
2. Generate WebP thumbnails (800px max)
3. Extract video poster frames
4. Copy audio files
5. Create `gallery.v1.json` and `tracks.v1.json` indexes

Expected output:
```
Building gallery...
Found 440 files to process
Processed 440/440 files...

Gallery build complete!
  Images: 320
  GIFs: 70
  Videos: 50
  Total: 440

Building audio tracks...
Found 6 audio files to process
  Processed: Dickbutt Anthem
  ...
Audio build complete!
  Total tracks: 6
```

## Step 2: Verify Assets

Check that all assets were generated correctly:

```bash
npm run assets:verify
```

Expected output:
```
==================================================
Asset Verification Report
==================================================

Verifying gallery assets...
  Index version: v1
  Item count: 440
  Duplicate IDs: None
  Thumbnails: 440 (0 missing)
  Full files: 440 (0 missing)

Verifying audio assets...
  Index version: v1
  Track count: 6
  Duplicate IDs: None
  Files verified: 6 (0 missing)

==================================================
VERIFICATION PASSED
==================================================
```

If verification fails, fix the issues before uploading.

## Step 3: Configure rclone

Ensure rclone is configured for R2:

```bash
# Check if r2 remote exists
rclone listremotes | grep r2:

# If not, configure it
rclone config
```

See R2_ENV_TEMPLATE.md for configuration details.

## Step 4: Upload to R2

Upload all generated assets:

```bash
npm run assets:upload
```

Or manually:

```bash
./scripts/upload-r2-rclone.sh
```

The script will:
1. Show file counts to be uploaded
2. Ask for confirmation
3. Upload gallery assets (thumbnails + full)
4. Upload audio assets
5. Show verification commands

## Step 5: Verify Upload

Check that files are accessible:

```bash
# Check index files exist
rclone ls r2:dickbutt-assets/v1/gallery/index/
rclone ls r2:dickbutt-assets/v1/audio/index/

# Test public URL
curl -I https://assets.dickbutt.info/v1/gallery/index/gallery.v1.json
```

## Step 6: Test Locally

Start the development server and test:

```bash
npm run dev
```

1. Open http://localhost:3000/meme
2. Verify thumbnails load
3. Click an image to test modal
4. Test navigation (arrows, keyboard)
5. Test download link

## Step 7: Deploy

Deploy to Vercel:

```bash
vercel --prod
```

Or push to main branch if auto-deploy is configured.

## Troubleshooting

### Build fails with "sharp not found"

```bash
npm install sharp
```

### ffmpeg not found (video posters)

```bash
brew install ffmpeg
```

Videos will still be processed without posters.

### Upload fails with "r2 remote not configured"

```bash
rclone config
# Follow prompts to set up R2
```

### 403 Forbidden on public URLs

1. Check R2 public access is enabled
2. Verify custom domain DNS is correct
3. Check CORS settings

### Gallery shows "Failed to load"

1. Check browser console for errors
2. Verify `NEXT_PUBLIC_R2_PUBLIC_URL` is set
3. Test index URL directly in browser

## Updating Assets

When adding new assets:

1. Add files to source directory
2. Run `npm run assets:build`
3. Run `npm run assets:verify`
4. Run `npm run assets:upload`
5. Clear CDN cache if needed

## Rollback

Index files are versioned. To rollback:

1. Keep old index file backed up
2. Upload previous version to `v1/gallery/index/gallery.v1.json`
3. Files with content hashes remain immutable

## Monitoring

Check R2 analytics in Cloudflare dashboard:
- Requests per day
- Bandwidth usage
- Popular objects
- Error rates
