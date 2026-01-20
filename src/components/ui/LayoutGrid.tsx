'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import type { GalleryItem } from '@/lib/assets';
import { getGalleryThumbUrl, getGalleryFullUrl } from '@/lib/assets';

interface LayoutGridProps {
  items: GalleryItem[];
}

export function LayoutGrid({ items }: LayoutGridProps) {
  const [selected, setSelected] = useState<GalleryItem | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleClose = useCallback(() => {
    setSelected(null);
  }, []);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        handleClose();
      }
    }

    if (selected) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [selected, handleClose]);

  return (
    <div ref={containerRef} className="w-full min-h-dvh py-10 px-4 md:px-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto">
        {items.map((item, index) => (
          <GridCard
            key={item.id}
            item={item}
            index={index}
            isSelected={selected?.id === item.id}
            onSelect={() => setSelected(item)}
          />
        ))}
      </div>

      {/* Expanded overlay */}
      <ExpandedCard item={selected} onClose={handleClose} />
    </div>
  );
}

interface GridCardProps {
  item: GalleryItem;
  index: number;
  isSelected: boolean;
  onSelect: () => void;
}

function GridCard({ item, index, isSelected, onSelect }: GridCardProps) {
  const thumbUrl = getGalleryThumbUrl(item) || getGalleryFullUrl(item);

  // Determine grid span based on position for bento layout
  const getGridClass = () => {
    const pattern = index % 7;
    if (pattern === 0) return 'md:col-span-2 md:row-span-2';
    if (pattern === 3) return 'md:col-span-2';
    if (pattern === 5) return 'md:row-span-2';
    return '';
  };

  const showVideoIndicator = item.type === 'video';
  const showGifIndicator = item.type === 'gif';

  return (
    <motion.button
      layoutId={`card-${item.id}`}
      onClick={onSelect}
      className={`relative overflow-hidden rounded-xl bg-neutral-900 cursor-pointer ${getGridClass()}`}
      style={{ aspectRatio: isSelected ? undefined : '1' }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.15 }}
    >
      <motion.img
        layoutId={`image-${item.id}`}
        src={thumbUrl}
        alt={item.slug}
        loading="lazy"
        className="absolute inset-0 size-full object-cover"
      />

      {/* Type indicator */}
      {(showVideoIndicator || showGifIndicator) && (
        <div className="absolute top-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded z-10">
          {showVideoIndicator ? 'VIDEO' : 'GIF'}
        </div>
      )}

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors" />
    </motion.button>
  );
}

interface ExpandedCardProps {
  item: GalleryItem | null;
  onClose: () => void;
}

function ExpandedCard({ item, onClose }: ExpandedCardProps) {
  if (!item) return null;

  const fullUrl = getGalleryFullUrl(item);

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15 }}
        className="fixed inset-0 z-40 bg-black/80"
        onClick={onClose}
      />

      {/* Expanded content */}
      <div className="fixed inset-0 z-50 grid place-items-center p-4 md:p-10" onClick={onClose}>
        <motion.div
          layoutId={`card-${item.id}`}
          className="relative w-full max-w-5xl max-h-[85vh] bg-neutral-900 rounded-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors"
            aria-label="Close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Media content */}
          <div className="relative w-full h-full flex items-center justify-center bg-black">
            {item.type === 'video' ? (
              <video
                src={fullUrl}
                controls
                autoPlay
                loop
                className="max-w-full max-h-[85vh] object-contain"
              />
            ) : (
              <motion.img
                layoutId={`image-${item.id}`}
                src={fullUrl}
                alt={item.slug}
                className="max-w-full max-h-[85vh] object-contain"
              />
            )}
          </div>

          {/* Info bar */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/80">
            <p className="text-white font-medium text-balance">{item.slug}</p>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-neutral-400 text-sm uppercase">{item.type}</span>
              <span className="text-neutral-500 text-sm tabular-nums">
                {item.width} × {item.height}
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}
