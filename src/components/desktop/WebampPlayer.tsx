'use client';

import { useEffect, useRef, useState } from 'react';
import type Webamp from 'webamp';

// R2 base URL for audio assets
const R2_AUDIO_URL = process.env.NEXT_PUBLIC_R2_PUBLIC_URL || 'https://pub-c5bbdf1eaf68478a9783e46a36a3c3b5.r2.dev';

// Audio tracks served from Cloudflare R2
const AUDIO_TRACKS = [
  {
    metaData: { artist: "Zeven", title: "Dickbutt Anthem (EDM Remix)" },
    url: `${R2_AUDIO_URL}/v1/audio/91538b54-dickbutt-anthem-zeven-s-edm-remix.mp3`,
  },
  {
    metaData: { artist: "DJ Butt", title: "Fresh Prince of Dickbutt" },
    url: `${R2_AUDIO_URL}/v1/audio/bcb4ec9a-dj-butt-fresh-prince-of-dickbutt-bel-air.mp3`,
  },
  {
    metaData: { artist: "Unknown", title: "Dickbutt Anthem" },
    url: `${R2_AUDIO_URL}/v1/audio/1d738abf-dickbuttanthem.mp3`,
  },
  {
    metaData: { artist: "Herr Fuchs", title: "Dick Butt Dance" },
    url: `${R2_AUDIO_URL}/v1/audio/eeacb29b-dick-butt-dance-herr-fuchs.mp3`,
  },
  {
    metaData: { artist: "JJokerDude", title: "Dickbutt Means Serious Business" },
    url: `${R2_AUDIO_URL}/v1/audio/6f301e23-dickbutt-means-serious-business-jjokerdude.mp3`,
  },
  {
    metaData: { artist: "Unknown", title: "Dickbutt - The Unofficial" },
    url: `${R2_AUDIO_URL}/v1/audio/1ad5b9a0-dickbutt-the-unofficial.mp3`,
  },
];

interface WebampPlayerProps {
  x: number;
  y: number;
  visible?: boolean;
  shouldPlay?: boolean;
}

export function WebampPlayer({ x, y, visible = true, shouldPlay = false }: WebampPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const webampRef = useRef<Webamp | null>(null);
  const initializedRef = useRef(false);
  const [isReady, setIsReady] = useState(false);
  const hasPlayedRef = useRef(false);

  useEffect(() => {
    // Prevent double initialization (React Strict Mode)
    if (initializedRef.current) return;
    if (typeof window === 'undefined') return;

    const initWebamp = async () => {
      try {
        const WebampModule = await import('webamp');
        const WebampClass = WebampModule.default;

        if (!WebampClass.browserIsSupported()) {
          console.warn('Webamp is not supported in this browser');
          return;
        }

        // Mark as initialized before async work
        initializedRef.current = true;

        const webamp = new WebampClass({
          initialTracks: AUDIO_TRACKS,
        });

        webampRef.current = webamp;

        if (containerRef.current) {
          await webamp.renderWhenReady(containerRef.current);
          setIsReady(true);
          // Don't auto-play on init - wait for shouldPlay prop
        }
      } catch (error) {
        console.error('Failed to initialize Webamp:', error);
        initializedRef.current = false;
      }
    };

    initWebamp();

    return () => {
      if (webampRef.current) {
        webampRef.current.dispose();
        webampRef.current = null;
      }
    };
  }, []);

  // Handle play trigger
  useEffect(() => {
    if (shouldPlay && isReady && webampRef.current && !hasPlayedRef.current) {
      hasPlayedRef.current = true;
      webampRef.current.play();
    }
  }, [shouldPlay, isReady]);

  // Reposition Webamp windows after render and when position changes
  useEffect(() => {
    if (!isReady || !containerRef.current) return;

    const webampEl = containerRef.current.querySelector('#webamp') as HTMLElement;
    if (webampEl) {
      // Get all window elements
      const windows = webampEl.querySelectorAll('[class*="window"]');

      // Reset any existing transforms/positions on the main webamp container
      webampEl.style.position = 'absolute';
      webampEl.style.left = '0';
      webampEl.style.top = '0';
      webampEl.style.transform = 'none';
    }
  }, [isReady, x, y]);

  return (
    <div
      ref={containerRef}
      className="webamp-container"
      style={{
        position: 'absolute',
        left: x + 135,
        top: y + 180,
        zIndex: 100,
        visibility: visible ? 'visible' : 'hidden',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.3s ease-in-out',
      }}
    />
  );
}
