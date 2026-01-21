'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
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
  padding: 8px 0;
`;

const MobileFooter = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 16px 0 32px;
`;

const CopyrightText = styled.p`
  font-size: 11px;
  color: #000;
  margin: 0;
  text-align: center;
`;

// Webamp component for mobile - positioned at bottom of scroll
function MobileWebamp() {
  const containerRef = useRef<HTMLDivElement>(null);
  const webampRef = useRef<import('webamp').default | null>(null);
  const initializedRef = useRef(false);
  const [isReady, setIsReady] = useState(false);

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
          setIsReady(true);
          webamp.play();
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

  // Reset webamp positioning for mobile
  useEffect(() => {
    if (!isReady || !containerRef.current) return;

    const webampEl = containerRef.current.querySelector('#webamp') as HTMLElement;
    if (webampEl) {
      webampEl.style.position = 'relative';
      webampEl.style.left = '0';
      webampEl.style.top = '0';
      webampEl.style.transform = 'none';
    }
  }, [isReady]);

  return (
    <WebampWrapper>
      <div
        ref={containerRef}
        className="webamp-container mobile-webamp"
        style={{
          position: 'relative',
          width: '275px',
          minHeight: '116px',
        }}
      />
    </WebampWrapper>
  );
}

export function MobileDesktop() {
  const { settings } = useDesktopSettings();
  const backgroundStyle = getBackgroundStyle(settings);

  return (
    <MobileContainer $background={backgroundStyle}>
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

        {/* 11. Footer */}
        <MobileFooter>
          <Image
            src="/assets/dbi.gif"
            alt="Dickbutt"
            width={90}
            height={90}
            unoptimized
          />
          <CopyrightText>
            2025 by Dickbutt on Base. All rights reserved.
          </CopyrightText>
        </MobileFooter>
      </ScrollContent>
    </MobileContainer>
  );
}
