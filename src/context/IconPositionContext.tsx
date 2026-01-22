'use client';

import { createContext, useContext, useState, useCallback, useRef, ReactNode } from 'react';

interface IconPosition {
  x: number;
  y: number;
}

interface IconPositionContextType {
  positions: Record<string, IconPosition>;
  updatePosition: (id: string, position: IconPosition) => void;
  initializePositions: (positions: Record<string, IconPosition>) => void;
}

const IconPositionContext = createContext<IconPositionContextType | null>(null);

export function IconPositionProvider({ children }: { children: ReactNode }) {
  const [positions, setPositions] = useState<Record<string, IconPosition>>({});
  // Track which icons have been dragged by user (should persist their positions)
  const userDraggedRef = useRef<Set<string>>(new Set());

  const updatePosition = useCallback((id: string, position: IconPosition) => {
    // Mark as user-dragged so it persists across viewport changes
    userDraggedRef.current.add(id);
    setPositions(prev => ({
      ...prev,
      [id]: position,
    }));
  }, []);

  const initializePositions = useCallback((newPositions: Record<string, IconPosition>) => {
    setPositions(prev => {
      const merged = { ...newPositions };
      // Only preserve positions that were user-dragged
      for (const key of Object.keys(prev)) {
        if (userDraggedRef.current.has(key) && prev[key]) {
          merged[key] = prev[key];
        }
      }
      return merged;
    });
  }, []);

  return (
    <IconPositionContext.Provider value={{ positions, updatePosition, initializePositions }}>
      {children}
    </IconPositionContext.Provider>
  );
}

export function useIconPositions() {
  const context = useContext(IconPositionContext);
  if (!context) {
    throw new Error('useIconPositions must be used within IconPositionProvider');
  }
  return context;
}
