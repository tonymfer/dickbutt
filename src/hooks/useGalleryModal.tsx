'use client';

import { useState, useCallback, useEffect } from 'react';
import type { GalleryItem } from '@/lib/assets';

interface UseGalleryModalReturn {
  isOpen: boolean;
  currentItem: GalleryItem | null;
  currentIndex: number;
  open: (item: GalleryItem, index: number) => void;
  close: () => void;
  next: () => void;
  prev: () => void;
  setItems: (items: GalleryItem[]) => void;
}

export function useGalleryModal(): UseGalleryModalReturn {
  const [isOpen, setIsOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<GalleryItem | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [items, setItems] = useState<GalleryItem[]>([]);

  const open = useCallback((item: GalleryItem, index: number) => {
    setCurrentItem(item);
    setCurrentIndex(index);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setCurrentItem(null);
  }, []);

  const next = useCallback(() => {
    if (items.length === 0) return;
    const nextIndex = (currentIndex + 1) % items.length;
    setCurrentIndex(nextIndex);
    setCurrentItem(items[nextIndex]);
  }, [currentIndex, items]);

  const prev = useCallback(() => {
    if (items.length === 0) return;
    const prevIndex = (currentIndex - 1 + items.length) % items.length;
    setCurrentIndex(prevIndex);
    setCurrentItem(items[prevIndex]);
  }, [currentIndex, items]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          close();
          break;
        case 'ArrowRight':
          next();
          break;
        case 'ArrowLeft':
          prev();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, close, next, prev]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return {
    isOpen,
    currentItem,
    currentIndex,
    open,
    close,
    next,
    prev,
    setItems,
  };
}
