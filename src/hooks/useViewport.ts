'use client';

import { useEffect, useRef, useState } from 'react';

interface ViewportDimensions {
  width: number;
  height: number;
  isDesktop: boolean;
  isTablet: boolean;
  isMobile: boolean;
}

const BREAKPOINTS = {
  mobile: 640,
  tablet: 1024,
};

const DEFAULT_VIEWPORT = {
  width: 1200,
  height: 800,
} as const;

export function useViewport(): ViewportDimensions {
  // Hydration-safe: server + first client render use the same defaults,
  // then we update to real viewport in an effect.
  const [dimensions, setDimensions] = useState<ViewportDimensions>(() => {
    const width = DEFAULT_VIEWPORT.width;
    const height = DEFAULT_VIEWPORT.height;
    return {
      width,
      height,
      isMobile: width < BREAKPOINTS.mobile,
      isTablet: width >= BREAKPOINTS.mobile && width < BREAKPOINTS.tablet,
      isDesktop: width >= BREAKPOINTS.tablet,
    };
  });

  const hasLoggedRef = useRef(false);
  if (!hasLoggedRef.current) {
    hasLoggedRef.current = true;
    if (process.env.NODE_ENV === 'development') {
      console.info(`[useViewport] initial ${JSON.stringify(dimensions)}`);
    }
  }

  useEffect(() => {
    const updateDimensions = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      if (process.env.NODE_ENV === 'development') {
        console.info(`[useViewport] update ${JSON.stringify({ width, height })}`);
      }

      setDimensions({
        width,
        height,
        isMobile: width < BREAKPOINTS.mobile,
        isTablet: width >= BREAKPOINTS.mobile && width < BREAKPOINTS.tablet,
        isDesktop: width >= BREAKPOINTS.tablet,
      });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  return dimensions;
}
