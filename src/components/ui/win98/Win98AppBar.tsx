'use client';

import styled from 'styled-components';
import { WIN98_COLORS, WIN98_SHADOWS } from './constants';

export const Win98AppBar = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: ${WIN98_COLORS.face};
  box-shadow: ${WIN98_SHADOWS.raised};
  z-index: 9999;
`;
