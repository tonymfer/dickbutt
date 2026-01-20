'use client';

import { DesktopIcon, IconConfig } from './DesktopIcon';

interface DesktopIconGridProps {
  icons: IconConfig[];
}

export function DesktopIconGrid({ icons }: DesktopIconGridProps) {
  return (
    <div className="absolute top-2 right-2 flex flex-col gap-2 z-0">
      {icons.map((icon) => (
        <DesktopIcon key={icon.id} config={icon} />
      ))}
    </div>
  );
}
