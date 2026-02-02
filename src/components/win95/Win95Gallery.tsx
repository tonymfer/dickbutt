'use client';

import { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import type { GalleryItem } from '@/lib/assets';
import { getGalleryThumbUrl, getGalleryFullUrl } from '@/lib/assets';
import { Win98Frame } from '@/components/ui/win98';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 8px;

  @media (min-width: 640px) {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(6, 1fr);
  }
`;

const ThumbnailButton = styled.button<{ $selected?: boolean }>`
  padding: 4px;
  border: none;
  background: ${props => props.$selected ? '#000080' : '#fff'};
  cursor: pointer;
  display: flex;
  flex-direction: column;
  text-align: left;
  transition: background-color 0.1s;

  &:hover {
    background: #000080;
  }

  &:hover span {
    color: #fff;
  }
`;

const ThumbnailFrame = styled(Win98Frame)`
  background: #fff;
  padding: 0;
  overflow: hidden;
`;

const ImageWrapper = styled.div`
  aspect-ratio: 1;
  position: relative;
  background: #c0c0c0;
`;

const PreviewVideo = styled.video`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ItemLabel = styled.span<{ $selected?: boolean }>`
  display: block;
  font-size: 11px;
  padding: 4px 2px 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${props => props.$selected ? '#fff' : '#000'};
`;

interface GalleryThumbnailProps {
  item: GalleryItem;
  isSelected: boolean;
  onSelect: () => void;
}

function GalleryThumbnail({ item, isSelected, onSelect }: GalleryThumbnailProps) {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const thumbUrl = getGalleryThumbUrl(item) || getGalleryFullUrl(item);
  const fullUrl = getGalleryFullUrl(item);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    if (item.type === 'video' && videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay may be blocked, that's ok
      });
    }
  }, [item.type]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    if (item.type === 'video' && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [item.type]);

  return (
    <ThumbnailButton
      $selected={isSelected}
      onClick={onSelect}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <ThumbnailFrame $variant="field">
        <ImageWrapper>
          {/* Static thumbnail - always rendered */}
          <Image
            src={thumbUrl}
            alt={item.slug}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
            style={{
              objectFit: 'cover',
              opacity: isHovered && (item.type === 'gif' || item.type === 'video') ? 0 : 1,
              transition: 'opacity 0.15s',
            }}
          />

          {/* Animated GIF on hover */}
          {item.type === 'gif' && isHovered && (
            <Image
              src={fullUrl}
              alt={item.slug}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
              style={{ objectFit: 'cover' }}
              unoptimized
            />
          )}

          {/* Video preview on hover */}
          {item.type === 'video' && (
            <PreviewVideo
              ref={videoRef}
              src={fullUrl}
              muted
              loop
              playsInline
              style={{
                opacity: isHovered ? 1 : 0,
                transition: 'opacity 0.15s',
              }}
            />
          )}
        </ImageWrapper>
      </ThumbnailFrame>
      <ItemLabel $selected={isSelected}>
        {item.slug}
      </ItemLabel>
    </ThumbnailButton>
  );
}

interface Win95GalleryProps {
  items: GalleryItem[];
  selectedId?: string;
  onSelect: (item: GalleryItem) => void;
}

export function Win95Gallery({ items, selectedId, onSelect }: Win95GalleryProps) {
  return (
    <Grid>
      {items.map((item) => (
        <GalleryThumbnail
          key={item.id}
          item={item}
          isSelected={selectedId === item.id}
          onSelect={() => onSelect(item)}
        />
      ))}
    </Grid>
  );
}
