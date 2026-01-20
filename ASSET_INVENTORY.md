# Asset Inventory

Last updated: 2026-01-19

## Source Location

All source assets are located at: `/Users/tomo/Documents/dickbutt-assets/`

## Summary

| Category | Files | Size | Destination |
|----------|-------|------|-------------|
| Folder Icons | 7 | 188 KB | `public/assets/icons/` |
| Main Windows | 4 | 1.7 MB | `public/assets/windows/` |
| Branding | 12 | 8.8 MB | `public/assets/branding/` |
| Audio | 6 | 30 MB | R2 `v1/audio/` |
| Images/Gallery | 441 | ~4.3 GB | R2 `v1/gallery/` |

**Total**: 478 files, ~4.3 GB

## Folder Icons (7 files, 188 KB)

Used for desktop folder UI elements. Copied to `public/assets/icons/`.

| Original Filename | Normalized Filename |
|-------------------|---------------------|
| DickbuttsIRL.png | dickbuttsirl.png |
| NFTcollectionselement.png | nftcollectionselement.png |
| branding.png | branding.png |
| contractelement.png | contractelement.png |
| dickbuttnfts.png | dickbuttnfts.png |
| memefolder.png | memefolder.png |
| windowsplustv.gif | windowsplustv.gif |

## Main Windows (4 files, 1.7 MB)

Window content images for the main UI. Copied to `public/assets/windows/`.

| Original Filename | Normalized Filename |
|-------------------|---------------------|
| $dickbutt3.png | dickbutt3.png |
| origin1.png | origin1.png |
| resources.png | resources.png |
| roadmap.png | roadmap.png |

## Branding (12 files, 8.8 MB)

Branding assets for the /branding page. Copied to `public/assets/branding/`.

| Original Filename | Normalized Filename |
|-------------------|---------------------|
| $dickbuttbanner.png | dickbuttbanner.png |
| baseddickbutt.png | baseddickbutt.png |
| dbflag.gif | dbflag.gif |
| dickbutt.png | dickbutt.png |
| dickbuttOG.png | dickbuttog.png |
| dickbuttbanner.png | dickbuttbanner.png |
| dickbuttbasebg2df.png | dickbuttbasebg2df.png |
| dickbuttcoin.gif | dickbuttcoin.gif |
| dickbuttpfp.jpg | dickbuttpfp.jpg |
| dickbuttwtext.png | dickbuttwtext.png |
| dickcoin.png | dickcoin.png |
| maindickbutt.png | maindickbutt.png |

## Audio (6 files, 30 MB)

Audio tracks for Webamp player. Uploaded to R2 `v1/audio/`.

| Original Filename | Size |
|-------------------|------|
| DJ Butt - Fresh Prince of Dickbutt Bel-Air.mp3 | 5.5 MB |
| Dick Butt Dance - Herr Fuchs.mp3 | 4.9 MB |
| Dickbutt - The Unofficial.mp3 | 9.5 MB |
| Dickbutt Anthem (Zeven's EDM Remix).mp3 | 4.3 MB |
| Dickbutt Means Serious Business - JJokerDude.mp3 | 2.0 MB |
| DickbuttAnthem.mp3 | 3.9 MB |

## Gallery Images (441 files, ~4.3 GB)

Meme collection for the /meme gallery page. Uploaded to R2 `v1/gallery/`.

### File Types

| Type | Count | Notes |
|------|-------|-------|
| Static images (.png, .jpg, .jpeg, .webp) | ~320 | Thumbnails generated |
| Animated GIFs (.gif) | ~70 | Static thumbnail, original preserved |
| Videos (.mp4) | ~50 | Poster frame extracted |

### Special Cases

| File | Size | Handling |
|------|------|----------|
| 477 - DICKBUTTTV-V1compressed.mp4 | 3.78 GB | Excluded from gallery, separate /tv route |

## Filename Normalization Rules

All filenames are normalized:
1. Converted to lowercase
2. `$` prefix removed
3. Spaces replaced with hyphens
4. Non-alphanumeric characters (except `.` and `-`) replaced with hyphens
5. Multiple hyphens collapsed to single
6. Leading/trailing hyphens removed
7. 8-character content hash prefix added for R2 uploads
