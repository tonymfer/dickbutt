'use client';

import styled, { css } from 'styled-components';
import { WIN98_COLORS, WIN98_SHADOWS } from './constants';

type FrameVariant = 'raised' | 'field' | 'status' | 'well';

interface Win98FrameProps {
  $variant?: FrameVariant;
}

export const Win98Frame = styled.div<Win98FrameProps>`
  background: ${WIN98_COLORS.face};
  ${({ $variant = 'raised' }) => {
    switch ($variant) {
      case 'field':
        return css`box-shadow: ${WIN98_SHADOWS.field};`;
      case 'status':
        return css`box-shadow: ${WIN98_SHADOWS.status};`;
      case 'well':
        return css`box-shadow: ${WIN98_SHADOWS.well};`;
      default:
        return css`box-shadow: ${WIN98_SHADOWS.raised};`;
    }
  }}
`;
