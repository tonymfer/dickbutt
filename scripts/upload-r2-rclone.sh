#!/bin/bash

# Upload generated assets to Cloudflare R2 using rclone
# Primary upload method with parallel transfers

set -e

# Configuration
GENERATED_DIR=".generated"
R2_REMOTE="r2:dickbutt-assets"
R2_PREFIX="v1"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "=================================================="
echo "R2 Upload Script (rclone)"
echo "=================================================="

# Check if rclone is installed
if ! command -v rclone &> /dev/null; then
    echo -e "${RED}Error: rclone is not installed${NC}"
    echo "Install with: brew install rclone"
    echo "Or see: https://rclone.org/install/"
    exit 1
fi

# Check if r2 remote is configured
if ! rclone listremotes | grep -q "^r2:"; then
    echo -e "${RED}Error: R2 remote 'r2' is not configured in rclone${NC}"
    echo ""
    echo "Configure with:"
    echo "  rclone config"
    echo ""
    echo "Or create ~/.config/rclone/rclone.conf with:"
    echo ""
    echo "[r2]"
    echo "type = s3"
    echo "provider = Cloudflare"
    echo "access_key_id = YOUR_R2_ACCESS_KEY_ID"
    echo "secret_access_key = YOUR_R2_SECRET_ACCESS_KEY"
    echo "endpoint = https://YOUR_ACCOUNT_ID.r2.cloudflarestorage.com"
    echo "acl = private"
    echo ""
    exit 1
fi

# Check if generated directory exists
if [ ! -d "$GENERATED_DIR" ]; then
    echo -e "${RED}Error: Generated directory not found${NC}"
    echo "Run: npm run assets:build"
    exit 1
fi

# Show what will be uploaded
echo ""
echo "Source: $GENERATED_DIR"
echo "Destination: $R2_REMOTE/$R2_PREFIX"
echo ""

# Count files
GALLERY_THUMB_COUNT=$(find "$GENERATED_DIR/gallery/thumb" -type f 2>/dev/null | wc -l | tr -d ' ')
GALLERY_FULL_COUNT=$(find "$GENERATED_DIR/gallery/full" -type f 2>/dev/null | wc -l | tr -d ' ')
AUDIO_COUNT=$(find "$GENERATED_DIR/audio" -type f -name "*.mp3" 2>/dev/null | wc -l | tr -d ' ')

echo "Files to upload:"
echo "  Gallery thumbnails: $GALLERY_THUMB_COUNT"
echo "  Gallery full: $GALLERY_FULL_COUNT"
echo "  Audio tracks: $AUDIO_COUNT"
echo ""

# Confirm before uploading
read -p "Continue with upload? (y/N) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Upload cancelled"
    exit 0
fi

echo ""
echo -e "${YELLOW}Uploading gallery assets...${NC}"

# Upload gallery with parallel transfers
rclone sync "$GENERATED_DIR/gallery" "$R2_REMOTE/$R2_PREFIX/gallery" \
    --transfers 16 \
    --checkers 8 \
    --progress \
    --stats 5s \
    --stats-one-line

echo ""
echo -e "${YELLOW}Uploading audio assets...${NC}"

# Upload audio
rclone sync "$GENERATED_DIR/audio" "$R2_REMOTE/$R2_PREFIX/audio" \
    --transfers 16 \
    --checkers 8 \
    --progress \
    --stats 5s \
    --stats-one-line

echo ""
echo -e "${GREEN}Upload complete!${NC}"
echo ""
echo "Verify with:"
echo "  rclone ls $R2_REMOTE/$R2_PREFIX/gallery/index/"
echo "  rclone ls $R2_REMOTE/$R2_PREFIX/audio/index/"
