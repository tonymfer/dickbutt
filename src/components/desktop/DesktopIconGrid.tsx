'use client';

import { useIconPositions } from '@/context/IconPositionContext';
import { useViewport } from '@/hooks/useViewport';
import { getIconGridPositions } from '@/lib/windowLayout';
import { useEffect } from 'react';
import { DesktopIcon, IconConfig } from './DesktopIcon';

interface DesktopIconGridProps {
  topIcons: IconConfig[];
  bottomIcons: IconConfig[];
}

const ICON_WIDTH = 80;
const HORIZONTAL_GAP = 16;

// Calculate initial icon positions using windowLayout helper
function calculateIconPositions(
  topIcons: IconConfig[],
  bottomIcons: IconConfig[],
  viewportWidth: number,
  viewportHeight: number
): Record<string, { x: number; y: number }> {
  const positions: Record<string, { x: number; y: number }> = {};

  const gridPos = getIconGridPositions(viewportWidth, viewportHeight, topIcons.length, bottomIcons.length);

  // Top row icons
  topIcons.forEach((icon, index) => {
    positions[icon.id] = {
      x: gridPos.topRow.x + index * (ICON_WIDTH + HORIZONTAL_GAP),
      y: gridPos.topRow.y,
    };
  });

  // Bottom row icons
  bottomIcons.forEach((icon, index) => {
    positions[icon.id] = {
      x: gridPos.bottomRow.x + index * (ICON_WIDTH + HORIZONTAL_GAP),
      y: gridPos.bottomRow.y,
    };
  });

  return positions;
}

export function DesktopIconGrid({ topIcons, bottomIcons }: DesktopIconGridProps) {
  const { width, height } = useViewport();
  const { positions, initializePositions } = useIconPositions();

  // Initialize positions on mount
  useEffect(() => {
    if (width > 0 && height > 0) {
      const initialPositions = calculateIconPositions(topIcons, bottomIcons, width, height);
      initializePositions(initialPositions);
    }
  }, [width, height, topIcons, bottomIcons, initializePositions]);

  const allIcons = [...topIcons, ...bottomIcons];
  const initialPositions = calculateIconPositions(topIcons, bottomIcons, width, height);

  return (
    <>
      {allIcons.map((icon) => (
        <DesktopIcon
          key={icon.id}
          config={icon}
          initialPosition={positions[icon.id] || initialPositions[icon.id] || { x: 0, y: 0 }}
        />
      ))}
    </>
  );
}
