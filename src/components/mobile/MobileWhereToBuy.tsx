'use client';

import { useState } from 'react';
import { Tabs, Tab, TabBody } from 'react95';
import styled from 'styled-components';
import { WHERE_TO_BUY_CONTENT } from '@/lib/windowContent';
import { Win98Button, Win98Frame } from '@/components/ui/win98';

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

const ExchangeButton = styled(Win98Button)<{ $featured?: boolean }>`
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

const BottomFrame = styled(Win98Frame)`
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
            {WHERE_TO_BUY_CONTENT.dexExchanges.map((exchange) => (
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
            {WHERE_TO_BUY_CONTENT.cexExchanges.map((exchange) => (
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

      <BottomFrame $variant="status">
        <span>💡</span>
        <HelpText>Tap an exchange to buy $DICKBUTT</HelpText>
      </BottomFrame>
    </Container>
  );
}
