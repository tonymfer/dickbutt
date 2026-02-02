'use client';

import { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { getBackgroundStyle, useDesktopSettings } from '@/context/DesktopSettingsContext';
import { useWizard } from '@/context/WizardContext';
import { useKonamiCode } from '@/hooks/useKonamiCode';
import { MOBILE_ICONS } from '@/lib/constants/icons';
import { MobileIconGrid } from './MobileIconGrid';
import { MobileTaskbar } from './MobileTaskbar';
import { EasterEggOverlay } from './EasterEggOverlay';

const DesktopContainer = styled(motion.div)<{ $background: string }>`
  position: fixed;
  inset: 0;
  overflow: hidden;
  padding-bottom: 36px; /* Taskbar height - increased for larger touch targets */
  background: ${props => props.$background};
  display: flex;
  flex-direction: column;
`;

const IconArea = styled.div`
  flex: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
`;

const AssistantContainer = styled(motion.div)`
  position: fixed;
  bottom: 44px;
  right: 12px;
  z-index: 9000;
  cursor: pointer;

  &:active {
    transform: scale(0.95);
  }
`;

const SpeechBubble = styled.div`
  background: #ffffcc;
  border: 2px solid #000;
  border-radius: 8px;
  padding: 6px 10px;
  font-size: 10px;
  max-width: 140px;
  position: relative;
  box-shadow: 2px 2px 0 rgba(0,0,0,0.2);
  margin-bottom: 4px;

  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    right: 16px;
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 8px solid #ffffcc;
  }

  &::before {
    content: '';
    position: absolute;
    bottom: -11px;
    right: 14px;
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-top: 10px solid #000;
  }
`;

const AssistantImage = styled(motion.div)`
  width: 48px;
  height: 48px;
  filter: drop-shadow(2px 2px 2px rgba(0,0,0,0.3));
`;

export function MobileWin95Desktop() {
  const { settings } = useDesktopSettings();
  const { showWizard } = useWizard();
  const backgroundStyle = getBackgroundStyle(settings);
  const [showEasterEgg, setShowEasterEgg] = useState(false);

  // Konami code easter egg
  useKonamiCode(() => setShowEasterEgg(true));

  return (
    <>
      {showEasterEgg && <EasterEggOverlay onClose={() => setShowEasterEgg(false)} />}
      <DesktopContainer
      $background={backgroundStyle}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <IconArea>
        <MobileIconGrid icons={MOBILE_ICONS} />
      </IconArea>

      <AssistantContainer
        onClick={showWizard}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, type: 'spring', stiffness: 300, damping: 20 }}
      >
        <SpeechBubble>
          Tap me to run Setup Wizard!
        </SpeechBubble>
        <AssistantImage
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Image
            src="/assets/branding/dickbuttpfp.jpg"
            alt="Dickbutt Assistant"
            width={48}
            height={48}
            style={{ borderRadius: '50%', border: '2px solid #000080' }}
            draggable={false}
          />
        </AssistantImage>
      </AssistantContainer>

      <MobileTaskbar />
    </DesktopContainer>
    </>
  );
}
