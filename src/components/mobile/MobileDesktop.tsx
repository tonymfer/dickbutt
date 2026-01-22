'use client';

import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { BASESCAN_CONTRACT_URL } from '@/lib/links';
import { IconConfig } from '@/components/desktop/DesktopIcon';
import { MobileSection } from './MobileSection';
import { MobileIconRow } from './MobileIconRow';
import { MobileWhereToBuy } from './MobileWhereToBuy';
import { MobileResources } from './MobileResources';
import { MobileOrigin } from './MobileOrigin';
import { MobileProduct } from './MobileProduct';
import {
  DickbuttOnBaseWindow,
  DickbuttWindow,
  RoadmapWindow,
  DisclaimerWindow,
} from '@/components/desktop/windows';
import { getBackgroundStyle, useDesktopSettings } from '@/context/DesktopSettingsContext';

// Desktop icon definitions - folder row
const FOLDER_ICONS: IconConfig[] = [
  {
    id: 'contract',
    label: 'Contract',
    icon: '/assets/icons/win95/contract.ico',
    action: 'link',
    target: BASESCAN_CONTRACT_URL,
  },
  {
    id: 'meme',
    label: 'Meme Folder',
    icon: '/assets/icons/win95/folder-hires.ico',
    action: 'route',
    target: '/meme',
  },
  {
    id: 'branding',
    label: 'Branding',
    icon: '/assets/icons/win95/folder-hires.ico',
    action: 'route',
    target: '/branding',
  },
  {
    id: 'irl',
    label: 'Dickbutts IRL',
    icon: '/assets/icons/win95/folder-hires.ico',
    action: 'route',
    target: '/irl',
  },
];

// Desktop icon definitions - media row
const MEDIA_ICONS: IconConfig[] = [
  {
    id: 'tv',
    label: 'TV',
    icon: '/assets/icons/windowsplustv.gif',
    iconScale: 1.35,
    action: 'route',
    target: '/tv',
  },
  {
    id: 'videos',
    label: 'Videos',
    icon: '/assets/icons/win95/video.ico',
    iconScale: 0.85,
    action: 'route',
    target: '/videos',
  },
  {
    id: 'nfts',
    label: 'NFT Collection',
    icon: '/assets/icons/win95/nft.ico',
    iconScale: 0.85,
    action: 'route',
    target: '/dickbutt-nfts',
  },
];

const MobileContainer = styled.div<{ $background: string }>`
  position: fixed;
  inset: 0;
  overflow-y: auto;
  overflow-x: hidden;
  background: ${props => props.$background};
  -webkit-overflow-scrolling: touch;
  overflow-anchor: none;
`;

const ScrollContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 12px;
  padding-bottom: 24px;
  min-height: 100%;
`;

const WebampWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 80px 0 400px 0;
  margin-top: 24px;
`;

// Webamp component for mobile - positioned at bottom of scroll
function MobileWebamp() {
  const containerRef = useRef<HTMLDivElement>(null);
  const webampRef = useRef<import('webamp').default | null>(null);
  const initializedRef = useRef(false);
  const observerRef = useRef<MutationObserver | null>(null);
  const isSettingUpRef = useRef(false);

  // R2 base URL for audio assets
  const R2_AUDIO_URL = process.env.NEXT_PUBLIC_R2_PUBLIC_URL || 'https://pub-c5bbdf1eaf68478a9783e46a36a3c3b5.r2.dev';

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

  // Function to move webamp into our container and reset positioning
  // Webamp inserts itself into body by default, we need to move it into our scroll container
  const setupWebampForMobile = (resetScroll = false) => {
    // Prevent infinite loop - if we're already setting up, skip
    if (isSettingUpRef.current) return;
    if (!containerRef.current) return;

    // Webamp inserts #webamp as a child of body, so query from document
    const webampEl = document.getElementById('webamp') as HTMLElement;
    if (!webampEl) return;

    isSettingUpRef.current = true;

    // Move webamp into our container if it's not already there
    if (webampEl.parentElement !== containerRef.current) {
      containerRef.current.appendChild(webampEl);
    }

    // Reset positioning styles to flow with content
    webampEl.style.cssText = 'position: static !important; transform: none !important;';

    // Reset all window elements
    const elements = webampEl.querySelectorAll('#main-window, #playlist-window, #equalizer-window');
    elements.forEach((el) => {
      const htmlEl = el as HTMLElement;
      htmlEl.style.cssText = 'position: static !important; left: auto !important; top: auto !important; transform: none !important; margin: 4px auto;';
    });

    // Reset scroll to top after DOM manipulation if requested
    if (resetScroll) {
      const scrollContainer = document.getElementById('mobile-scroll-container');
      if (scrollContainer) {
        scrollContainer.scrollTop = 0;
      }
      window.scrollTo(0, 0);
    }

    // Allow future calls after a short delay
    setTimeout(() => {
      isSettingUpRef.current = false;
    }, 50);
  };

  useEffect(() => {
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

        initializedRef.current = true;

        const webamp = new WebampClass({
          initialTracks: AUDIO_TRACKS,
        });

        webampRef.current = webamp;

        if (containerRef.current) {
          await webamp.renderWhenReady(containerRef.current);

          // Move webamp into our container and reset positioning
          setupWebampForMobile();

          // Use MutationObserver to catch any style changes Webamp makes
          const observer = new MutationObserver(() => {
            setupWebampForMobile();
          });
          observerRef.current = observer;

          const webampEl = document.getElementById('webamp');
          if (webampEl) {
            observer.observe(webampEl, {
              attributes: true,
              attributeFilter: ['style'],
              subtree: true,
            });
          }

          // Also reset after delays to catch any async updates
          // Pass true to reset scroll to top after final setup
          setTimeout(setupWebampForMobile, 100);
          setTimeout(() => setupWebampForMobile(true), 300);

          // Delay play to avoid focus-triggered scroll
          setTimeout(() => {
            webamp.play();
            // Final scroll reset after play
            setTimeout(() => setupWebampForMobile(true), 100);
          }, 500);
        }
      } catch (error) {
        console.error('Failed to initialize Webamp:', error);
        initializedRef.current = false;
      }
    };

    initWebamp();

    return () => {
      // Disconnect observer to prevent memory leaks
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
      if (webampRef.current) {
        webampRef.current.dispose();
        webampRef.current = null;
      }
    };
  }, []);

  return (
    <WebampWrapper>
      <div
        ref={containerRef}
        className="webamp-container mobile-webamp"
      />
    </WebampWrapper>
  );
}

export function MobileDesktop() {
  const { settings } = useDesktopSettings();
  const backgroundStyle = getBackgroundStyle(settings);

  // Force scroll to top on mount and prevent scroll jumps
  useEffect(() => {
    const container = document.getElementById('mobile-scroll-container');
    if (container) {
      container.scrollTop = 0;
    }
    window.scrollTo(0, 0);

    // Also prevent any focus-triggered scrolling
    const preventScroll = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target?.closest?.('.webamp-container')) {
        const cont = document.getElementById('mobile-scroll-container');
        if (cont) cont.scrollTop = 0;
      }
    };
    document.addEventListener('focus', preventScroll, true);

    return () => {
      document.removeEventListener('focus', preventScroll, true);
    };
  }, []);

  return (
    <MobileContainer id="mobile-scroll-container" $background={backgroundStyle}>
      <ScrollContent>
        {/* 1. Dickbutt on Base - Banner */}
        <MobileSection title="Dickbutt on Base" noPadding>
          <DickbuttOnBaseWindow />
        </MobileSection>

        {/* 2. Folder Icons Row */}
        <MobileIconRow icons={FOLDER_ICONS} />

        {/* 3. Media Icons Row */}
        <MobileIconRow icons={MEDIA_ICONS} />

        {/* 4. Product - Upcoming Book */}
        <MobileSection title="Product" noPadding>
          <MobileProduct />
        </MobileSection>

        {/* 5. Origin - Full width image on mobile */}
        <MobileSection title="Origin" noPadding>
          <MobileOrigin />
        </MobileSection>

        {/* 5. Tokenomics */}
        <MobileSection title="Tokenomics" noPadding>
          <DickbuttWindow />
        </MobileSection>

        {/* 6. Where to Buy - Enhanced with tabs */}
        <MobileSection title="Where to Buy" noPadding>
          <MobileWhereToBuy />
        </MobileSection>

        {/* 7. Resources - Tree view style */}
        <MobileSection title="Resources" noPadding>
          <MobileResources />
        </MobileSection>

        {/* 8. Roadmap */}
        <MobileSection title="Roadmap" noPadding>
          <RoadmapWindow />
        </MobileSection>

        {/* 9. Disclaimer */}
        <MobileSection title="Disclaimer" noPadding>
          <DisclaimerWindow />
        </MobileSection>

        {/* 10. Winamp */}
        <MobileWebamp />
      </ScrollContent>
    </MobileContainer>
  );
}
