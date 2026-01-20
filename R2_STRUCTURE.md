# R2 Bucket Structure

This document describes the Cloudflare R2 bucket structure and naming conventions.

## Bucket Name

```
dickbutt-assets
```

## Key Structure

```
dickbutt-assets/
└── v1/
    ├── gallery/
    │   ├── thumb/
    │   │   └── {hash8}-{slug}.webp
    │   ├── full/
    │   │   └── {hash8}-{slug}.{ext}
    │   └── index/
    │       └── gallery.v1.json
    ├── audio/
    │   ├── {hash8}-{slug}.mp3
    │   └── index/
    │       └── tracks.v1.json
    └── video/
        └── tv/
            └── dickbutt-tv.mp4
```

## Versioning

The `v1/` prefix allows for future schema changes without breaking existing deployments.

## Filename Format

### Gallery Items

Pattern: `{hash8}-{slug}.{ext}`

- **hash8**: First 8 characters of SHA-256 hash of file contents
- **slug**: Normalized filename (lowercase, spaces→hyphens, special chars removed)
- **ext**: Original file extension

Example: `a1b2c3d4-funny-dickbutt.png`

### Thumbnails

Pattern: `{hash8}-{slug}.webp`

Always WebP format, 800px max dimension, 80% quality.

### Audio Tracks

Pattern: `{hash8}-{slug}.mp3`

Same hash-slug format, preserves original MP3.

## Index Files

### gallery.v1.json

```json
{
  "version": "v1",
  "generated": "2026-01-19T12:00:00.000Z",
  "count": 440,
  "items": [
    {
      "id": "a1b2c3d4",
      "slug": "funny-dickbutt",
      "type": "image",
      "original": "Funny Dickbutt.png",
      "thumb": "thumb/a1b2c3d4-funny-dickbutt.webp",
      "full": "full/a1b2c3d4-funny-dickbutt.png",
      "ext": "png",
      "size": 123456,
      "width": 1920,
      "height": 1080
    }
  ]
}
```

### tracks.v1.json

```json
{
  "version": "v1",
  "generated": "2026-01-19T12:00:00.000Z",
  "count": 6,
  "tracks": [
    {
      "id": "e5f6g7h8",
      "slug": "dickbutt-anthem",
      "title": "Dickbutt Anthem",
      "original": "DickbuttAnthem.mp3",
      "file": "e5f6g7h8-dickbutt-anthem.mp3",
      "ext": "mp3",
      "size": 4138840
    }
  ]
}
```

## Content Types

R2 should auto-detect MIME types, but for reference:

| Extension | MIME Type |
|-----------|-----------|
| .png | image/png |
| .jpg, .jpeg | image/jpeg |
| .webp | image/webp |
| .gif | image/gif |
| .mp4 | video/mp4 |
| .mp3 | audio/mpeg |
| .json | application/json |

## Cache Headers

Configure these in R2 bucket settings or via Cloudflare Workers:

| Path Pattern | Cache-Control |
|--------------|---------------|
| `v1/gallery/index/*` | `public, max-age=3600` |
| `v1/gallery/thumb/*` | `public, max-age=31536000, immutable` |
| `v1/gallery/full/*` | `public, max-age=31536000, immutable` |
| `v1/audio/index/*` | `public, max-age=3600` |
| `v1/audio/*.mp3` | `public, max-age=31536000, immutable` |
| `v1/video/*` | `public, max-age=31536000` |

## CORS Configuration

R2 bucket should allow cross-origin requests from the app domain:

```json
{
  "CORSRules": [
    {
      "AllowedOrigins": ["https://dickbutt.info", "http://localhost:3000"],
      "AllowedMethods": ["GET", "HEAD"],
      "AllowedHeaders": ["*"],
      "MaxAgeSeconds": 86400
    }
  ]
}
```
