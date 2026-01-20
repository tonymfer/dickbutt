'use client';

import { useState, useEffect } from 'react';
import { useDesktop } from '@/context/DesktopContext';
import { StartMenu } from './StartMenu';

export function Taskbar() {
  const { windows, activeWindowId, focusWindow } = useDesktop();
  const [showStartMenu, setShowStartMenu] = useState(false);
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {showStartMenu && <StartMenu onClose={() => setShowStartMenu(false)} />}
      <div className="fixed bottom-0 left-0 right-0 h-9 bg-[#c0c0c0] win95-border z-[9999] flex items-center px-1">
        {/* Start button */}
        <button
          className={`win95-button h-7 px-2 flex items-center gap-1 font-bold text-sm ${
            showStartMenu ? 'win95-button-pressed' : ''
          }`}
          onClick={() => setShowStartMenu(!showStartMenu)}
        >
          <span className="text-base">🪟</span>
          Start
        </button>

        {/* Divider */}
        <div className="w-px h-6 bg-[#808080] mx-1" />
        <div className="w-px h-6 bg-white mx-0" />

        {/* Window tabs */}
        <div className="flex-1 flex gap-1 px-1 overflow-hidden">
          {windows.map((win) => (
            <button
              key={win.id}
              className={`win95-button h-7 px-2 text-sm truncate max-w-[150px] ${
                activeWindowId === win.id && !win.minimized ? 'win95-button-pressed' : ''
              }`}
              onClick={() => focusWindow(win.id)}
            >
              {win.title}
            </button>
          ))}
        </div>

        {/* System tray */}
        <div className="win95-border-inset h-6 px-2 flex items-center text-sm bg-[#c0c0c0]">
          {time}
        </div>
      </div>
    </>
  );
}
