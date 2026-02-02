'use client';

import styled from 'styled-components';
import { Win98Checkbox } from '@/components/ui/win98';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  padding: 6px;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
`;

const CheckboxList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const CheckboxWrapper = styled.div`
  font-size: 11px;
  line-height: 1.1;
  color: #000;
  pointer-events: none;
  margin: 0;
  padding: 0;
`;

export function DickbuttWindow() {
  return (
    <Container>
      <CheckboxList>
        <CheckboxWrapper><Win98Checkbox checked label="100 billion supply" /></CheckboxWrapper>
        <CheckboxWrapper><Win98Checkbox checked label="Fair launch" /></CheckboxWrapper>
        <CheckboxWrapper><Win98Checkbox checked label="Locked liquidity" /></CheckboxWrapper>
        <CheckboxWrapper><Win98Checkbox checked label="Not a scam" /></CheckboxWrapper>
        <CheckboxWrapper><Win98Checkbox checked label="Strong holders" /></CheckboxWrapper>
        <CheckboxWrapper><Win98Checkbox checked label="Community driven" /></CheckboxWrapper>
      </CheckboxList>
    </Container>
  );
}
