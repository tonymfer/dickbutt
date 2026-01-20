'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';

export interface DesktopSettings {
  backgroundColor: string;
  backgroundGradient: boolean;
}

interface DesktopSettingsContextType {
  settings: DesktopSettings;
  setBackgroundColor: (color: string) => void;
  setBackgroundGradient: (enabled: boolean) => void;
  resetSettings: () => void;
}

const STORAGE_KEY = 'dickbutt-desktop-settings';

const DEFAULT_SETTINGS: DesktopSettings = {
  backgroundColor: '#676767',
  backgroundGradient: false,
};

// Preset colors for the settings panel
export const PRESET_COLORS = [
  { name: 'Gray', value: '#676767' },
  { name: 'Navy Blue', value: '#003366' },
  { name: 'Teal', value: '#008080' },
  { name: 'Navy', value: '#000080' },
  { name: 'Forest', value: '#008000' },
  { name: 'Purple', value: '#800080' },
  { name: 'Maroon', value: '#800000' },
  { name: 'Steel', value: '#3A6EA5' },
  { name: 'Black', value: '#000000' },
];

const DesktopSettingsContext = createContext<DesktopSettingsContextType | null>(null);

function loadSettings(): DesktopSettings {
  if (typeof window === 'undefined') {
    return DEFAULT_SETTINGS;
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return {
        ...DEFAULT_SETTINGS,
        ...parsed,
      };
    }
  } catch (e) {
    console.error('Failed to load desktop settings:', e);
  }

  return DEFAULT_SETTINGS;
}

function saveSettings(settings: DesktopSettings): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch (e) {
    console.error('Failed to save desktop settings:', e);
  }
}

export function DesktopSettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<DesktopSettings>(DEFAULT_SETTINGS);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load settings from localStorage on mount
  useEffect(() => {
    setSettings(loadSettings());
    setIsHydrated(true);
  }, []);

  // Save settings whenever they change (after initial hydration)
  useEffect(() => {
    if (isHydrated) {
      saveSettings(settings);
    }
  }, [settings, isHydrated]);

  const setBackgroundColor = useCallback((color: string) => {
    setSettings(prev => ({ ...prev, backgroundColor: color }));
  }, []);

  const setBackgroundGradient = useCallback((enabled: boolean) => {
    setSettings(prev => ({ ...prev, backgroundGradient: enabled }));
  }, []);

  const resetSettings = useCallback(() => {
    setSettings(DEFAULT_SETTINGS);
  }, []);

  return (
    <DesktopSettingsContext.Provider
      value={{
        settings,
        setBackgroundColor,
        setBackgroundGradient,
        resetSettings,
      }}
    >
      {children}
    </DesktopSettingsContext.Provider>
  );
}

export function useDesktopSettings(): DesktopSettingsContextType {
  const context = useContext(DesktopSettingsContext);
  if (!context) {
    throw new Error('useDesktopSettings must be used within a DesktopSettingsProvider');
  }
  return context;
}

// Helper function to generate background style
export function getBackgroundStyle(settings: DesktopSettings): string {
  if (settings.backgroundGradient) {
    // For the default navy theme, use the spec-defined light blue gradient end
    // Otherwise, create a lighter shade for the gradient end
    const isNavyTheme = settings.backgroundColor.toLowerCase() === '#003366';
    const endColor = isNavyTheme ? '#0099FF' : lightenColor(settings.backgroundColor, 0.4);
    return `linear-gradient(180deg, ${settings.backgroundColor} 0%, ${endColor} 100%)`;
  }
  return settings.backgroundColor;
}

// Utility to lighten a hex color
function lightenColor(hex: string, factor: number): string {
  // Remove # if present
  const color = hex.replace('#', '');

  // Parse RGB components
  const r = parseInt(color.substring(0, 2), 16);
  const g = parseInt(color.substring(2, 4), 16);
  const b = parseInt(color.substring(4, 6), 16);

  // Lighten each component (blend towards white)
  const newR = Math.round(r + (255 - r) * factor);
  const newG = Math.round(g + (255 - g) * factor);
  const newB = Math.round(b + (255 - b) * factor);

  // Convert back to hex
  return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
}
