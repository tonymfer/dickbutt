'use client';

import styled, { css } from 'styled-components';
import { WIN98_BORDERS, WIN98_COLORS } from './constants';

interface Win98ButtonProps {
  $primary?: boolean;
  $active?: boolean;
  $fullWidth?: boolean;
  $square?: boolean;
}

export const Win98Button = styled.button<Win98ButtonProps>`
  padding: 2px 8px;
  font-size: 11px;
  font-family: 'Segoe UI', Tahoma, sans-serif;
  background: ${WIN98_COLORS.face};
  border: 2px solid;
  border-color: ${WIN98_BORDERS.raised};
  cursor: pointer;
  min-height: 23px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 4px;

  ${({ $fullWidth }) => $fullWidth && css`
    width: 100%;
  `}

  ${({ $square }) => $square && css`
    padding: 2px;
    width: 23px;
    height: 23px;
  `}

  ${({ $primary }) => $primary && css`
    font-weight: bold;
  `}

  ${({ $active }) => $active && css`
    border-color: ${WIN98_BORDERS.pressed};
    background-image: url("data:image/svg+xml,%3Csvg width='2' height='2' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='0' y='0' width='1' height='1' fill='%23ffffff'/%3E%3Crect x='1' y='1' width='1' height='1' fill='%23ffffff'/%3E%3C/svg%3E");
    background-size: 2px 2px;
  `}

  &:active:not(:disabled) {
    border-color: ${WIN98_BORDERS.pressed};
  }

  &:disabled {
    color: ${WIN98_COLORS.shadow};
    cursor: not-allowed;
  }
`;
