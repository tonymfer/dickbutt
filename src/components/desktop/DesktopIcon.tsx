'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useDesktop } from '@/context/DesktopContext';
import styled from 'styled-components';

export interface IconConfig {
  id: string;
  label: string;
  icon: string;
  // Some source icons (e.g. GIFs) have extra padding; allow per-icon visual scaling.
  iconScale?: number;
  action: 'route' | 'link' | 'window';
  target: string;
  windowTitle?: string;
  hideLabel?: boolean;
}

interface DesktopIconProps {
  config: IconConfig;
}

const IconButton = styled.button<{ $selected: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 4px;
  width: 80px;
  text-align: center;
  cursor: pointer;
  background: ${({ $selected }) => ($selected ? 'rgba(0, 0, 128, 0.5)' : 'transparent')};
  border: none;
  outline: none;

  &:focus {
    background: rgba(0, 0, 128, 0.5);
  }
`;

const IconImage = styled.div`
  width: 48px;
  height: 48px;
  position: relative;
`;

const IconLabel = styled.span<{ $selected: boolean }>`
  font-size: 12px;
  color: white;
  text-shadow: 1px 1px 0px rgba(0, 0, 0, 1);
  background: ${({ $selected }) => ($selected ? '#000080' : 'transparent')};
  padding: 1px 2px;
`;

export function DesktopIcon({ config }: DesktopIconProps) {
  const [isSelected, setIsSelected] = useState(false);
  const router = useRouter();
  const { openWindow } = useDesktop();

  const handleClick = () => {
    setIsSelected(true);
  };

  const handleBlur = () => {
    setIsSelected(false);
  };

  const handleDoubleClick = () => {
    switch (config.action) {
      case 'route':
        router.push(config.target);
        break;
      case 'link':
        window.open(config.target, '_blank');
        break;
      case 'window':
        if (config.windowTitle) {
          openWindow(config.id, config.windowTitle, config.id, { contentType: 'component' });
        }
        break;
    }
  };

  return (
    <IconButton
      $selected={isSelected}
      onClick={handleClick}
      onBlur={handleBlur}
      onDoubleClick={handleDoubleClick}
    >
      <IconImage>
        <Image
          src={config.icon}
          alt={config.label}
          fill
          sizes="48px"
          style={{
            objectFit: 'contain',
            imageRendering: 'pixelated',
            transform: `scale(${config.iconScale ?? 1})`,
            transformOrigin: 'center',
          }}
          draggable={false}
        />
      </IconImage>
      {!config.hideLabel && (
        <IconLabel $selected={isSelected}>
          {config.label}
        </IconLabel>
      )}
    </IconButton>
  );
}
