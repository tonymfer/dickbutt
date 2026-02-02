import { BASESCAN_CONTRACT_URL } from '@/lib/links';

export interface IconConfig {
  id: string;
  label: string;
  icon: string;
  iconScale?: number;
  action: 'route' | 'link' | 'window' | 'wizard';
  target: string;
  windowTitle?: string;
  routeFallback?: string;
  hideLabel?: boolean;
}

// Base icon data (shared properties)
const BASE_ICONS = {
  contract: { id: 'contract', label: 'Contract', icon: '/assets/icons/win95/contract.ico' },
  meme: { id: 'meme', label: 'Meme Folder', icon: '/assets/icons/win95/folder-hires.ico' },
  branding: { id: 'branding', label: 'Branding', icon: '/assets/icons/win95/folder-hires.ico' },
  irl: { id: 'irl', label: 'Dickbutts IRL', icon: '/assets/icons/win95/folder-hires.ico' },
  tv: { id: 'tv', label: 'TV', icon: '/assets/icons/win95/tv.ico' },
  videos: { id: 'videos', label: 'Videos', icon: '/assets/icons/win95/video.ico' },
  nfts: { id: 'nfts', label: 'NFT Collection', icon: '/assets/icons/win95/nft.ico' },
  dickbuttExe: { id: 'dickbutt-exe', label: 'dickbutt.exe', icon: '/assets/branding/dickbuttpfp.jpg' },
} as const;

// Desktop: uses windows with fallback routes
export const DESKTOP_ICONS: IconConfig[] = [
  { ...BASE_ICONS.contract, action: 'link', target: BASESCAN_CONTRACT_URL },
  { ...BASE_ICONS.meme, action: 'window', target: 'meme', windowTitle: 'Meme Gallery', routeFallback: '/meme' },
  { ...BASE_ICONS.branding, action: 'window', target: 'branding', windowTitle: 'Branding Assets', routeFallback: '/branding' },
  { ...BASE_ICONS.irl, action: 'window', target: 'irl', windowTitle: 'Dickbutt IRL - Real World Sightings', routeFallback: '/irl' },
  { ...BASE_ICONS.tv, action: 'route', target: '/tv' },
  { ...BASE_ICONS.videos, action: 'route', target: '/videos' },
  { ...BASE_ICONS.nfts, action: 'route', target: '/dickbutt-nfts' },
  { ...BASE_ICONS.dickbuttExe, action: 'wizard', target: 'wizard' },
];

// Mobile: uses routes instead of windows
export const MOBILE_ICONS: IconConfig[] = [
  { ...BASE_ICONS.contract, action: 'link', target: BASESCAN_CONTRACT_URL },
  { ...BASE_ICONS.meme, action: 'route', target: '/meme' },
  { ...BASE_ICONS.branding, action: 'route', target: '/branding' },
  { ...BASE_ICONS.irl, action: 'route', target: '/irl' },
  { ...BASE_ICONS.tv, action: 'route', target: '/tv' },
  { ...BASE_ICONS.videos, action: 'route', target: '/videos' },
  { ...BASE_ICONS.nfts, action: 'route', target: '/dickbutt-nfts' },
  { ...BASE_ICONS.dickbuttExe, action: 'wizard', target: 'wizard' },
];

// Taskbar window icons mapping
export const WINDOW_ICONS: Record<string, string> = {
  resources: '/assets/icons/win95/book.ico',
  product: '/assets/icons/win95/book.ico',
  origin: '/assets/icons/win95/scroll.ico',
  dickbutt: '/assets/icons/win95/money.ico',
  wheretobuy: '/assets/icons/win95/cart.ico',
  roadmap: '/assets/icons/win95/map.ico',
  disclaimer: '/assets/icons/win95/warning.ico',
  dickbuttonbase: '/assets/icons/win95/computer.ico',
  settings: '/assets/icons/win95/settings.ico',
  meme: '/assets/icons/win95/folder-hires.ico',
  branding: '/assets/icons/win95/folder-hires.ico',
  irl: '/assets/icons/win95/folder-hires.ico',
};
