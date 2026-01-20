'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styled from 'styled-components';
import { IconConfig } from '@/components/desktop/DesktopIcon';

interface MobileIconRowProps {
  icons: IconConfig[];
}

const Row = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 8px;
  padding: 8px 4px;
`;

const IconButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 8px;
  min-width: 72px;
  background: transparent;
  border: none;
  cursor: pointer;
  border-radius: 4px;

  /* Touch-friendly sizing */
  touch-action: manipulation;

  &:active {
    background: rgba(0, 0, 128, 0.3);
  }
`;

const IconImage = styled.div`
  width: 48px;
  height: 48px;
  position: relative;
`;

const IconLabel = styled.span`
  font-size: 11px;
  color: white;
  text-shadow: 1px 1px 0px rgba(0, 0, 0, 1);
  text-align: center;
  line-height: 1.2;
  max-width: 70px;
  word-wrap: break-word;
`;

export function MobileIconRow({ icons }: MobileIconRowProps) {
  const router = useRouter();

  const handleTap = (config: IconConfig) => {
    switch (config.action) {
      case 'route':
        router.push(config.target);
        break;
      case 'link':
        window.open(config.target, '_blank', 'noopener,noreferrer');
        break;
      case 'window':
        // For mobile, windows open as routes or do nothing
        break;
    }
  };

  return (
    <Row>
      {icons.map((icon) => (
        <IconButton key={icon.id} onClick={() => handleTap(icon)}>
          <IconImage>
            <Image
              src={icon.icon}
              alt={icon.label}
              fill
              sizes="48px"
              style={{
                objectFit: 'contain',
                imageRendering: 'pixelated',
                transform: `scale(${icon.iconScale ?? 1})`,
                transformOrigin: 'center',
              }}
              draggable={false}
            />
          </IconImage>
          {!icon.hideLabel && (
            <IconLabel>{icon.label}</IconLabel>
          )}
        </IconButton>
      ))}
    </Row>
  );
}
