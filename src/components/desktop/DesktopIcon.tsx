'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useDesktop } from '@/context/DesktopContext';

export interface IconConfig {
  id: string;
  label: string;
  icon: string;
  action: 'route' | 'link' | 'window';
  target: string;
  windowTitle?: string;
  windowContent?: string;
}

interface DesktopIconProps {
  config: IconConfig;
}

export function DesktopIcon({ config }: DesktopIconProps) {
  const [isSelected, setIsSelected] = useState(false);
  const router = useRouter();
  const { openWindow } = useDesktop();

  const handleClick = () => {
    setIsSelected(true);
  };

  const handleBlur = () => {
    setIsSelected(false);
  };

  const handleDoubleClick = () => {
    switch (config.action) {
      case 'route':
        router.push(config.target);
        break;
      case 'link':
        window.open(config.target, '_blank');
        break;
      case 'window':
        if (config.windowTitle && config.windowContent) {
          openWindow(config.id, config.windowTitle, config.windowContent);
        }
        break;
    }
  };

  return (
    <button
      className={`flex flex-col items-center gap-1 p-1 w-20 text-center cursor-pointer focus:outline-none ${
        isSelected ? 'bg-[#000080]/50' : ''
      }`}
      onClick={handleClick}
      onBlur={handleBlur}
      onDoubleClick={handleDoubleClick}
    >
      <div className="w-12 h-12 relative">
        <Image
          src={config.icon}
          alt={config.label}
          fill
          className="object-contain pixelated"
          draggable={false}
        />
      </div>
      <span
        className={`text-xs text-white drop-shadow-[1px_1px_0px_rgba(0,0,0,1)] ${
          isSelected ? 'bg-[#000080]' : ''
        }`}
      >
        {config.label}
      </span>
    </button>
  );
}
