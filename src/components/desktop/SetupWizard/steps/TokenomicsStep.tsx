'use client';

import styled from 'styled-components';
import { GroupBox, Frame, Checkbox } from 'react95';
import { useState } from 'react';
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

const StyledGroupBox = styled(GroupBox)`
  flex: 1;
  padding: 8px;
  font-size: 11px;
`;

const CheckList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const CheckItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 10px;
`;

const CheckMark = styled(Frame)`
  width: 12px;
  height: 12px;
  min-width: 12px;
  min-height: 12px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 9px;
  font-weight: bold;
  color: #008000;
  padding: 0;
`;

const AcknowledgeRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 0;
  flex-shrink: 0;
  font-size: 11px;
`;

const tokenomicsData = [
  { label: 'Team', value: 10, color: '#ffff00' },
  { label: 'Marketing', value: 20, color: '#ff00ff' },
  { label: 'Liquidity', value: 20, color: '#00ff00' },
  { label: 'Community', value: 50, color: '#00ffff' },
];

const tokenDetails = [
  'Supply: 100B',
  'Chain: Base (L2)',
  'Tax: 0/0',
];

const securitySpecs = [
  'Contract Renounced',
  'LP Burned Forever',
  'No Mint Function',
];

export function TokenomicsStep() {
  const [acknowledged, setAcknowledged] = useState(false);

  return (
    <Container>
      <ChartSection>
        <PieChart data={tokenomicsData} size={100} />
      </ChartSection>

      <SpecsRow>
        <StyledGroupBox label="Token Details">
          <CheckList>
            {tokenDetails.map((detail, index) => (
              <CheckItem key={index}>
                <CheckMark variant="field">✓</CheckMark>
                <span>{detail}</span>
              </CheckItem>
            ))}
          </CheckList>
        </StyledGroupBox>

        <StyledGroupBox label="Security">
          <CheckList>
            {securitySpecs.map((spec, index) => (
              <CheckItem key={index}>
                <CheckMark variant="field">✓</CheckMark>
                <span>{spec}</span>
              </CheckItem>
            ))}
          </CheckList>
        </StyledGroupBox>
      </SpecsRow>

      <AcknowledgeRow>
        <Checkbox
          checked={acknowledged}
          onChange={() => setAcknowledged(!acknowledged)}
          label="I understand the tokenomics and security features"
        />
      </AcknowledgeRow>
    </Container>
  );
}
