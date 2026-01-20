'use client';

import { useState } from 'react';
import type { GalleryItem } from '@/lib/assets';
import { LayoutGrid } from '@/components/ui/LayoutGrid';

interface GalleryClientProps {
  initialItems: GalleryItem[];
  totalCount: number;
}

const BATCH_SIZE = 21; // Divisible by 3 for clean grid rows

export function GalleryClient({ initialItems, totalCount }: GalleryClientProps) {
  const [displayedItems, setDisplayedItems] = useState<GalleryItem[]>(
    initialItems.slice(0, BATCH_SIZE)
  );
  const [allItems] = useState<GalleryItem[]>(initialItems);

  const loadMore = () => {
    const currentCount = displayedItems.length;
    const nextBatch = allItems.slice(0, currentCount + BATCH_SIZE);
    setDisplayedItems(nextBatch);
  };

  const hasMore = displayedItems.length < allItems.length;

  return (
    <div className="min-h-dvh bg-black text-white">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-black/80 backdrop-blur-sm border-b border-neutral-800 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold text-yellow-400 text-balance">Meme Gallery</h1>
          <span className="text-sm text-neutral-400 tabular-nums">
            {displayedItems.length} of {totalCount}
          </span>
        </div>
      </header>

      {/* Gallery */}
      <LayoutGrid items={displayedItems} />

      {/* Load More */}
      <div className="max-w-7xl mx-auto px-4 pb-10">
        {hasMore && (
          <div className="text-center">
            <button
              onClick={loadMore}
              className="px-6 py-3 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold rounded-lg transition-colors"
            >
              Load More ({allItems.length - displayedItems.length} remaining)
            </button>
          </div>
        )}

        {!hasMore && displayedItems.length > 0 && (
          <div className="text-center text-neutral-500 text-sm">
            You&apos;ve seen all {totalCount} items
          </div>
        )}
      </div>
    </div>
  );
}
