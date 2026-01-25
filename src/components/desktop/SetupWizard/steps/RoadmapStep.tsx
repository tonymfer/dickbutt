'use client';

import styled from 'styled-components';
import { ProgressBar, GroupBox, Frame, Checkbox } from 'react95';
import { useState } from 'react';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  height: 100%;
`;

const Title = styled.h2`
  font-size: 13px;
  font-weight: bold;
  color: #000080;
  margin: 0;
  flex-shrink: 0;
`;

const StyledGroupBox = styled(GroupBox)`
  flex: 1;
  min-height: 0;
  padding: 6px;
`;

const TreeContainer = styled(Frame)`
  background: #fff;
  padding: 8px;
  height: 100%;
  overflow: auto;
`;

const PhaseItem = styled.div`
  margin-bottom: 8px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const PhaseHeader = styled.div<{ $completed?: boolean }>`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  font-weight: bold;
  color: ${props => props.$completed ? '#008000' : '#000'};
  margin-bottom: 4px;
`;

const CheckMark = styled(Frame)<{ $checked?: boolean }>`
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
  color: ${props => props.$checked ? '#008000' : '#000'};
  padding: 0;
`;

const SubItem = styled.div<{ $completed?: boolean }>`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 10px;
  color: ${props => props.$completed ? '#008000' : '#666'};
  padding-left: 18px;
  margin-bottom: 2px;
`;

const TreeIcon = styled.span`
  font-family: 'Courier New', monospace;
  color: #808080;
  font-size: 9px;
`;

const ProgressSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex-shrink: 0;
`;

const ProgressLabel = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 10px;
  color: #000;
`;

const AcknowledgeRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 0;
  flex-shrink: 0;
  font-size: 11px;
`;

const roadmapItems = [
  {
    phase: 'Phase 1: Launch',
    completed: true,
    items: ['Token on Base', 'Website', 'Community'],
  },
  {
    phase: 'Phase 2: Viral',
    completed: true,
    items: ['Meme contests', 'Social expansion', 'Partnerships'],
  },
  {
    phase: 'Phase 3: Domination',
    completed: false,
    items: ['CEX listings', 'NFT collection', 'Global awareness'],
  },
];

export function RoadmapStep() {
  const [acknowledged, setAcknowledged] = useState(false);
  const completedPhases = roadmapItems.filter(p => p.completed).length;
  const totalPhases = roadmapItems.length;
  const progressPercent = Math.round((completedPhases / totalPhases) * 100);

  return (
    <Container>
      <Title>Project Roadmap</Title>

      <StyledGroupBox label="Deployment Phases">
        <TreeContainer variant="field">
          {roadmapItems.map((phase, phaseIndex) => (
            <PhaseItem key={phaseIndex}>
              <PhaseHeader $completed={phase.completed}>
                <CheckMark variant="field" $checked={phase.completed}>
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
      </StyledGroupBox>

      <ProgressSection>
        <ProgressLabel>
          <span>Progress:</span>
          <span>{progressPercent}%</span>
        </ProgressLabel>
        <ProgressBar value={progressPercent} />
      </ProgressSection>

      <AcknowledgeRow>
        <Checkbox
          checked={acknowledged}
          onChange={() => setAcknowledged(!acknowledged)}
          label="I understand there is no formal roadmap"
        />
      </AcknowledgeRow>
    </Container>
  );
}
