'use client';

import styled from 'styled-components';
import { DesktopIcon, IconConfig } from './DesktopIcon';

interface DesktopIconGridProps {
  topIcons: IconConfig[];
  bottomIcons: IconConfig[];
}

const TopGrid = styled.div`
  position: absolute;
  top: 24px;
  right: 16px;
  display: flex;
  flex-direction: row;
  gap: 8px;
  z-index: 5000;
`;

const BottomGrid = styled.div`
  position: absolute;
  bottom: 52px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: row;
  gap: 16px;
  z-index: 5000;
`;

export function DesktopIconGrid({ topIcons, bottomIcons }: DesktopIconGridProps) {
  return (
    <>
      <TopGrid>
        {topIcons.map((icon) => (
          <DesktopIcon key={icon.id} config={icon} />
        ))}
      </TopGrid>
      <BottomGrid>
        {bottomIcons.map((icon) => (
          <DesktopIcon key={icon.id} config={icon} />
        ))}
      </BottomGrid>
    </>
  );
}
