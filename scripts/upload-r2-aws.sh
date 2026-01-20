#!/bin/bash

# Upload generated assets to Cloudflare R2 using AWS CLI
# Fallback upload method (requires AWS CLI with S3-compatible config)

set -e

# Configuration
GENERATED_DIR=".generated"
BUCKET="dickbutt-assets"
R2_PREFIX="v1"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "=================================================="
echo "R2 Upload Script (AWS CLI)"
echo "=================================================="

# Check required environment variables
if [ -z "$R2_ACCOUNT_ID" ]; then
    echo -e "${RED}Error: R2_ACCOUNT_ID environment variable not set${NC}"
    exit 1
fi

if [ -z "$R2_ACCESS_KEY_ID" ]; then
    echo -e "${RED}Error: R2_ACCESS_KEY_ID environment variable not set${NC}"
    exit 1
fi

if [ -z "$R2_SECRET_ACCESS_KEY" ]; then
    echo -e "${RED}Error: R2_SECRET_ACCESS_KEY environment variable not set${NC}"
    exit 1
fi

# Set AWS credentials for this session
export AWS_ACCESS_KEY_ID="$R2_ACCESS_KEY_ID"
export AWS_SECRET_ACCESS_KEY="$R2_SECRET_ACCESS_KEY"

# R2 endpoint
ENDPOINT="https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com"

# Check if aws cli is installed
if ! command -v aws &> /dev/null; then
    echo -e "${RED}Error: AWS CLI is not installed${NC}"
    echo "Install with: brew install awscli"
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
echo "Destination: s3://$BUCKET/$R2_PREFIX"
echo "Endpoint: $ENDPOINT"
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

# Upload gallery
aws s3 sync "$GENERATED_DIR/gallery" "s3://$BUCKET/$R2_PREFIX/gallery" \
    --endpoint-url "$ENDPOINT"

echo ""
echo -e "${YELLOW}Uploading audio assets...${NC}"

# Upload audio
aws s3 sync "$GENERATED_DIR/audio" "s3://$BUCKET/$R2_PREFIX/audio" \
    --endpoint-url "$ENDPOINT"

echo ""
echo -e "${GREEN}Upload complete!${NC}"
echo ""
echo "Verify with:"
echo "  aws s3 ls s3://$BUCKET/$R2_PREFIX/gallery/index/ --endpoint-url $ENDPOINT"
echo "  aws s3 ls s3://$BUCKET/$R2_PREFIX/audio/index/ --endpoint-url $ENDPOINT"
