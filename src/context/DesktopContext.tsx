'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

export interface WindowState {
  id: string;
  title: string;
  content: string;
  position: { x: number; y: number };
  zIndex: number;
  minimized: boolean;
  size?: { width: number; height: number };
}

interface DesktopContextType {
  windows: WindowState[];
  activeWindowId: string | null;
  openWindow: (id: string, title: string, content: string, defaultPosition?: { x: number; y: number }) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  updateWindowPosition: (id: string, position: { x: number; y: number }) => void;
  isWindowOpen: (id: string) => boolean;
}

const DesktopContext = createContext<DesktopContextType | null>(null);

let nextZIndex = 1;

export function DesktopProvider({ children, defaultWindows = [] }: { children: ReactNode; defaultWindows?: Omit<WindowState, 'zIndex'>[] }) {
  const [windows, setWindows] = useState<WindowState[]>(() =>
    defaultWindows.map((w, i) => ({ ...w, zIndex: i + 1 }))
  );
  const [activeWindowId, setActiveWindowId] = useState<string | null>(
    defaultWindows.length > 0 ? defaultWindows[defaultWindows.length - 1].id : null
  );

  // Initialize nextZIndex based on default windows
  if (defaultWindows.length > 0) {
    nextZIndex = defaultWindows.length + 1;
  }

  const openWindow = useCallback((id: string, title: string, content: string, defaultPosition?: { x: number; y: number }) => {
    setWindows(prev => {
      const existing = prev.find(w => w.id === id);
      if (existing) {
        // If window exists but is minimized, restore it
        if (existing.minimized) {
          return prev.map(w =>
            w.id === id
              ? { ...w, minimized: false, zIndex: ++nextZIndex }
              : w
          );
        }
        // Otherwise just focus it
        return prev.map(w =>
          w.id === id
            ? { ...w, zIndex: ++nextZIndex }
            : w
        );
      }
      // Create new window
      const newWindow: WindowState = {
        id,
        title,
        content,
        position: defaultPosition || { x: 50 + (prev.length * 30), y: 50 + (prev.length * 30) },
        zIndex: ++nextZIndex,
        minimized: false,
      };
      return [...prev, newWindow];
    });
    setActiveWindowId(id);
  }, []);

  const closeWindow = useCallback((id: string) => {
    setWindows(prev => prev.filter(w => w.id !== id));
    setActiveWindowId(prev => prev === id ? null : prev);
  }, []);

  const minimizeWindow = useCallback((id: string) => {
    setWindows(prev => prev.map(w =>
      w.id === id ? { ...w, minimized: true } : w
    ));
    setActiveWindowId(prev => prev === id ? null : prev);
  }, []);

  const focusWindow = useCallback((id: string) => {
    setWindows(prev => {
      const window = prev.find(w => w.id === id);
      if (!window) return prev;

      return prev.map(w =>
        w.id === id
          ? { ...w, minimized: false, zIndex: ++nextZIndex }
          : w
      );
    });
    setActiveWindowId(id);
  }, []);

  const updateWindowPosition = useCallback((id: string, position: { x: number; y: number }) => {
    setWindows(prev => prev.map(w =>
      w.id === id ? { ...w, position } : w
    ));
  }, []);

  const isWindowOpen = useCallback((id: string) => {
    return windows.some(w => w.id === id && !w.minimized);
  }, [windows]);

  return (
    <DesktopContext.Provider value={{
      windows,
      activeWindowId,
      openWindow,
      closeWindow,
      minimizeWindow,
      focusWindow,
      updateWindowPosition,
      isWindowOpen,
    }}>
      {children}
    </DesktopContext.Provider>
  );
}

export function useDesktop() {
  const context = useContext(DesktopContext);
  if (!context) {
    throw new Error('useDesktop must be used within a DesktopProvider');
  }
  return context;
}
