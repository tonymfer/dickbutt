'use client';

import styled from 'styled-components';
import Image from 'next/image';

const HeaderBar = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 28px;
  background: linear-gradient(180deg, #1e3a5f 0%, #2d5a87 50%, #1a4971 100%);
  display: flex;
  align-items: center;
  padding: 0 8px;
  z-index: 9999;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const IconWrapper = styled.div`
  width: 18px;
  height: 18px;
  position: relative;
  flex-shrink: 0;
`;

const Title = styled.span`
  color: white;
  font-size: 13px;
  font-weight: 500;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  letter-spacing: 0.3px;
`;

export function Header() {
  return (
    <HeaderBar>
      <Logo>
        <IconWrapper>
          <Image
            src="/assets/branding/dickbuttcoin.gif"
            alt="Dickbutt"
            fill
            style={{ objectFit: 'contain' }}
            unoptimized
          />
        </IconWrapper>
        <Title>Dickbutt</Title>
      </Logo>
    </HeaderBar>
  );
}
