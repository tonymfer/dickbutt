'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useDesktop } from '@/context/DesktopContext';

interface StartMenuProps {
  onClose: () => void;
}

export function StartMenu({ onClose }: StartMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { openWindow } = useDesktop();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        // Check if click is on the Start button
        const target = e.target as HTMLElement;
        if (!target.closest('button')?.textContent?.includes('Start')) {
          onClose();
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const menuItems = [
    { label: 'Meme Folder', icon: '📁', action: () => router.push('/meme') },
    { label: 'IRL', icon: '📷', action: () => router.push('/irl') },
    { label: 'Branding', icon: '🎨', action: () => router.push('/branding') },
    { label: 'TV', icon: '📺', action: () => router.push('/tv') },
    { divider: true },
    { label: 'Origin Story', icon: '📜', action: () => openWindow('origin', 'Origin Story', '/assets/windows/origin1.png') },
    { label: 'Roadmap', icon: '🗺️', action: () => openWindow('roadmap', 'Roadmap', '/assets/windows/roadmap.png') },
    { label: 'Resources', icon: '📚', action: () => openWindow('resources', 'Resources', '/assets/windows/resources.png') },
  ];

  return (
    <div
      ref={menuRef}
      className="fixed bottom-9 left-0 w-56 bg-[#c0c0c0] win95-border z-[10000]"
    >
      {/* Windows 95 sidebar */}
      <div className="flex">
        <div className="w-6 bg-gradient-to-b from-[#808080] to-[#000080] flex items-end justify-center pb-1">
          <span className="text-white text-xs font-bold [writing-mode:vertical-rl] rotate-180">
            dickbutt95
          </span>
        </div>
        <div className="flex-1">
          {menuItems.map((item, i) =>
            'divider' in item ? (
              <div key={i} className="h-px bg-[#808080] mx-1 my-1" />
            ) : (
              <button
                key={i}
                className="w-full px-2 py-1 text-left text-sm hover:bg-[#000080] hover:text-white flex items-center gap-2"
                onClick={() => {
                  item.action();
                  onClose();
                }}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
}
