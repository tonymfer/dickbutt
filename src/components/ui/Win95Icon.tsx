'use client';

import { useState } from 'react';
import styled from 'styled-components';
/* eslint-disable @next/next/no-img-element */

// Icon mapping from icon names to file paths (.ico files)
const ICON_PATHS: Record<string, string> = {
  folder: '/assets/icons/win95/folder.ico',
  settings: '/assets/icons/win95/settings.ico',
  warning: '/assets/icons/win95/warning.ico',
  error: '/assets/icons/win95/error.ico',
  info: '/assets/icons/win95/info.ico',
  help: '/assets/icons/win95/help.ico',
  question: '/assets/icons/win95/question.ico',
  document: '/assets/icons/win95/document.ico',
  computer: '/assets/icons/win95/computer.ico',
  network: '/assets/icons/win95/network.ico',
  media: '/assets/icons/win95/media.ico',
  camera: '/assets/icons/win95/camera.ico',
  paint: '/assets/icons/win95/paint.ico',
  tv: '/assets/icons/win95/tv.ico',
  money: '/assets/icons/win95/money.ico',
  globe: '/assets/icons/win95/globe.ico',
  cart: '/assets/icons/win95/cart.ico',
  book: '/assets/icons/win95/book.ico',
  scroll: '/assets/icons/win95/scroll.ico',
  map: '/assets/icons/win95/map.ico',
};

// Fallback emoji icons when image files are not available
const EMOJI_FALLBACKS: Record<string, string> = {
  folder: '\uD83D\uDCC1',
  settings: '\u2699\uFE0F',
  warning: '\u26A0\uFE0F',
  error: '\u274C',
  info: '\u2139\uFE0F',
  help: '\u2753',
  question: '\u2754',
  document: '\uD83D\uDCC4',
  computer: '\uD83D\uDCBB',
  network: '\uD83C\uDF10',
  media: '\uD83C\uDFB5',
  camera: '\uD83D\uDCF7',
  paint: '\uD83C\uDFA8',
  tv: '\uD83D\uDCFA',
  money: '\uD83D\uDCB0',
  globe: '\uD83C\uDF0D',
  cart: '\uD83D\uDED2',
  book: '\uD83D\uDCDA',
  scroll: '\uD83D\uDCDC',
  map: '\uD83D\uDDFA\uFE0F',
};

interface Win95IconProps {
  name: keyof typeof ICON_PATHS;
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

const IconContainer = styled.span<{ $size: number }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${props => props.$size}px;
  height: ${props => props.$size}px;
  font-size: ${props => Math.round(props.$size * 0.8)}px;
  line-height: 1;
`;

const IconImage = styled.img`
  object-fit: contain;
  image-rendering: pixelated;
`;

export function Win95Icon({ name, size = 16, className, style }: Win95IconProps) {
  const [useEmoji, setUseEmoji] = useState(false);

  const iconPath = ICON_PATHS[name];
  const emojiIcon = EMOJI_FALLBACKS[name] || '\u2753';

  if (useEmoji || !iconPath) {
    return (
      <IconContainer $size={size} className={className} style={style}>
        {emojiIcon}
      </IconContainer>
    );
  }

  return (
    <IconContainer $size={size} className={className} style={style}>
      <IconImage
        src={iconPath}
        alt={name}
        width={size}
        height={size}
        onError={() => setUseEmoji(true)}
      />
    </IconContainer>
  );
}

// Export a simple function to get an emoji icon directly
export function getWin95Emoji(name: keyof typeof EMOJI_FALLBACKS): string {
  return EMOJI_FALLBACKS[name] || '\u2753';
}

// Export icon names for type safety
export type Win95IconName = keyof typeof ICON_PATHS;
