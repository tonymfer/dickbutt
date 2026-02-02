'use client';

import { useDesktop, WindowState } from '@/context/DesktopContext';
import { motion, useDragControls, useMotionValue } from 'framer-motion';
import Image from 'next/image';
import { useEffect, type CSSProperties } from 'react';
import {
  Window as Win95Window,
  WindowContent,
} from 'react95';
import styled from 'styled-components';
import { windowContentRegistry } from './windows';

interface WindowProps {
  window: WindowState;
}

// Window icon mapping
const WINDOW_ICONS: Record<string, string> = {
  dickbutt: '/assets/icons/win95/paint.ico',
  dickbuttonbase: '/assets/icons/win95/globe.ico',
  disclaimer: '/assets/icons/win95/warning.ico',
  roadmap: '/assets/icons/win95/map.ico',
  origin: '/assets/icons/win95/book.ico',
  resources: '/assets/icons/win95/folder.ico',
  wheretobuy: '/assets/icons/win95/cart.ico',
  settings: '/assets/icons/win95/settings.ico',
  product: '/assets/icons/win95/cart.ico',
  meme: '/assets/icons/win95/media.ico',
  branding: '/assets/icons/win95/paint.ico',
  irl: '/assets/icons/win95/camera.ico',
};

const DEFAULT_ICON = '/assets/icons/win95/folder.ico';

const StyledWindow = styled(Win95Window)`
  display: flex;
  flex-direction: column;
  min-width: 200px;
  max-width: 90vw;
  max-height: calc(100vh - 36px - 16px);
  user-select: none;
  padding: 0px;
`;

const WindowTitlebar = styled.div<{ $active?: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  white-space: nowrap;
  overflow: hidden;
  flex-shrink: 0;
  font-family: 'Segoe UI', sans-serif;
  font-size: 12px;
  font-weight: bold;
  height: 18px;
  padding: 0 2px;
  cursor: move;
  background: ${({ $active }) =>
    $active
      ? 'linear-gradient(to right, var(--ActiveTitle) 0%, var(--GradientActiveTitle) 100%)'
      : 'linear-gradient(to right, var(--InactiveTitle) 0%, var(--GradientInactiveTitle) 100%)'};
  color: ${({ $active }) => ($active ? 'var(--TitleText)' : 'var(--InactiveTitleText)')};
`;

const TitlebarIcon = styled.img`
  width: 16px;
  height: 16px;
  margin-right: 3px;
  flex-shrink: 0;
`;

const WindowTitleArea = styled.div`
  flex: 1;
  overflow: hidden;
  display: flex;
  align-items: center;
`;

const WindowTitle = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1;
`;

const WindowButton = styled.button`
  display: block;
  width: 16px;
  height: 14px;
  padding: 0;
  margin: 0 0 0 2px;
  background-color: var(--ButtonFace);
  border: none;
  box-shadow: inset -1px -1px #0a0a0a, inset 1px 1px #ffffff, inset -2px -2px #808080, inset 2px 2px #dfdfdf;
  position: relative;
  flex-shrink: 0;
  cursor: pointer;

  &:active {
    box-shadow: inset 1px 1px #0a0a0a, inset -1px -1px #ffffff, inset 2px 2px #808080, inset -2px -2px #dfdfdf;
  }

  &:active .window-button-icon {
    transform: translate(1px, 1px);
  }

  .window-button-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  /* Minimize button - horizontal line at bottom */
  &.window-minimize-button .window-button-icon {
    width: 6px;
    height: 2px;
    background-color: #000;
    margin-top: 3px;
  }

  &.window-minimize-button:active .window-button-icon {
    transform: translate(calc(-50% + 1px), calc(-50% + 1px));
    margin-top: 3px;
  }

  /* Maximize button - box outline */
  &.window-maximize-button .window-button-icon {
    width: 8px;
    height: 8px;
    border: 1px solid #000;
    border-top-width: 2px;
    background: transparent;
    box-sizing: border-box;
  }

  &.window-maximize-button:active .window-button-icon {
    transform: translate(calc(-50% + 1px), calc(-50% + 1px));
  }

  /* Close button - X shape */
  &.window-close-button .window-button-icon {
    width: 8px;
    height: 8px;
  }

  &.window-close-button .window-button-icon::before,
  &.window-close-button .window-button-icon::after {
    content: '';
    position: absolute;
    width: 10px;
    height: 2px;
    background-color: #000;
    top: 50%;
    left: 50%;
  }

  &.window-close-button .window-button-icon::before {
    transform: translate(-50%, -50%) rotate(45deg);
  }

  &.window-close-button .window-button-icon::after {
    transform: translate(-50%, -50%) rotate(-45deg);
  }

  &.window-close-button:active .window-button-icon {
    transform: translate(calc(-50% + 1px), calc(-50% + 1px));
  }
`;

const StyledWindowContent = styled(WindowContent)`
  padding: 0;
  flex: 1;
  overflow: auto;
`;

const ImageContent = styled.div`
  background: white;
  overflow: auto;
  height: 100%;
`;

export function Window({ window: win }: WindowProps) {
  const { closeWindow, minimizeWindow, focusWindow, updateWindowPosition, activeWindowId } = useDesktop();
  const dragControls = useDragControls();

  // Use motion values for smooth dragging without state conflicts
  const x = useMotionValue(win.position.x);
  const y = useMotionValue(win.position.y);

  // Sync motion values when position changes externally
  useEffect(() => {
    x.set(win.position.x);
    y.set(win.position.y);
  }, [win.position.x, win.position.y, x, y]);

  if (win.minimized) return null;

  const isActive = activeWindowId === win.id;

  // Get the content component from registry
  const ContentComponent = win.contentType === 'component'
    ? windowContentRegistry[win.content]
    : null;

  const windowStyle: CSSProperties | undefined = win.size
    ? { width: win.size.width, height: win.size.height }
    : undefined;

  // Get icon for this window type
  const iconUrl = WINDOW_ICONS[win.content] || DEFAULT_ICON;

  return (
    <motion.div
      style={{
        position: 'absolute',
        zIndex: win.zIndex,
        x,
        y,
        top: 0,
        left: 0,
      }}
      drag
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      dragElastic={0}
      onDragEnd={() => {
        updateWindowPosition(win.id, {
          x: x.get(),
          y: y.get(),
        });
      }}
      onMouseDown={() => focusWindow(win.id)}
    >
      <StyledWindow style={windowStyle}>
        <WindowTitlebar
          $active={isActive}
          onPointerDown={(e) => {
            // Don't start drag if clicking buttons
            if ((e.target as HTMLElement).closest('button')) return;
            dragControls.start(e);
          }}
        >
          <TitlebarIcon
            src={iconUrl}
            width={16}
            height={16}
            alt=""
            draggable={false}
          />
          <WindowTitleArea>
            <WindowTitle>{win.title}</WindowTitle>
          </WindowTitleArea>
          <WindowButton
            className="window-minimize-button"
            aria-label="Minimize window"
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation();
              minimizeWindow(win.id);
            }}
          >
            <span className="window-button-icon" />
          </WindowButton>
          <WindowButton
            className="window-maximize-button"
            aria-label="Maximize window"
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation();
              // Maximize functionality not implemented yet
            }}
          >
            <span className="window-button-icon" />
          </WindowButton>
          <WindowButton
            className="window-close-button"
            aria-label="Close window"
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation();
              closeWindow(win.id);
            }}
          >
            <span className="window-button-icon" />
          </WindowButton>
        </WindowTitlebar>

        <StyledWindowContent>
          {ContentComponent ? (
            <ContentComponent onClose={() => closeWindow(win.id)} />
          ) : (
            <ImageContent>
              <Image
                src={win.content}
                alt={win.title}
                width={400}
                height={300}
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  width: 'auto',
                  height: 'auto',
                  imageRendering: 'auto',
                }}
                draggable={false}
              />
            </ImageContent>
          )}
        </StyledWindowContent>
      </StyledWindow>
    </motion.div>
  );
}
