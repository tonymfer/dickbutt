'use client';

import styled from 'styled-components';
import { Win98Button, Win98Separator } from '@/components/ui/win98';

interface WizardNavProps {
  currentStep: number;
  totalSteps: number;
  onBack: () => void;
  onNext: () => void;
  onCancel: () => void;
  onFinish: () => void;
}

const NavContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: #c0c0c0;
`;

const NavButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
`;

const NavButton = styled(Win98Button)`
  min-width: 80px;
  height: 26px;
  font-size: 12px;
  padding: 0 16px;
`;

const Spacer = styled.div`
  flex: 1;
`;

export function WizardNav({
  currentStep,
  totalSteps,
  onBack,
  onNext,
  onCancel,
  onFinish,
}: WizardNavProps) {
  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === totalSteps;

  return (
    <NavContainer>
      <Win98Separator />
      <NavButtons>
        <Spacer />
        <NavButton onClick={onBack} disabled={isFirstStep}>
          &lt; Back
        </NavButton>
        {isLastStep ? (
          <NavButton $primary onClick={onFinish}>
            Finish
          </NavButton>
        ) : (
          <NavButton $primary onClick={onNext}>
            Next &gt;
          </NavButton>
        )}
        <NavButton onClick={onCancel}>Cancel</NavButton>
      </NavButtons>
    </NavContainer>
  );
}
