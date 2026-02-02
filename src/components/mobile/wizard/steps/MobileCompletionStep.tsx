'use client';

import styled from 'styled-components';
import { Win98Button, Win98Frame, GroupBox } from '@/components/ui/win98';
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';
import { CONTRACT_ADDRESS, RESOURCE_LINKS, BUY_LINKS } from '@/lib/links';
import { Win95Icon } from '@/components/ui/Win95Icon';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
  height: 100%;
  overflow-y: auto;
`;

const SuccessHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
`;

const SuccessIcon = styled.div`
  width: 36px;
  height: 36px;
  background: #008000;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 20px;
  font-weight: bold;
  flex-shrink: 0;
`;

const SuccessText = styled.div`
  h2 {
    font-size: 16px;
    font-weight: bold;
    color: #000080;
    margin: 0 0 4px 0;
  }

  p {
    font-size: 13px;
    margin: 0;
    color: #333;
  }
`;

const StyledGroupBox = styled.div`
  padding: 10px;
`;

const ContractFrame = styled(Win98Frame)`
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  background: #fff;
`;

const ContractText = styled.code`
  font-size: 10px;
  word-break: break-all;
  font-family: 'Courier New', monospace;
`;

const CopyButton = styled(Win98Button)`
  font-size: 12px;
  padding: 6px 16px;
  height: 28px;
  align-self: flex-start;
`;

const ButtonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
`;

const ActionButton = styled(Win98Button)`
  font-size: 12px;
  padding: 8px 10px;
  height: 32px;
`;

const DisclaimerSection = styled(Win98Frame)`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 10px;
  background: #ffffcc;
  flex-shrink: 0;
`;

const DisclaimerIcon = styled.div`
  flex-shrink: 0;
`;

const DisclaimerText = styled.p`
  font-size: 11px;
  line-height: 1.4;
  margin: 0;
  color: #333;
`;

export function MobileCompletionStep() {
  const { copied, copy } = useCopyToClipboard();

  const handleCopy = () => {
    copy(CONTRACT_ADDRESS);
  };

  const openLink = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <Container>
      <SuccessHeader>
        <SuccessIcon>✓</SuccessIcon>
        <SuccessText>
          <h2>Setup Complete!</h2>
          <p>You&apos;re ready to join the $DICKBUTT revolution on Base.</p>
        </SuccessText>
      </SuccessHeader>

      <GroupBox label="Contract Address" style={{ padding: 10 }}>
        <ContractFrame $variant="field">
          <ContractText>{CONTRACT_ADDRESS}</ContractText>
          <CopyButton onClick={handleCopy}>
            {copied ? 'Copied!' : 'Copy Address'}
          </CopyButton>
        </ContractFrame>
      </GroupBox>

      <GroupBox label="Quick Links" style={{ padding: 10 }}>
        <ButtonGrid>
          <ActionButton onClick={() => openLink(BUY_LINKS.uniswap)}>Uniswap</ActionButton>
          <ActionButton onClick={() => openLink(RESOURCE_LINKS.dexscreener)}>DexScreener</ActionButton>
          <ActionButton onClick={() => openLink(RESOURCE_LINKS.coingecko)}>CoinGecko</ActionButton>
          <ActionButton onClick={() => openLink(RESOURCE_LINKS.telegram)}>Telegram</ActionButton>
          <ActionButton onClick={() => openLink(RESOURCE_LINKS.x)}>Twitter/X</ActionButton>
          <ActionButton onClick={() => openLink(BUY_LINKS.coinbase)}>Coinbase</ActionButton>
        </ButtonGrid>
      </GroupBox>

      <DisclaimerSection $variant="field">
        <DisclaimerIcon>
          <Win95Icon name="warning" size={24} />
        </DisclaimerIcon>
        <DisclaimerText>
          $DICKBUTT has no association with K.C. Green. This is a meme coin
          with no intrinsic value or expectation of financial return.
        </DisclaimerText>
      </DisclaimerSection>
    </Container>
  );
}
