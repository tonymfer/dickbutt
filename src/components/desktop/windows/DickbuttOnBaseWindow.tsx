'use client';

import { BASESCAN_CONTRACT_URL, BUY_LINKS, CONTRACT_ADDRESS, RESOURCE_LINKS } from '@/lib/links';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { Button, TextInput } from 'react95';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 8px 10px;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background: #c0c0c0;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const CoinIcon = styled.div`
  width: 36px;
  height: 36px;
  flex-shrink: 0;
  position: relative;
`;

const TitleSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
`;

const Title = styled.h1`
  font-size: 16px;
  font-weight: bold;
  margin: 0;
  color: #000;
`;

const Subtitle = styled.p`
  font-size: 11px;
  margin: 0;
  color: #333;
`;

const CARow = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
`;

const CAInput = styled(TextInput)`
  flex: 1;
  font-family: monospace;
  font-size: 11px;
  height: 24px;
`;

const CopyButton = styled(Button).withConfig({
  shouldForwardProp: (prop) =>
    !['active', 'primary', 'fullWidth', 'square'].includes(prop),
})`
  min-width: 50px;
  height: 24px;
  font-size: 11px;
  font-weight: bold;
`;

const ButtonRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
`;

const LinkButton = styled(Button).withConfig({
  shouldForwardProp: (prop) =>
    !['active', 'primary', 'fullWidth', 'square'].includes(prop),
})`
  height: 22px;
  font-size: 10px;
  padding: 0 8px;
`;

// Primary links - socials, price tracking, buying
const links = [
  { label: 'Buy', url: BUY_LINKS.uniswap },
  { label: 'Chart', url: RESOURCE_LINKS.dexscreener },
  { label: 'CoinGecko', url: RESOURCE_LINKS.coingecko },
  { label: 'CMC', url: RESOURCE_LINKS.coinmarketcap },
  { label: 'X', url: RESOURCE_LINKS.x },
  { label: 'Telegram', url: RESOURCE_LINKS.telegram },
  { label: 'Farcaster', url: RESOURCE_LINKS.farcaster },
  { label: 'TikTok', url: RESOURCE_LINKS.tiktok },
  { label: 'YouTube', url: RESOURCE_LINKS.youtube },
  { label: 'Linktree', url: RESOURCE_LINKS.linktree },
  { label: 'Contract', url: BASESCAN_CONTRACT_URL },
];

export function DickbuttOnBaseWindow() {
  const [copied, setCopied] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return;
    const el = rootRef.current;
    if (!el) return;

    const log = () => {
      const clientH = el.clientHeight;
      const scrollH = el.scrollHeight;
      const overflowY = scrollH - clientH;
      console.info(
        `[layout-check] dickbuttonbase content ${JSON.stringify(
          { clientH, scrollH, overflowY },
          null,
          2
        )}`
      );
    };

    log();
    const t = setTimeout(log, 250);
    return () => clearTimeout(t);
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(CONTRACT_ADDRESS);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <Container ref={rootRef}>
      <Header>
        <CoinIcon>
          <Image
            src="/assets/branding/dickbuttcoin.gif"
            alt="Dickbutt coin"
            fill
            style={{ objectFit: 'contain', imageRendering: 'pixelated' }}
            unoptimized
          />
        </CoinIcon>
        <TitleSection>
          <Title>$DICKBUTT</Title>
          <Subtitle>The hardest memecoin in existence.</Subtitle>
        </TitleSection>
      </Header>

      <CARow>
        <CAInput value={CONTRACT_ADDRESS} readOnly />
        <CopyButton onClick={handleCopy}>
          {copied ? 'Copied!' : 'Copy'}
        </CopyButton>
      </CARow>

      <ButtonRow>
        {links.map((link) => (
          <LinkButton key={link.label} onClick={() => handleClick(link.url)}>
            {link.label}
          </LinkButton>
        ))}
      </ButtonRow>
    </Container>
  );
}
