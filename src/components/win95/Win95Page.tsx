'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { Window, WindowHeader, WindowContent, Button, Toolbar, Frame } from 'react95';
import { React95Provider } from '@/components/providers/React95Provider';
import styled from 'styled-components';

const PageContainer = styled.div`
  min-height: 100vh;
  background: #008080;
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

const StyledWindowHeader = styled(WindowHeader)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
`;

const CloseButton = styled(Button).withConfig({
  shouldForwardProp: (prop) =>
    !['active', 'primary', 'fullWidth', 'square'].includes(prop),
})`
  padding: 0 4px;
  min-width: 20px;
  height: 18px;
  font-weight: bold;
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
}

function Win95PageContent({
  title,
  children,
  toolbar,
  statusItems,
  maxWidth = 1000,
}: Win95PageProps) {
  return (
    <PageContainer>
      <StyledWindow style={{ maxWidth }}>
        <StyledWindowHeader>
          <span>{title}</span>
          <Link href="/">
            <CloseButton size="sm">
              <span>X</span>
            </CloseButton>
          </Link>
        </StyledWindowHeader>

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
export { PageContainer, StyledWindow, StyledWindowHeader, CloseButton, StatusBar, StatusItem };
