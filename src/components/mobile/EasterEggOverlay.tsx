'use client';

import { useEffect, useState, useMemo } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface EasterEggOverlayProps {
  onClose: () => void;
}

const Overlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 99999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  cursor: pointer;
`;

const Message = styled(motion.div)`
  font-size: 24px;
  color: white;
  text-align: center;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
  z-index: 10;
  margin-bottom: 20px;
`;

const DickbuttContainer = styled(motion.div)`
  z-index: 10;
`;

interface ConfettiPiece {
  id: number;
  x: number;
  color: string;
  delay: number;
  duration: number;
  size: number;
}

const ConfettiPieceStyled = styled(motion.div)<{ $color: string; $size: number }>`
  position: absolute;
  width: ${props => props.$size}px;
  height: ${props => props.$size}px;
  background: ${props => props.$color};
  border-radius: ${props => props.$size < 8 ? '50%' : '2px'};
`;

const CONFETTI_COLORS = [
  '#ff0000', '#ff8800', '#ffff00', '#00ff00',
  '#00ffff', '#0088ff', '#8800ff', '#ff00ff',
  '#ff69b4', '#ffd700', '#00ff88', '#ff4444',
];

function ConfettiParticle({ piece }: { piece: ConfettiPiece }) {
  return (
    <ConfettiPieceStyled
      $color={piece.color}
      $size={piece.size}
      initial={{
        x: piece.x,
        y: -20,
        rotate: 0,
        opacity: 1,
      }}
      animate={{
        y: window.innerHeight + 50,
        rotate: Math.random() > 0.5 ? 720 : -720,
        opacity: [1, 1, 0.8, 0],
      }}
      transition={{
        duration: piece.duration,
        delay: piece.delay,
        ease: 'linear',
      }}
    />
  );
}

export function EasterEggOverlay({ onClose }: EasterEggOverlayProps) {
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);

  // Generate confetti particles
  const confettiPieces = useMemo(() => {
    const pieces: ConfettiPiece[] = [];
    const width = typeof window !== 'undefined' ? window.innerWidth : 400;

    for (let i = 0; i < 80; i++) {
      pieces.push({
        id: i,
        x: Math.random() * width,
        color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
        delay: Math.random() * 0.5,
        duration: 2 + Math.random() * 2,
        size: 4 + Math.random() * 10,
      });
    }
    return pieces;
  }, []);

  useEffect(() => {
    setConfetti(confettiPieces);

    // Auto-close after 3 seconds
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [confettiPieces, onClose]);

  return (
    <AnimatePresence>
      <Overlay
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        {/* Confetti */}
        {confetti.map(piece => (
          <ConfettiParticle key={piece.id} piece={piece} />
        ))}

        {/* Celebration message */}
        <Message
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 15, delay: 0.2 }}
        >
          You found the secret!
        </Message>

        {/* Animated Dickbutt */}
        <DickbuttContainer
          initial={{ scale: 0, y: 50 }}
          animate={{
            scale: [0, 1.2, 1],
            y: [50, -10, 0],
            rotate: [0, -5, 5, 0],
          }}
          transition={{
            duration: 0.6,
            delay: 0.3,
            times: [0, 0.6, 1],
          }}
        >
          <motion.div
            animate={{
              y: [0, -10, 0],
              rotate: [-3, 3, -3],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <Image
              src="/assets/branding/dickbuttpfp.jpg"
              alt="Dickbutt"
              width={120}
              height={120}
              style={{
                borderRadius: '50%',
                border: '4px solid gold',
                boxShadow: '0 0 30px rgba(255, 215, 0, 0.6)',
              }}
              draggable={false}
            />
          </motion.div>
        </DickbuttContainer>

        <Message
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          style={{ fontSize: '14px', marginTop: '20px' }}
        >
          Tap anywhere to close
        </Message>
      </Overlay>
    </AnimatePresence>
  );
}
