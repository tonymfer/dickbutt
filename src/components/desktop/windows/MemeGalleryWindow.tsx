'use client';

import { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { Frame } from 'react95';
import { fetchGalleryIndex, type GalleryItem } from '@/lib/assets';
import { Win95Gallery } from '@/components/win95/Win95Gallery';
import { Win95GalleryModal } from '@/components/win95/Win95GalleryModal';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
`;

const ContentArea = styled.div`
  flex: 1;
  overflow: auto;
  padding: 8px;
`;

const LoadingMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-size: 12px;
  color: #808080;
`;

const ErrorMessage = styled.div`
  padding: 16px;
  text-align: center;
  font-size: 12px;
  color: #800000;
`;

const LoadMoreContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 16px 0;
`;

const LoadMoreButton = styled.button`
  padding: 8px 24px;
  font-size: 12px;
  background: #c0c0c0;
  border: 2px solid;
  border-color: #dfdfdf #808080 #808080 #dfdfdf;
  cursor: pointer;

  &:active {
    border-color: #808080 #dfdfdf #dfdfdf #808080;
  }
`;

const EndMessage = styled.div`
  text-align: center;
  padding: 16px;
  font-size: 12px;
  color: #808080;
`;

const FooterBar = styled.div`
  display: flex;
  gap: 4px;
  padding: 4px 8px;
  flex-shrink: 0;
`;

const FooterItem = styled.div`
  padding: 2px 8px;
  font-size: 11px;
`;

const BATCH_SIZE = 24;

export function MemeGalleryWindow() {
  const [allItems, setAllItems] = useState<GalleryItem[]>([]);
  const [displayedItems, setDisplayedItems] = useState<GalleryItem[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  // Lazy load gallery index on mount
  useEffect(() => {
    let cancelled = false;

    async function loadGallery() {
      try {
        const index = await fetchGalleryIndex();
        if (cancelled) return;
        setAllItems(index.items);
        setDisplayedItems(index.items.slice(0, BATCH_SIZE));
        setTotalCount(index.count);
        setLoading(false);
      } catch (e) {
        if (cancelled) return;
        setError(e instanceof Error ? e.message : 'Failed to load gallery');
        setLoading(false);
      }
    }

    loadGallery();
    return () => { cancelled = true; };
  }, []);

  const loadMore = useCallback(() => {
    const currentCount = displayedItems.length;
    const nextBatch = allItems.slice(0, currentCount + BATCH_SIZE);
    setDisplayedItems(nextBatch);
  }, [displayedItems.length, allItems]);

  const hasMore = displayedItems.length < allItems.length;

  const handleSelect = useCallback((item: GalleryItem) => {
    setSelectedItem(item);
  }, []);

  const handleClose = useCallback(() => {
    setSelectedItem(null);
  }, []);

  const currentIndex = selectedItem
    ? displayedItems.findIndex(i => i.id === selectedItem.id)
    : -1;

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      setSelectedItem(displayedItems[currentIndex - 1]);
    }
  }, [currentIndex, displayedItems]);

  const handleNext = useCallback(() => {
    if (currentIndex < displayedItems.length - 1) {
      setSelectedItem(displayedItems[currentIndex + 1]);
    }
  }, [currentIndex, displayedItems]);

  if (loading) {
    return (
      <Container>
        <LoadingMessage>Loading gallery...</LoadingMessage>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <ErrorMessage>{error}</ErrorMessage>
      </Container>
    );
  }

  return (
    <>
      <Container>
        <ContentArea>
          <Win95Gallery
            items={displayedItems}
            selectedId={selectedItem?.id}
            onSelect={handleSelect}
          />

          {hasMore && (
            <LoadMoreContainer>
              <LoadMoreButton onClick={loadMore}>
                Load More ({allItems.length - displayedItems.length} remaining)
              </LoadMoreButton>
            </LoadMoreContainer>
          )}

          {!hasMore && displayedItems.length > 0 && (
            <EndMessage>
              You&apos;ve seen all {totalCount} items
            </EndMessage>
          )}
        </ContentArea>

        <FooterBar>
          <Frame variant="status" style={{ flex: 1 }}>
            <FooterItem>
              {displayedItems.length} of {totalCount} items
            </FooterItem>
          </Frame>
          <Frame variant="status">
            <FooterItem>Click to view</FooterItem>
          </Frame>
        </FooterBar>
      </Container>

      {selectedItem && (
        <Win95GalleryModal
          item={selectedItem}
          currentIndex={currentIndex}
          totalCount={displayedItems.length}
          onClose={handleClose}
          onPrev={handlePrev}
          onNext={handleNext}
          hasPrev={currentIndex > 0}
          hasNext={currentIndex < displayedItems.length - 1}
        />
      )}
    </>
  );
}
