'use client';

import styled from 'styled-components';
import { useState } from 'react';
import { GroupBox, Win98Checkbox } from '@/components/ui/win98';
import { CheckListItem } from '@/components/shared/CheckListItem';
import { TOKENOMICS_DATA, TOKEN_DETAILS, SECURITY_SPECS } from '@/lib/constants/wizard';
import { PieChart } from '../PieChart';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  height: 100%;
`;

const ChartSection = styled.div`
  display: flex;
  justify-content: center;
  flex-shrink: 0;
`;

const SpecsRow = styled.div`
  display: flex;
  gap: 8px;
  flex: 1;
  min-height: 0;
`;

const CheckList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const AcknowledgeRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 0;
  flex-shrink: 0;
  font-size: 11px;
`;

export function TokenomicsStep() {
  const [acknowledged, setAcknowledged] = useState(false);

  return (
    <Container>
      <ChartSection>
        <PieChart data={TOKENOMICS_DATA} size={100} />
      </ChartSection>

      <SpecsRow>
        <GroupBox label="Token Details" style={{ flex: 1, padding: 8, fontSize: 11 }}>
          <CheckList>
            {TOKEN_DETAILS.map((detail, index) => (
              <CheckListItem key={index} label={detail} size="sm" />
            ))}
          </CheckList>
        </GroupBox>

        <GroupBox label="Security" style={{ flex: 1, padding: 8, fontSize: 11 }}>
          <CheckList>
            {SECURITY_SPECS.map((spec, index) => (
              <CheckListItem key={index} label={spec} size="sm" />
            ))}
          </CheckList>
        </GroupBox>
      </SpecsRow>

      <AcknowledgeRow>
        <Win98Checkbox
          checked={acknowledged}
          onChange={() => setAcknowledged(!acknowledged)}
          label="I understand the tokenomics and security features"
        />
      </AcknowledgeRow>
    </Container>
  );
}
