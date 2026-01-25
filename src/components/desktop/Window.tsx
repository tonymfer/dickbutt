'use client';

import { useDesktop, WindowState } from '@/context/DesktopContext';
import { motion, useDragControls, useMotionValue } from 'framer-motion';
import Image from 'next/image';
import { useEffect, type CSSProperties } from 'react';
import {
  Button,
  Window as Win95Window,
  WindowContent,
  WindowHeader,
} from 'react95';
import styled from 'styled-components';
import { windowContentRegistry } from './windows';

interface WindowProps {
  window: WindowState;
}

const StyledWindow = styled(Win95Window)`
  display: flex;
  flex-direction: column;
  min-width: 200px;
  max-width: 90vw;
  max-height: calc(100vh - 36px - 16px);
  user-select: none;
  padding: 0px;
`;

const StyledWindowHeader = styled(WindowHeader)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: move;
  padding: 2px 2px 2px 4px;
  min-height: 18px;
`;

const TitleText = styled.span`
  font-size: 11px;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
  line-height: 1;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1px;
  margin-left: 2px;
`;

const WindowButton = styled(Button).withConfig({
  shouldForwardProp: (prop) =>
    !['active', 'primary', 'fullWidth', 'square'].includes(prop),
})`
  width: 16px;
  height: 14px;
  min-width: 16px;
  min-height: 14px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #c0c0c0;
  border: none;
  box-shadow: inset -1px -1px #0a0a0a, inset 1px 1px #ffffff, inset -2px -2px #808080, inset 2px 2px #dfdfdf;

  &:active {
    box-shadow: inset 1px 1px #0a0a0a, inset -1px -1px #ffffff, inset 2px 2px #808080, inset -2px -2px #dfdfdf;
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
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 25,
        duration: 0.3,
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
        <StyledWindowHeader
          active={isActive}
          onPointerDown={(e) => {
            // Don't start drag if clicking buttons
            if ((e.target as HTMLElement).closest('button')) return;
            dragControls.start(e);
          }}
        >
          <TitleText>{win.title}</TitleText>
          <ButtonGroup>
            <WindowButton
              onClick={(e: React.MouseEvent) => {
                e.stopPropagation();
                minimizeWindow(win.id);
              }}
            >
              <span style={{ marginTop: '2px' }}>_</span>
            </WindowButton>
            <WindowButton
              onClick={(e: React.MouseEvent) => {
                e.stopPropagation();
                closeWindow(win.id);
              }}
            >
              ×
            </WindowButton>
          </ButtonGroup>
        </StyledWindowHeader>

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
