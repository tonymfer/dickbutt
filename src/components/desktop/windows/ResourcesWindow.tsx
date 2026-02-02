'use client';

import { useState } from 'react';
import styled from 'styled-components';
import { RESOURCES_CONTENT } from '@/lib/windowContent';
import { Win98Frame, Win98Separator } from '@/components/ui/win98';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background: #c0c0c0;
`;

const TreeContainer = styled(Win98Frame)`
  flex: 1;
  margin: 4px;
  padding: 4px;
  overflow-y: auto;
  min-height: 0;
`;

const ResourceItem = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  width: 100%;
  padding: 3px 6px;
  background: transparent;
  border: none;
  cursor: pointer;
  text-align: left;
  font-family: inherit;
  font-size: 11px;

  &:hover {
    background: #000080;
    color: white;
  }

  &:active {
    background: #000080;
    color: white;
  }
`;

const ResourceIcon = styled.span`
  font-size: 14px;
  width: 16px;
  text-align: center;
  flex-shrink: 0;
`;

const ResourceLabel = styled.span`
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ResourceArrow = styled.span`
  font-size: 9px;
  color: #808080;
`;

const TreeLine = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 10px;
  border-left: 1px dotted #808080;
  margin-left: 7px;
`;

const StatusFrame = styled(Win98Frame)`
  margin: 0 4px 4px;
  padding: 2px 6px;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 9px;
  flex-shrink: 0;
`;

export function ResourcesWindow() {
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(
    new Set([RESOURCES_CONTENT[0].label])
  );

  const handleClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const toggleGroup = (label: string) => {
    setExpandedGroups(prev => {
      const next = new Set(prev);
      if (next.has(label)) {
        next.delete(label);
      } else {
        next.add(label);
      }
      return next;
    });
  };

  const totalItems = RESOURCES_CONTENT.reduce((acc, g) => acc + g.items.length, 0);

  return (
    <Container>
      <TreeContainer $variant="field">
        {RESOURCES_CONTENT.map((group, groupIndex) => (
          <div key={group.label}>
            <ResourceItem onClick={() => toggleGroup(group.label)}>
              <ResourceIcon>
                {expandedGroups.has(group.label) ? '📂' : '📁'}
              </ResourceIcon>
              <ResourceLabel style={{ fontWeight: 'bold' }}>
                {group.label}
              </ResourceLabel>
              <ResourceArrow>
                {expandedGroups.has(group.label) ? '▼' : '▶'}
              </ResourceArrow>
            </ResourceItem>

            {expandedGroups.has(group.label) && (
              <TreeLine>
                {group.items.map((item) => (
                  <ResourceItem
                    key={item.label}
                    onClick={() => handleClick(item.url)}
                  >
                    <ResourceIcon>{item.icon}</ResourceIcon>
                    <ResourceLabel>{item.label}</ResourceLabel>
                    <ResourceArrow>↗</ResourceArrow>
                  </ResourceItem>
                ))}
              </TreeLine>
            )}

            {groupIndex < RESOURCES_CONTENT.length - 1 && (
              <Win98Separator style={{ margin: '2px 0' }} />
            )}
          </div>
        ))}
      </TreeContainer>

      <StatusFrame $variant="status">
        <span>📋</span>
        <span>{totalItems} object(s)</span>
      </StatusFrame>
    </Container>
  );
}
