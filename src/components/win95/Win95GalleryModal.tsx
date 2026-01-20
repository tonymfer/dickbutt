'use client';

import { useEffect, useCallback, useState } from 'react';
import Image from 'next/image';
import { Window, WindowHeader, WindowContent, Button, Frame } from 'react95';
import styled, { keyframes } from 'styled-components';
import type { GalleryItem } from '@/lib/assets';
import { getGalleryFullUrl, formatFileSize } from '@/lib/assets';
import { Win95MediaPlayer } from './Win95MediaPlayer';

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
`;

const ModalWindow = styled(Window)`
  max-width: 90vw;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  width: auto;
`;

const StyledWindowHeader = styled(WindowHeader)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
`;

const TitleText = styled.span`
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-right: 8px;
`;

const CloseButton = styled(Button).withConfig({
  shouldForwardProp: (prop) =>
    !['active', 'primary', 'fullWidth', 'square'].includes(prop),
})`
  min-width: 20px;
  height: 18px;
  padding: 0 4px;
  font-weight: bold;
`;

const ContentArea = styled(WindowContent)`
  flex: 1;
  overflow: auto;
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const MediaContainer = styled(Frame)`
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
  min-height: 300px;
`;

const StyledImage = styled(Image)`
  max-width: 100%;
  max-height: 70vh;
  width: auto;
  height: auto;
  object-fit: contain;
`;

const NavigationBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
`;

const NavButton = styled(Button).withConfig({
  shouldForwardProp: (prop) =>
    !['active', 'primary', 'fullWidth', 'square'].includes(prop),
})`
  min-width: 80px;
`;

const StatusBar = styled.div`
  display: flex;
  gap: 4px;
`;

const StatusItem = styled.div`
  padding: 2px 8px;
  font-size: 11px;
`;

// Loading animation
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoadingOverlay = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #000;
  z-index: 10;
`;

const HourglassIcon = styled.div`
  font-size: 32px;
  animation: ${spin} 1.5s linear infinite;
`;

const LoadingText = styled.div`
  margin-top: 12px;
  color: #fff;
  font-size: 12px;
`;

interface Win95GalleryModalProps {
  item: GalleryItem;
  currentIndex: number;
  totalCount: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
}

export function Win95GalleryModal({
  item,
  currentIndex,
  totalCount,
  onClose,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
}: Win95GalleryModalProps) {
  const [isLoading, setIsLoading] = useState(true);
  const fullUrl = getGalleryFullUrl(item);

  // Reset loading state when item changes
  useEffect(() => {
    setIsLoading(true);
  }, [item.id]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    switch (e.key) {
      case 'Escape':
        onClose();
        break;
      case 'ArrowLeft':
        if (hasPrev) onPrev();
        break;
      case 'ArrowRight':
        if (hasNext) onNext();
        break;
    }
  }, [onClose, onPrev, onNext, hasPrev, hasNext]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [handleKeyDown]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleImageLoad = useCallback(() => {
    setIsLoading(false);
  }, []);

  const handleVideoReady = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <Overlay onClick={handleOverlayClick}>
      <ModalWindow>
        <StyledWindowHeader>
          <TitleText>{item.slug}</TitleText>
          <CloseButton size="sm" onClick={onClose}>
            X
          </CloseButton>
        </StyledWindowHeader>

        <ContentArea>
          <MediaContainer variant="well">
            {isLoading && (
              <LoadingOverlay>
                <HourglassIcon>⏳</HourglassIcon>
                <LoadingText>Loading...</LoadingText>
              </LoadingOverlay>
            )}

            {item.type === 'video' ? (
              <Win95MediaPlayer
                src={fullUrl}
                autoPlay
                onReady={handleVideoReady}
              />
            ) : (
              <StyledImage
                src={fullUrl}
                alt={item.slug}
                width={item.width}
                height={item.height}
                unoptimized={item.type === 'gif'}
                priority
                onLoad={handleImageLoad}
                style={{ opacity: isLoading ? 0 : 1, transition: 'opacity 0.2s' }}
              />
            )}
          </MediaContainer>

          <NavigationBar>
            <NavButton onClick={onPrev} disabled={!hasPrev}>
              ← Previous
            </NavButton>
            <span style={{ fontSize: 12 }}>
              {currentIndex + 1} of {totalCount}
            </span>
            <NavButton onClick={onNext} disabled={!hasNext}>
              Next →
            </NavButton>
          </NavigationBar>

          <StatusBar>
            <Frame variant="status" style={{ flex: 1 }}>
              <StatusItem>
                {item.type.toUpperCase()} | {item.width}×{item.height} | {formatFileSize(item.size)}
              </StatusItem>
            </Frame>
            <Frame variant="status">
              <StatusItem>
                {item.ext}
              </StatusItem>
            </Frame>
          </StatusBar>
        </ContentArea>
      </ModalWindow>
    </Overlay>
  );
}
