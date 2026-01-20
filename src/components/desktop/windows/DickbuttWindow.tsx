'use client';

import { Checkbox } from 'react95';
import styled from 'styled-components';

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

const StyledCheckbox = styled(Checkbox)`
  font-size: 11px;
  line-height: 1.1;
  color: #000;
  pointer-events: none;
  margin: 0;
  padding: 0;

  & > span {
    color: #000 !important;
  }
`;

export function DickbuttWindow() {
  return (
    <Container>
      <CheckboxList>
        <StyledCheckbox checked label="100 billion supply" />
        <StyledCheckbox checked label="Fair launch" />
        <StyledCheckbox checked label="Locked liquidity" />
        <StyledCheckbox checked label="Not a scam" />
        <StyledCheckbox checked label="Strong holders" />
        <StyledCheckbox checked label="Community driven" />
      </CheckboxList>
    </Container>
  );
}
