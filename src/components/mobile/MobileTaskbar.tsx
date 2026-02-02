'use client';

import { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useClock } from '@/hooks/useClock';
import { useSoundOptional } from '@/context/SoundContext';
import { MobileStartMenu } from './MobileStartMenu';
import { Win98AppBar, Win98Toolbar, Win98Frame } from '@/components/ui/win98';

const StyledAppBar = styled(motion(Win98AppBar))`
  height: 36px;
  z-index: 9997;
`;

const StyledToolbar = styled(Win98Toolbar)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2px 4px;
  min-height: 32px;
  height: 32px;
`;

const StartButton = styled.button<{ $active: boolean }>`
  font-weight: bold;
  font-size: 12px;
  font-family: 'Segoe UI', Tahoma, sans-serif;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 12px;
  height: 30px;
  cursor: pointer;
  border: 2px solid;
  ${({ $active }) => $active
    ? `
      background-color: transparent;
      border-color: rgb(128, 128, 128) rgb(223, 223, 223) rgb(223, 223, 223) rgb(128, 128, 128);
      background-image: url("data:image/svg+xml,%3Csvg width='2' height='2' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='0' y='0' width='1' height='1' fill='%23ffffff'/%3E%3Crect x='1' y='1' width='1' height='1' fill='%23ffffff'/%3E%3C/svg%3E");
      background-size: 2px 2px;
    `
    : `
      background-color: #c0c0c0;
      border-color: rgb(223, 223, 223) rgb(128, 128, 128) rgb(128, 128, 128) rgb(223, 223, 223);
    `
  }

  &:active {
    border-color: rgb(128, 128, 128) rgb(223, 223, 223) rgb(223, 223, 223) rgb(128, 128, 128);
  }
`;

const StartIcon = styled.img`
  width: 16px;
  height: 16px;
  image-rendering: pixelated;
`;

const SystemTray = styled(Win98Frame)`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 2px 8px;
  height: 30px;
`;

const SoundToggle = styled.button<{ $muted: boolean }>`
  width: 20px;
  height: 20px;
  padding: 0;
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${props => props.$muted ? 0.5 : 1};
  -webkit-tap-highlight-color: transparent;

  &:active {
    transform: scale(0.9);
  }
`;

const SoundIcon = styled.img`
  width: 16px;
  height: 16px;
  image-rendering: pixelated;
`;

const Clock = styled.span`
  font-size: 12px;
`;

export function MobileTaskbar() {
  const [showStartMenu, setShowStartMenu] = useState(false);
  const time = useClock();
  const sound = useSoundOptional();

  const handleSoundToggle = () => {
    if (sound) {
      sound.toggleEnabled();
      // Play click sound if turning on (feedback that sound is working)
      if (!sound.enabled) {
        setTimeout(() => sound.playClick(), 50);
      }
    }
  };

  return (
    <>
      <MobileStartMenu
        isOpen={showStartMenu}
        onClose={() => setShowStartMenu(false)}
      />
      <StyledAppBar
        initial={{ y: 36 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.5, type: 'spring', stiffness: 300, damping: 25 }}
      >
        <StyledToolbar>
          <StartButton
            $active={showStartMenu}
            onClick={() => setShowStartMenu(!showStartMenu)}
          >
            <StartIcon src="/assets/icons/win95/windows-logo.ico" alt="" />
            Start
          </StartButton>

          <SystemTray $variant="well">
            {sound && (
              <SoundToggle
                onClick={handleSoundToggle}
                $muted={!sound.enabled}
                title={sound.enabled ? 'Sound On - Tap to mute' : 'Sound Off - Tap to unmute'}
              >
                <SoundIcon
                  src="/assets/icons/win95/speaker.ico"
                  alt={sound.enabled ? 'Sound on' : 'Sound off'}
                />
              </SoundToggle>
            )}
            <Clock>{time}</Clock>
          </SystemTray>
        </StyledToolbar>
      </StyledAppBar>
    </>
  );
}
