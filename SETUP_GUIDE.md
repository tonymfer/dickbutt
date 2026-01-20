# Complete R2 Setup Guide

This guide walks you through configuring Cloudflare R2 and uploading your assets.

---

## Prerequisites

Before starting, ensure you have:
- [ ] A Cloudflare account (free tier works)
- [ ] rclone installed: `brew install rclone`
- [ ] ffmpeg installed (optional, for video posters): `brew install ffmpeg`

---

## Part 1: Create R2 Bucket

### Step 1.1: Access R2 Dashboard

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Log in to your account
3. In the left sidebar, click **R2 Object Storage**

### Step 1.2: Create the Bucket

1. Click **Create bucket**
2. Enter bucket name: `dickbutt-assets`
3. Select location hint: **Automatic** (or choose closest to your users)
4. Click **Create bucket**

### Step 1.3: Enable Public Access

1. Click on your new `dickbutt-assets` bucket
2. Go to **Settings** tab
3. Scroll to **Public access**
4. Click **Allow Access**
5. Under **R2.dev subdomain**, click **Allow Access**
6. Copy the public URL (looks like `https://pub-xxxxxxxxxxxx.r2.dev`)

> **Note**: Save this URL - you'll need it for `NEXT_PUBLIC_R2_PUBLIC_URL`

### Step 1.4: (Optional) Custom Domain

For a cleaner URL like `assets.dickbutt.info`:

1. In bucket Settings, scroll to **Custom Domains**
2. Click **Connect Domain**
3. Enter: `assets.dickbutt.info`
4. Follow the DNS setup instructions
5. Wait for SSL certificate (usually 1-5 minutes)

---

## Part 2: Create API Credentials

### Step 2.1: Create R2 API Token

1. In R2 dashboard, click **Manage R2 API Tokens** (top right)
2. Click **Create API token**
3. Configure the token:
   - **Token name**: `dickbutt-upload`
   - **Permissions**: Object Read & Write
   - **Specify bucket(s)**: Select `dickbutt-assets`
   - **TTL**: Optional (leave blank for no expiry)
4. Click **Create API Token**

### Step 2.2: Save Your Credentials

You'll see three values - **save these immediately** (they won't be shown again):

```
Access Key ID:     xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
Secret Access Key: xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

Also note your **Account ID** from the R2 overview page (32-character hex string).

---

## Part 3: Configure rclone

### Step 3.1: Run rclone Config

```bash
rclone config
```

### Step 3.2: Create New Remote

Follow these prompts:

```
n) New remote
name> r2

Storage> s3
  (Choose the number for "Amazon S3 Compliant Storage Providers")

provider> Cloudflare
  (Choose the number for "Cloudflare R2 Storage")

env_auth> false
  (Enter credentials directly)

access_key_id> YOUR_ACCESS_KEY_ID
  (Paste your Access Key ID from Step 2.2)

secret_access_key> YOUR_SECRET_ACCESS_KEY
  (Paste your Secret Access Key from Step 2.2)

region> auto
  (Just press Enter for auto)

endpoint> https://YOUR_ACCOUNT_ID.r2.cloudflarestorage.com
  (Replace YOUR_ACCOUNT_ID with your 32-char account ID)

location_constraint>
  (Press Enter to skip)

acl>
  (Press Enter to skip)

Edit advanced config?> n

y) Yes this is OK
```

### Step 3.3: Verify rclone Connection

```bash
# List buckets
rclone lsd r2:

# Should show:
#           -1 2026-01-19 00:00:00        -1 dickbutt-assets
```

---

## Part 4: Configure Environment Variables

### Step 4.1: Create .env.local

Create a `.env.local` file in your project root:

```bash
cd /Users/tomo/Projects/dickbutt
```

```bash
cat > .env.local << 'EOF'
# R2 Public URL (use your R2.dev URL or custom domain)
NEXT_PUBLIC_R2_PUBLIC_URL=https://pub-xxxxxxxxxxxx.r2.dev

# R2 Credentials (only needed for upload scripts, not runtime)
R2_ACCOUNT_ID=your_32_char_account_id
R2_ACCESS_KEY_ID=your_access_key_id
R2_SECRET_ACCESS_KEY=your_secret_access_key
R2_BUCKET=dickbutt-assets
EOF
```

### Step 4.2: Update with Your Values

Edit `.env.local` and replace:
- `pub-xxxxxxxxxxxx.r2.dev` with your actual R2.dev URL (or `assets.dickbutt.info` if using custom domain)
- `your_32_char_account_id` with your Cloudflare Account ID
- `your_access_key_id` with your R2 Access Key ID
- `your_secret_access_key` with your R2 Secret Access Key

### Step 4.3: Verify .env.local is Gitignored

```bash
# Should show .env* in output
grep "env" .gitignore
```

---

## Part 5: Build Assets

### Step 5.1: Install ffmpeg (Optional)

For video thumbnail extraction:

```bash
brew install ffmpeg
```

### Step 5.2: Build Gallery and Audio

```bash
npm run assets:build
```

Expected output:
```
Building gallery...
Found 437 files to process
Processed 437/437 files...

Gallery build complete!
  Images: 330
  GIFs: 73
  Videos: 34
  Total: 437

Building audio tracks...
Found 6 audio files to process
Audio build complete!
  Total tracks: 6
```

### Step 5.3: Verify Build

```bash
npm run assets:verify
```

Expected output:
```
==================================================
Asset Verification Report
==================================================
...
VERIFICATION PASSED
==================================================
```

### Step 5.4: Check Generated Files

```bash
# Check directory structure
ls -la .generated/

# Check gallery index
head -50 .generated/gallery/index/gallery.v1.json

# Check audio index
cat .generated/audio/index/tracks.v1.json
```

---

## Part 6: Upload to R2

### Step 6.1: Run Upload Script

```bash
npm run assets:upload
```

Or directly:
```bash
./scripts/upload-r2-rclone.sh
```

### Step 6.2: Confirm Upload

The script will show:
```
Files to upload:
  Gallery thumbnails: 403
  Gallery full: 437
  Audio tracks: 6

Continue with upload? (y/N)
```

Type `y` and press Enter.

### Step 6.3: Monitor Progress

Upload will show progress:
```
Uploading gallery assets...
Transferred:   	  500 MiB / 4.3 GiB, 12%, 25 MiB/s, ETA 2m30s
```

> **Note**: Full upload of 4.3GB may take 5-15 minutes depending on your connection.

### Step 6.4: Verify Upload

```bash
# Check gallery index exists
rclone ls r2:dickbutt-assets/v1/gallery/index/

# Check audio index exists
rclone ls r2:dickbutt-assets/v1/audio/index/

# Check a few thumbnails
rclone ls r2:dickbutt-assets/v1/gallery/thumb/ | head -5
```

---

## Part 7: Upload TV Video (Optional)

The large TV video (3.78GB) is handled separately:

### Step 7.1: Copy and Upload TV Video

```bash
# Create directory structure
rclone mkdir r2:dickbutt-assets/v1/video/tv/

# Upload the video (this will take a while)
rclone copy "/Users/tomo/Documents/dickbutt-assets/images/477 - DICKBUTTTV-V1compressed.mp4" \
  r2:dickbutt-assets/v1/video/tv/ \
  --progress \
  --transfers 1

# Rename to clean filename
rclone moveto \
  "r2:dickbutt-assets/v1/video/tv/477 - DICKBUTTTV-V1compressed.mp4" \
  "r2:dickbutt-assets/v1/video/tv/dickbutt-tv.mp4"
```

### Step 7.2: Verify TV Video

```bash
rclone ls r2:dickbutt-assets/v1/video/tv/
```

---

## Part 8: Test Locally

### Step 8.1: Start Development Server

```bash
npm run dev
```

### Step 8.2: Test Gallery Page

1. Open http://localhost:3000/meme
2. Verify thumbnails load from R2
3. Click an image to open modal
4. Test keyboard navigation (← → arrows, Esc)
5. Test "Load More" pagination
6. Test download button

### Step 8.3: Check Network Tab

1. Open browser DevTools (F12)
2. Go to Network tab
3. Refresh the page
4. Verify image requests go to your R2 URL
5. Check for any 404 or CORS errors

---

## Part 9: Configure for Production (Vercel)

### Step 9.1: Add Environment Variable

1. Go to [Vercel Dashboard](https://vercel.com)
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add:
   - **Key**: `NEXT_PUBLIC_R2_PUBLIC_URL`
   - **Value**: `https://assets.dickbutt.info` (or your R2.dev URL)
   - **Environment**: Production, Preview, Development

### Step 9.2: Deploy

```bash
# If using Vercel CLI
vercel --prod

# Or push to main branch for auto-deploy
git add .
git commit -m "Add asset pipeline and gallery"
git push origin main
```

### Step 9.3: Verify Production

1. Visit your production URL + `/meme`
2. Verify all images load correctly
3. Test modal and navigation

---

## Troubleshooting

### CORS Errors

If you see CORS errors in the browser console:

1. Go to R2 bucket → Settings
2. Scroll to **CORS Policy**
3. Add this policy:

```json
[
  {
    "AllowedOrigins": [
      "http://localhost:3000",
      "https://dickbutt.info",
      "https://*.vercel.app"
    ],
    "AllowedMethods": ["GET", "HEAD"],
    "AllowedHeaders": ["*"],
    "MaxAgeSeconds": 86400
  }
]
```

### 403 Forbidden Errors

1. Verify public access is enabled on the bucket
2. Check the R2.dev subdomain is allowed
3. Verify the URL in `NEXT_PUBLIC_R2_PUBLIC_URL` matches exactly

### Images Not Loading

1. Check browser console for errors
2. Verify the index JSON is accessible:
   ```bash
   curl https://YOUR_R2_URL/v1/gallery/index/gallery.v1.json | head
   ```
3. Check a specific thumbnail:
   ```bash
   curl -I https://YOUR_R2_URL/v1/gallery/thumb/SOME_FILE.webp
   ```

### Upload Failures

1. Verify rclone config:
   ```bash
   rclone config show r2
   ```
2. Test connection:
   ```bash
   rclone lsd r2:
   ```
3. Check credentials haven't expired

### Build Failures

1. Ensure sharp is installed:
   ```bash
   npm install sharp
   ```
2. Check source directory exists:
   ```bash
   ls "/Users/tomo/Documents/dickbutt-assets/images/" | head
   ```

---

## Quick Reference

### Commands

| Command | Description |
|---------|-------------|
| `npm run assets:build` | Generate thumbnails and indexes |
| `npm run assets:verify` | Validate generated files |
| `npm run assets:upload` | Upload to R2 |
| `npm run dev` | Start dev server |
| `npm run build` | Build for production |

### URLs

| Resource | URL Pattern |
|----------|-------------|
| Gallery Index | `{R2_URL}/v1/gallery/index/gallery.v1.json` |
| Thumbnail | `{R2_URL}/v1/gallery/thumb/{id}-{slug}.webp` |
| Full Image | `{R2_URL}/v1/gallery/full/{id}-{slug}.{ext}` |
| Audio Index | `{R2_URL}/v1/audio/index/tracks.v1.json` |
| Audio Track | `{R2_URL}/v1/audio/{id}-{slug}.mp3` |
| TV Video | `{R2_URL}/v1/video/tv/dickbutt-tv.mp4` |

### Files

| File | Purpose |
|------|---------|
| `.env.local` | Local environment variables |
| `.generated/` | Built assets (gitignored) |
| `scripts/build-gallery.mjs` | Thumbnail generation |
| `scripts/upload-r2-rclone.sh` | R2 upload script |
| `src/lib/assets.ts` | Asset URL helpers |

---

## Checklist

Use this checklist to track your progress:

- [ ] Created R2 bucket `dickbutt-assets`
- [ ] Enabled public access on bucket
- [ ] Created R2 API token
- [ ] Saved Account ID, Access Key ID, Secret Access Key
- [ ] Configured rclone with `r2` remote
- [ ] Created `.env.local` with correct values
- [ ] Ran `npm run assets:build` successfully
- [ ] Ran `npm run assets:verify` - PASSED
- [ ] Ran `npm run assets:upload` successfully
- [ ] Tested locally at http://localhost:3000/meme
- [ ] Added `NEXT_PUBLIC_R2_PUBLIC_URL` to Vercel
- [ ] Deployed to production
- [ ] Verified production gallery works
