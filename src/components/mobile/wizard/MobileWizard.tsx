'use client';

import styled from 'styled-components';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { useWizard } from '@/context/WizardContext';
import { MobileWizardNav } from './MobileWizardNav';
import { MobileWizardAssistant } from './MobileWizardAssistant';
import { MobileOriginStep } from './steps/MobileOriginStep';
import { MobileTokenomicsStep } from './steps/MobileTokenomicsStep';
import { MobileRoadmapStep } from './steps/MobileRoadmapStep';
import { MobileEducationStep } from './steps/MobileEducationStep';
import { MobileCompletionStep } from './steps/MobileCompletionStep';
import { useState, useRef } from 'react';

const Container = styled.div`
  position: fixed;
  inset: 0;
  background: #008080;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Header = styled.div`
  background: linear-gradient(to right, #000080 0%, rgb(16, 132, 208) 100%);
  color: white;
  padding: 12px 16px;
  font-weight: bold;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
`;

const HeaderIcon = styled.img`
  width: 16px;
  height: 16px;
  image-rendering: pixelated;
`;

const ContentArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #c0c0c0;
  position: relative;
  overflow: hidden;
`;

const StepContainer = styled(motion.div)`
  position: absolute;
  inset: 0;
  background: #c0c0c0;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
`;

const AssistantArea = styled.div`
  background: #c0c0c0;
  border-top: 2px solid #808080;
  flex-shrink: 0;
`;

const stepTitles: Record<number, string> = {
  1: 'Discovery',
  2: 'Tokenomics',
  3: 'Roadmap',
  4: 'Education',
  5: 'Complete',
};

const SWIPE_THRESHOLD = 50;

export function MobileWizard() {
  const {
    currentStep,
    totalSteps,
    nextStep,
    prevStep,
    skipWizard,
    completeWizard,
  } = useWizard();

  const [direction, setDirection] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const { offset, velocity } = info;

    // Check for horizontal swipe
    if (Math.abs(offset.x) > SWIPE_THRESHOLD || Math.abs(velocity.x) > 500) {
      if (offset.x > 0 && currentStep > 1) {
        setDirection(-1);
        prevStep();
      } else if (offset.x < 0 && currentStep < totalSteps) {
        setDirection(1);
        nextStep();
      }
    }
  };

  const handleNext = () => {
    setDirection(1);
    nextStep();
  };

  const handlePrev = () => {
    setDirection(-1);
    prevStep();
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <MobileOriginStep />;
      case 2:
        return <MobileTokenomicsStep />;
      case 3:
        return <MobileRoadmapStep />;
      case 4:
        return <MobileEducationStep />;
      case 5:
        return <MobileCompletionStep />;
      default:
        return <MobileOriginStep />;
    }
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
    }),
  };

  return (
    <Container>
      <Header>
        <HeaderIcon src="/assets/icons/win95/settings.ico" alt="" />
        $DICKBUTT Setup - Step {currentStep}/{totalSteps}: {stepTitles[currentStep]}
      </Header>

      <ContentArea ref={containerRef}>
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <StepContainer
            key={currentStep}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
          >
            {renderStep()}
          </StepContainer>
        </AnimatePresence>
      </ContentArea>

      <AssistantArea>
        <MobileWizardAssistant step={currentStep} />
      </AssistantArea>

      <MobileWizardNav
        currentStep={currentStep}
        totalSteps={totalSteps}
        onBack={handlePrev}
        onNext={handleNext}
        onSkip={skipWizard}
        onFinish={completeWizard}
      />
    </Container>
  );
}
