'use client';

import styled, { keyframes } from 'styled-components';
import Image from 'next/image';

interface ClippyAssistantProps {
  message: string;
}

const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-3px); }
`;

const Container = styled.div`
  position: absolute;
  bottom: 50px;
  right: 12px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  z-index: 100;
`;

const SpeechBubble = styled.div`
  background: #ffffcc;
  border: 2px solid #000;
  border-radius: 8px;
  padding: 8px 10px;
  font-size: 10px;
  max-width: 180px;
  position: relative;
  box-shadow: 2px 2px 0 rgba(0,0,0,0.2);

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    right: 20px;
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
    right: 18px;
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 12px solid #000;
  }
`;

const ClippyImage = styled.div`
  width: 48px;
  height: 48px;
  margin-top: 6px;
  animation: ${bounce} 2s ease-in-out infinite;
  position: relative;
`;

export function ClippyAssistant({ message }: ClippyAssistantProps) {
  return (
    <Container>
      <SpeechBubble>{message}</SpeechBubble>
      <ClippyImage>
        <Image
          src="/assets/branding/dickbuttpfp.jpg"
          alt="Dickbutt Assistant"
          width={48}
          height={48}
          style={{ borderRadius: '50%', border: '2px solid #000' }}
        />
      </ClippyImage>
    </Container>
  );
}
