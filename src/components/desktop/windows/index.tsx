'use client';

import { ComponentType } from 'react';
import { DickbuttWindow } from './DickbuttWindow';
import { DickbuttOnBaseWindow } from './DickbuttOnBaseWindow';
import { DisclaimerWindow } from './DisclaimerWindow';
import { RoadmapWindow } from './RoadmapWindow';
import { OriginWindow } from './OriginWindow';
import { ResourcesWindow } from './ResourcesWindow';
import { WhereToBuyWindow } from './WhereToBuyWindow';
import { SettingsWindow } from './SettingsWindow';
import { ProductWindow } from './ProductWindow';

// Registry of window content components
// Components can optionally receive onClose prop for close functionality
export const windowContentRegistry: Record<string, ComponentType<{ onClose?: () => void }>> = {
  dickbutt: DickbuttWindow,
  dickbuttonbase: DickbuttOnBaseWindow,
  disclaimer: DisclaimerWindow,
  roadmap: RoadmapWindow,
  origin: OriginWindow,
  resources: ResourcesWindow,
  wheretobuy: WhereToBuyWindow,
  settings: SettingsWindow,
  product: ProductWindow,
};

export {
  DickbuttWindow,
  DickbuttOnBaseWindow,
  DisclaimerWindow,
  RoadmapWindow,
  OriginWindow,
  ResourcesWindow,
  WhereToBuyWindow,
  SettingsWindow,
  ProductWindow,
};
