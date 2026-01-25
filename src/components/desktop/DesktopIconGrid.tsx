'use client';

import { useIconPositions } from '@/context/IconPositionContext';
import { useViewport } from '@/hooks/useViewport';
import { useEffect } from 'react';
import { DesktopIcon, IconConfig } from './DesktopIcon';

interface DesktopIconGridProps {
  icons: IconConfig[];
}

const ICON_HEIGHT = 70;
const VERTICAL_GAP = 16;
const LEFT_MARGIN = 10;
const TOP_MARGIN = 10;

// Calculate icon positions for left-side vertical layout (like Windows 95)
function calculateIconPositions(
  icons: IconConfig[],
  viewportHeight: number
): Record<string, { x: number; y: number }> {
  const positions: Record<string, { x: number; y: number }> = {};
  const taskbarHeight = 36;
  const availableHeight = viewportHeight - taskbarHeight - TOP_MARGIN * 2;
  const iconsPerColumn = Math.floor(availableHeight / (ICON_HEIGHT + VERTICAL_GAP));

  icons.forEach((icon, index) => {
    const column = Math.floor(index / iconsPerColumn);
    const row = index % iconsPerColumn;

    positions[icon.id] = {
      x: LEFT_MARGIN + column * 85,
      y: TOP_MARGIN + row * (ICON_HEIGHT + VERTICAL_GAP),
    };
  });

  return positions;
}

export function DesktopIconGrid({ icons }: DesktopIconGridProps) {
  const { height } = useViewport();
  const { positions, initializePositions } = useIconPositions();

  // Initialize positions on mount
  useEffect(() => {
    if (height > 0) {
      const initialPositions = calculateIconPositions(icons, height);
      initializePositions(initialPositions);
    }
  }, [height, icons, initializePositions]);

  const initialPositions = calculateIconPositions(icons, height);

  return (
    <>
      {icons.map((icon) => (
        <DesktopIcon
          key={icon.id}
          config={icon}
          initialPosition={positions[icon.id] || initialPositions[icon.id] || { x: 0, y: 0 }}
        />
      ))}
    </>
  );
}
