'use client';

import styled from 'styled-components';
import {
  Window as Win95Window,
  WindowHeader,
  WindowContent,
  Button,
} from 'react95';
import { WizardSidebar } from './WizardSidebar';
import { WizardNav } from './WizardNav';
import { OriginStep } from './steps/OriginStep';
import { TokenomicsStep } from './steps/TokenomicsStep';
import { RoadmapStep } from './steps/RoadmapStep';
import { EducationStep } from './steps/EducationStep';
import { CompletionStep } from './steps/CompletionStep';
import { useWizard } from '@/context/WizardContext';

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

const StyledWindowHeader = styled(WindowHeader)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2px 2px 2px 4px;
  min-height: 20px;
`;

const TitleText = styled.span`
  font-size: 12px;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
  line-height: 1;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 2px;
  margin-left: 4px;
`;

const WindowButton = styled(Button).withConfig({
  shouldForwardProp: (prop) =>
    !['active', 'primary', 'fullWidth', 'square'].includes(prop),
})`
  width: 16px;
  height: 14px;
  min-width: 16px;
  min-height: 14px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #c0c0c0;
  border: none;
  box-shadow: inset -1px -1px #0a0a0a, inset 1px 1px #ffffff, inset -2px -2px #808080, inset 2px 2px #dfdfdf;

  &:active {
    box-shadow: inset 1px 1px #0a0a0a, inset -1px -1px #ffffff, inset 2px 2px #808080, inset -2px -2px #dfdfdf;
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
        <StyledWindowHeader active>
          <TitleText>
            $DICKBUTT Setup - Step {currentStep} of {totalSteps}: {stepTitles[currentStep]}
          </TitleText>
          <ButtonGroup>
            <WindowButton onClick={skipWizard}>
              ×
            </WindowButton>
          </ButtonGroup>
        </StyledWindowHeader>

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
