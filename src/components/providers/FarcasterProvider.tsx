'use client';
import { useEffect } from 'react';
import { initFarcaster } from '@/lib/farcaster';

export function FarcasterProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    initFarcaster();
  }, []);
  return <>{children}</>;
}
