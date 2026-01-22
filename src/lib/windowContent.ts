// Shared content configuration for window components
// Used by both desktop and mobile versions to ensure consistency

import { RESOURCE_LINKS, BUY_LINKS } from './links';

// =============================================================================
// PRODUCT / EDUCATION WINDOW
// =============================================================================
export const PRODUCT_CONTENT = {
  title: 'The Dickbutt Standard',
  windowTitle: 'Education',
  badge: 'COMING SOON',
  newBadge: true,
  description:
    'A comprehensive exploration of Dickbutt and its place in monetary history. The decentralized alternative to central banking.',
  author: 'Saifedean Ammous',
  availability: 'Available on Amazon',
  imageUrl: 'https://m.media-amazon.com/images/I/51EvPlS4NjL._SL1491_.jpg',
  imageAlt: 'The Dickbutt Standard',
  productUrl:
    'https://www.amazon.com/dp/B0GHQWJQNN?ref=cm_sw_r_ffobk_cso_cp_apin_dp_EXNXMNTNVB378VWQF5FH&ref_=cm_sw_r_ffobk_cso_cp_apin_dp_EXNXMNTNVB378VWQF5FH&social_share=cm_sw_r_ffobk_cso_cp_apin_dp_EXNXMNTNVB378VWQF5FH&bestFormat=true',
  buttonText: '📚 Amazon',
} as const;

// =============================================================================
// ORIGIN WINDOW
// =============================================================================
export const ORIGIN_CONTENT = {
  windowTitle: 'Origin',
  imageUrl: '/assets/dickbutt-comic.png',
  imageAlt: 'Original Dickbutt comic',
  paragraphs: [
    'Dickbutt is a phallic cartoon character created by illustrator KC Green in 2006 as part of his webcomic Horribleville. The character has since become a popular reaction image on the internet.',
    'The original comic features a crudely drawn figure with a penis-shaped head and a butt for a body, with another smaller penis emerging from the butt.',
    'Dickbutt has become one of the most enduring and beloved memes in internet history, representing the absurdist humor that defines online culture.',
    'Now, Dickbutt lives on the blockchain as a community token on Base, continuing its legacy as a symbol of internet culture and decentralized humor.',
  ],
} as const;

// =============================================================================
// RESOURCES WINDOW
// =============================================================================
export interface ResourceItem {
  label: string;
  url: string;
  icon: string;
}

export interface ResourceGroup {
  label: string;
  icon: string;
  items: ResourceItem[];
}

export const RESOURCES_CONTENT: ResourceGroup[] = [
  {
    label: 'Price & Charts',
    icon: '📈',
    items: [
      { label: 'DexTools', url: RESOURCE_LINKS.dextools, icon: '📊' },
      { label: 'DexScreener', url: RESOURCE_LINKS.dexscreener, icon: '📉' },
      { label: 'CoinGecko', url: RESOURCE_LINKS.coingecko, icon: '🦎' },
      { label: 'CoinMarketCap', url: RESOURCE_LINKS.coinmarketcap, icon: '💹' },
    ],
  },
  {
    label: 'Social Media',
    icon: '💬',
    items: [
      { label: 'X (Twitter)', url: RESOURCE_LINKS.x, icon: '🐦' },
      { label: 'Telegram', url: RESOURCE_LINKS.telegram, icon: '✈️' },
      { label: 'Farcaster', url: RESOURCE_LINKS.farcaster, icon: '🟣' },
      { label: 'TikTok', url: RESOURCE_LINKS.tiktok, icon: '🎵' },
      { label: 'YouTube', url: RESOURCE_LINKS.youtube, icon: '📺' },
      { label: 'Instagram', url: RESOURCE_LINKS.instagram, icon: '📸' },
      { label: 'Linktree', url: RESOURCE_LINKS.linktree, icon: '🌳' },
    ],
  },
  {
    label: 'Tools & Fun',
    icon: '🛠️',
    items: [
      { label: 'Price Checker Extension', url: RESOURCE_LINKS.priceCheckerExtension, icon: '🔌' },
      { label: 'CC0 Store', url: RESOURCE_LINKS.cc0Store, icon: '🛒' },
      { label: 'Accept Dickbutt', url: RESOURCE_LINKS.acceptDickbutt, icon: '✅' },
      { label: 'Dickbuttazon', url: RESOURCE_LINKS.dickbuttazon, icon: '📦' },
      { label: 'Dickbuttify', url: RESOURCE_LINKS.dickbuttify, icon: '🎨' },
    ],
  },
];

// =============================================================================
// WHERE TO BUY WINDOW
// =============================================================================
export interface ExchangeItem {
  label: string;
  url: string;
  icon: string;
  featured?: boolean;
}

export const WHERE_TO_BUY_CONTENT = {
  windowTitle: 'Where to Buy',
  dexExchanges: [
    { label: 'Uniswap', url: BUY_LINKS.uniswap, icon: '🦄', featured: true },
    { label: 'Aerodrome', url: BUY_LINKS.aerodrome, icon: '✈️', featured: true },
    { label: 'Matcha', url: BUY_LINKS.matcha, icon: '🍵' },
    { label: 'Interface', url: BUY_LINKS.interface, icon: '🔮' },
  ] as ExchangeItem[],
  cexExchanges: [
    { label: 'Coinbase', url: BUY_LINKS.coinbase, icon: '🪙', featured: true },
    { label: 'Flooz', url: BUY_LINKS.flooz, icon: '💫' },
    { label: 'XT.com', url: BUY_LINKS.xtcom, icon: '📊' },
    { label: 'Slingshot', url: BUY_LINKS.slingshot, icon: '🎯' },
  ] as ExchangeItem[],
} as const;

// =============================================================================
// ROADMAP WINDOW
// =============================================================================
export const ROADMAP_CONTENT = {
  windowTitle: 'Roadmap',
  message:
    'There is no formal team or a roadmap. Just dickbutt and a community of dickbutt connoisseurs appreciating beauty, math and culture.',
} as const;

// =============================================================================
// DISCLAIMER WINDOW
// =============================================================================
export const DISCLAIMER_CONTENT = {
  windowTitle: 'Disclaimer',
  message:
    'Dickbutt coin is a meme coin with no intrinsic value or expectation of financial return. It is a tribute to a meme we all love and recognize. There is no formal team behind it.',
} as const;
