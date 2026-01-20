#!/usr/bin/env node

/**
 * Verify Generated Assets Script
 * Validates that all index entries have corresponding files and checks for issues
 */

import { readFile, access, readdir } from 'fs/promises';
import { join } from 'path';

const GALLERY_INDEX = '.generated/gallery/index/gallery.v1.json';
const AUDIO_INDEX = '.generated/audio/index/tracks.v1.json';
const GALLERY_DIR = '.generated/gallery';
const AUDIO_DIR = '.generated/audio';

let hasErrors = false;

/**
 * Check if file exists
 */
async function fileExists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

/**
 * Verify gallery assets
 */
async function verifyGallery() {
  console.log('Verifying gallery assets...\n');

  let index;
  try {
    const data = await readFile(GALLERY_INDEX, 'utf-8');
    index = JSON.parse(data);
  } catch (error) {
    console.error(`ERROR: Cannot read gallery index: ${error.message}`);
    hasErrors = true;
    return;
  }

  console.log(`  Index version: ${index.version}`);
  console.log(`  Generated: ${index.generated}`);
  console.log(`  Item count: ${index.count}`);

  // Check for duplicate IDs
  const ids = new Set();
  const duplicateIds = [];
  for (const item of index.items) {
    if (ids.has(item.id)) {
      duplicateIds.push(item.id);
    }
    ids.add(item.id);
  }

  if (duplicateIds.length > 0) {
    console.error(`\n  ERROR: Duplicate IDs found: ${duplicateIds.join(', ')}`);
    hasErrors = true;
  } else {
    console.log('  Duplicate IDs: None');
  }

  // Check for duplicate slugs
  const slugs = new Set();
  const duplicateSlugs = [];
  for (const item of index.items) {
    if (slugs.has(item.slug)) {
      duplicateSlugs.push(item.slug);
    }
    slugs.add(item.slug);
  }

  if (duplicateSlugs.length > 0) {
    console.warn(`\n  WARNING: Duplicate slugs found: ${duplicateSlugs.slice(0, 5).join(', ')}${duplicateSlugs.length > 5 ? '...' : ''}`);
  }

  // Check files exist
  let missingThumbs = 0;
  let missingFulls = 0;
  let validDimensions = 0;
  let invalidDimensions = 0;

  for (const item of index.items) {
    // Check thumbnail
    if (item.thumb) {
      const thumbPath = join(GALLERY_DIR, item.thumb);
      if (!(await fileExists(thumbPath))) {
        console.error(`  ERROR: Missing thumb: ${item.thumb}`);
        missingThumbs++;
        hasErrors = true;
      }
    }

    // Check full file
    const fullPath = join(GALLERY_DIR, item.full);
    if (!(await fileExists(fullPath))) {
      console.error(`  ERROR: Missing full: ${item.full}`);
      missingFulls++;
      hasErrors = true;
    }

    // Check dimensions (for non-videos)
    if (item.type !== 'video') {
      if (item.width > 0 && item.height > 0) {
        validDimensions++;
      } else {
        invalidDimensions++;
      }
    }
  }

  console.log(`\n  Thumbnails: ${index.items.filter(i => i.thumb).length} (${missingThumbs} missing)`);
  console.log(`  Full files: ${index.items.length} (${missingFulls} missing)`);
  console.log(`  Valid dimensions: ${validDimensions}`);
  if (invalidDimensions > 0) {
    console.warn(`  Invalid dimensions: ${invalidDimensions}`);
  }

  // Type breakdown
  const types = {};
  for (const item of index.items) {
    types[item.type] = (types[item.type] || 0) + 1;
  }
  console.log('\n  Type breakdown:');
  for (const [type, count] of Object.entries(types)) {
    console.log(`    ${type}: ${count}`);
  }
}

/**
 * Verify audio assets
 */
async function verifyAudio() {
  console.log('\nVerifying audio assets...\n');

  let index;
  try {
    const data = await readFile(AUDIO_INDEX, 'utf-8');
    index = JSON.parse(data);
  } catch (error) {
    console.error(`ERROR: Cannot read audio index: ${error.message}`);
    hasErrors = true;
    return;
  }

  console.log(`  Index version: ${index.version}`);
  console.log(`  Generated: ${index.generated}`);
  console.log(`  Track count: ${index.count}`);

  // Check for duplicate IDs
  const ids = new Set();
  const duplicateIds = [];
  for (const track of index.tracks) {
    if (ids.has(track.id)) {
      duplicateIds.push(track.id);
    }
    ids.add(track.id);
  }

  if (duplicateIds.length > 0) {
    console.error(`\n  ERROR: Duplicate IDs found: ${duplicateIds.join(', ')}`);
    hasErrors = true;
  } else {
    console.log('  Duplicate IDs: None');
  }

  // Check files exist
  let missingFiles = 0;

  for (const track of index.tracks) {
    const filePath = join(AUDIO_DIR, track.file);
    if (!(await fileExists(filePath))) {
      console.error(`  ERROR: Missing file: ${track.file}`);
      missingFiles++;
      hasErrors = true;
    }
  }

  console.log(`  Files verified: ${index.tracks.length} (${missingFiles} missing)`);

  // List tracks
  console.log('\n  Tracks:');
  for (const track of index.tracks) {
    const sizeMB = (track.size / 1024 / 1024).toFixed(2);
    console.log(`    - ${track.title} (${sizeMB} MB)`);
  }
}

/**
 * Check for orphaned files (files not in index)
 */
async function checkOrphans() {
  console.log('\nChecking for orphaned files...\n');

  // Get indexed files
  let galleryIndex, audioIndex;
  try {
    galleryIndex = JSON.parse(await readFile(GALLERY_INDEX, 'utf-8'));
    audioIndex = JSON.parse(await readFile(AUDIO_INDEX, 'utf-8'));
  } catch {
    console.log('  Skipping orphan check (indexes not available)');
    return;
  }

  const indexedGalleryFiles = new Set();
  for (const item of galleryIndex.items) {
    if (item.thumb) indexedGalleryFiles.add(item.thumb);
    indexedGalleryFiles.add(item.full);
  }

  const indexedAudioFiles = new Set();
  for (const track of audioIndex.tracks) {
    indexedAudioFiles.add(track.file);
  }

  // Check for orphaned gallery files
  const thumbDir = join(GALLERY_DIR, 'thumb');
  const fullDir = join(GALLERY_DIR, 'full');

  try {
    const thumbFiles = await readdir(thumbDir);
    const orphanThumbs = thumbFiles.filter(f => !indexedGalleryFiles.has(`thumb/${f}`));
    if (orphanThumbs.length > 0) {
      console.warn(`  WARNING: ${orphanThumbs.length} orphaned thumbnail files`);
    }

    const fullFiles = await readdir(fullDir);
    const orphanFulls = fullFiles.filter(f => !indexedGalleryFiles.has(`full/${f}`));
    if (orphanFulls.length > 0) {
      console.warn(`  WARNING: ${orphanFulls.length} orphaned full files`);
    }
  } catch {
    // Directories might not exist
  }

  // Check for orphaned audio files
  try {
    const audioFiles = await readdir(AUDIO_DIR);
    const orphanAudio = audioFiles.filter(f =>
      !indexedAudioFiles.has(f) &&
      f !== 'index' &&
      !f.startsWith('.')
    );
    if (orphanAudio.length > 0) {
      console.warn(`  WARNING: ${orphanAudio.length} orphaned audio files`);
    }
  } catch {
    // Directory might not exist
  }

  console.log('  Orphan check complete');
}

/**
 * Main verify function
 */
async function verify() {
  console.log('='.repeat(50));
  console.log('Asset Verification Report');
  console.log('='.repeat(50) + '\n');

  await verifyGallery();
  await verifyAudio();
  await checkOrphans();

  console.log('\n' + '='.repeat(50));
  if (hasErrors) {
    console.error('VERIFICATION FAILED - Errors found');
    process.exit(1);
  } else {
    console.log('VERIFICATION PASSED');
  }
  console.log('='.repeat(50));
}

verify().catch(console.error);
