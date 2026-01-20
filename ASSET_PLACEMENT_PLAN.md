# Asset Placement Plan

This document describes where each asset category is stored and why.

## Local Assets (In Repository)

These assets are kept in the repository under `public/assets/` because they are:
- Small enough to not bloat the repo
- Required on initial page load
- Not frequently updated

### `/public/assets/icons/`

**Source**: `/Users/tomo/Documents/dickbutt-assets/folder-icons/`

Desktop folder icons used in the main UI. Total ~188 KB.

```
public/assets/icons/
├── branding.png
├── contractelement.png
├── dickbuttnfts.png
├── dickbuttsirl.png
├── memefolder.png
├── nftcollectionselement.png
└── windowsplustv.gif
```

### `/public/assets/windows/`

**Source**: `/Users/tomo/Documents/dickbutt-assets/main-windows/`

Window content images. Total ~1.7 MB.

```
public/assets/windows/
├── dickbutt3.png
├── origin1.png
├── resources.png
└── roadmap.png
```

### `/public/assets/branding/`

**Source**: `/Users/tomo/Documents/dickbutt-assets/branding/`

Branding assets for the /branding page. Total ~8.8 MB.

```
public/assets/branding/
├── baseddickbutt.png
├── dbflag.gif
├── dickbutt.png
├── dickbuttbanner.png
├── dickbuttbasebg2df.png
├── dickbuttcoin.gif
├── dickbuttog.png
├── dickbuttpfp.jpg
├── dickbuttwtext.png
├── dickcoin.png
└── maindickbutt.png
```

## R2 Assets (CDN-Hosted)

These assets are stored in Cloudflare R2 because they are:
- Large (4.3 GB total)
- Lazy-loaded on demand
- Benefit from CDN caching

### R2 `v1/gallery/`

**Source**: `/Users/tomo/Documents/dickbutt-assets/images/`

Meme gallery with thumbnails and full-size originals.

```
v1/gallery/
├── thumb/           # 800px max webp thumbnails
│   └── {hash}-{slug}.webp
├── full/            # Original files
│   └── {hash}-{slug}.{ext}
└── index/
    └── gallery.v1.json
```

### R2 `v1/audio/`

**Source**: `/Users/tomo/Documents/dickbutt-assets/audio/`

MP3 tracks for Webamp player.

```
v1/audio/
├── {hash}-{slug}.mp3
└── index/
    └── tracks.v1.json
```

### R2 `v1/video/tv/`

**Source**: `/Users/tomo/Documents/dickbutt-assets/images/477 - DICKBUTTTV-V1compressed.mp4`

Large TV video file for the /tv route.

```
v1/video/tv/
└── dickbutt-tv.mp4
```

## Copy Commands

### Local Assets

```bash
# Already done during setup, but for reference:
# folder-icons → public/assets/icons/
# main-windows → public/assets/windows/
# branding → public/assets/branding/
```

### R2 Assets

```bash
# Build and upload
npm run assets:build
npm run assets:verify
npm run assets:upload
```

## File Size Limits

| Location | Max File Size | Reason |
|----------|---------------|--------|
| Repository | 10 MB per file | Git performance |
| R2 | 5 GB per file | R2 limits |
| Vercel | 50 MB per function | Serverless limits |
