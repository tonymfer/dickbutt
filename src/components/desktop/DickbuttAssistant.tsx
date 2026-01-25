'use client';

import { useWizard } from '@/context/WizardContext';
import Image from 'next/image';
import styled, { keyframes } from 'styled-components';

const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
`;

const Container = styled.div<{ $visible: boolean }>`
  position: fixed;
  bottom: 50px;
  right: 16px;
  display: ${props => props.$visible ? 'flex' : 'none'};
  flex-direction: column;
  align-items: flex-end;
  z-index: 9000;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
  }
`;

const SpeechBubble = styled.div`
  background: #ffffcc;
  border: 2px solid #000;
  border-radius: 8px;
  padding: 8px 12px;
  font-size: 11px;
  max-width: 200px;
  position: relative;
  box-shadow: 2px 2px 0 rgba(0,0,0,0.2);
  margin-bottom: 6px;

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    right: 24px;
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-top: 10px solid #ffffcc;
  }

  &::before {
    content: '';
    position: absolute;
    bottom: -13px;
    right: 22px;
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 12px solid #000;
  }
`;

const AssistantImage = styled.div`
  width: 64px;
  height: 64px;
  animation: ${bounce} 3s ease-in-out infinite;
  position: relative;
  filter: drop-shadow(2px 2px 2px rgba(0,0,0,0.3));

  &:hover {
    animation-play-state: paused;
  }
`;

const HelpText = styled.span`
  font-weight: bold;
  color: #000080;
`;

export function DickbuttAssistant() {
  const { wizardVisible, showWizard } = useWizard();

  // Don't show assistant when wizard is already open
  if (wizardVisible) return null;

  return (
    <Container $visible={!wizardVisible} onClick={showWizard} title="Click to open Setup Wizard">
      <SpeechBubble>
        <HelpText>Need help?</HelpText> Click me to run the Setup Wizard again!
      </SpeechBubble>
      <AssistantImage>
        <Image
          src="/assets/branding/dickbuttpfp.jpg"
          alt="Dickbutt Assistant"
          width={64}
          height={64}
          style={{ borderRadius: '50%', border: '3px solid #000080' }}
          draggable={false}
        />
      </AssistantImage>
    </Container>
  );
}
