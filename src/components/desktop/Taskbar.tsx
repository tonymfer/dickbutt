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
  height: 28px;
`;

const StyledToolbar = styled(Toolbar)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2px 2px;
  min-height: 24px;
  height: 24px;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
`;

const StartButton = styled(Button).withConfig({
  shouldForwardProp: (prop) =>
    !['active', 'primary', 'fullWidth', 'square'].includes(prop),
})<{ $active: boolean }>`
  font-weight: bold;
  font-size: 11px;
  display: flex;
  align-items: center;
  gap: 3px;
  padding: 2px 6px;
  height: 22px;
  ${({ $active }) => $active
    ? `
      background-color: transparent;
      border: 2px solid #808080;
      box-shadow: none;
      background-image: url("data:image/svg+xml,%3Csvg width='2' height='2' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='0' y='0' width='1' height='1' fill='%23ffffff'/%3E%3Crect x='1' y='1' width='1' height='1' fill='%23ffffff'/%3E%3C/svg%3E");
      background-size: 2px 2px;
    `
    : `
      background-color: #c0c0c0;
      box-shadow: inset -1px -1px #0a0a0a, inset 1px 1px #fff, inset -2px -2px #808080, inset 2px 2px #dfdfdf;
    `
  }
`;

const VerticalDivider = styled.div`
  width: 2px;
  height: 22px;
  margin: 0 2px;
  box-shadow: inset 1px 0 #808080, inset -1px 0 #fff;
`;

const QuickLaunch = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  padding: 0 4px;
`;

const QuickLaunchIcon = styled.button`
  width: 20px;
  height: 20px;
  padding: 2px;
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }

  &:active {
    background: rgba(0, 0, 0, 0.1);
  }

  img {
    width: 16px;
    height: 16px;
    image-rendering: pixelated;
  }
`;

const WindowTabs = styled.div`
  flex: 1;
  display: flex;
  gap: 2px;
  padding: 0 4px;
  overflow: hidden;
`;

const WindowTab = styled(Button).withConfig({
  shouldForwardProp: (prop) =>
    !['active', 'primary', 'fullWidth', 'square'].includes(prop),
})<{ $active: boolean }>`
  min-width: 24px;
  max-width: 140px;
  height: 22px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 11px;
  padding: 2px 4px;
  display: flex;
  align-items: center;
  gap: 3px;
  justify-content: flex-start;
  ${({ $active }) => $active
    ? `
      background-color: transparent;
      border: 2px solid #808080;
      box-shadow: none;
      background-image: url("data:image/svg+xml,%3Csvg width='2' height='2' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='0' y='0' width='1' height='1' fill='%23ffffff'/%3E%3Crect x='1' y='1' width='1' height='1' fill='%23ffffff'/%3E%3C/svg%3E");
      background-size: 2px 2px;
    `
    : `
      background-color: #c0c0c0;
      box-shadow: inset -1px -1px #0a0a0a, inset 1px 1px #fff, inset -2px -2px #808080, inset 2px 2px #dfdfdf;
    `
  }
`;

const TabIcon = styled.img`
  width: 16px;
  height: 16px;
  image-rendering: pixelated;
  flex-shrink: 0;
`;

const TabTitle = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

// Map window IDs to their icons
const WINDOW_ICONS: Record<string, string> = {
  resources: '/assets/icons/win95/book.ico',
  product: '/assets/icons/win95/book.ico',
  origin: '/assets/icons/win95/scroll.ico',
  dickbutt: '/assets/icons/win95/money.ico',
  wheretobuy: '/assets/icons/win95/cart.ico',
  roadmap: '/assets/icons/win95/map.ico',
  disclaimer: '/assets/icons/win95/warning.ico',
  dickbuttonbase: '/assets/icons/win95/computer.ico',
  settings: '/assets/icons/win95/settings.ico',
  meme: '/assets/icons/win95/folder-hires.ico',
  branding: '/assets/icons/win95/folder-hires.ico',
  irl: '/assets/icons/win95/folder-hires.ico',
};

const SystemTray = styled(Frame)`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 2px 6px;
  height: 22px;
`;

const TrayIcon = styled.div`
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  img {
    width: 16px;
    height: 16px;
    image-rendering: pixelated;
  }
`;

const Clock = styled.span`
  font-size: 11px;
  margin-left: 4px;
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
          <LeftSection>
            <StartButton
              $active={showStartMenu}
              onClick={() => setShowStartMenu(!showStartMenu)}
            >
              <img src="/assets/icons/win95/windows-logo.ico" alt="" width={16} height={16} style={{ imageRendering: 'pixelated' }} />
              Start
            </StartButton>

            <VerticalDivider />

            <QuickLaunch>
              <QuickLaunchIcon title="Contract">
                <img src="/assets/icons/win95/contract.ico" alt="Contract" />
              </QuickLaunchIcon>
              <QuickLaunchIcon title="Meme Folder">
                <img src="/assets/icons/win95/folder-hires.ico" alt="Folder" />
              </QuickLaunchIcon>
            </QuickLaunch>

            <VerticalDivider />
          </LeftSection>

          <WindowTabs>
            {windows.map((win) => (
              <WindowTab
                key={win.id}
                $active={activeWindowId === win.id && !win.minimized}
                onClick={() => focusWindow(win.id)}
              >
                <TabIcon
                  src={WINDOW_ICONS[win.id] || '/assets/icons/win95/document.ico'}
                  alt=""
                />
                <TabTitle>{win.title}</TabTitle>
              </WindowTab>
            ))}
          </WindowTabs>

          <SystemTray variant="well">
            <TrayIcon title="Task Scheduler">
              <img src="/assets/icons/win95/settings.ico" alt="Task Scheduler" />
            </TrayIcon>
            <TrayIcon title="Volume">
              <img src="/assets/icons/win95/speaker.ico" alt="Volume" />
            </TrayIcon>
            <Clock>{time}</Clock>
          </SystemTray>
        </StyledToolbar>
      </StyledAppBar>
    </>
  );
}
