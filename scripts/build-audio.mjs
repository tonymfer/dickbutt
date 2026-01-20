#!/usr/bin/env node

/**
 * Build Audio Script
 * Processes audio files from source directory and creates index
 */

import { readdir, mkdir, copyFile, writeFile, stat } from 'fs/promises';
import { createReadStream } from 'fs';
import { createHash } from 'crypto';
import { join, extname, basename } from 'path';

// Configuration
const SOURCE_DIR = '/Users/tomo/Documents/dickbutt-assets/audio';
const OUTPUT_DIR = '.generated/audio';
const INDEX_DIR = join(OUTPUT_DIR, 'index');
const INDEX_FILE = join(INDEX_DIR, 'tracks.v1.json');

// Supported file types
const AUDIO_EXTS = ['.mp3', '.wav', '.ogg', '.m4a'];

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
 * Extract title from filename
 */
function extractTitle(filename) {
  const ext = extname(filename);
  const name = basename(filename, ext);
  // Keep original casing for display title
  return name.replace(/\s*-\s*/g, ' - ').trim();
}

/**
 * Get slug from filename
 */
function getSlug(filename) {
  const ext = extname(filename);
  const name = basename(filename, ext);
  return normalizeFilename(name);
}

/**
 * Process a single audio file
 */
async function processFile(filename) {
  const sourcePath = join(SOURCE_DIR, filename);
  const ext = extname(filename).toLowerCase();
  const slug = getSlug(filename);
  const title = extractTitle(filename);

  // Get file hash and stats
  const hash = await getFileHash(sourcePath);
  const fileStats = await stat(sourcePath);

  // Generate normalized filename
  const outputFilename = `${hash}-${slug}${ext}`;
  const outputPath = join(OUTPUT_DIR, outputFilename);

  // Copy file
  await copyFile(sourcePath, outputPath);

  return {
    id: hash,
    slug,
    title,
    original: filename,
    file: outputFilename,
    ext: ext.slice(1),
    size: fileStats.size,
    // Duration could be extracted with ffprobe if needed
  };
}

/**
 * Main build function
 */
async function build() {
  console.log('Building audio tracks...\n');

  // Create output directories
  await mkdir(OUTPUT_DIR, { recursive: true });
  await mkdir(INDEX_DIR, { recursive: true });

  // Read source directory
  const files = await readdir(SOURCE_DIR);
  const validFiles = files.filter(f => {
    const ext = extname(f).toLowerCase();
    return AUDIO_EXTS.includes(ext);
  });

  console.log(`Found ${validFiles.length} audio files to process\n`);

  // Process files
  const tracks = [];

  for (const file of validFiles) {
    try {
      const track = await processFile(file);
      tracks.push(track);
      console.log(`  Processed: ${track.title}`);
    } catch (error) {
      console.error(`Error processing ${file}:`, error.message);
    }
  }

  // Sort tracks by title
  tracks.sort((a, b) => a.title.localeCompare(b.title));

  // Create index
  const index = {
    version: 'v1',
    generated: new Date().toISOString(),
    count: tracks.length,
    tracks,
  };

  await writeFile(INDEX_FILE, JSON.stringify(index, null, 2));

  console.log('\nAudio build complete!');
  console.log(`  Total tracks: ${tracks.length}`);
  console.log(`\nIndex written to: ${INDEX_FILE}`);
}

build().catch(console.error);
