'use client';

import { useEffect, useRef } from 'react';

// Audio tracks - these could be loaded from an API or config
const AUDIO_TRACKS = [
  {
    metaData: { artist: "Zeven", title: "Dickbutt Anthem (EDM Remix)" },
    url: "https://dickbutt.b-cdn.net/audio/91538b54-dickbutt-anthem-zeven-s-edm-remix.mp3",
  },
  {
    metaData: { artist: "DJ Butt", title: "Fresh Prince of Dickbutt" },
    url: "https://dickbutt.b-cdn.net/audio/bcb4ec9a-dj-butt-fresh-prince-of-dickbutt-bel-air.mp3",
  },
  {
    metaData: { artist: "Unknown", title: "Dickbutt Anthem" },
    url: "https://dickbutt.b-cdn.net/audio/1d738abf-dickbuttanthem.mp3",
  },
  {
    metaData: { artist: "Herr Fuchs", title: "Dick Butt Dance" },
    url: "https://dickbutt.b-cdn.net/audio/eeacb29b-dick-butt-dance-herr-fuchs.mp3",
  },
];

interface WebampPlayerProps {
  initialPosition?: { x: number; y: number };
}

export function WebampPlayer({ initialPosition = { x: 20, y: 20 } }: WebampPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const webampRef = useRef<unknown>(null);

  useEffect(() => {
    // Only run on client
    if (typeof window === 'undefined') return;

    const initWebamp = async () => {
      try {
        // Dynamic import since webamp requires window
        const WebampModule = await import('webamp');
        const Webamp = WebampModule.default;

        // Check if Webamp is supported
        if (!Webamp.browserIsSupported()) {
          console.warn('Webamp is not supported in this browser');
          return;
        }

        const webamp = new Webamp({
          initialTracks: AUDIO_TRACKS,
        });

        webampRef.current = webamp;

        // Render into our container
        if (containerRef.current) {
          await webamp.renderWhenReady(containerRef.current);

          // Position the player
          const webampElement = containerRef.current.querySelector('#webamp') as HTMLElement;
          if (webampElement) {
            webampElement.style.position = 'absolute';
            webampElement.style.left = `${initialPosition.x}px`;
            webampElement.style.top = `${initialPosition.y}px`;
          }
        }
      } catch (error) {
        console.error('Failed to initialize Webamp:', error);
      }
    };

    initWebamp();

    return () => {
      if (webampRef.current && typeof (webampRef.current as { dispose?: () => void }).dispose === 'function') {
        (webampRef.current as { dispose: () => void }).dispose();
      }
    };
  }, [initialPosition]);

  return (
    <div
      ref={containerRef}
      className="webamp-container"
      style={{ position: 'absolute', zIndex: 100 }}
    />
  );
}
