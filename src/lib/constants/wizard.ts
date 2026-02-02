// Tokenomics data
export const TOKENOMICS_DATA = [
  { label: 'Team', value: 10, color: '#ffff00' },
  { label: 'Marketing', value: 20, color: '#ff00ff' },
  { label: 'Liquidity', value: 20, color: '#00ff00' },
  { label: 'Community', value: 50, color: '#00ffff' },
];

export const TOKEN_DETAILS = ['Supply: 100B', 'Chain: Base (L2)', 'Tax: 0/0'];
export const SECURITY_SPECS = ['Contract Renounced', 'LP Burned Forever', 'No Mint Function'];

// Roadmap data
export const ROADMAP_PHASES = [
  { phase: 'Phase 1: Launch', completed: true, items: ['Token on Base', 'Website', 'Community'] },
  { phase: 'Phase 2: Viral', completed: true, items: ['Meme contests', 'Social expansion', 'Partnerships'] },
  { phase: 'Phase 3: Domination', completed: false, items: ['CEX listings', 'NFT collection', 'Global awareness'] },
];

// Origin story content
export const ORIGIN_STORY = {
  date: 'July 2, 2006',
  paragraphs: [
    'Artist K.C. Green published a webcomic in his Horribleville series featuring a crude, anthropomorphic figure. This absurd creation quickly spread across 4chan and Reddit.',
    "Dickbutt's popularity comes from its simplicity and adaptability. It became a symbol of internet absurdity, comparable to Pepe and Doge.",
    'Nearly two decades later, it remains one of the most legendary memes in online history, now evolved into $DICKBUTT on Base.',
  ],
  comicImage: '/assets/dickbutt-comic.png',
};

// Wizard step titles
export const WIZARD_STEP_TITLES: Record<number, string> = {
  1: 'Discovery',
  2: 'Tokenomics',
  3: 'Roadmap',
  4: 'Education',
  5: 'Complete',
};

export const WIZARD_TOTAL_STEPS = 5;
