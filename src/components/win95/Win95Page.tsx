'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { Window, WindowContent, Toolbar, Frame } from 'react95';
import { React95Provider } from '@/components/providers/React95Provider';
import styled from 'styled-components';
/* eslint-disable @next/next/no-img-element */

const PageContainer = styled.div`
  min-height: 100vh;
  background: #c0c0c0;
  padding: 16px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

const StyledWindow = styled(Window)`
  width: 100%;
  max-width: 1000px;
  display: flex;
  flex-direction: column;
  max-height: calc(100vh - 32px);
`;

const WindowTitlebar = styled.div`
  height: 18px;
  background: linear-gradient(to right, var(--ActiveTitle) 0%, var(--GradientActiveTitle) 100%);
  color: var(--TitleText);
  display: flex;
  align-items: center;
  padding: 0 2px;
  gap: 3px;
  flex-shrink: 0;
`;

const TitlebarIcon = styled.img`
  width: 16px;
  height: 16px;
  image-rendering: pixelated;
  flex-shrink: 0;
`;

const WindowTitleArea = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;
`;

const WindowTitle = styled.span`
  font-size: 11px;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-shadow: none;
`;

const WindowButton = styled.button`
  width: 16px;
  height: 14px;
  min-width: 16px;
  min-height: 14px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #c0c0c0;
  border: 2px solid;
  border-color: rgb(223, 223, 223) rgb(128, 128, 128) rgb(128, 128, 128) rgb(223, 223, 223);
  cursor: pointer;
  position: relative;

  &:active {
    border-color: rgb(128, 128, 128) rgb(223, 223, 223) rgb(223, 223, 223) rgb(128, 128, 128);
  }

  /* Close button X icon */
  &.window-close-button::before,
  &.window-close-button::after {
    content: '';
    position: absolute;
    width: 8px;
    height: 2px;
    background: #000;
    top: 50%;
    left: 50%;
  }
  &.window-close-button::before {
    transform: translate(-50%, -50%) rotate(45deg);
  }
  &.window-close-button::after {
    transform: translate(-50%, -50%) rotate(-45deg);
  }
`;

const StyledToolbar = styled(Toolbar)`
  flex-shrink: 0;
`;

const ContentWrapper = styled(WindowContent)`
  flex: 1;
  overflow: auto;
  padding: 16px;
`;

const StatusBar = styled.div`
  display: flex;
  gap: 4px;
  padding: 4px 8px;
  flex-shrink: 0;
`;

const StatusItem = styled.div`
  padding: 2px 8px;
  font-size: 11px;
`;

interface Win95PageProps {
  title: string;
  children: ReactNode;
  toolbar?: ReactNode;
  statusItems?: string[];
  maxWidth?: number;
  icon?: string;
}

function Win95PageContent({
  title,
  children,
  toolbar,
  statusItems,
  maxWidth = 1000,
  icon = '/assets/icons/win95/document.ico',
}: Win95PageProps) {
  return (
    <PageContainer>
      <StyledWindow style={{ maxWidth }}>
        <WindowTitlebar>
          <TitlebarIcon src={icon} alt="" />
          <WindowTitleArea>
            <WindowTitle>{title}</WindowTitle>
          </WindowTitleArea>
          <Link href="/">
            <WindowButton className="window-close-button" />
          </Link>
        </WindowTitlebar>

        {toolbar && (
          <StyledToolbar>
            {toolbar}
          </StyledToolbar>
        )}

        <ContentWrapper>
          {children}
        </ContentWrapper>

        {statusItems && statusItems.length > 0 && (
          <StatusBar>
            {statusItems.map((item, index) => (
              <Frame
                key={index}
                variant="status"
                style={index === 0 ? { flex: 1 } : undefined}
              >
                <StatusItem>{item}</StatusItem>
              </Frame>
            ))}
          </StatusBar>
        )}
      </StyledWindow>
    </PageContainer>
  );
}

export function Win95Page(props: Win95PageProps) {
  return (
    <React95Provider>
      <Win95PageContent {...props} />
    </React95Provider>
  );
}

// Export commonly used styled components for consistency
export { PageContainer, StyledWindow, WindowTitlebar, WindowTitle, WindowButton, StatusBar, StatusItem };
