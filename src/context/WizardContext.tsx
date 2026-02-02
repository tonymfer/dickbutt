'use client';

import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';

const WIZARD_COMPLETED_KEY = 'dickbutt-wizard-completed';

interface WizardContextType {
  wizardVisible: boolean;
  wizardCompleted: boolean;
  currentStep: number;
  totalSteps: number;
  nextStep: () => void;
  prevStep: () => void;
  skipWizard: () => void;
  completeWizard: () => void;
  showWizard: () => void;
}

const WizardContext = createContext<WizardContextType | null>(null);

export function WizardProvider({ children }: { children: ReactNode }) {
  // Start with wizard not visible to avoid hydration mismatch
  const [wizardVisible, setWizardVisible] = useState(false);
  const [wizardCompleted, setWizardCompleted] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;

  // Check sessionStorage on mount and show wizard if not completed
  useEffect(() => {
    const completed = sessionStorage.getItem(WIZARD_COMPLETED_KEY) === 'true';
    setWizardCompleted(completed);
    // Only show wizard if not already completed in this session
    if (!completed) {
      setWizardVisible(true);
    }
  }, []);

  const nextStep = useCallback(() => {
    setCurrentStep(prev => Math.min(prev + 1, totalSteps));
  }, [totalSteps]);

  const prevStep = useCallback(() => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  }, []);

  const skipWizard = useCallback(() => {
    setWizardVisible(false);
    setCurrentStep(1);
    setWizardCompleted(true);
    sessionStorage.setItem(WIZARD_COMPLETED_KEY, 'true');
  }, []);

  const completeWizard = useCallback(() => {
    setWizardVisible(false);
    setCurrentStep(1);
    setWizardCompleted(true);
    sessionStorage.setItem(WIZARD_COMPLETED_KEY, 'true');
  }, []);

  const showWizard = useCallback(() => {
    setCurrentStep(1);
    setWizardVisible(true);
  }, []);

  return (
    <WizardContext.Provider value={{
      wizardVisible,
      wizardCompleted,
      currentStep,
      totalSteps,
      nextStep,
      prevStep,
      skipWizard,
      completeWizard,
      showWizard,
    }}>
      {children}
    </WizardContext.Provider>
  );
}

export function useWizard() {
  const context = useContext(WizardContext);
  if (!context) {
    throw new Error('useWizard must be used within a WizardProvider');
  }
  return context;
}
