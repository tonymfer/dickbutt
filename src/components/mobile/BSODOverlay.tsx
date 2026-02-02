'use client';

import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

interface BSODOverlayProps {
  onClose: () => void;
}

const Overlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: #0000AA;
  z-index: 99999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  font-family: 'Lucida Console', Monaco, monospace;
`;

const Title = styled.div`
  background: #A8A8A8;
  color: #0000AA;
  padding: 2px 8px;
  margin-bottom: 24px;
  font-size: 14px;
  font-weight: bold;
`;

const ErrorText = styled.div`
  color: white;
  font-size: 12px;
  line-height: 1.6;
  text-align: center;
  max-width: 320px;
`;

const JokeContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`;

const JokeText = styled.div`
  font-size: 32px;
  color: white;
  text-align: center;
  font-weight: bold;
`;

const SubText = styled.div`
  font-size: 14px;
  color: #AAAAFF;
  text-align: center;
`;

export function BSODOverlay({ onClose }: BSODOverlayProps) {
  const [showJoke, setShowJoke] = useState(false);

  useEffect(() => {
    // Show joke after 2 seconds
    const jokeTimer = setTimeout(() => {
      setShowJoke(true);
    }, 2000);

    // Auto-close after 4 seconds total
    const closeTimer = setTimeout(() => {
      onClose();
    }, 4000);

    return () => {
      clearTimeout(jokeTimer);
      clearTimeout(closeTimer);
    };
  }, [onClose]);

  return (
    <Overlay
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={showJoke ? onClose : undefined}
    >
      <AnimatePresence mode="wait">
        {!showJoke ? (
          <motion.div
            key="bsod"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ textAlign: 'center' }}
          >
            <Title>Windows</Title>
            <ErrorText>
              A fatal exception 0E has occurred at 0028:C0034B03 in VXD DICKBUTT(01) + 00001B03.
              <br /><br />
              The current application will be terminated.
              <br /><br />
              * Press any key to terminate the current application.
              <br />
              * Press CTRL+ALT+DEL again to restart your computer.
              You will lose any unsaved information in all applications.
              <br /><br />
              Press any key to continue _
            </ErrorText>
          </motion.div>
        ) : (
          <JokeContainer
            key="joke"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <JokeText>Just kidding!</JokeText>
            <SubText>Your computer is fine. Dickbutt would never hurt you.</SubText>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              style={{ marginTop: '12px', color: '#AAAAFF', fontSize: '12px' }}
            >
              Tap to continue...
            </motion.div>
          </JokeContainer>
        )}
      </AnimatePresence>
    </Overlay>
  );
}
