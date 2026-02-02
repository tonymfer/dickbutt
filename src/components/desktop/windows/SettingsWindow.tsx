'use client';

import { ColorInput } from 'react95';
import styled from 'styled-components';
import { Win98Button, GroupBox, Win98Checkbox } from '@/components/ui/win98';
import { useDesktopSettings, PRESET_COLORS } from '@/context/DesktopSettingsContext';

interface SettingsWindowProps {
  onClose?: () => void;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 12px;
  width: 280px;
`;

const StyledGroupBox = styled.div`
  padding: 12px;
`;

const ColorRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
`;

const ColorLabel = styled.span`
  font-size: 12px;
  min-width: 80px;
`;

const PresetGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
  margin-top: 12px;
`;

const PresetButton = styled.button<{ $color: string; $selected: boolean }>`
  width: 32px;
  height: 32px;
  border: 2px solid ${props => props.$selected ? '#000' : '#808080'};
  background: ${props => props.$color};
  cursor: pointer;
  outline: none;
  box-shadow: ${props => props.$selected ? 'inset 0 0 0 2px #fff' : 'none'};

  &:hover {
    border-color: #000;
  }

  &:focus {
    border-color: #000;
  }
`;

const PresetLabel = styled.span`
  font-size: 10px;
  text-align: center;
  display: block;
  margin-top: 2px;
`;

const CheckboxRow = styled.div`
  margin-top: 8px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
  justify-content: flex-end;
`;

const StyledButton = styled(Win98Button)`
  min-width: 80px;
  height: 28px;
`;

export function SettingsWindow({ onClose }: SettingsWindowProps) {
  const { settings, setBackgroundColor, setBackgroundGradient, resetSettings } = useDesktopSettings();

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBackgroundColor(e.target.value);
  };

  const handleGradientChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBackgroundGradient(e.target.checked);
  };

  const handlePresetClick = (color: string) => {
    setBackgroundColor(color);
  };

  const handleReset = () => {
    resetSettings();
  };

  return (
    <Container>
      <GroupBox label="Desktop Background" style={{ padding: 12 }}>
        <ColorRow>
          <ColorLabel>Color:</ColorLabel>
          <ColorInput
            value={settings.backgroundColor}
            onChange={handleColorChange}
          />
        </ColorRow>

        <PresetGrid>
          {PRESET_COLORS.map((preset) => (
            <div key={preset.value}>
              <PresetButton
                $color={preset.value}
                $selected={settings.backgroundColor.toLowerCase() === preset.value.toLowerCase()}
                onClick={() => handlePresetClick(preset.value)}
                title={preset.name}
              />
              <PresetLabel>{preset.name}</PresetLabel>
            </div>
          ))}
        </PresetGrid>

        <CheckboxRow>
          <Win98Checkbox
            label="Enable gradient"
            checked={settings.backgroundGradient}
            onChange={handleGradientChange}
          />
        </CheckboxRow>
      </GroupBox>

      <ButtonGroup>
        <StyledButton onClick={handleReset}>Reset</StyledButton>
        <StyledButton $primary onClick={onClose}>OK</StyledButton>
      </ButtonGroup>
    </Container>
  );
}
