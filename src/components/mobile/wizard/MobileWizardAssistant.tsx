'use client';

import Image from 'next/image';
import styled, { keyframes } from 'styled-components';

interface MobileWizardAssistantProps {
  step: number;
}

const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-4px); }
`;

const Container = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 8px;
  padding: 8px 16px;
`;

const SpeechBubble = styled.div`
  background: #ffffcc;
  border: 2px solid #000;
  border-radius: 8px;
  padding: 8px 12px;
  font-size: 12px;
  max-width: 200px;
  position: relative;
  box-shadow: 2px 2px 0 rgba(0,0,0,0.2);

  &::after {
    content: '';
    position: absolute;
    bottom: 10px;
    right: -8px;
    width: 0;
    height: 0;
    border-left: 8px solid #ffffcc;
    border-top: 6px solid transparent;
    border-bottom: 6px solid transparent;
  }

  &::before {
    content: '';
    position: absolute;
    bottom: 8px;
    right: -12px;
    width: 0;
    height: 0;
    border-left: 10px solid #000;
    border-top: 8px solid transparent;
    border-bottom: 8px solid transparent;
  }
`;

const AssistantImage = styled.div`
  width: 48px;
  height: 48px;
  flex-shrink: 0;
  animation: ${bounce} 3s ease-in-out infinite;
  position: relative;
  filter: drop-shadow(2px 2px 2px rgba(0,0,0,0.3));
`;

const stepTips: Record<number, string> = {
  1: "Hey! Let me tell you about the legendary Dickbutt meme!",
  2: "Check out these tokenomics - 0% tax, LP burned forever!",
  3: "We're on Phase 3 now - moon mission in progress!",
  4: "Get educated on the Dickbutt Standard!",
  5: "You're all set! Copy the contract and LFG!",
};

export function MobileWizardAssistant({ step }: MobileWizardAssistantProps) {
  return (
    <Container>
      <SpeechBubble>
        {stepTips[step] || "Welcome to $DICKBUTT!"}
      </SpeechBubble>
      <AssistantImage>
        <Image
          src="/assets/branding/dickbuttpfp.jpg"
          alt="Dickbutt Assistant"
          width={48}
          height={48}
          style={{ borderRadius: '50%', border: '2px solid #000080' }}
          draggable={false}
        />
      </AssistantImage>
    </Container>
  );
}
