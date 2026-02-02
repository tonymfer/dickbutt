'use client';

import styled from 'styled-components';
import { WIN98_COLORS } from './constants';

export const Win98GroupBox = styled.fieldset`
  border: 1px solid;
  border-color: #808080 #dfdfdf #dfdfdf #808080;
  padding: 8px 12px;
  margin: 0;
`;

export const Win98GroupBoxLabel = styled.legend`
  padding: 0 4px;
  font-size: 11px;
  background: ${WIN98_COLORS.face};
`;

interface GroupBoxProps {
  label?: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function GroupBox({ label, children, className, style }: GroupBoxProps) {
  return (
    <Win98GroupBox className={className} style={style}>
      {label && <Win98GroupBoxLabel>{label}</Win98GroupBoxLabel>}
      {children}
    </Win98GroupBox>
  );
}
