'use client';

import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Win95Icon } from '@/components/ui/Win95Icon';

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 8px;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
`;

const IconContainer = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Text = styled.p`
  font-size: 10px;
  line-height: 1.4;
  margin: 0;
`;

export function DisclaimerWindow() {
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
        `[layout-check] disclaimer content ${JSON.stringify({ clientH, scrollH, overflowY }, null, 2)}`
      );
    };

    log();
    const t = setTimeout(log, 250);
    return () => clearTimeout(t);
  }, []);

  return (
    <Container ref={rootRef}>
      <IconContainer>
        <Win95Icon name="warning" size={32} />
      </IconContainer>
      <Text>
        Dickbutt coin has no association with K.C. Green. This token simply
        pays homage to a meme we all love and recognize. $DICKBUTT is a
        meme coin with no intrinsic value or expectation of financial return.
      </Text>
    </Container>
  );
}
