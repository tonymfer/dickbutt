export const CONTRACT_ADDRESS = '0x2d57c47bc5d2432feeedf2c9150162a9862d3ccf';

// Pair / tracking
export const DEXSCREENER_PAIR_URL =
  'https://dexscreener.com/base/0x92d90f7f8413749bd4bea26dde4e29efc9e9a0b6';

// Resources window
export const RESOURCE_LINKS = {
  coinmarketcap: 'https://coinmarketcap.com/currencies/dickbutt/',
  coingecko: 'https://www.coingecko.com/en/coins/dickbutt',
  dexscreener: DEXSCREENER_PAIR_URL,
  dextools: 'https://www.dextools.io/app/en/token/dickbutt',
  x: 'https://x.com/DickbuttCTO',
  farcaster: 'https://farcaster.xyz/~/channel/dickbutt',
  telegram: 'https://t.me/dickbutt_cto',
  tiktok: 'https://www.tiktok.com/@simplydickbutttv',
  youtube: 'https://www.youtube.com/@SimplyDickbuttTV',
  instagram: 'https://www.instagram.com/simplydickbutttv',
  linktree: 'https://linktr.ee/dickbutt',
  priceCheckerExtension:
    'https://chromewebstore.google.com/detail/db-price-checker/fejhjlcbmocgafokphekmiofghgefhom',
  cc0Store: 'https://cc0.company/us/store/dickbutt',
  acceptDickbutt: 'https://acceptdickbutt.com/',
  dickbuttazon: 'https://dickbuttazon.com/',
  dickbuttify: 'https://dickbuttify.dickbutt.site/',
} as const;

// Where to buy window
export const BUY_LINKS = {
  uniswap: `https://app.uniswap.org/explore/tokens/base/${CONTRACT_ADDRESS}`,
  aerodrome: `https://aerodrome.finance/swap?from=eth&to=${CONTRACT_ADDRESS}&chain0=8453&chain1=8453`,
  clank: `https://clank.fun/t/${CONTRACT_ADDRESS}`,
  netProtocol: `https://www.netprotocol.app/app/token/base/${CONTRACT_ADDRESS}`,
  opensea: `https://opensea.io/token/base/${CONTRACT_ADDRESS}/`,
  coinbase: 'https://www.coinbase.com/price/dickbutt',
  matcha: `https://matcha.xyz/tokens/base/${CONTRACT_ADDRESS}`,
  xtcom: 'https://www.xt.com/en/trade/dickbutt_usdt',
  bolide: 'https://apps.apple.com/us/app/bolide-memecoin-trading/id6456525694',
  aarc: 'https://link.aarc.xyz/dickbutt',
  slingshot: `https://slingshot.finance/token/base/${CONTRACT_ADDRESS}`,
  interface: `https://app.interface.social/token/8453/${CONTRACT_ADDRESS}`,
  flooz: 'https://flooz.xyz/dickbuttcto',
} as const;

// Roadmap window buttons
export const ROADMAP_LINKS = {
  ok: 'https://www.youtube.com/watch?v=Dd3R0FBu6cY',
  cancel: 'https://isdickbuttstillfunny.com/',
} as const;

// Contract button
export const BASESCAN_CONTRACT_URL = `https://basescan.org/token/${CONTRACT_ADDRESS}#code`;

