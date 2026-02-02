'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useDesktop } from '@/context/DesktopContext';
import { useIconPositions } from '@/context/IconPositionContext';
import { useWizard } from '@/context/WizardContext';
import { useViewport } from '@/hooks/useViewport';
import { calculateWindowRect } from '@/lib/windowLayout';
import { motion, useMotionValue } from 'framer-motion';
import styled from 'styled-components';

export interface IconConfig {
  id: string;
  label: string;
  icon: string;
  // Some source icons (e.g. GIFs) have extra padding; allow per-icon visual scaling.
  iconScale?: number;
  action: 'route' | 'link' | 'window' | 'wizard';
  target: string;
  windowTitle?: string;
  hideLabel?: boolean;
  // For 'window' action: fallback route on mobile devices
  routeFallback?: string;
}

interface DesktopIconProps {
  config: IconConfig;
  initialPosition: { x: number; y: number };
}

const IconContainer = styled(motion.div)<{ $selected: boolean }>`
  position: absolute;
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
  user-select: none;
  z-index: 1;

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

export function DesktopIcon({ config, initialPosition }: DesktopIconProps) {
  const [isSelected, setIsSelected] = useState(false);
  const router = useRouter();
  const { openWindow } = useDesktop();
  const { positions, updatePosition } = useIconPositions();
  const { showWizard } = useWizard();
  const { isDesktop, width: viewportWidth, height: viewportHeight } = useViewport();
  const isDraggingRef = useRef(false);

  // Use stored position or initial position
  const position = positions[config.id] || initialPosition;
  const x = useMotionValue(position.x);
  const y = useMotionValue(position.y);

  // Sync motion values when position changes (e.g., from viewport resize)
  useEffect(() => {
    x.set(position.x);
    y.set(position.y);
  }, [position.x, position.y, x, y]);

  const handleClick = () => {
    if (!isDraggingRef.current) {
      setIsSelected(true);
    }
  };

  const handleBlur = () => {
    setIsSelected(false);
  };

  const handleDoubleClick = () => {
    if (isDraggingRef.current) return;

    switch (config.action) {
      case 'route':
        router.push(config.target);
        break;
      case 'link':
        window.open(config.target, '_blank');
        break;
      case 'window':
        // On mobile, use route fallback if available
        if (!isDesktop && config.routeFallback) {
          router.push(config.routeFallback);
        } else if (config.windowTitle) {
          const rect = calculateWindowRect(viewportWidth, viewportHeight, config.id);
          openWindow(config.id, config.windowTitle, config.id, {
            contentType: 'component',
            defaultPosition: { x: rect.x, y: rect.y },
            defaultSize: { width: rect.width, height: rect.height },
          });
        }
        break;
      case 'wizard':
        showWizard();
        break;
    }
  };

  return (
    <IconContainer
      $selected={isSelected}
      style={{ x, y }}
      drag
      dragMomentum={false}
      dragElastic={0}
      onDragStart={() => {
        isDraggingRef.current = true;
      }}
      onDragEnd={() => {
        // Save position after drag
        updatePosition(config.id, { x: x.get(), y: y.get() });
        // Reset dragging flag after a short delay to prevent click
        setTimeout(() => {
          isDraggingRef.current = false;
        }, 100);
      }}
      onClick={handleClick}
      onBlur={handleBlur}
      onDoubleClick={handleDoubleClick}
      tabIndex={0}
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
    </IconContainer>
  );
}
