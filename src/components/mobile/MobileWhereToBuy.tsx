'use client';

import { useState } from 'react';
import { Button, Frame, GroupBox, Tabs, Tab, TabBody, Tooltip } from 'react95';
import styled from 'styled-components';
import { BUY_LINKS } from '@/lib/links';

const Container = styled.div`
  padding: 8px;
  background: #c0c0c0;
`;

const StyledTabs = styled(Tabs)`
  width: 100%;
`;

const TabContent = styled(TabBody)`
  padding: 8px;
  min-height: 140px;
`;

const ExchangeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
`;

const ExchangeButton = styled(Button).withConfig({
  shouldForwardProp: (prop) =>
    !['active', 'primary', 'fullWidth', 'square'].includes(prop),
})<{ $featured?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 12px 8px;
  min-height: 70px;
  font-size: 11px;
  font-weight: bold;

  ${props => props.$featured && `
    background: linear-gradient(180deg, #ffffd0 0%, #c0c0c0 100%);
  `}
`;

const ExchangeIcon = styled.span`
  font-size: 24px;
`;

const ExchangeName = styled.span`
  font-size: 10px;
  text-align: center;
`;

const FeaturedBadge = styled.span`
  font-size: 8px;
  background: #000080;
  color: white;
  padding: 1px 4px;
  border-radius: 2px;
`;

const BottomFrame = styled(Frame)`
  margin-top: 8px;
  padding: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const HelpText = styled.span`
  font-size: 10px;
  color: #444;
`;

// DEX exchanges - decentralized
const dexExchanges = [
  { label: 'Uniswap', url: BUY_LINKS.uniswap, icon: '🦄', featured: true },
  { label: 'Aerodrome', url: BUY_LINKS.aerodrome, icon: '✈️', featured: true },
  { label: 'Matcha', url: BUY_LINKS.matcha, icon: '🍵' },
  { label: 'Interface', url: BUY_LINKS.interface, icon: '🔮' },
];

// CEX / Other exchanges
const cexExchanges = [
  { label: 'Coinbase', url: BUY_LINKS.coinbase, icon: '🪙', featured: true },
  { label: 'Flooz', url: BUY_LINKS.flooz, icon: '💫' },
  { label: 'XT.com', url: BUY_LINKS.xtcom, icon: '📊' },
  { label: 'Slingshot', url: BUY_LINKS.slingshot, icon: '🎯' },
];

export function MobileWhereToBuy() {
  const [activeTab, setActiveTab] = useState(0);

  const handleClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <Container>
      <StyledTabs value={activeTab} onChange={(value) => setActiveTab(value)}>
        <Tab value={0}>🔀 DEX</Tab>
        <Tab value={1}>🏦 CEX</Tab>
      </StyledTabs>

      <TabContent>
        {activeTab === 0 && (
          <ExchangeGrid>
            {dexExchanges.map((exchange) => (
              <ExchangeButton
                key={exchange.label}
                $featured={exchange.featured}
                onClick={() => handleClick(exchange.url)}
              >
                <ExchangeIcon>{exchange.icon}</ExchangeIcon>
                <ExchangeName>{exchange.label}</ExchangeName>
                {exchange.featured && <FeaturedBadge>POPULAR</FeaturedBadge>}
              </ExchangeButton>
            ))}
          </ExchangeGrid>
        )}

        {activeTab === 1 && (
          <ExchangeGrid>
            {cexExchanges.map((exchange) => (
              <ExchangeButton
                key={exchange.label}
                $featured={exchange.featured}
                onClick={() => handleClick(exchange.url)}
              >
                <ExchangeIcon>{exchange.icon}</ExchangeIcon>
                <ExchangeName>{exchange.label}</ExchangeName>
                {exchange.featured && <FeaturedBadge>POPULAR</FeaturedBadge>}
              </ExchangeButton>
            ))}
          </ExchangeGrid>
        )}
      </TabContent>

      <BottomFrame variant="status">
        <span>💡</span>
        <HelpText>Tap an exchange to buy $DICKBUTT</HelpText>
      </BottomFrame>
    </Container>
  );
}
