'use client';

import { useState } from 'react';
import { Frame, GroupBox, Button, Separator } from 'react95';
import styled from 'styled-components';
import { RESOURCE_LINKS } from '@/lib/links';

const Container = styled.div`
  padding: 8px;
  background: #c0c0c0;
`;

const StyledGroupBox = styled(GroupBox)`
  margin-bottom: 8px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const GroupContent = styled.div`
  padding: 4px;
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

const FolderHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 0;
  font-weight: bold;
  font-size: 11px;
`;

const FolderIcon = styled.span`
  font-size: 16px;
`;

const TreeLine = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 12px;
  border-left: 1px dotted #808080;
  margin-left: 9px;
`;

const StatusFrame = styled(Frame)`
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

// Group resources by category
const resourceGroups = [
  {
    label: 'Price & Charts',
    icon: '📈',
    items: [
      { label: 'DexTools', url: RESOURCE_LINKS.dextools, icon: '📊' },
      { label: 'DexScreener', url: RESOURCE_LINKS.dexscreener, icon: '📉' },
      { label: 'CoinGecko', url: RESOURCE_LINKS.coingecko, icon: '🦎' },
      { label: 'CoinMarketCap', url: RESOURCE_LINKS.coinmarketcap, icon: '💹' },
    ],
  },
  {
    label: 'Social Media',
    icon: '💬',
    items: [
      { label: 'X (Twitter)', url: RESOURCE_LINKS.x, icon: '🐦' },
      { label: 'Telegram', url: RESOURCE_LINKS.telegram, icon: '✈️' },
      { label: 'Farcaster', url: RESOURCE_LINKS.farcaster, icon: '🟣' },
      { label: 'Instagram', url: RESOURCE_LINKS.instagram, icon: '📸' },
      { label: 'TikTok', url: RESOURCE_LINKS.tiktok, icon: '🎵' },
      { label: 'YouTube', url: RESOURCE_LINKS.youtube, icon: '📺' },
    ],
  },
  {
    label: 'Tools & Fun',
    icon: '🛠️',
    items: [
      { label: 'Price Checker Extension', url: RESOURCE_LINKS.priceCheckerExtension, icon: '🔌' },
      { label: 'Dickbuttify', url: RESOURCE_LINKS.dickbuttify, icon: '🎨' },
      { label: 'Accept Dickbutt', url: RESOURCE_LINKS.acceptDickbutt, icon: '✅' },
      { label: 'Dickbuttazon', url: RESOURCE_LINKS.dickbuttazon, icon: '📦' },
      { label: 'CC0 Store', url: RESOURCE_LINKS.cc0Store, icon: '🏪' },
    ],
  },
];

export function MobileResources() {
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(
    new Set(resourceGroups.map(g => g.label))
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

  const totalItems = resourceGroups.reduce((acc, g) => acc + g.items.length, 0);

  return (
    <Container>
      <Frame variant="field" style={{ padding: 8 }}>
        {resourceGroups.map((group, groupIndex) => (
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
                {group.items.map((item, itemIndex) => (
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

            {groupIndex < resourceGroups.length - 1 && (
              <Separator style={{ margin: '4px 0' }} />
            )}
          </div>
        ))}
      </Frame>

      <StatusFrame variant="status">
        <span>📋</span>
        <ObjectCount>{totalItems} object(s)</ObjectCount>
        <span style={{ marginLeft: 'auto' }}>🌐 Internet Explorer</span>
      </StatusFrame>
    </Container>
  );
}
