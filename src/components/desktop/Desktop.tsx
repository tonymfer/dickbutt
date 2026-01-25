'use client';

import { MobileDesktop } from '@/components/mobile';
import { React95Provider } from '@/components/providers/React95Provider';
import { DesktopProvider, useDesktop, WindowState, WindowConfig } from '@/context/DesktopContext';
import { DesktopSettingsProvider, getBackgroundStyle, useDesktopSettings } from '@/context/DesktopSettingsContext';
import { IconPositionProvider } from '@/context/IconPositionContext';
import { WizardProvider, useWizard } from '@/context/WizardContext';
import { useViewport } from '@/hooks/useViewport';
import { BASESCAN_CONTRACT_URL } from '@/lib/links';
import { calculateWindowRect, getWebampPosition } from '@/lib/windowLayout';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { DickbuttAssistant } from './DickbuttAssistant';
import { IconConfig } from './DesktopIcon';
import { DesktopIconGrid } from './DesktopIconGrid';
import { SetupWizardWindow } from './SetupWizard';
import { StartupScreen } from './StartupScreen';
import { Taskbar } from './Taskbar';
import { WebampPlayer } from './WebampPlayer';
import { Window } from './Window';

// Desktop icons - left side vertical layout (Windows 95 style)
const DESKTOP_ICONS: IconConfig[] = [
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
    action: 'window',
    target: 'meme',
    windowTitle: 'Meme Gallery',
    routeFallback: '/meme',
  },
  {
    id: 'branding',
    label: 'Branding',
    icon: '/assets/icons/win95/folder-hires.ico',
    action: 'window',
    target: 'branding',
    windowTitle: 'Branding Assets',
    routeFallback: '/branding',
  },
  {
    id: 'irl',
    label: 'Dickbutts IRL',
    icon: '/assets/icons/win95/folder-hires.ico',
    action: 'window',
    target: 'irl',
    windowTitle: 'Dickbutt IRL - Real World Sightings',
    routeFallback: '/irl',
  },
  {
    id: 'tv',
    label: 'TV',
    icon: '/assets/icons/win95/tv.ico',
    action: 'route',
    target: '/tv',
  },
  {
    id: 'videos',
    label: 'Videos',
    icon: '/assets/icons/win95/video.ico',
    action: 'route',
    target: '/videos',
  },
  {
    id: 'nfts',
    label: 'NFT Collection',
    icon: '/assets/icons/win95/nft.ico',
    action: 'route',
    target: '/dickbutt-nfts',
  },
  {
    id: 'dickbutt-exe',
    label: 'dickbutt.exe',
    icon: '/assets/branding/dickbuttpfp.jpg',
    action: 'wizard',
    target: 'wizard',
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

// Window configuration data
const WINDOW_CONFIGS = [
  { id: 'resources', title: 'Resources', content: 'resources', fallback: { x: 30, y: 60 } },
  { id: 'product', title: 'Education', content: 'product', fallback: { x: 30, y: 300 } },
  { id: 'origin', title: 'Origin', content: 'origin', fallback: { x: 270, y: 60 } },
  { id: 'dickbutt', title: 'Tokenomics', content: 'dickbutt', fallback: { x: 620, y: 160 } },
  { id: 'wheretobuy', title: 'Where to buy', content: 'wheretobuy', fallback: { x: 620, y: 380 } },
  { id: 'roadmap', title: 'Roadmap', content: 'roadmap', fallback: { x: 270, y: 530 } },
  { id: 'disclaimer', title: 'Disclaimer', content: 'disclaimer', fallback: { x: 620, y: 650 } },
  { id: 'dickbuttonbase', title: 'Dickbutt on Base', content: 'dickbuttonbase', fallback: { x: 300, y: 16 } },
];

// Generate default windows with responsive rects
function createDefaultWindows(
  rects: Record<string, { x: number; y: number; width: number; height: number }>
): Omit<WindowState, 'zIndex'>[] {
  return WINDOW_CONFIGS.map(config => ({
    id: config.id,
    title: config.title,
    content: config.content,
    contentType: 'component' as const,
    position: rects[config.id] ? { x: rects[config.id].x, y: rects[config.id].y } : config.fallback,
    size: rects[config.id] ? { width: rects[config.id].width, height: rects[config.id].height } : undefined,
    minimized: false,
  }));
}

// Generate window configs for sequential opening
function createWindowConfigs(
  rects: Record<string, { x: number; y: number; width: number; height: number }>
): WindowConfig[] {
  return WINDOW_CONFIGS.map(config => ({
    id: config.id,
    title: config.title,
    content: config.content,
    contentType: 'component' as const,
    position: rects[config.id] ? { x: rects[config.id].x, y: rects[config.id].y } : config.fallback,
    size: rects[config.id] ? { width: rects[config.id].width, height: rects[config.id].height } : undefined,
  }));
}

// Window titles for auto-open via query param
const WINDOW_TITLES: Record<string, string> = {
  meme: 'Meme Gallery',
  branding: 'Branding Assets',
  irl: 'Dickbutt IRL - Real World Sightings',
};

// Separate component for handling search params (must be wrapped in Suspense)
function WindowQueryParamHandler() {
  const { openWindow } = useDesktop();
  const { width, height } = useViewport();
  const searchParams = useSearchParams();
  const hasOpenedWindowRef = useRef(false);

  useEffect(() => {
    if (hasOpenedWindowRef.current) return;
    if (width === 0 || height === 0) return; // Wait for viewport

    const windowParam = searchParams.get('window');
    if (windowParam && WINDOW_TITLES[windowParam]) {
      hasOpenedWindowRef.current = true;
      const rect = calculateWindowRect(width, height, windowParam);
      openWindow(windowParam, WINDOW_TITLES[windowParam], windowParam, {
        contentType: 'component',
        defaultPosition: { x: rect.x, y: rect.y },
        defaultSize: { width: rect.width, height: rect.height },
      });
    }
  }, [searchParams, openWindow, width, height]);

  return null;
}

function DesktopContent() {
  const { windows } = useDesktop();
  const { settings } = useDesktopSettings();
  const { wizardVisible } = useWizard();
  const backgroundStyle = getBackgroundStyle(settings);
  const { width, height } = useViewport();

  // Get Webamp position (below Resources window, aligned with left column)
  const webampPos = getWebampPosition(width, height);

  return (
    <DesktopContainer $background={backgroundStyle}>
        {/* Handle ?window= query param */}
        <Suspense fallback={null}>
          <WindowQueryParamHandler />
        </Suspense>

        {/* Desktop icons */}
        <DesktopIconGrid icons={DESKTOP_ICONS} />

        {/* Windows */}
        {windows.map((win) => (
          <Window key={win.id} window={win} />
        ))}

        {/* Webamp player - hidden during wizard, plays when wizard closes */}
        <WebampPlayer
          x={webampPos.x}
          y={webampPos.y}
          visible={!wizardVisible}
          shouldPlay={!wizardVisible}
        />

        {/* Dickbutt Assistant - bottom right, reopens wizard */}
        <DickbuttAssistant />

        {/* Taskbar */}
        <Taskbar />
    </DesktopContainer>
  );
}

// Component that handles wizard display and window cascade on completion
function WizardCascadeHandler({ rects }: { rects: Record<string, { x: number; y: number; width: number; height: number }> }) {
  const { wizardVisible } = useWizard();
  const { openWindowsSequentially, windows } = useDesktop();
  const hasCascadedRef = useRef(false);
  const wasVisibleRef = useRef(wizardVisible);

  // Watch for wizard becoming hidden (completed or skipped)
  useEffect(() => {
    // If wizard was visible and now isn't, trigger cascade (only if no windows exist yet)
    if (wasVisibleRef.current && !wizardVisible && windows.length === 0) {
      // Small delay to ensure wizard is fully hidden
      setTimeout(() => {
        const configs = createWindowConfigs(rects);
        openWindowsSequentially(configs, 150);
      }, 100);
    }

    wasVisibleRef.current = wizardVisible;
  }, [wizardVisible, openWindowsSequentially, rects, windows.length]);

  // Don't show wizard if it's not visible
  if (!wizardVisible) return null;

  return <SetupWizardWindow />;
}

function DesktopWithProviders() {
  const { width, height } = useViewport();
  const rects = useResponsiveWindowRects(width, height);

  // Always start with no windows - they'll cascade in after wizard
  const defaultWindows = useMemo(() => {
    return []; // Windows cascade in after wizard completes
  }, []);

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
          <WizardCascadeHandler rects={rects} />
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
      <WizardProvider>
        {showStartup && <StartupScreen onComplete={handleStartupComplete} duration={2500} />}
        <DesktopWithProviders />
      </WizardProvider>
    </React95Provider>
  );
}
