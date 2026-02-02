'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

const KONAMI_SEQUENCE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'KeyB',
  'KeyA',
];

// Map touch swipe directions to arrow key codes
type SwipeDirection = 'up' | 'down' | 'left' | 'right';
const SWIPE_TO_KEY: Record<SwipeDirection, string> = {
  up: 'ArrowUp',
  down: 'ArrowDown',
  left: 'ArrowLeft',
  right: 'ArrowRight',
};

interface TouchStart {
  x: number;
  y: number;
  time: number;
}

export function useKonamiCode(onActivate: () => void) {
  const [index, setIndex] = useState(0);
  const touchStartRef = useRef<TouchStart | null>(null);
  const resetTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Reset sequence after inactivity
  const resetAfterDelay = useCallback(() => {
    if (resetTimeoutRef.current) {
      clearTimeout(resetTimeoutRef.current);
    }
    resetTimeoutRef.current = setTimeout(() => {
      setIndex(0);
    }, 3000); // Reset after 3 seconds of inactivity
  }, []);

  const handleInput = useCallback((inputKey: string) => {
    const expectedKey = KONAMI_SEQUENCE[index];

    if (inputKey === expectedKey) {
      const newIndex = index + 1;
      if (newIndex >= KONAMI_SEQUENCE.length) {
        // Complete!
        setIndex(0);
        onActivate();
      } else {
        setIndex(newIndex);
        resetAfterDelay();
      }
    } else {
      // Wrong key - check if it could be start of sequence
      if (inputKey === KONAMI_SEQUENCE[0]) {
        setIndex(1);
        resetAfterDelay();
      } else {
        setIndex(0);
      }
    }
  }, [index, onActivate, resetAfterDelay]);

  // Keyboard handler
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      handleInput(e.code);
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [handleInput]);

  // Touch handlers for swipe gestures
  useEffect(() => {
    const MIN_SWIPE_DISTANCE = 30;
    const MAX_SWIPE_TIME = 300;

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      touchStartRef.current = {
        x: touch.clientX,
        y: touch.clientY,
        time: Date.now(),
      };
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!touchStartRef.current) return;

      const touch = e.changedTouches[0];
      const deltaX = touch.clientX - touchStartRef.current.x;
      const deltaY = touch.clientY - touchStartRef.current.y;
      const deltaTime = Date.now() - touchStartRef.current.time;

      touchStartRef.current = null;

      // Too slow for a swipe
      if (deltaTime > MAX_SWIPE_TIME) return;

      const absX = Math.abs(deltaX);
      const absY = Math.abs(deltaY);

      // Need minimum distance
      if (absX < MIN_SWIPE_DISTANCE && absY < MIN_SWIPE_DISTANCE) {
        // Tap on right side = B, tap on left side = A
        // (This provides a way to input B and A on touch)
        const screenWidth = window.innerWidth;
        const tapX = touch.clientX;

        if (absX < 10 && absY < 10) {
          // This was a tap, not a swipe
          if (tapX > screenWidth * 0.75) {
            handleInput('KeyB');
          } else if (tapX < screenWidth * 0.25) {
            handleInput('KeyA');
          }
        }
        return;
      }

      // Determine swipe direction
      let direction: SwipeDirection;
      if (absX > absY) {
        direction = deltaX > 0 ? 'right' : 'left';
      } else {
        direction = deltaY > 0 ? 'down' : 'up';
      }

      handleInput(SWIPE_TO_KEY[direction]);
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleInput]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (resetTimeoutRef.current) {
        clearTimeout(resetTimeoutRef.current);
      }
    };
  }, []);

  return {
    progress: index,
    total: KONAMI_SEQUENCE.length,
  };
}
