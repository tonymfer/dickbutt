'use client';

import { useState } from 'react';
import { Button, Tabs, Tab, TabBody } from 'react95';
import styled from 'styled-components';
import { WHERE_TO_BUY_CONTENT } from '@/lib/windowContent';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background: #c0c0c0;
`;

const StyledTabs = styled(Tabs)`
  width: 100%;
  font-size: 10px;
`;

const StyledTab = styled(Tab)`
  font-size: 10px;
  padding: 2px 8px;
`;

const TabContent = styled(TabBody)`
  padding: 4px;
  flex: 1;
  min-height: 0;
`;

const ExchangeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 3px;
`;

const ExchangeButton = styled(Button).withConfig({
  shouldForwardProp: (prop) =>
    !['active', 'primary', 'fullWidth', 'square'].includes(prop),
})<{ $featured?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 4px;
  height: 24px;
  font-size: 9px;
  font-weight: bold;

  ${props => props.$featured && `
    background: linear-gradient(180deg, #ffffd0 0%, #c0c0c0 100%);
  `}
`;

const ExchangeIcon = styled.span`
  font-size: 12px;
`;

export function WhereToBuyWindow() {
  const [activeTab, setActiveTab] = useState(0);

  const handleClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <Container>
      <StyledTabs value={activeTab} onChange={(value) => setActiveTab(value)}>
        <StyledTab value={0}>🔀 DEX</StyledTab>
        <StyledTab value={1}>🏦 CEX</StyledTab>
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
                {exchange.label}
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
                {exchange.label}
              </ExchangeButton>
            ))}
          </ExchangeGrid>
        )}
      </TabContent>
    </Container>
  );
}
