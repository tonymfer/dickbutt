'use client';

import { useState } from 'react';
import { useDesktop } from '@/context/DesktopContext';
import { useWizard } from '@/context/WizardContext';
import { useClock } from '@/hooks/useClock';
import { WINDOW_ICONS } from '@/lib/constants/icons';
import { StartMenu } from './StartMenu';
import styled from 'styled-components';
import { Win98AppBar, Win98Toolbar, Win98Frame } from '@/components/ui/win98';
/* eslint-disable @next/next/no-img-element */

const StyledAppBar = styled(Win98AppBar)`
  height: 28px;
`;

const StyledToolbar = styled(Win98Toolbar)`
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

const StartButton = styled.button<{ $active: boolean }>`
  font-weight: bold;
  font-size: 11px;
  font-family: 'Segoe UI', Tahoma, sans-serif;
  display: flex;
  align-items: center;
  gap: 3px;
  padding: 2px 6px;
  height: 22px;
  cursor: pointer;
  border: 2px solid;
  ${({ $active }) => $active
    ? `
      background-color: transparent;
      border-color: rgb(128, 128, 128) rgb(223, 223, 223) rgb(223, 223, 223) rgb(128, 128, 128);
      background-image: url("data:image/svg+xml,%3Csvg width='2' height='2' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='0' y='0' width='1' height='1' fill='%23ffffff'/%3E%3Crect x='1' y='1' width='1' height='1' fill='%23ffffff'/%3E%3C/svg%3E");
      background-size: 2px 2px;
    `
    : `
      background-color: #c0c0c0;
      border-color: rgb(223, 223, 223) rgb(128, 128, 128) rgb(128, 128, 128) rgb(223, 223, 223);
    `
  }

  &:active {
    border-color: rgb(128, 128, 128) rgb(223, 223, 223) rgb(223, 223, 223) rgb(128, 128, 128);
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

const WindowTab = styled.button<{ $active: boolean }>`
  width: 160px;
  min-width: 80px;
  flex-shrink: 1;
  height: 22px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 11px;
  font-family: 'Segoe UI', Tahoma, sans-serif;
  padding: 2px 4px;
  display: flex;
  align-items: center;
  gap: 3px;
  justify-content: flex-start;
  cursor: pointer;
  border: 2px solid;
  ${({ $active }) => $active
    ? `
      background-color: transparent;
      border-color: rgb(128, 128, 128) rgb(223, 223, 223) rgb(223, 223, 223) rgb(128, 128, 128);
      background-image: url("data:image/svg+xml,%3Csvg width='2' height='2' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='0' y='0' width='1' height='1' fill='%23ffffff'/%3E%3Crect x='1' y='1' width='1' height='1' fill='%23ffffff'/%3E%3C/svg%3E");
      background-size: 2px 2px;
    `
    : `
      background-color: #c0c0c0;
      border-color: rgb(223, 223, 223) rgb(128, 128, 128) rgb(128, 128, 128) rgb(223, 223, 223);
    `
  }

  &:active {
    border-color: rgb(128, 128, 128) rgb(223, 223, 223) rgb(223, 223, 223) rgb(128, 128, 128);
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

const SystemTray = styled(Win98Frame)`
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
  const { wizardVisible } = useWizard();
  const [showStartMenu, setShowStartMenu] = useState(false);
  const time = useClock();

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
              <img src="/assets/icons/win95/start.png" alt="" width={16} height={14} style={{ imageRendering: 'pixelated' }} />
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
            {wizardVisible && (
              <WindowTab $active={true}>
                <TabIcon
                  src="/assets/icons/win95/settings.ico"
                  alt=""
                />
                <TabTitle>$DICKBUTT Setup</TabTitle>
              </WindowTab>
            )}
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

          <SystemTray $variant="well">
            <TrayIcon title="Task Scheduler is not ready.">
              <img src="/assets/icons/win95/task-scheduler-16x16.png" alt="Task Scheduler" />
            </TrayIcon>
            <TrayIcon title="Volume">
              <img src="/assets/icons/win95/audio-okay-16x16.png" alt="Volume" />
            </TrayIcon>
            <Clock>{time}</Clock>
          </SystemTray>
        </StyledToolbar>
      </StyledAppBar>
    </>
  );
}
