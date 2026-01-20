'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import styled from 'styled-components';

const R2_BASE = 'https://pub-c5bbdf1eaf68478a9783e46a36a3c3b5.r2.dev/v1';

const Container = styled.div`
  position: fixed;
  inset: 0;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const BackButton = styled.button`
  position: fixed;
  top: 16px;
  left: 16px;
  z-index: 100;
  padding: 8px 16px;
  background: rgba(0, 0, 0, 0.7);
  color: #fff;
  border: 1px solid #fff;
  cursor: pointer;
  font-size: 14px;
  opacity: 0;
  transition: opacity 0.3s;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }

  ${Container}:hover & {
    opacity: 1;
  }
`;

export default function TvPage() {
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        router.push('/');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [router]);

  return (
    <Container>
      <BackButton onClick={() => router.push('/')}>
        ← Back (ESC)
      </BackButton>
      <Video
        src={`${R2_BASE}/video/tv/dickbutt-tv.mp4`}
        controls
        autoPlay
        loop
      />
    </Container>
  );
}
