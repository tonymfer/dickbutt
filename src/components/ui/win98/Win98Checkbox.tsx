'use client';

import styled from 'styled-components';

const CheckboxContainer = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  font-size: 11px;
  font-family: 'Segoe UI', Tahoma, sans-serif;

  &:has(input:disabled) {
    cursor: not-allowed;
    color: #808080;
  }
`;

const HiddenInput = styled.input.attrs({ type: 'checkbox' })`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
`;

const CheckboxBox = styled.span<{ $checked?: boolean; $disabled?: boolean }>`
  width: 13px;
  height: 13px;
  background: ${({ $disabled }) => $disabled ? '#c0c0c0' : '#fff'};
  border: 1px solid;
  border-color: #808080 #dfdfdf #dfdfdf #808080;
  box-shadow: inset 1px 1px 0 #0a0a0a;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: 10px;
  color: #000;

  &::after {
    content: '${({ $checked }) => $checked ? '✓' : ''}';
    font-weight: bold;
  }
`;

interface CheckboxProps {
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  disabled?: boolean;
  className?: string;
  name?: string;
  value?: string;
}

export function Win98Checkbox({
  checked = false,
  onChange,
  label,
  disabled = false,
  className,
  name,
  value,
}: CheckboxProps) {
  return (
    <CheckboxContainer className={className}>
      <HiddenInput
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        name={name}
        value={value}
      />
      <CheckboxBox $checked={checked} $disabled={disabled} />
      {label && <span>{label}</span>}
    </CheckboxContainer>
  );
}
