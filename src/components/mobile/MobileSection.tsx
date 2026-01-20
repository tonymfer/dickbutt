'use client';

import { Frame, Window, WindowHeader, WindowContent } from 'react95';
import styled from 'styled-components';
import { ReactNode } from 'react';

interface MobileSectionProps {
  title: string;
  children: ReactNode;
  /** If true, content area will have no padding (for full-bleed content) */
  noPadding?: boolean;
}

const SectionContainer = styled.div`
  width: 100%;
`;

const StyledWindow = styled(Window)`
  width: 100%;
`;

const StyledWindowHeader = styled(WindowHeader)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
  padding: 3px 4px;
  user-select: none;
`;

const StyledWindowContent = styled(WindowContent)<{ $noPadding?: boolean }>`
  padding: ${props => props.$noPadding ? '0' : '8px'};
`;

export function MobileSection({ title, children, noPadding }: MobileSectionProps) {
  return (
    <SectionContainer>
      <StyledWindow>
        <StyledWindowHeader>
          <span>{title}</span>
        </StyledWindowHeader>
        <StyledWindowContent $noPadding={noPadding}>
          {children}
        </StyledWindowContent>
      </StyledWindow>
    </SectionContainer>
  );
}
