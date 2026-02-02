'use client';

import styled from 'styled-components';
import { Win98Frame } from '@/components/ui/win98';

interface CheckListItemProps {
  label: string;
  size?: 'sm' | 'md';
}

const Container = styled.div<{ $size: 'sm' | 'md' }>`
  display: flex;
  align-items: center;
  gap: ${props => props.$size === 'sm' ? '6px' : '8px'};
  font-size: ${props => props.$size === 'sm' ? '10px' : '13px'};
`;

const CheckMark = styled(Win98Frame)<{ $size: 'sm' | 'md' }>`
  width: ${props => props.$size === 'sm' ? '12px' : '16px'};
  height: ${props => props.$size === 'sm' ? '12px' : '16px'};
  min-width: ${props => props.$size === 'sm' ? '12px' : '16px'};
  min-height: ${props => props.$size === 'sm' ? '12px' : '16px'};
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${props => props.$size === 'sm' ? '9px' : '11px'};
  font-weight: bold;
  color: #008000;
  padding: 0;
`;

export function CheckListItem({ label, size = 'sm' }: CheckListItemProps) {
  return (
    <Container $size={size}>
      <CheckMark $variant="field" $size={size}>✓</CheckMark>
      <span>{label}</span>
    </Container>
  );
}
