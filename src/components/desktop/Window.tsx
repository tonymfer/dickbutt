'use client';

import { motion, useMotionValue, useDragControls } from 'framer-motion';
import { useDesktop, WindowState } from '@/context/DesktopContext';
import Image from 'next/image';
import { useEffect, type CSSProperties } from 'react';
import {
  Window as Win95Window,
  WindowHeader,
  WindowContent,
  Button,
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
`;

const StyledWindowHeader = styled(WindowHeader)<{ $isActive: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: move;
  ${({ $isActive }) => !$isActive && 'background: linear-gradient(90deg, #808080, #a0a0a0);'}
`;

const TitleText = styled.span`
  font-size: 12px;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 2px;
  margin-left: 4px;
`;

const WindowButton = styled(Button).withConfig({
  shouldForwardProp: (prop) =>
    !['active', 'primary', 'fullWidth', 'square'].includes(prop),
})`
  width: 18px;
  height: 18px;
  min-width: 18px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: bold;
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
          $isActive={isActive}
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
              _
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
