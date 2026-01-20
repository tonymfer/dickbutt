'use client';

import { motion, useMotionValue } from 'framer-motion';
import { useDesktop, WindowState } from '@/context/DesktopContext';
import Image from 'next/image';
import { useEffect } from 'react';

interface WindowProps {
  window: WindowState;
}

export function Window({ window: win }: WindowProps) {
  const { closeWindow, minimizeWindow, focusWindow, updateWindowPosition, activeWindowId } = useDesktop();

  // Use motion values for smooth dragging without state conflicts
  const x = useMotionValue(win.position.x);
  const y = useMotionValue(win.position.y);

  // Sync motion values when position changes externally
  useEffect(() => {
    x.set(win.position.x);
    y.set(win.position.y);
  }, [win.position.x, win.position.y, x, y]);

  if (win.minimized) return null;

  const isActive = activeWindowId === win.id;

  return (
    <motion.div
      className="win95-window win95-border absolute select-none"
      style={{
        zIndex: win.zIndex,
        x,
        y,
        top: 0,
        left: 0,
      }}
      drag
      dragMomentum={false}
      dragElastic={0}
      onDragEnd={() => {
        // Save the final position from motion values
        updateWindowPosition(win.id, {
          x: x.get(),
          y: y.get(),
        });
      }}
      onMouseDown={() => focusWindow(win.id)}
    >
      {/* Title bar */}
      <div
        className={`win95-titlebar flex items-center justify-between cursor-move ${
          isActive ? '' : 'opacity-70'
        }`}
      >
        <span className="text-sm font-bold px-1 truncate">{win.title}</span>
        <div className="flex gap-0.5">
          <button
            className="win95-button w-4 h-4 flex items-center justify-center text-xs leading-none"
            onClick={(e) => {
              e.stopPropagation();
              minimizeWindow(win.id);
            }}
          >
            _
          </button>
          <button
            className="win95-button w-4 h-4 flex items-center justify-center text-xs leading-none"
            onClick={(e) => {
              e.stopPropagation();
              closeWindow(win.id);
            }}
          >
            ×
          </button>
        </div>
      </div>

      {/* Window content */}
      <div className="win95-border-inset bg-white m-0.5 overflow-auto">
        <Image
          src={win.content}
          alt={win.title}
          width={400}
          height={300}
          className="max-w-[600px] max-h-[500px] w-auto h-auto"
          style={{ imageRendering: 'auto' }}
          draggable={false}
        />
      </div>
    </motion.div>
  );
}
