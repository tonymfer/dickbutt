'use client';

import styled from 'styled-components';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useWizard } from '@/context/WizardContext';
import { useSoundOptional } from '@/context/SoundContext';
import { motion } from 'framer-motion';
import { IconConfig } from '@/components/desktop/DesktopIcon';

interface MobileIconGridProps {
  icons: IconConfig[];
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  padding: 24px 16px;
  justify-items: center;
`;

const IconContainer = styled(motion.button)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 12px;
  width: 88px;
  background: transparent;
  border: none;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  border-radius: 4px;
  transition: box-shadow 0.15s ease;

  &:active {
    background: rgba(0, 0, 128, 0.3);
    box-shadow: 0 0 8px rgba(0, 0, 128, 0.6);
  }
`;

const IconImage = styled.div`
  width: 56px;
  height: 56px;
  position: relative;
`;

const IconLabel = styled.span`
  font-size: 12px;
  color: white;
  text-shadow: 1px 1px 0px rgba(0, 0, 0, 1);
  text-align: center;
  word-break: break-word;
  line-height: 1.2;
`;

// Wiggle animation for tap feedback
const wiggleVariants = {
  tap: {
    rotate: [-3, 3, -3, 0],
    transition: { duration: 0.3 },
  },
};

export function MobileIconGrid({ icons }: MobileIconGridProps) {
  const router = useRouter();
  const { showWizard } = useWizard();
  const sound = useSoundOptional();

  const handleIconTap = (config: IconConfig) => {
    // Haptic feedback
    if (navigator.vibrate) {
      navigator.vibrate(10);
    }

    // Sound feedback
    sound?.playClick();

    switch (config.action) {
      case 'route':
        router.push(config.target);
        break;
      case 'link':
        window.open(config.target, '_blank', 'noopener,noreferrer');
        break;
      case 'window':
        // On mobile, use route fallback
        if (config.routeFallback) {
          router.push(config.routeFallback);
        }
        break;
      case 'wizard':
        showWizard();
        break;
    }
  };

  return (
    <Grid>
      {icons.map((icon, index) => (
        <IconContainer
          key={icon.id}
          onClick={() => handleIconTap(icon)}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          whileTap={{ scale: 0.92 }}
          variants={wiggleVariants}
          transition={{
            delay: index * 0.08,
            type: 'spring',
            stiffness: 300,
            damping: 20,
          }}
        >
          <IconImage>
            <Image
              src={icon.icon}
              alt={icon.label}
              fill
              sizes="56px"
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
        </IconContainer>
      ))}
    </Grid>
  );
}
