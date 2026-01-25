'use client';

import React, { createContext, useContext, useState, useCallback, useEffect, useRef, ReactNode, ComponentType } from 'react';

export type WindowContentType = 'component' | 'image';

export interface WindowState {
  id: string;
  title: string;
  content: string; // For 'image' type: path, for 'component' type: component key
  contentType: WindowContentType;
  position: { x: number; y: number };
  zIndex: number;
  minimized: boolean;
  size?: { width: number; height: number };
}

export interface WindowContentProps {
  onClose: () => void;
}

export interface WindowConfig {
  id: string;
  title: string;
  content: string;
  contentType: WindowContentType;
  position: { x: number; y: number };
  size?: { width: number; height: number };
}

interface DesktopContextType {
  windows: WindowState[];
  activeWindowId: string | null;
  openWindow: (id: string, title: string, content: string, options?: { defaultPosition?: { x: number; y: number }; defaultSize?: { width: number; height: number }; contentType?: WindowContentType }) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  updateWindowPosition: (id: string, position: { x: number; y: number }) => void;
  updateWindowSize: (id: string, size: { width: number; height: number }) => void;
  isWindowOpen: (id: string) => boolean;
  openWindowsSequentially: (configs: WindowConfig[], interval?: number) => Promise<void>;
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

  // Track if user has manually moved any windows
  const userMovedWindows = useRef<Set<string>>(new Set());

  // Initialize nextZIndex based on default windows
  if (defaultWindows.length > 0) {
    nextZIndex = defaultWindows.length + 1;
  }

  // Update window positions/sizes when viewport changes (defaultWindows recalculates)
  // But preserve positions for windows the user has manually moved
  useEffect(() => {
    setWindows(prev => {
      return prev.map(win => {
        // If user manually moved this window, don't update its position
        if (userMovedWindows.current.has(win.id)) {
          return win;
        }
        // Find the new default for this window
        const newDefault = defaultWindows.find(d => d.id === win.id);
        if (newDefault) {
          return {
            ...win,
            position: newDefault.position,
            size: newDefault.size,
          };
        }
        return win;
      });
    });
  }, [defaultWindows]);

  const openWindow = useCallback((id: string, title: string, content: string, options?: { defaultPosition?: { x: number; y: number }; defaultSize?: { width: number; height: number }; contentType?: WindowContentType }) => {
    const { defaultPosition, defaultSize, contentType = 'component' } = options || {};
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
        contentType,
        position: defaultPosition || { x: 50 + (prev.length * 30), y: 50 + (prev.length * 30) },
        size: defaultSize,
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
    // Mark this window as user-moved so viewport resize won't reset it
    userMovedWindows.current.add(id);
    setWindows(prev => prev.map(w =>
      w.id === id ? { ...w, position } : w
    ));
  }, []);

  const updateWindowSize = useCallback((id: string, size: { width: number; height: number }) => {
    setWindows(prev => prev.map(w =>
      w.id === id ? { ...w, size } : w
    ));
  }, []);

  const isWindowOpen = useCallback((id: string) => {
    return windows.some(w => w.id === id && !w.minimized);
  }, [windows]);

  const openWindowsSequentially = useCallback(async (
    configs: WindowConfig[],
    interval = 150
  ) => {
    for (const config of configs) {
      openWindow(config.id, config.title, config.content, {
        defaultPosition: config.position,
        defaultSize: config.size,
        contentType: config.contentType,
      });
      await new Promise(resolve => setTimeout(resolve, interval));
    }
  }, [openWindow]);

  return (
    <DesktopContext.Provider value={{
      windows,
      activeWindowId,
      openWindow,
      closeWindow,
      minimizeWindow,
      focusWindow,
      updateWindowPosition,
      updateWindowSize,
      isWindowOpen,
      openWindowsSequentially,
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
