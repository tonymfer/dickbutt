'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { Button, Frame } from 'react95';
import styled from 'styled-components';
import type { GalleryItem } from '@/lib/assets';
import { React95Provider } from '@/components/providers/React95Provider';
import { Win95Gallery } from '@/components/win95/Win95Gallery';
import { Win95GalleryModal } from '@/components/win95/Win95GalleryModal';
import { PageContainer, CloseButton } from '@/components/win95/Win95Page';
import { Window, WindowHeader, WindowContent, Toolbar } from 'react95';

const GalleryWindow = styled(Window)`
  width: 100%;
  max-width: 1100px;
  display: flex;
  flex-direction: column;
  max-height: calc(100vh - 32px);
`;

const Header = styled(WindowHeader)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
`;

const StyledToolbar = styled(Toolbar)`
  flex-shrink: 0;
`;

const ContentArea = styled(WindowContent)`
  flex: 1;
  overflow: auto;
  padding: 16px;
`;

const LoadMoreContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 16px 0;
`;

const LoadMoreButton = styled(Button).withConfig({
  shouldForwardProp: (prop) =>
    !['active', 'primary', 'fullWidth', 'square'].includes(prop),
})`
  padding: 8px 24px;
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

interface Win95GalleryClientProps {
  initialItems: GalleryItem[];
  totalCount: number;
}

const BATCH_SIZE = 24;

function Win95GalleryContent({ initialItems, totalCount }: Win95GalleryClientProps) {
  const [displayedItems, setDisplayedItems] = useState<GalleryItem[]>(
    initialItems.slice(0, BATCH_SIZE)
  );
  const [allItems] = useState<GalleryItem[]>(initialItems);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

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

  return (
    <>
      <PageContainer>
        <GalleryWindow>
          <Header>
            <span>Meme Gallery</span>
            <Link href="/">
              <CloseButton size="sm">
                <span>X</span>
              </CloseButton>
            </Link>
          </Header>

          <StyledToolbar>
            <Link href="/">
              <Button variant="thin" size="sm">Back</Button>
            </Link>
            <Link href="/videos">
              <Button variant="thin" size="sm">Videos</Button>
            </Link>
            <Link href="/irl">
              <Button variant="thin" size="sm">IRL</Button>
            </Link>
          </StyledToolbar>

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
              <FooterItem>
                Click to view
              </FooterItem>
            </Frame>
          </FooterBar>
        </GalleryWindow>
      </PageContainer>

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

export function Win95GalleryClient(props: Win95GalleryClientProps) {
  return (
    <React95Provider>
      <Win95GalleryContent {...props} />
    </React95Provider>
  );
}
