# R2 Environment Variables

This document describes the environment variables needed for R2 integration.

## Required Variables

Add these to `.env.local` for local development and to Vercel environment variables for production.

### `.env.local`

```bash
# Cloudflare Account ID (found in Cloudflare dashboard → Overview)
R2_ACCOUNT_ID=your_cloudflare_account_id

# R2 API Token credentials
# Create at: Cloudflare dashboard → R2 → Manage R2 API Tokens
R2_ACCESS_KEY_ID=your_r2_access_key_id
R2_SECRET_ACCESS_KEY=your_r2_secret_access_key

# R2 Bucket name
R2_BUCKET=dickbutt-assets

# Public URL for R2 bucket
# Option 1: Custom domain (requires Cloudflare setup)
NEXT_PUBLIC_R2_PUBLIC_URL=https://assets.dickbutt.info

# Option 2: R2.dev public URL (enable in R2 dashboard)
# NEXT_PUBLIC_R2_PUBLIC_URL=https://pub-xxxxxxxxxxxx.r2.dev
```

## Getting Credentials

### 1. Find Your Account ID

1. Go to Cloudflare dashboard
2. Click on any domain or R2
3. Account ID is in the right sidebar

### 2. Create R2 API Token

1. Go to Cloudflare dashboard → R2
2. Click "Manage R2 API Tokens"
3. Click "Create API Token"
4. Select permissions:
   - Object Read & Write
   - Bucket: dickbutt-assets
5. Copy the Access Key ID and Secret Access Key

### 3. Enable Public Access

Option A: R2.dev subdomain (quick setup)
1. Go to R2 → dickbutt-assets bucket
2. Settings → Public Access
3. Enable R2.dev subdomain
4. Copy the URL (e.g., `pub-xxxxxxxxxxxx.r2.dev`)

Option B: Custom domain (recommended for production)
1. Add `assets.dickbutt.info` to Cloudflare DNS
2. Go to R2 → dickbutt-assets bucket
3. Settings → Custom Domains
4. Connect `assets.dickbutt.info`

## Vercel Configuration

Add these in Vercel dashboard → Settings → Environment Variables:

| Variable | Environment | Value |
|----------|-------------|-------|
| `NEXT_PUBLIC_R2_PUBLIC_URL` | All | `https://assets.dickbutt.info` |

Note: Only `NEXT_PUBLIC_R2_PUBLIC_URL` is needed at runtime. The R2 credentials are only used for uploads.

## rclone Configuration

For upload scripts, configure rclone:

```ini
# ~/.config/rclone/rclone.conf

[r2]
type = s3
provider = Cloudflare
access_key_id = your_r2_access_key_id
secret_access_key = your_r2_secret_access_key
endpoint = https://YOUR_ACCOUNT_ID.r2.cloudflarestorage.com
acl = private
```

Or configure interactively:

```bash
rclone config
# Choose: n (new remote)
# Name: r2
# Type: s3 (Amazon S3 Compliant)
# Provider: Cloudflare
# Access Key: your_r2_access_key_id
# Secret Key: your_r2_secret_access_key
# Endpoint: https://YOUR_ACCOUNT_ID.r2.cloudflarestorage.com
```

## Validation

Test your configuration:

```bash
# Test rclone
rclone ls r2:dickbutt-assets --max-depth 1

# Test public URL
curl -I https://assets.dickbutt.info/v1/gallery/index/gallery.v1.json
```
