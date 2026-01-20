'use client';

import { useState, useEffect } from 'react';
import type { GalleryItem } from '@/lib/assets';
import { GalleryGrid } from './GalleryGrid';
import { GalleryModal } from './GalleryModal';
import { useGalleryModal } from '@/hooks/useGalleryModal';

interface GalleryClientProps {
  initialItems: GalleryItem[];
  totalCount: number;
}

const BATCH_SIZE = 40;

export function GalleryClient({ initialItems, totalCount }: GalleryClientProps) {
  const [displayedItems, setDisplayedItems] = useState<GalleryItem[]>(
    initialItems.slice(0, BATCH_SIZE)
  );
  const [allItems] = useState<GalleryItem[]>(initialItems);

  const modal = useGalleryModal();

  // Set items for modal navigation
  useEffect(() => {
    modal.setItems(allItems);
  }, [allItems, modal]);

  const loadMore = () => {
    const currentCount = displayedItems.length;
    const nextBatch = allItems.slice(0, currentCount + BATCH_SIZE);
    setDisplayedItems(nextBatch);
  };

  const hasMore = displayedItems.length < allItems.length;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-black/80 backdrop-blur-sm border-b border-gray-800 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold text-yellow-400">Meme Gallery</h1>
          <span className="text-sm text-gray-400">
            {displayedItems.length} of {totalCount} items
          </span>
        </div>
      </header>

      {/* Gallery */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        <GalleryGrid
          items={displayedItems}
          onItemClick={(item, index) => modal.open(item, index)}
        />

        {/* Load More Button */}
        {hasMore && (
          <div className="mt-8 text-center">
            <button
              onClick={loadMore}
              className="px-6 py-3 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold rounded-lg transition-colors"
            >
              Load More ({allItems.length - displayedItems.length} remaining)
            </button>
          </div>
        )}

        {!hasMore && displayedItems.length > 0 && (
          <div className="mt-8 text-center text-gray-500 text-sm">
            You&apos;ve seen all {totalCount} items
          </div>
        )}
      </main>

      {/* Modal */}
      <GalleryModal
        isOpen={modal.isOpen}
        item={modal.currentItem}
        currentIndex={modal.currentIndex}
        totalItems={allItems.length}
        onClose={modal.close}
        onNext={modal.next}
        onPrev={modal.prev}
      />
    </div>
  );
}
