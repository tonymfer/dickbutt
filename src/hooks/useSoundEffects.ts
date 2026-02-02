'use client';

import { useState, useRef, useCallback, useEffect } from 'react';

const SOUND_STORAGE_KEY = 'dickbutt-sounds';

export function useSoundEffects() {
  const [enabled, setEnabledState] = useState(true);
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioBuffersRef = useRef<Map<string, AudioBuffer>>(new Map());

  // Initialize from localStorage after mount
  useEffect(() => {
    const stored = localStorage.getItem(SOUND_STORAGE_KEY);
    if (stored === 'false') {
      setEnabledState(false);
    }
  }, []);

  // Get or create AudioContext
  const getAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    }
    return audioContextRef.current;
  }, []);

  // Preload a sound into buffer
  const preloadSound = useCallback(async (url: string) => {
    if (audioBuffersRef.current.has(url)) return;

    try {
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      const audioContext = getAudioContext();
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
      audioBuffersRef.current.set(url, audioBuffer);
    } catch {
      // Silently fail - sound just won't play
    }
  }, [getAudioContext]);

  // Play a sound with low latency using Web Audio API
  const playSound = useCallback(async (url: string) => {
    if (!enabled) return;

    try {
      const audioContext = getAudioContext();

      // Resume context if suspended (browser autoplay policy)
      if (audioContext.state === 'suspended') {
        await audioContext.resume();
      }

      // Try to use cached buffer first
      let buffer = audioBuffersRef.current.get(url);

      if (!buffer) {
        // Load on demand if not preloaded
        const response = await fetch(url);
        const arrayBuffer = await response.arrayBuffer();
        buffer = await audioContext.decodeAudioData(arrayBuffer);
        audioBuffersRef.current.set(url, buffer);
      }

      const source = audioContext.createBufferSource();
      source.buffer = buffer;
      source.connect(audioContext.destination);
      source.start(0);
    } catch {
      // Fallback to HTML Audio element
      try {
        const audio = new Audio(url);
        audio.play().catch(() => {});
      } catch {
        // Silently fail
      }
    }
  }, [enabled, getAudioContext]);

  const setEnabled = useCallback((value: boolean) => {
    setEnabledState(value);
    localStorage.setItem(SOUND_STORAGE_KEY, String(value));
  }, []);

  const toggleEnabled = useCallback(() => {
    setEnabled(!enabled);
  }, [enabled, setEnabled]);

  const playClick = useCallback(() => {
    // For now, use a short beep-like sound or the browser's built-in click
    // If a click.mp3 is added later, update this path
    playSound('/assets/sounds/click.mp3').catch(() => {
      // Fallback: use a tiny Web Audio beep
      try {
        const audioContext = getAudioContext();
        if (audioContext.state === 'suspended') return;
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        oscillator.frequency.value = 800;
        gainNode.gain.value = 0.1;
        oscillator.start();
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.05);
        oscillator.stop(audioContext.currentTime + 0.05);
      } catch {
        // Silent fail
      }
    });
  }, [playSound, getAudioContext]);

  const playStartup = useCallback(() => {
    playSound('/assets/win95.mp3');
  }, [playSound]);

  // Preload startup sound on first render
  useEffect(() => {
    preloadSound('/assets/win95.mp3');
  }, [preloadSound]);

  return {
    enabled,
    setEnabled,
    toggleEnabled,
    playSound,
    playClick,
    playStartup,
    preloadSound,
  };
}

export type SoundEffects = ReturnType<typeof useSoundEffects>;
