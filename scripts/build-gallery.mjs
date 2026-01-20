#!/usr/bin/env node

/**
 * Build Gallery Script
 * Processes images from source directory, generates thumbnails, and creates index
 */

import { readdir, mkdir, copyFile, writeFile, stat } from 'fs/promises';
import { createReadStream } from 'fs';
import { createHash } from 'crypto';
import { join, extname, basename } from 'path';
import { execSync } from 'child_process';

// Configuration
const SOURCE_DIR = '/Users/tomo/Documents/dickbutt-assets/images';
const OUTPUT_DIR = '.generated/gallery';
const THUMB_DIR = join(OUTPUT_DIR, 'thumb');
const FULL_DIR = join(OUTPUT_DIR, 'full');
const INDEX_DIR = join(OUTPUT_DIR, 'index');
const INDEX_FILE = join(INDEX_DIR, 'gallery.v1.json');

const THUMB_MAX_SIZE = 800;
const THUMB_QUALITY = 80;

// Supported file types
const IMAGE_EXTS = ['.jpg', '.jpeg', '.png', '.webp'];
const GIF_EXT = '.gif';
const VIDEO_EXTS = ['.mp4', '.webm', '.mov'];

// The large TV video to exclude from gallery
const EXCLUDED_FILES = ['477 - DICKBUTTTV-V1compressed.mp4'];

/**
 * Generate 8-character content hash from file
 */
async function getFileHash(filePath) {
  return new Promise((resolve, reject) => {
    const hash = createHash('sha256');
    const stream = createReadStream(filePath);
    stream.on('data', (data) => hash.update(data));
    stream.on('end', () => resolve(hash.digest('hex').slice(0, 8)));
    stream.on('error', reject);
  });
}

/**
 * Generate unique ID from content hash + filename
 * This ensures uniqueness even for files with identical content
 */
function generateUniqueId(contentHash, filename) {
  const filenameHash = createHash('sha256').update(filename).digest('hex').slice(0, 4);
  return `${contentHash}${filenameHash}`;
}

/**
 * Normalize filename: lowercase, remove $, spaces to hyphens
 */
function normalizeFilename(name) {
  return name
    .toLowerCase()
    .replace(/\$/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9.-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

/**
 * Get slug from filename (without extension)
 */
function getSlug(filename) {
  const ext = extname(filename);
  const name = basename(filename, ext);
  return normalizeFilename(name);
}

/**
 * Check if sharp is available
 */
async function checkDependencies() {
  try {
    await import('sharp');
    return true;
  } catch {
    console.error('Error: sharp is required. Run: npm install sharp');
    process.exit(1);
  }
}

/**
 * Check if ffmpeg is available
 */
function checkFfmpeg() {
  try {
    execSync('ffmpeg -version', { stdio: 'pipe' });
    return true;
  } catch {
    console.warn('Warning: ffmpeg not found. Video poster extraction will be skipped.');
    return false;
  }
}

/**
 * Generate webp thumbnail from image
 */
async function generateImageThumb(sourcePath, thumbPath) {
  const sharp = (await import('sharp')).default;

  await sharp(sourcePath)
    .resize(THUMB_MAX_SIZE, THUMB_MAX_SIZE, {
      fit: 'inside',
      withoutEnlargement: true
    })
    .webp({ quality: THUMB_QUALITY })
    .toFile(thumbPath);
}

/**
 * Generate static webp thumbnail from GIF (first frame)
 */
async function generateGifThumb(sourcePath, thumbPath) {
  const sharp = (await import('sharp')).default;

  await sharp(sourcePath, { pages: 1 }) // Only first page/frame
    .resize(THUMB_MAX_SIZE, THUMB_MAX_SIZE, {
      fit: 'inside',
      withoutEnlargement: true
    })
    .webp({ quality: THUMB_QUALITY })
    .toFile(thumbPath);
}

/**
 * Extract poster frame from video using ffmpeg
 */
function extractVideoPoster(sourcePath, thumbPath) {
  try {
    execSync(
      `ffmpeg -y -i "${sourcePath}" -vf "thumbnail,scale='min(${THUMB_MAX_SIZE},iw)':'min(${THUMB_MAX_SIZE},ih)':force_original_aspect_ratio=decrease" -frames:v 1 "${thumbPath}"`,
      { stdio: 'pipe' }
    );
    return true;
  } catch (error) {
    console.warn(`Warning: Could not extract poster from ${sourcePath}`);
    return false;
  }
}

/**
 * Get image dimensions
 */
async function getImageDimensions(filePath) {
  try {
    const sharp = (await import('sharp')).default;
    const metadata = await sharp(filePath).metadata();
    return { width: metadata.width, height: metadata.height };
  } catch {
    return { width: 0, height: 0 };
  }
}

/**
 * Process a single file
 */
async function processFile(filename, hasFfmpeg) {
  const sourcePath = join(SOURCE_DIR, filename);
  const ext = extname(filename).toLowerCase();
  const slug = getSlug(filename);

  // Get file hash and generate unique ID
  const contentHash = await getFileHash(sourcePath);
  const uniqueId = generateUniqueId(contentHash, filename);
  const fileStats = await stat(sourcePath);

  // Determine file type
  let type = 'image';
  if (ext === GIF_EXT) type = 'gif';
  else if (VIDEO_EXTS.includes(ext)) type = 'video';

  // Generate normalized filenames (use unique ID for stable file paths)
  const thumbFilename = `${uniqueId}-${slug}.webp`;
  const fullFilename = `${uniqueId}-${slug}${ext}`;

  const thumbPath = join(THUMB_DIR, thumbFilename);
  const fullPath = join(FULL_DIR, fullFilename);

  // Copy original to full directory
  await copyFile(sourcePath, fullPath);

  // Generate thumbnail based on type
  let thumbGenerated = false;

  if (IMAGE_EXTS.includes(ext)) {
    await generateImageThumb(sourcePath, thumbPath);
    thumbGenerated = true;
  } else if (ext === GIF_EXT) {
    await generateGifThumb(sourcePath, thumbPath);
    thumbGenerated = true;
  } else if (VIDEO_EXTS.includes(ext) && hasFfmpeg) {
    thumbGenerated = extractVideoPoster(sourcePath, thumbPath);
  }

  // Get dimensions (for images/gifs)
  let dimensions = { width: 0, height: 0 };
  if (type !== 'video') {
    dimensions = await getImageDimensions(sourcePath);
  }

  return {
    id: uniqueId,
    slug,
    type,
    original: filename,
    thumb: thumbGenerated ? `thumb/${thumbFilename}` : null,
    full: `full/${fullFilename}`,
    ext: ext.slice(1),
    size: fileStats.size,
    width: dimensions.width,
    height: dimensions.height,
  };
}

/**
 * Main build function
 */
async function build() {
  console.log('Building gallery...\n');

  // Check dependencies
  await checkDependencies();
  const hasFfmpeg = checkFfmpeg();

  // Create output directories
  await mkdir(THUMB_DIR, { recursive: true });
  await mkdir(FULL_DIR, { recursive: true });
  await mkdir(INDEX_DIR, { recursive: true });

  // Read source directory
  const files = await readdir(SOURCE_DIR);
  const validFiles = files.filter(f => {
    const ext = extname(f).toLowerCase();
    const isValid = [...IMAGE_EXTS, GIF_EXT, ...VIDEO_EXTS].includes(ext);
    const isExcluded = EXCLUDED_FILES.includes(f);
    return isValid && !isExcluded;
  });

  console.log(`Found ${validFiles.length} files to process\n`);

  // Process files
  const items = [];
  let processed = 0;

  for (const file of validFiles) {
    try {
      const item = await processFile(file, hasFfmpeg);
      items.push(item);
      processed++;

      if (processed % 10 === 0 || processed === validFiles.length) {
        process.stdout.write(`\rProcessed ${processed}/${validFiles.length} files...`);
      }
    } catch (error) {
      console.error(`\nError processing ${file}:`, error.message);
    }
  }

  console.log('\n');

  // Sort items by slug
  items.sort((a, b) => a.slug.localeCompare(b.slug));

  // Create index
  const index = {
    version: 'v1',
    generated: new Date().toISOString(),
    count: items.length,
    items,
  };

  await writeFile(INDEX_FILE, JSON.stringify(index, null, 2));

  // Summary
  const stats = {
    images: items.filter(i => i.type === 'image').length,
    gifs: items.filter(i => i.type === 'gif').length,
    videos: items.filter(i => i.type === 'video').length,
  };

  console.log('Gallery build complete!');
  console.log(`  Images: ${stats.images}`);
  console.log(`  GIFs: ${stats.gifs}`);
  console.log(`  Videos: ${stats.videos}`);
  console.log(`  Total: ${items.length}`);
  console.log(`\nIndex written to: ${INDEX_FILE}`);
}

build().catch(console.error);
