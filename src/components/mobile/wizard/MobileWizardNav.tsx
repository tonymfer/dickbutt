'use client';

import styled from 'styled-components';
import { Win98Button } from '@/components/ui/win98';

interface MobileWizardNavProps {
  currentStep: number;
  totalSteps: number;
  onBack: () => void;
  onNext: () => void;
  onSkip: () => void;
  onFinish: () => void;
}

const NavContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  background: #c0c0c0;
  border-top: 2px solid #fff;
`;

const ProgressDots = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
`;

const Dot = styled.div<{ $active: boolean; $completed: boolean }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${props =>
    props.$active ? '#000080' :
    props.$completed ? '#008000' : '#808080'
  };
  border: 2px solid ${props => props.$active ? '#000080' : '#fff'};
  transition: all 0.2s ease;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 8px;
`;

const NavButton = styled(Win98Button)`
  flex: 1;
  height: 40px;
  font-size: 14px;
  font-weight: bold;
`;

const SkipButton = styled(Win98Button)`
  height: 32px;
  font-size: 12px;
  align-self: center;
`;

export function MobileWizardNav({
  currentStep,
  totalSteps,
  onBack,
  onNext,
  onSkip,
  onFinish,
}: MobileWizardNavProps) {
  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === totalSteps;

  return (
    <NavContainer>
      <ProgressDots>
        {Array.from({ length: totalSteps }, (_, i) => (
          <Dot
            key={i}
            $active={currentStep === i + 1}
            $completed={currentStep > i + 1}
          />
        ))}
      </ProgressDots>

      <ButtonRow>
        <NavButton onClick={onBack} disabled={isFirstStep}>
          Back
        </NavButton>
        {isLastStep ? (
          <NavButton $primary onClick={onFinish}>
            Finish
          </NavButton>
        ) : (
          <NavButton $primary onClick={onNext}>
            Next
          </NavButton>
        )}
      </ButtonRow>

      <SkipButton onClick={onSkip}>
        Skip Setup
      </SkipButton>
    </NavContainer>
  );
}
