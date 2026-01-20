'use client';

import { useState, useEffect, useRef } from 'react';
import { ProgressBar } from 'react95';
import styled from 'styled-components';

interface StartupScreenProps {
  onComplete: () => void;
  duration?: number;
}

const Container = styled.div`
  position: fixed;
  inset: 0;
  background: url('/assets/dickbutt-booting.png') center center / cover no-repeat;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 99999;
`;

const ProgressWrapper = styled.div`
  position: absolute;
  bottom: 15%;
  width: 280px;
`;

export function StartupScreen({ onComplete, duration = 2500 }: StartupScreenProps) {
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Preload the startup sound
    audioRef.current = new Audio('/assets/win95.mp3');
    audioRef.current.preload = 'auto';
  }, []);

  useEffect(() => {
    const interval = duration / 100;

    const progressTimer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          return 100;
        }
        return prev + 1;
      });
    }, interval);

    return () => clearInterval(progressTimer);
  }, [duration]);

  useEffect(() => {
    if (progress >= 100) {
      // Play startup sound and complete immediately (no fade)
      if (audioRef.current) {
        audioRef.current.play().catch(() => {});
      }
      const completeTimer = setTimeout(() => onComplete(), 200);

      return () => clearTimeout(completeTimer);
    }
  }, [progress, onComplete]);

  return (
    <Container>
      <ProgressWrapper>
        <ProgressBar value={progress} variant="tile" hideValue />
      </ProgressWrapper>
    </Container>
  );
}
