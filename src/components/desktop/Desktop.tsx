'use client';

import { MobileDesktop } from '@/components/mobile';
import { React95Provider } from '@/components/providers/React95Provider';
import { DesktopProvider, useDesktop, WindowState } from '@/context/DesktopContext';
import { DesktopSettingsProvider, getBackgroundStyle, useDesktopSettings } from '@/context/DesktopSettingsContext';
import { IconPositionProvider } from '@/context/IconPositionContext';
import { useViewport } from '@/hooks/useViewport';
import { BASESCAN_CONTRACT_URL } from '@/lib/links';
import { calculateWindowRect, getWebampPosition } from '@/lib/windowLayout';
import { useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { IconConfig } from './DesktopIcon';
import { DesktopIconGrid } from './DesktopIconGrid';
import { StartupScreen } from './StartupScreen';
import { Taskbar } from './Taskbar';
import { WebampPlayer } from './WebampPlayer';
import { Window } from './Window';

// Desktop icon definitions - top-right row
const TOP_ICONS: IconConfig[] = [
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

// Desktop icon definitions - bottom area near taskbar
// iconScale tuned so the three icons appear visually similar in size
const BOTTOM_ICONS: IconConfig[] = [
  {
    id: 'tv',
    label: 'TV',
    icon: '/assets/icons/windowsplustv.gif',
    iconScale: 1.35, // GIF has internal padding, scale up
    action: 'route',
    target: '/tv',
  },
  {
    id: 'videos',
    label: 'Videos',
    icon: '/assets/icons/win95/video.ico',
    iconScale: 0.85, // ICO is larger, scale down slightly
    action: 'route',
    target: '/videos',
  },
  {
    id: 'nfts',
    label: 'NFT Collection',
    icon: '/assets/icons/win95/nft.ico',
    iconScale: 0.85, // Match Videos
    action: 'route',
    target: '/dickbutt-nfts',
  },
];

const DesktopContainer = styled.div<{ $background: string }>`
  position: fixed;
  inset: 0;
  overflow: hidden;
  padding-bottom: 36px; /* Taskbar height */
  background: ${props => props.$background};
`;

// Generate window rects (position + size) based on viewport
function useResponsiveWindowRects(viewportWidth: number, viewportHeight: number) {
  return useMemo(() => {
    const windowIds = ['dickbuttonbase', 'resources', 'product', 'origin', 'dickbutt', 'wheretobuy', 'roadmap', 'disclaimer'];
    const rects: Record<string, { x: number; y: number; width: number; height: number }> = {};

    for (const id of windowIds) {
      rects[id] = calculateWindowRect(viewportWidth, viewportHeight, id);
    }

    return rects;
  }, [viewportWidth, viewportHeight]);
}

// Generate default windows with responsive rects
function createDefaultWindows(
  rects: Record<string, { x: number; y: number; width: number; height: number }>
): Omit<WindowState, 'zIndex'>[] {
  return [
    {
      id: 'resources',
      title: 'Resources',
      content: 'resources',
      contentType: 'component',
      position: rects.resources ? { x: rects.resources.x, y: rects.resources.y } : { x: 30, y: 60 },
      size: rects.resources ? { width: rects.resources.width, height: rects.resources.height } : undefined,
      minimized: false,
    },
    {
      id: 'product',
      title: 'Education',
      content: 'product',
      contentType: 'component',
      position: rects.product ? { x: rects.product.x, y: rects.product.y } : { x: 30, y: 300 },
      size: rects.product ? { width: rects.product.width, height: rects.product.height } : undefined,
      minimized: false,
    },
    {
      id: 'origin',
      title: 'Origin',
      content: 'origin',
      contentType: 'component',
      position: rects.origin ? { x: rects.origin.x, y: rects.origin.y } : { x: 270, y: 60 },
      size: rects.origin ? { width: rects.origin.width, height: rects.origin.height } : undefined,
      minimized: false,
    },
    {
      id: 'dickbutt',
      title: 'Tokenomics',
      content: 'dickbutt',
      contentType: 'component',
      position: rects.dickbutt ? { x: rects.dickbutt.x, y: rects.dickbutt.y } : { x: 620, y: 160 },
      size: rects.dickbutt ? { width: rects.dickbutt.width, height: rects.dickbutt.height } : undefined,
      minimized: false,
    },
    {
      id: 'wheretobuy',
      title: 'Where to buy',
      content: 'wheretobuy',
      contentType: 'component',
      position: rects.wheretobuy ? { x: rects.wheretobuy.x, y: rects.wheretobuy.y } : { x: 620, y: 380 },
      size: rects.wheretobuy ? { width: rects.wheretobuy.width, height: rects.wheretobuy.height } : undefined,
      minimized: false,
    },
    {
      id: 'roadmap',
      title: 'Roadmap',
      content: 'roadmap',
      contentType: 'component',
      position: rects.roadmap ? { x: rects.roadmap.x, y: rects.roadmap.y } : { x: 270, y: 530 },
      size: rects.roadmap ? { width: rects.roadmap.width, height: rects.roadmap.height } : undefined,
      minimized: false,
    },
    {
      id: 'disclaimer',
      title: 'Disclaimer',
      content: 'disclaimer',
      contentType: 'component',
      position: rects.disclaimer ? { x: rects.disclaimer.x, y: rects.disclaimer.y } : { x: 620, y: 650 },
      size: rects.disclaimer ? { width: rects.disclaimer.width, height: rects.disclaimer.height } : undefined,
      minimized: false,
    },
    {
      id: 'dickbuttonbase',
      title: 'Dickbutt on Base',
      content: 'dickbuttonbase',
      contentType: 'component',
      position: rects.dickbuttonbase ? { x: rects.dickbuttonbase.x, y: rects.dickbuttonbase.y } : { x: 300, y: 16 },
      size: rects.dickbuttonbase ? { width: rects.dickbuttonbase.width, height: rects.dickbuttonbase.height } : undefined,
      minimized: false,
    },
  ];
}

function DesktopContent() {
  const { windows } = useDesktop();
  const { settings } = useDesktopSettings();
  const backgroundStyle = getBackgroundStyle(settings);
  const { width, height } = useViewport();

  // Get Webamp position (below Resources window, aligned with left column)
  const webampPos = getWebampPosition(width, height);

  return (
    <DesktopContainer $background={backgroundStyle}>
        {/* Desktop icons */}
        <DesktopIconGrid topIcons={TOP_ICONS} bottomIcons={BOTTOM_ICONS} />

        {/* Windows */}
        {windows.map((win) => (
          <Window key={win.id} window={win} />
        ))}

        {/* Webamp player - positioned below Resources */}
        <WebampPlayer x={webampPos.x} y={webampPos.y} />

        {/* Taskbar */}
        <Taskbar />
    </DesktopContainer>
  );
}

function DesktopWithProviders() {
  const { width, height } = useViewport();
  const rects = useResponsiveWindowRects(width, height);
  const defaultWindows = useMemo(() => createDefaultWindows(rects), [rects]);

  const loggedRef = useRef(false);
  useEffect(() => {
    if (loggedRef.current) return;
    loggedRef.current = true;
    if (process.env.NODE_ENV === 'development') {
      console.info(`[DesktopWithProviders] initial viewport ${JSON.stringify({ width, height })}`);
    }
  }, [width, height]);

  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return;
    const ids = Object.keys(rects);
    const overlaps: Array<{ a: string; b: string; overlap: { x: number; y: number; w: number; h: number } }> = [];

    for (let i = 0; i < ids.length; i++) {
      for (let j = i + 1; j < ids.length; j++) {
        const a = ids[i];
        const b = ids[j];
        const ra = rects[a];
        const rb = rects[b];
        if (!ra || !rb) continue;

        const x1 = Math.max(ra.x, rb.x);
        const y1 = Math.max(ra.y, rb.y);
        const x2 = Math.min(ra.x + ra.width, rb.x + rb.width);
        const y2 = Math.min(ra.y + ra.height, rb.y + rb.height);
        const w = x2 - x1;
        const h = y2 - y1;
        if (w > 0 && h > 0) {
          overlaps.push({ a, b, overlap: { x: x1, y: y1, w, h } });
        }
      }
    }

    if (overlaps.length > 0) {
      console.warn(
        `[windowLayout] overlap detected ${JSON.stringify({ width, height, overlaps }, null, 2)}`
      );
    } else {
      console.debug(`[windowLayout] rects ok ${JSON.stringify({ width, height, rects }, null, 2)}`);
    }
  }, [rects, width, height]);

  return (
    <DesktopSettingsProvider>
      <IconPositionProvider>
        <DesktopProvider defaultWindows={defaultWindows}>
          <DesktopContent />
        </DesktopProvider>
      </IconPositionProvider>
    </DesktopSettingsProvider>
  );
}

// Use sessionStorage to track if user has navigated within the site
const SESSION_NAV_KEY = 'dickbutt-session-nav';

export function Desktop() {
  // Hydration-safe: server + first client render match (no startup),
  // then we decide after mount based on sessionStorage.
  const [showStartup, setShowStartup] = useState(false);
  const { isDesktop } = useViewport();

  useEffect(() => {
    // Check if this is a navigation within the same session (came back from another route)
    const hasNavigatedInSession = sessionStorage.getItem(SESSION_NAV_KEY);

    if (!hasNavigatedInSession) {
      // Fresh page load - show startup
      // Defer state update to avoid sync setState-in-effect lint.
      setTimeout(() => setShowStartup(true), 0);
    }
    // Mark that we've been to the homepage in this session
    sessionStorage.setItem(SESSION_NAV_KEY, 'true');

    if (process.env.NODE_ENV === 'development') {
      console.info(
        `[Desktop] startup init ${JSON.stringify({
          showStartup: !hasNavigatedInSession,
          hasWindow: typeof window !== 'undefined',
        })}`
      );
    }
  }, []);

  const handleStartupComplete = () => {
    setShowStartup(false);
  };

  // Mobile/Tablet view (< 1024px) - stacked column layout
  if (!isDesktop) {
    return (
      <React95Provider>
        <DesktopSettingsProvider>
          <MobileDesktop />
        </DesktopSettingsProvider>
      </React95Provider>
    );
  }

  // Desktop view (>= 1024px) - cascaded windows layout
  return (
    <React95Provider>
      {showStartup && <StartupScreen onComplete={handleStartupComplete} duration={2500} />}
      <DesktopWithProviders />
    </React95Provider>
  );
}
