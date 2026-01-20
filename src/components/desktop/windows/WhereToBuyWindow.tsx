'use client';

import { Button } from 'react95';
import styled from 'styled-components';
import { BUY_LINKS } from '@/lib/links';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  padding: 4px;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
`;

const StyledButton = styled(Button).withConfig({
  shouldForwardProp: (prop) =>
    !['active', 'primary', 'fullWidth', 'square'].includes(prop),
})`
  width: 100%;
  height: 22px;
  font-size: 10px;
  font-weight: bold;
  flex-shrink: 0;
`;

// Major exchanges only
const exchanges = [
  { label: 'Uniswap', url: BUY_LINKS.uniswap },
  { label: 'Aerodrome', url: BUY_LINKS.aerodrome },
  { label: 'Coinbase', url: BUY_LINKS.coinbase },
  { label: 'Matcha', url: BUY_LINKS.matcha },
  { label: 'Interface', url: BUY_LINKS.interface },
  { label: 'Flooz', url: BUY_LINKS.flooz },
];

export function WhereToBuyWindow() {
  const handleClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <Container>
      {exchanges.map((exchange) => (
        <StyledButton key={exchange.label} onClick={() => handleClick(exchange.url)}>
          {exchange.label}
        </StyledButton>
      ))}
    </Container>
  );
}
