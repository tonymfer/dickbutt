'use client';

import { useState } from 'react';
import styled from 'styled-components';
import { RESOURCES_CONTENT } from '@/lib/windowContent';
import { Win98Frame, Win98Separator } from '@/components/ui/win98';

const Container = styled.div`
  padding: 8px;
  background: #c0c0c0;
`;

const ResourceItem = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 6px 8px;
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
  font-size: 16px;
  width: 20px;
  text-align: center;
`;

const ResourceLabel = styled.span`
  flex: 1;
`;

const ResourceArrow = styled.span`
  font-size: 10px;
  color: #808080;
`;

const TreeLine = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 12px;
  border-left: 1px dotted #808080;
  margin-left: 9px;
`;

const StatusFrame = styled(Win98Frame)`
  margin-top: 8px;
  padding: 4px 8px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 10px;
`;

const ObjectCount = styled.span`
  color: #444;
`;

export function MobileResources() {
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(
    new Set(RESOURCES_CONTENT.map(g => g.label))
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
      <Win98Frame $variant="field" style={{ padding: 8 }}>
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
              <Win98Separator style={{ margin: '4px 0' }} />
            )}
          </div>
        ))}
      </Win98Frame>

      <StatusFrame $variant="status">
        <span>📋</span>
        <ObjectCount>{totalItems} object(s)</ObjectCount>
        <span style={{ marginLeft: 'auto' }}>🌐 Internet Explorer</span>
      </StatusFrame>
    </Container>
  );
}
