'use client';

import { ReactNode } from 'react';
import { ThemeProvider } from 'styled-components';
import { styleReset } from 'react95';
import original from 'react95/dist/themes/original';
import { createGlobalStyle } from 'styled-components';

// Suppress react95 DOM prop warnings (react95 passes internal props to DOM)
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  const originalError = console.error;
  console.error = (...args: unknown[]) => {
    const msg = typeof args[0] === 'string' ? args[0] : '';
    if (
      msg.includes('for a non-boolean attribute') ||
      msg.includes('React does not recognize the')
    ) {
      return;
    }
    originalError.apply(console, args);
  };
}

const GlobalStyles = createGlobalStyle`
  ${styleReset}

  html, body {
    font-size: 14px;
    line-height: 1.25;
  }

  body, input, select, textarea {
    font-family: 'ms_sans_serif', 'Segoe UI', Tahoma, sans-serif;
  }

  *, *::before, *::after {
    font-family: 'ms_sans_serif', 'Pixelated MS Sans Serif', 'MS Sans Serif', 'Segoe UI', Tahoma, sans-serif;
  }
`;

interface React95ProviderProps {
  children: ReactNode;
}

export function React95Provider({ children }: React95ProviderProps) {
  return (
    <ThemeProvider theme={original}>
      <GlobalStyles />
      {children}
    </ThemeProvider>
  );
}
