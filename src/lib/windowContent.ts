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
  imageAlt: 'Dickbutt origin comic',
  imageWidth: 900,
  imageHeight: 520,
  paragraphs: [
    'Over the years, Dickbutt has remained a timeless meme, beloved by millions and widely recognized across social media, forums and internet subcultures. Its longevity and universal appeal have solidified its place as one of the most legendary and enduring memes in online history.',
    'The Dickbutt meme originated on July 2, 2006, when artist K.C. Green published a webcomic titled "Tree. You\'ve Been Good to Us" as part of his Horribleville series. The comic humorously depicted a character who draws a crude, anthropomorphic figure with a penis and buttocks protruding from its backside. This absurd and intentionally juvenile creation quickly gained traction on internet forums like 4Chan and Reddit, becoming a staple of early meme culture.',
    'Dickbutt\'s enduring popularity can be attributed to its simplicity, shock value and adaptability. It became a symbol of internet absurdity, often used in image macros, GIFs, and as a punchline in various contexts. Its influence is comparable to other early internet memes like Pepe the Frog and Doge, which also emerged from niche communities and organically became widely recognized symbols of internet culture.',
    'Dickbutt has transcended its origins, appearing in various forms of media and even inspiring NFT projects like CryptoDickbutts. Despite its crude nature, the meme\'s longevity and cultural impact highlight the internet\'s capacity to elevate even the most absurd creations to iconic status.',
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
      { label: 'Instagram', url: RESOURCE_LINKS.instagram, icon: '📸' },
      { label: 'TikTok', url: RESOURCE_LINKS.tiktok, icon: '🎵' },
      { label: 'YouTube', url: RESOURCE_LINKS.youtube, icon: '📺' },
    ],
  },
  {
    label: 'Tools & Fun',
    icon: '🛠️',
    items: [
      { label: 'Price Checker', url: RESOURCE_LINKS.priceCheckerExtension, icon: '🔌' },
      { label: 'Dickbuttify', url: RESOURCE_LINKS.dickbuttify, icon: '🎨' },
      { label: 'Accept DB', url: RESOURCE_LINKS.acceptDickbutt, icon: '✅' },
      { label: 'Dickbuttazon', url: RESOURCE_LINKS.dickbuttazon, icon: '📦' },
      { label: 'CC0 Store', url: RESOURCE_LINKS.cc0Store, icon: '🏪' },
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
