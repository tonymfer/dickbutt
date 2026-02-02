'use client';

import styled from 'styled-components';

export const Win98TextInput = styled.input`
  padding: 3px 4px;
  font-size: 11px;
  font-family: 'Segoe UI', Tahoma, sans-serif;
  background: #fff;
  border: none;
  box-shadow: inset -1px -1px #fff, inset 1px 1px #808080, inset -2px -2px #dfdfdf, inset 2px 2px #0a0a0a;

  &:focus {
    outline: none;
  }

  &:disabled {
    background: #c0c0c0;
    color: #808080;
  }
`;
