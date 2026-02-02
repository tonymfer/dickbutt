'use client';

import styled from 'styled-components';
import { ProgressBar } from 'react95';
import { GroupBox, Win98Frame } from '@/components/ui/win98';
import { ROADMAP_PHASES } from '@/lib/constants/wizard';

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

const StyledGroupBox = styled.div`
  flex: 1;
  min-height: 0;
  padding: 12px;
`;

const TreeContainer = styled(Win98Frame)`
  background: #fff;
  padding: 12px;
  height: 100%;
  overflow-y: auto;
`;

const PhaseItem = styled.div`
  margin-bottom: 16px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const PhaseHeader = styled.div<{ $completed?: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: bold;
  color: ${props => props.$completed ? '#008000' : '#000'};
  margin-bottom: 8px;
`;

const CheckMark = styled(Win98Frame)<{ $checked?: boolean }>`
  width: 16px;
  height: 16px;
  min-width: 16px;
  min-height: 16px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: bold;
  color: ${props => props.$checked ? '#008000' : '#000'};
  padding: 0;
`;

const SubItem = styled.div<{ $completed?: boolean }>`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: ${props => props.$completed ? '#008000' : '#666'};
  padding-left: 24px;
  margin-bottom: 4px;
`;

const TreeIcon = styled.span`
  font-family: 'Courier New', monospace;
  color: #808080;
  font-size: 12px;
`;

const ProgressSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex-shrink: 0;
`;

const ProgressLabel = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  color: #000;
`;

export function MobileRoadmapStep() {
  const completedPhases = ROADMAP_PHASES.filter(p => p.completed).length;
  const totalPhases = ROADMAP_PHASES.length;
  const progressPercent = Math.round((completedPhases / totalPhases) * 100);

  return (
    <Container>
      <Title>Roadmap</Title>

      <GroupBox label="Deployment Phases" style={{ flex: 1, minHeight: 0, padding: 12 }}>
        <TreeContainer $variant="field">
          {ROADMAP_PHASES.map((phase, phaseIndex) => (
            <PhaseItem key={phaseIndex}>
              <PhaseHeader $completed={phase.completed}>
                <CheckMark $variant="field" $checked={phase.completed}>
                  {phase.completed ? '✓' : null}
                </CheckMark>
                {phase.phase}
              </PhaseHeader>
              {phase.items.map((item, itemIndex) => (
                <SubItem key={itemIndex} $completed={phase.completed}>
                  <TreeIcon>├</TreeIcon>
                  {item}
                </SubItem>
              ))}
            </PhaseItem>
          ))}
        </TreeContainer>
      </GroupBox>

      <ProgressSection>
        <ProgressLabel>
          <span>Progress:</span>
          <span>{progressPercent}%</span>
        </ProgressLabel>
        <ProgressBar value={progressPercent} />
      </ProgressSection>
    </Container>
  );
}
