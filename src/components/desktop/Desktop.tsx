'use client';

import { DesktopProvider, WindowState } from '@/context/DesktopContext';
import { DesktopIconGrid } from './DesktopIconGrid';
import { IconConfig } from './DesktopIcon';
import { Window } from './Window';
import { Taskbar } from './Taskbar';
import { WebampPlayer } from './WebampPlayer';
import { useDesktop } from '@/context/DesktopContext';

// Window definitions
const DEFAULT_WINDOWS: Omit<WindowState, 'zIndex'>[] = [
  {
    id: 'origin',
    title: 'Origin Story',
    content: '/assets/windows/origin1.png',
    position: { x: 50, y: 50 },
    minimized: false,
  },
  {
    id: 'roadmap',
    title: 'Roadmap',
    content: '/assets/windows/roadmap.png',
    position: { x: 200, y: 100 },
    minimized: false,
  },
  {
    id: 'resources',
    title: 'Resources',
    content: '/assets/windows/resources.png',
    position: { x: 350, y: 150 },
    minimized: false,
  },
];

// Desktop icon definitions
const DESKTOP_ICONS: IconConfig[] = [
  {
    id: 'meme',
    label: 'Meme Folder',
    icon: '/assets/icons/memefolder.png',
    action: 'route',
    target: '/meme',
  },
  {
    id: 'irl',
    label: 'IRL',
    icon: '/assets/icons/dickbuttsirl.png',
    action: 'route',
    target: '/irl',
  },
  {
    id: 'branding',
    label: 'Branding',
    icon: '/assets/icons/branding.png',
    action: 'route',
    target: '/branding',
  },
  {
    id: 'tv',
    label: 'TV',
    icon: '/assets/icons/windowsplustv.gif',
    action: 'route',
    target: '/tv',
  },
  {
    id: 'nfts',
    label: 'NFTs',
    icon: '/assets/icons/dickbuttnfts.png',
    action: 'link',
    target: 'https://opensea.io/collection/dickbutts-nft',
  },
  {
    id: 'contract',
    label: 'Contract',
    icon: '/assets/icons/contractelement.png',
    action: 'window',
    target: 'contract',
    windowTitle: 'Contract Info',
    windowContent: '/assets/icons/contractelement.png',
  },
];

function DesktopContent() {
  const { windows } = useDesktop();

  return (
    <div className="win95-desktop fixed inset-0 overflow-hidden pb-9">
      {/* Desktop icons */}
      <DesktopIconGrid icons={DESKTOP_ICONS} />

      {/* Windows */}
      {windows.map((win) => (
        <Window key={win.id} window={win} />
      ))}

      {/* Webamp player */}
      <WebampPlayer initialPosition={{ x: 20, y: 20 }} />

      {/* Taskbar */}
      <Taskbar />
    </div>
  );
}

export function Desktop() {
  return (
    <DesktopProvider defaultWindows={DEFAULT_WINDOWS}>
      <DesktopContent />
    </DesktopProvider>
  );
}
