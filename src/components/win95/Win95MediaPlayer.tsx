'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { Button, Frame } from 'react95';
import styled from 'styled-components';

const PlayerContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: #c0c0c0;
`;

const VideoFrame = styled(Frame)`
  background: #000;
  position: relative;
`;

const VideoElement = styled.video`
  width: 100%;
  display: block;
`;

const StaticScreen = styled.div`
  position: absolute;
  inset: 0;
  background:
    repeating-radial-gradient(#000 0 0.0001%, #333 0 0.0002%) 50% 0/2500px 2500px,
    repeating-conic-gradient(#000 0 0.0001%, #333 0 0.0002%) 60% 60%/2500px 2500px;
  background-blend-mode: difference;
  animation: static 0.5s infinite alternate;

  @keyframes static {
    100% { background-position: 50% 0, 60% 50%; }
  }

  &::after {
    content: 'NO SIGNAL';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #fff;
    font-size: 18px;
    font-weight: bold;
    text-shadow: 2px 2px 4px #000;
    letter-spacing: 4px;
  }
`;

const PosterImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  position: absolute;
  inset: 0;
`;

const ControlsBar = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  padding: 4px;
  background: #c0c0c0;
`;

const ControlButton = styled(Button).withConfig({
  shouldForwardProp: (prop) =>
    !['active', 'primary', 'fullWidth', 'square'].includes(prop),
})`
  min-width: 28px;
  height: 24px;
  padding: 0 4px;
  font-size: 12px;
`;

const SeekContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0 8px;
`;

const SeekSlider = styled.input`
  flex: 1;
  height: 16px;
  appearance: none;
  background: transparent;
  cursor: pointer;

  &::-webkit-slider-runnable-track {
    height: 8px;
    background: #fff;
    border: 2px solid;
    border-color: #808080 #dfdfdf #dfdfdf #808080;
  }

  &::-webkit-slider-thumb {
    appearance: none;
    width: 8px;
    height: 16px;
    background: #c0c0c0;
    border: 2px solid;
    border-color: #dfdfdf #808080 #808080 #dfdfdf;
    margin-top: -6px;
    cursor: grab;
  }

  &::-moz-range-track {
    height: 8px;
    background: #fff;
    border: 2px solid;
    border-color: #808080 #dfdfdf #dfdfdf #808080;
  }

  &::-moz-range-thumb {
    width: 8px;
    height: 16px;
    background: #c0c0c0;
    border: 2px solid;
    border-color: #dfdfdf #808080 #808080 #dfdfdf;
    border-radius: 0;
    cursor: grab;
  }
`;

const TimeDisplay = styled.div`
  font-size: 11px;
  font-family: monospace;
  min-width: 90px;
  text-align: center;
  padding: 2px 4px;
  background: #fff;
  border: 1px solid;
  border-color: #808080 #dfdfdf #dfdfdf #808080;
`;

const VolumeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const VolumeSlider = styled(SeekSlider)`
  width: 60px;
`;

interface Win95MediaPlayerProps {
  src: string;
  poster?: string;
  autoPlay?: boolean;
  onEnded?: () => void;
  onReady?: () => void;
  showStatic?: boolean;
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

export function Win95MediaPlayer({
  src,
  poster,
  autoPlay = false,
  onEnded,
  onReady,
  showStatic = false,
}: Win95MediaPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [hasStarted, setHasStarted] = useState(autoPlay);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => setCurrentTime(video.currentTime);
    const handleLoadedMetadata = () => setDuration(video.duration);
    const handleEnded = () => {
      setIsPlaying(false);
      onEnded?.();
    };
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleCanPlay = () => onReady?.();

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('canplay', handleCanPlay);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('canplay', handleCanPlay);
    };
  }, [onEnded, onReady]);

  useEffect(() => {
    if (autoPlay && videoRef.current) {
      setHasStarted(true);
      videoRef.current.play().catch(() => {
        // Autoplay blocked, user will need to click play
        setIsPlaying(false);
      });
    }
  }, [src, autoPlay]);

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    setHasStarted(true);
    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
  }, [isPlaying]);

  const handleStop = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    video.pause();
    video.currentTime = 0;
    setIsPlaying(false);
  }, []);

  const handleSeek = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;

    const time = parseFloat(e.target.value);
    video.currentTime = time;
    setCurrentTime(time);
  }, []);

  const handleVolumeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;

    const vol = parseFloat(e.target.value);
    video.volume = vol;
    setVolume(vol);
    setIsMuted(vol === 0);
  }, []);

  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isMuted) {
      video.muted = false;
      video.volume = volume || 0.5;
      setIsMuted(false);
    } else {
      video.muted = true;
      setIsMuted(true);
    }
  }, [isMuted, volume]);

  const skipBack = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = Math.max(0, video.currentTime - 10);
  }, []);

  const skipForward = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = Math.min(duration, video.currentTime + 10);
  }, [duration]);

  return (
    <PlayerContainer>
      <VideoFrame variant="well">
        <div style={{ aspectRatio: '16/9', position: 'relative', background: '#000' }}>
          {showStatic && !hasStarted ? (
            <StaticScreen />
          ) : (
            <>
              <VideoElement
                ref={videoRef}
                src={src}
                poster={poster}
              />
              {!hasStarted && poster && (
                <PosterImage src={poster} alt="" />
              )}
            </>
          )}
        </div>
      </VideoFrame>

      <ControlsBar>
        <ControlButton onClick={togglePlay} title={isPlaying ? 'Pause' : 'Play'}>
          {isPlaying ? '⏸' : '▶'}
        </ControlButton>
        <ControlButton onClick={handleStop} title="Stop">
          ⏹
        </ControlButton>
        <ControlButton onClick={skipBack} title="Back 10s">
          ⏪
        </ControlButton>
        <ControlButton onClick={skipForward} title="Forward 10s">
          ⏩
        </ControlButton>

        <SeekContainer>
          <SeekSlider
            type="range"
            min={0}
            max={duration || 100}
            value={currentTime}
            onChange={handleSeek}
          />
          <TimeDisplay>
            {formatTime(currentTime)} / {formatTime(duration)}
          </TimeDisplay>
        </SeekContainer>

        <VolumeContainer>
          <ControlButton onClick={toggleMute} title={isMuted ? 'Unmute' : 'Mute'}>
            {isMuted ? '🔇' : '🔊'}
          </ControlButton>
          <VolumeSlider
            type="range"
            min={0}
            max={1}
            step={0.1}
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
          />
        </VolumeContainer>
      </ControlsBar>
    </PlayerContainer>
  );
}
