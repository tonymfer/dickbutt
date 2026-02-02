import { useEffect, RefObject } from 'react';

interface UseClickOutsideOptions {
  excludeSelector?: string;
  enabled?: boolean;
}

export function useClickOutside(
  ref: RefObject<HTMLElement | null>,
  onClickOutside: () => void,
  options: UseClickOutsideOptions = {}
) {
  const { excludeSelector = '', enabled = true } = options;

  useEffect(() => {
    if (!enabled) return;

    const handleClick = (e: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        const target = e.target as HTMLElement;
        if (excludeSelector && target.closest(excludeSelector)) {
          return;
        }
        onClickOutside();
      }
    };

    document.addEventListener('mousedown', handleClick);
    document.addEventListener('touchstart', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('touchstart', handleClick);
    };
  }, [ref, onClickOutside, excludeSelector, enabled]);
}
