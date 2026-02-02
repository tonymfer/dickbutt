'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useSoundEffects, SoundEffects } from '@/hooks/useSoundEffects';

const SoundContext = createContext<SoundEffects | null>(null);

interface SoundProviderProps {
  children: ReactNode;
}

export function SoundProvider({ children }: SoundProviderProps) {
  const soundEffects = useSoundEffects();

  return (
    <SoundContext.Provider value={soundEffects}>
      {children}
    </SoundContext.Provider>
  );
}

export function useSound(): SoundEffects {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error('useSound must be used within a SoundProvider');
  }
  return context;
}

// Optional hook that doesn't throw - useful for components outside provider
export function useSoundOptional(): SoundEffects | null {
  return useContext(SoundContext);
}
