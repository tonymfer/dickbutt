'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { Button, Frame } from 'react95';
import styled from 'styled-components';
import type { GalleryItem } from '@/lib/assets';
import { React95Provider } from '@/components/providers/React95Provider';
import { Win95Gallery } from '@/components/win95/Win95Gallery';
import { Win95GalleryModal } from '@/components/win95/Win95GalleryModal';
import { PageContainer } from '@/components/win95/Win95Page';
import { Window, WindowContent, Toolbar } from 'react95';
/* eslint-disable @next/next/no-img-element */

const GalleryWindow = styled(Window)`
  width: 100%;
  max-width: 1100px;
  display: flex;
  flex-direction: column;
  max-height: calc(100vh - 32px);
`;

const WindowTitlebar = styled.div`
  height: 18px;
  background: linear-gradient(to right, var(--ActiveTitle) 0%, var(--GradientActiveTitle) 100%);
  color: var(--TitleText);
  display: flex;
  align-items: center;
  padding: 0 2px;
  gap: 3px;
  flex-shrink: 0;
`;

const TitlebarIcon = styled.img`
  width: 16px;
  height: 16px;
  image-rendering: pixelated;
  flex-shrink: 0;
`;

const WindowTitleArea = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;
`;

const WindowTitle = styled.span`
  font-size: 11px;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-shadow: none;
`;

const WindowButton = styled.button`
  width: 16px;
  height: 14px;
  min-width: 16px;
  min-height: 14px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #c0c0c0;
  border: none;
  box-shadow: inset -1px -1px #0a0a0a, inset 1px 1px #ffffff, inset -2px -2px #808080, inset 2px 2px #dfdfdf;
  cursor: pointer;
  position: relative;

  &:active {
    box-shadow: inset 1px 1px #0a0a0a, inset -1px -1px #ffffff, inset 2px 2px #808080, inset -2px -2px #dfdfdf;
  }

  /* Close button X icon */
  &.window-close-button::before,
  &.window-close-button::after {
    content: '';
    position: absolute;
    width: 8px;
    height: 2px;
    background: #000;
    top: 50%;
    left: 50%;
  }
  &.window-close-button::before {
    transform: translate(-50%, -50%) rotate(45deg);
  }
  &.window-close-button::after {
    transform: translate(-50%, -50%) rotate(-45deg);
  }
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
          <WindowTitlebar>
            <TitlebarIcon src="/assets/icons/win95/folder-hires.ico" alt="" />
            <WindowTitleArea>
              <WindowTitle>Meme Gallery</WindowTitle>
            </WindowTitleArea>
            <Link href="/">
              <WindowButton className="window-close-button" />
            </Link>
          </WindowTitlebar>

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
