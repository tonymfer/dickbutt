'use client';

import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Win98Button } from '@/components/ui/win98';
import { Win95Icon } from '@/components/ui/Win95Icon';
import { ROADMAP_LINKS } from '@/lib/links';

interface RoadmapWindowProps {
  onClose?: () => void;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 10px;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
`;

const Content = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
`;

const IconContainer = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Text = styled.p`
  font-size: 11px;
  line-height: 1.4;
  margin: 0;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 6px;
  justify-content: center;
`;

const StyledButton = styled(Win98Button)`
  min-width: 70px;
  height: 24px;
  font-size: 11px;
`;

export function RoadmapWindow({ onClose }: RoadmapWindowProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return;
    const el = rootRef.current;
    if (!el) return;

    const log = () => {
      const clientH = el.clientHeight;
      const scrollH = el.scrollHeight;
      const overflowY = scrollH - clientH;
      console.info(
        `[layout-check] roadmap content ${JSON.stringify({ clientH, scrollH, overflowY }, null, 2)}`
      );
    };

    log();
    const t = setTimeout(log, 250);
    return () => clearTimeout(t);
  }, []);

  const handleExternal = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
    onClose?.();
  };

  return (
    <Container ref={rootRef}>
      <Content>
        <IconContainer>
          <Win95Icon name="question" size={32} />
        </IconContainer>
        <Text>
          There is no formal team or a roadmap. Just dickbutt and a community of
          dickbutt connoisseurs appreciating beauty, math and culture.
        </Text>
      </Content>
      <ButtonGroup>
        <StyledButton onClick={() => handleExternal(ROADMAP_LINKS.ok)}>OK</StyledButton>
        <StyledButton onClick={() => handleExternal(ROADMAP_LINKS.cancel)}>Cancel</StyledButton>
      </ButtonGroup>
    </Container>
  );
}
