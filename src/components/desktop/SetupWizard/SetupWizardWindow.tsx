'use client';

import styled from 'styled-components';
import {
  Window as Win95Window,
  WindowContent,
} from 'react95';
import { WizardSidebar } from './WizardSidebar';
import { WizardNav } from './WizardNav';
import { OriginStep } from './steps/OriginStep';
import { TokenomicsStep } from './steps/TokenomicsStep';
import { RoadmapStep } from './steps/RoadmapStep';
import { EducationStep } from './steps/EducationStep';
import { CompletionStep } from './steps/CompletionStep';
import { useWizard } from '@/context/WizardContext';
/* eslint-disable @next/next/no-img-element */

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
`;

const StyledWindow = styled(Win95Window)`
  width: 620px;
  height: 480px;
  max-width: 95vw;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const WindowTitlebar = styled.div`
  height: 18px;
  background: linear-gradient(to right, var(--ActiveTitle) 0%, var(--GradientActiveTitle) 100%);
  color: var(--TitleText);
  display: flex;
  align-items: center;
  padding: 0 2px;
  gap: 3px;
`;

const TitlebarIcon = styled.img`
  width: 16px;
  height: 16px;
  image-rendering: pixelated;
  flex-shrink: 0;
`;

const WindowTitleArea = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;
`;

const WindowTitle = styled.span`
  font-size: 11px;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-shadow: none;
`;

const WindowButton = styled.button`
  width: 16px;
  height: 14px;
  min-width: 16px;
  min-height: 14px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #c0c0c0;
  border: 2px solid;
  border-color: rgb(223, 223, 223) rgb(128, 128, 128) rgb(128, 128, 128) rgb(223, 223, 223);
  cursor: pointer;
  position: relative;

  &:active {
    border-color: rgb(128, 128, 128) rgb(223, 223, 223) rgb(223, 223, 223) rgb(128, 128, 128);
  }

  /* Close button X icon */
  &.window-close-button::before,
  &.window-close-button::after {
    content: '';
    position: absolute;
    width: 8px;
    height: 2px;
    background: #000;
    top: 50%;
    left: 50%;
  }
  &.window-close-button::before {
    transform: translate(-50%, -50%) rotate(45deg);
  }
  &.window-close-button::after {
    transform: translate(-50%, -50%) rotate(-45deg);
  }
`;

const StyledWindowContent = styled(WindowContent)`
  display: flex;
  flex-direction: column;
  padding: 0;
  flex: 1;
  min-height: 0;
  overflow: hidden;
`;

const MainContent = styled.div`
  display: flex;
  flex: 1;
  min-height: 0;
`;

const ContentArea = styled.div`
  flex: 1;
  padding: 16px;
  position: relative;
  overflow: auto;
  background: #c0c0c0;
`;

const stepTitles: Record<number, string> = {
  1: 'Discovery',
  2: 'Tokenomics',
  3: 'Roadmap',
  4: 'Education',
  5: 'Complete',
};

export function SetupWizardWindow() {
  const {
    currentStep,
    totalSteps,
    nextStep,
    prevStep,
    skipWizard,
    completeWizard,
  } = useWizard();

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <OriginStep />;
      case 2:
        return <TokenomicsStep />;
      case 3:
        return <RoadmapStep />;
      case 4:
        return <EducationStep />;
      case 5:
        return <CompletionStep />;
      default:
        return <OriginStep />;
    }
  };

  return (
    <Overlay>
      <StyledWindow>
        <WindowTitlebar>
          <TitlebarIcon src="/assets/icons/win95/settings.ico" alt="" />
          <WindowTitleArea>
            <WindowTitle>
              $DICKBUTT Setup - Step {currentStep} of {totalSteps}: {stepTitles[currentStep]}
            </WindowTitle>
          </WindowTitleArea>
          <WindowButton className="window-close-button" onClick={skipWizard} />
        </WindowTitlebar>

        <StyledWindowContent>
          <MainContent>
            <WizardSidebar step={currentStep} />
            <ContentArea>
              {renderStep()}
            </ContentArea>
          </MainContent>

          <WizardNav
            currentStep={currentStep}
            totalSteps={totalSteps}
            onBack={prevStep}
            onNext={nextStep}
            onCancel={skipWizard}
            onFinish={completeWizard}
          />
        </StyledWindowContent>
      </StyledWindow>
    </Overlay>
  );
}
