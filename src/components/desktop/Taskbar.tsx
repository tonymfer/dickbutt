'use client';

import { useState, useEffect } from 'react';
import { useDesktop } from '@/context/DesktopContext';
import { StartMenu } from './StartMenu';
import { AppBar, Toolbar, Button, Frame } from 'react95';
import styled from 'styled-components';
/* eslint-disable @next/next/no-img-element */

const StyledAppBar = styled(AppBar)`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  top: auto;
  z-index: 9999;
`;

const StyledToolbar = styled(Toolbar)`
  display: flex;
  justify-content: space-between;
  padding: 4px;
`;

const StartButton = styled(Button).withConfig({
  shouldForwardProp: (prop) =>
    !['active', 'primary', 'fullWidth', 'square'].includes(prop),
})<{ $active: boolean }>`
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 4px;
  ${({ $active }) => $active && 'box-shadow: inset 1px 1px 0px 1px #808080, inset -1px -1px 0px 1px #dfdfdf;'}
`;

const Divider = styled.div`
  width: 2px;
  height: 24px;
  background: linear-gradient(to right, #808080, #ffffff);
  margin: 0 4px;
`;

const WindowTabs = styled.div`
  flex: 1;
  display: flex;
  gap: 4px;
  padding: 0 4px;
  overflow: hidden;
`;

const WindowTab = styled(Button).withConfig({
  shouldForwardProp: (prop) =>
    !['active', 'primary', 'fullWidth', 'square'].includes(prop),
})<{ $active: boolean }>`
  max-width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 12px;
  ${({ $active }) => $active && 'box-shadow: inset 1px 1px 0px 1px #808080, inset -1px -1px 0px 1px #dfdfdf;'}
`;

const Clock = styled(Frame)`
  display: flex;
  align-items: center;
  padding: 0 8px;
  height: 24px;
  font-size: 12px;
`;

export function Taskbar() {
  const { windows, activeWindowId, focusWindow } = useDesktop();
  const [showStartMenu, setShowStartMenu] = useState(false);
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {showStartMenu && <StartMenu onClose={() => setShowStartMenu(false)} />}
      <StyledAppBar>
        <StyledToolbar>
          <StartButton
            $active={showStartMenu}
            onClick={() => setShowStartMenu(!showStartMenu)}
          >
            <img src="/assets/icons/win95/windows.ico" alt="" width={16} height={16} style={{ imageRendering: 'pixelated' }} />
            Start
          </StartButton>

          <Divider />

          <WindowTabs>
            {windows.map((win) => (
              <WindowTab
                key={win.id}
                $active={activeWindowId === win.id && !win.minimized}
                onClick={() => focusWindow(win.id)}
              >
                {win.title}
              </WindowTab>
            ))}
          </WindowTabs>

          <Clock variant="well">
            {time}
          </Clock>
        </StyledToolbar>
      </StyledAppBar>
    </>
  );
}
