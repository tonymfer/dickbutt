'use client';

import styled from 'styled-components';
import Image from 'next/image';

interface WizardSidebarProps {
  step: number;
}

const Sidebar = styled.div`
  width: 160px;
  min-width: 160px;
  align-self: stretch;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const BackgroundImage = styled(Image)`
  object-fit: cover;
  object-position: center;
  z-index: 0;
`;

const Content = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 12px 6px;
`;

const TopText = styled.div`
  text-align: center;
  font-family: 'Arial Black', 'Arial', sans-serif;
  font-weight: 900;
  font-size: 18px;
  color: #ffffff;
  text-shadow:
    2px 2px 0 #000080,
    -1px -1px 0 #000080,
    1px -1px 0 #000080,
    -1px 1px 0 #000080,
    0 2px 4px rgba(0, 0, 0, 0.5);
  letter-spacing: -0.5px;
`;

const CharacterContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  min-height: 0;
`;

const CharacterImage = styled(Image)`
  object-fit: contain;
  max-width: 90%;
  max-height: 100%;
  filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.3));
`;

const BottomText = styled.div`
  text-align: center;
  font-family: 'Times New Roman', 'Georgia', serif;
  font-weight: bold;
  font-size: 14px;
  color: #ffffff;
  text-shadow:
    1px 1px 0 #000080,
    -1px -1px 0 #000080,
    1px -1px 0 #000080,
    -1px 1px 0 #000080,
    0 2px 3px rgba(0, 0, 0, 0.4);
  font-style: italic;
`;

export function WizardSidebar({ step }: WizardSidebarProps) {
  return (
    <Sidebar>
      <BackgroundImage
        src="/assets/branding/wizard-bg.jpg"
        alt=""
        fill
        unoptimized
        priority
      />
      <Content>
        <TopText>DICKBUTT</TopText>
        <CharacterContainer>
          <CharacterImage
            src="/assets/branding/dickbutt-wizard.png"
            alt="Dickbutt Wizard"
            width={120}
            height={150}
            unoptimized
          />
        </CharacterContainer>
        <BottomText>Setup Wizard</BottomText>
      </Content>
    </Sidebar>
  );
}
