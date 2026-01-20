'use client';

import { motion } from 'framer-motion';
import type { GalleryItem } from '@/lib/assets';
import { getGalleryThumbUrl, getGalleryFullUrl } from '@/lib/assets';

interface GalleryGridProps {
  items: GalleryItem[];
  onItemClick: (item: GalleryItem, index: number) => void;
}

export function GalleryGrid({ items, onItemClick }: GalleryGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-3">
      {items.map((item, index) => (
        <GalleryThumbnail
          key={item.id}
          item={item}
          index={index}
          onClick={() => onItemClick(item, index)}
        />
      ))}
    </div>
  );
}

interface GalleryThumbnailProps {
  item: GalleryItem;
  index: number;
  onClick: () => void;
}

function GalleryThumbnail({ item, index, onClick }: GalleryThumbnailProps) {
  const thumbUrl = getGalleryThumbUrl(item);
  const fullUrl = getGalleryFullUrl(item);

  // Use thumb if available, otherwise fall back to full
  const imageUrl = thumbUrl || fullUrl;

  // Determine if this is a video/gif (show indicator)
  const showVideoIndicator = item.type === 'video';
  const showGifIndicator = item.type === 'gif';

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.02, 0.5), duration: 0.3 }}
      onClick={onClick}
      className="relative aspect-square overflow-hidden rounded-lg bg-gray-900 hover:ring-2 hover:ring-yellow-400 focus:ring-2 focus:ring-yellow-400 focus:outline-none transition-all group"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imageUrl}
        alt={item.slug}
        loading="lazy"
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />

      {/* Type indicator */}
      {showVideoIndicator && (
        <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
          VIDEO
        </div>
      )}
      {showGifIndicator && (
        <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
          GIF
        </div>
      )}

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
    </motion.button>
  );
}
