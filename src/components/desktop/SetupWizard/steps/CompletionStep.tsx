'use client';

import styled from 'styled-components';
import { Button, Frame, GroupBox, Checkbox } from 'react95';
import { useState } from 'react';
import { CONTRACT_ADDRESS, RESOURCE_LINKS, BUY_LINKS } from '@/lib/links';
import { Win95Icon } from '@/components/ui/Win95Icon';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  height: 100%;
`;

const SuccessHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
`;

const SuccessIcon = styled.div`
  width: 28px;
  height: 28px;
  background: #008000;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 16px;
  font-weight: bold;
  flex-shrink: 0;
`;

const SuccessText = styled.div`
  h2 {
    font-size: 13px;
    font-weight: bold;
    color: #000080;
    margin: 0 0 2px 0;
  }

  p {
    font-size: 10px;
    margin: 0;
    color: #333;
  }
`;

const StyledGroupBox = styled(GroupBox)`
  padding: 6px;
`;

const ContractFrame = styled(Frame)`
  padding: 6px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
  background: #fff;
`;

const ContractText = styled.code`
  font-size: 8px;
  word-break: break-all;
  flex: 1;
  font-family: 'Courier New', monospace;
`;

const CopyButton = styled(Button).withConfig({
  shouldForwardProp: (prop) =>
    !['active', 'primary', 'fullWidth', 'square'].includes(prop),
})`
  font-size: 9px;
  padding: 3px 10px;
  height: 22px;
  min-width: 50px;
`;

const ButtonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4px;
`;

const ActionButton = styled(Button).withConfig({
  shouldForwardProp: (prop) =>
    !['active', 'primary', 'fullWidth', 'square'].includes(prop),
})`
  font-size: 9px;
  padding: 4px 6px;
  height: 24px;
`;

const DisclaimerSection = styled(Frame)`
  display: flex;
  align-items: flex-start;
  gap: 6px;
  padding: 6px;
  background: #ffffcc;
  flex-shrink: 0;
`;

const DisclaimerIcon = styled.div`
  flex-shrink: 0;
`;

const DisclaimerText = styled.p`
  font-size: 9px;
  line-height: 1.3;
  margin: 0;
  color: #333;
`;

const AcknowledgeRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 0;
  flex-shrink: 0;
  font-size: 11px;
  margin-top: auto;
`;

export function CompletionStep() {
  const [copied, setCopied] = useState(false);
  const [acknowledged, setAcknowledged] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(CONTRACT_ADDRESS);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textArea = document.createElement('textarea');
      textArea.value = CONTRACT_ADDRESS;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
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

      <StyledGroupBox label="Contract Address">
        <ContractFrame variant="field">
          <ContractText>{CONTRACT_ADDRESS}</ContractText>
          <CopyButton onClick={handleCopy}>
            {copied ? 'Copied!' : 'Copy'}
          </CopyButton>
        </ContractFrame>
      </StyledGroupBox>

      <StyledGroupBox label="Quick Links">
        <ButtonGrid>
          <ActionButton onClick={() => openLink(BUY_LINKS.uniswap)}>Uniswap</ActionButton>
          <ActionButton onClick={() => openLink(RESOURCE_LINKS.dexscreener)}>DexScreener</ActionButton>
          <ActionButton onClick={() => openLink(RESOURCE_LINKS.coingecko)}>CoinGecko</ActionButton>
          <ActionButton onClick={() => openLink(RESOURCE_LINKS.telegram)}>Telegram</ActionButton>
          <ActionButton onClick={() => openLink(RESOURCE_LINKS.x)}>Twitter/X</ActionButton>
          <ActionButton onClick={() => openLink(BUY_LINKS.coinbase)}>Coinbase</ActionButton>
        </ButtonGrid>
      </StyledGroupBox>

      <DisclaimerSection variant="field">
        <DisclaimerIcon>
          <Win95Icon name="warning" size={20} />
        </DisclaimerIcon>
        <DisclaimerText>
          $DICKBUTT has no association with K.C. Green. This is a meme coin
          with no intrinsic value or expectation of financial return.
        </DisclaimerText>
      </DisclaimerSection>

      <AcknowledgeRow>
        <Checkbox
          checked={acknowledged}
          onChange={() => setAcknowledged(!acknowledged)}
          label="I accept this is a meme coin — LFG! 🚀"
        />
      </AcknowledgeRow>
    </Container>
  );
}
