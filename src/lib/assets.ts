/**
 * Asset helper utilities for R2-hosted content
 */

// R2 public URL from environment (set in Vercel or .env.local)
const R2_PUBLIC_URL = process.env.NEXT_PUBLIC_R2_PUBLIC_URL || 'https://assets.dickbutt.info';

/**
 * Gallery item from the index
 */
export interface GalleryItem {
  id: string;
  slug: string;
  type: 'image' | 'gif' | 'video';
  original: string;
  thumb: string | null;
  full: string;
  ext: string;
  size: number;
  width: number;
  height: number;
}

/**
 * Gallery index structure
 */
export interface GalleryIndex {
  version: string;
  generated: string;
  count: number;
  items: GalleryItem[];
}

/**
 * Audio track from the index
 */
export interface AudioTrack {
  id: string;
  slug: string;
  title: string;
  original: string;
  file: string;
  ext: string;
  size: number;
}

/**
 * Audio index structure
 */
export interface AudioIndex {
  version: string;
  generated: string;
  count: number;
  tracks: AudioTrack[];
}

/**
 * Get the URL for a gallery image
 */
export function getGalleryImageUrl(
  item: GalleryItem,
  size: 'thumb' | 'full' = 'thumb'
): string {
  const path = size === 'thumb' && item.thumb ? item.thumb : item.full;
  return `${R2_PUBLIC_URL}/v1/gallery/${path}`;
}

/**
 * Get the thumbnail URL for a gallery item
 */
export function getGalleryThumbUrl(item: GalleryItem): string | null {
  if (!item.thumb) return null;
  return `${R2_PUBLIC_URL}/v1/gallery/${item.thumb}`;
}

/**
 * Get the full-size URL for a gallery item
 */
export function getGalleryFullUrl(item: GalleryItem): string {
  return `${R2_PUBLIC_URL}/v1/gallery/${item.full}`;
}

/**
 * Get the URL for an audio track
 */
export function getAudioUrl(track: AudioTrack): string {
  return `${R2_PUBLIC_URL}/v1/audio/${track.file}`;
}

/**
 * Get the gallery index URL
 */
export function getGalleryIndexUrl(): string {
  return `${R2_PUBLIC_URL}/v1/gallery/index/gallery.v1.json`;
}

/**
 * Get the audio tracks index URL
 */
export function getAudioIndexUrl(): string {
  return `${R2_PUBLIC_URL}/v1/audio/index/tracks.v1.json`;
}

/**
 * Get the TV video URL
 */
export function getTvVideoUrl(): string {
  return `${R2_PUBLIC_URL}/v1/video/tv/dickbutt-tv.mp4`;
}

/**
 * Fetch the gallery index
 */
export async function fetchGalleryIndex(): Promise<GalleryIndex> {
  const res = await fetch(getGalleryIndexUrl(), {
    next: { revalidate: 3600 }, // Cache for 1 hour
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch gallery index: ${res.status}`);
  }

  return res.json();
}

/**
 * Fetch the audio index
 */
export async function fetchAudioIndex(): Promise<AudioIndex> {
  const res = await fetch(getAudioIndexUrl(), {
    next: { revalidate: 3600 }, // Cache for 1 hour
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch audio index: ${res.status}`);
  }

  return res.json();
}

/**
 * Format file size for display
 */
export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  return `${(bytes / 1024 / 1024 / 1024).toFixed(2)} GB`;
}
