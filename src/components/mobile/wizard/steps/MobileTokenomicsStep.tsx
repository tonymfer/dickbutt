'use client';

import styled from 'styled-components';
import { GroupBox } from '@/components/ui/win98';
import { CheckListItem } from '@/components/shared/CheckListItem';
import { TOKENOMICS_DATA, TOKEN_DETAILS, SECURITY_SPECS } from '@/lib/constants/wizard';
import { PieChart } from '@/components/desktop/SetupWizard/PieChart';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
  height: 100%;
  overflow-y: auto;
`;

const Title = styled.h2`
  font-size: 18px;
  font-weight: bold;
  color: #000080;
  margin: 0;
  text-align: center;
`;

const ChartSection = styled.div`
  display: flex;
  justify-content: center;
  flex-shrink: 0;
`;

const SpecsRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const CheckList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export function MobileTokenomicsStep() {
  return (
    <Container>
      <Title>Tokenomics</Title>

      <ChartSection>
        <PieChart data={TOKENOMICS_DATA} size={120} />
      </ChartSection>

      <SpecsRow>
        <GroupBox label="Token Details" style={{ padding: 12, fontSize: 13 }}>
          <CheckList>
            {TOKEN_DETAILS.map((detail, index) => (
              <CheckListItem key={index} label={detail} size="md" />
            ))}
          </CheckList>
        </GroupBox>

        <GroupBox label="Security" style={{ padding: 12, fontSize: 13 }}>
          <CheckList>
            {SECURITY_SPECS.map((spec, index) => (
              <CheckListItem key={index} label={spec} size="md" />
            ))}
          </CheckList>
        </GroupBox>
      </SpecsRow>
    </Container>
  );
}
