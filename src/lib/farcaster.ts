import sdk from '@farcaster/miniapp-sdk';

export async function initFarcaster() {
  if (typeof window !== 'undefined') {
    await sdk.actions.ready();
  }
}

export { sdk };
