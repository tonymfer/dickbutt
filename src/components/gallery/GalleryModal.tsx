'use client';

import { motion, AnimatePresence } from 'framer-motion';
import type { GalleryItem } from '@/lib/assets';
import { getGalleryFullUrl, formatFileSize } from '@/lib/assets';

interface GalleryModalProps {
  isOpen: boolean;
  item: GalleryItem | null;
  currentIndex: number;
  totalItems: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export function GalleryModal({
  isOpen,
  item,
  currentIndex,
  totalItems,
  onClose,
  onNext,
  onPrev,
}: GalleryModalProps) {
  if (!item) return null;

  const fullUrl = getGalleryFullUrl(item);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/90"
            onClick={onClose}
          />

          {/* Content */}
          <div className="relative z-10 w-full h-full flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 text-white">
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-400">
                  {currentIndex + 1} / {totalItems}
                </span>
                <span className="text-sm font-medium truncate max-w-[300px]">
                  {item.slug}
                </span>
                <span className="text-xs text-gray-500">
                  {formatFileSize(item.size)}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {/* Download button */}
                <a
                  href={fullUrl}
                  download={`${item.slug}.${item.ext}`}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  title="Download"
                >
                  <DownloadIcon />
                </a>

                {/* Close button */}
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  title="Close (Esc)"
                >
                  <CloseIcon />
                </button>
              </div>
            </div>

            {/* Main content area */}
            <div className="flex-1 flex items-center justify-center px-16 pb-4 relative">
              {/* Previous button */}
              <button
                onClick={onPrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                title="Previous (Left Arrow)"
              >
                <ChevronLeftIcon />
              </button>

              {/* Media content */}
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="max-w-full max-h-full flex items-center justify-center"
              >
                {item.type === 'video' ? (
                  <video
                    src={fullUrl}
                    controls
                    autoPlay
                    loop
                    className="max-w-full max-h-[80vh] object-contain"
                  />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={fullUrl}
                    alt={item.slug}
                    className="max-w-full max-h-[80vh] object-contain"
                  />
                )}
              </motion.div>

              {/* Next button */}
              <button
                onClick={onNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                title="Next (Right Arrow)"
              >
                <ChevronRightIcon />
              </button>
            </div>

            {/* Footer with info */}
            <div className="p-4 text-center text-gray-500 text-xs">
              Use arrow keys to navigate, Esc to close
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function CloseIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

function ChevronLeftIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}
