'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useRef } from 'react';

const R2_BASE = 'https://pub-c5bbdf1eaf68478a9783e46a36a3c3b5.r2.dev/v1';

// Video clips playlist
const VIDEO_CLIPS = [
  { id: '100-fightclubflash', title: 'Fight Club Flash', thumb: 'thumb/035386313e37-100-fightclubflash.webp', video: 'full/035386313e37-100-fightclubflash.mp4' },
  { id: '106-christmasdickbutt', title: 'Christmas Dickbutt', thumb: 'thumb/5fe63653763d-106-christmasdickbutt.webp', video: 'full/5fe63653763d-106-christmasdickbutt.mp4' },
  { id: '118-andysamberg', title: 'Andy Samberg', thumb: 'thumb/d195e19f89e8-118-andysamberg.webp', video: 'full/d195e19f89e8-118-andysamberg.mp4' },
  { id: '122-trueinspiration', title: 'True Inspiration', thumb: 'thumb/aeed2f4e3e3e-122-trueinspiration.webp', video: 'full/aeed2f4e3e3e-122-trueinspiration.mp4' },
  { id: '130-mycousinvinny', title: 'My Cousin Vinny', thumb: 'thumb/c1562a0122a0-130-mycousinvinnydickbutt.webp', video: 'full/c1562a0122a0-130-mycousinvinnydickbutt.mp4' },
  { id: '134-officespace', title: 'Office Space', thumb: 'thumb/c2e41c1506c9-134-officespacedickbutt.webp', video: 'full/c2e41c1506c9-134-officespacedickbutt.mp4' },
  { id: '140-missionimpossible', title: 'Mission Impossible', thumb: 'thumb/0a0639f1b06c-140-missionimpossibledickbutt.webp', video: 'full/0a0639f1b06c-140-missionimpossibledickbutt.mp4' },
  { id: '142-jackblack', title: 'Jack Black', thumb: 'thumb/41e4572297bd-142-jackblackdickbutt.webp', video: 'full/41e4572297bd-142-jackblackdickbutt.mp4' },
  { id: '144-ghostbusters', title: 'Ghostbusters', thumb: 'thumb/bed3164134e1-144-ghostbustersdickbutt.webp', video: 'full/bed3164134e1-144-ghostbustersdickbutt.mp4' },
  { id: '147-harrypotter', title: 'Harry Potter', thumb: 'thumb/c6a114474911-147-harrypotterdb.webp', video: 'full/c6a114474911-147-harrypotterdb.mp4' },
  { id: '151-lionking', title: 'Lion King', thumb: 'thumb/e571616ecc58-151-dickbuttlionking.webp', video: 'full/e571616ecc58-151-dickbuttlionking.mp4' },
  { id: '161-batman', title: 'Batman Gift', thumb: 'thumb/4a870064c94c-161-batmandickbuttgift.webp', video: 'full/4a870064c94c-161-batmandickbuttgift.mp4' },
  { id: '162-5thelement', title: '5th Element', thumb: 'thumb/e82000ead387-162-5thelementdickbutt.webp', video: 'full/e82000ead387-162-5thelementdickbutt.mp4' },
  { id: '172-spray', title: 'Spray Paint', thumb: 'thumb/4aed6cc02d06-172-spraydickbutt.webp', video: 'full/4aed6cc02d06-172-spraydickbutt.mp4' },
  { id: '173-sidewalk', title: 'Sidewalk', thumb: 'thumb/a18515fdde82-173-sidewalk.webp', video: 'full/a18515fdde82-173-sidewalk.mp4' },
  { id: '174-driving', title: 'Driving', thumb: 'thumb/421636637d8b-174-drivingdb.webp', video: 'full/421636637d8b-174-drivingdb.mp4' },
  { id: '234-concert', title: 'Concert', thumb: 'thumb/a801db0a47ad-234-dickbuttconcert.webp', video: 'full/a801db0a47ad-234-dickbuttconcert.mp4' },
  { id: '38-diddy', title: 'Diddy', thumb: 'thumb/e5954d056b48-38-diddydickbutt.webp', video: 'full/e5954d056b48-38-diddydickbutt.mp4' },
  { id: '382-printer', title: 'Printer', thumb: 'thumb/3b4dbe6bfb63-382-dickbuttprinter.webp', video: 'full/3b4dbe6bfb63-382-dickbuttprinter.mp4' },
  { id: '41-pluto', title: 'On Pluto', thumb: 'thumb/7b76e9aeff29-41-dickbuttonpluto.webp', video: 'full/7b76e9aeff29-41-dickbuttonpluto.mp4' },
];

export default function TvPage() {
  const [currentVideo, setCurrentVideo] = useState<typeof VIDEO_CLIPS[0] | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const playVideo = (clip: typeof VIDEO_CLIPS[0]) => {
    setCurrentVideo(clip);
    setIsPlaying(true);
  };

  const playMainChannel = () => {
    setCurrentVideo(null);
    setIsPlaying(true);
  };

  return (
    <main className="min-h-screen bg-[#008080] p-4">
      {/* Window container */}
      <div className="win95-window win95-border max-w-6xl mx-auto">
        {/* Title bar */}
        <div className="win95-titlebar flex items-center justify-between">
          <span className="text-sm font-bold px-1">📺 Dickbutt TV</span>
          <Link
            href="/"
            className="win95-button w-4 h-4 flex items-center justify-center text-xs leading-none"
          >
            ×
          </Link>
        </div>

        {/* Toolbar */}
        <div className="bg-[#c0c0c0] p-1 flex gap-2 border-b border-[#808080]">
          <Link
            href="/"
            className="win95-button px-3 py-1 text-sm flex items-center gap-1"
          >
            ← Back to Desktop
          </Link>
          <button
            onClick={playMainChannel}
            className="win95-button px-3 py-1 text-sm"
          >
            📺 Main Channel
          </button>
        </div>

        {/* Content */}
        <div className="bg-[#c0c0c0] p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Video Player */}
            <div className="flex-1">
              <div className="win95-border-inset bg-black aspect-video relative">
                {isPlaying ? (
                  <video
                    ref={videoRef}
                    src={currentVideo
                      ? `${R2_BASE}/gallery/${currentVideo.video}`
                      : `${R2_BASE}/video/tv/dickbutt-tv.mp4`
                    }
                    controls
                    autoPlay
                    className="w-full h-full"
                    onEnded={() => {
                      // Auto-play next video in playlist
                      if (currentVideo) {
                        const idx = VIDEO_CLIPS.findIndex(v => v.id === currentVideo.id);
                        if (idx < VIDEO_CLIPS.length - 1) {
                          setCurrentVideo(VIDEO_CLIPS[idx + 1]);
                        }
                      }
                    }}
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                    <div className="text-6xl mb-4">📺</div>
                    <h2 className="text-xl font-bold mb-2">Dickbutt TV</h2>
                    <p className="text-sm text-gray-400 mb-4">Select a video to start watching</p>
                    <button
                      onClick={playMainChannel}
                      className="win95-button px-4 py-2 text-black"
                    >
                      ▶ Watch Main Channel
                    </button>
                  </div>
                )}
              </div>

              {/* Now Playing */}
              <div className="mt-2 p-2 win95-border-inset bg-white">
                <p className="text-sm font-bold">
                  {isPlaying
                    ? (currentVideo ? `Now Playing: ${currentVideo.title}` : 'Now Playing: Dickbutt TV Main Channel')
                    : 'Ready to play'
                  }
                </p>
              </div>
            </div>

            {/* Playlist */}
            <div className="lg:w-64">
              <div className="win95-border p-1 bg-white">
                <div className="bg-[#000080] text-white px-2 py-1 text-sm font-bold mb-1">
                  Video Clips
                </div>
                <div className="h-[400px] overflow-y-auto">
                  {VIDEO_CLIPS.map((clip) => (
                    <button
                      key={clip.id}
                      onClick={() => playVideo(clip)}
                      className={`w-full flex items-center gap-2 p-1 text-left hover:bg-[#000080] hover:text-white ${
                        currentVideo?.id === clip.id ? 'bg-[#000080] text-white' : ''
                      }`}
                    >
                      <div className="w-12 h-9 relative flex-shrink-0 bg-gray-200">
                        <Image
                          src={`${R2_BASE}/gallery/${clip.thumb}`}
                          alt={clip.title}
                          fill
                          className="object-cover"
                          sizes="48px"
                        />
                      </div>
                      <span className="text-xs truncate">{clip.title}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Status bar */}
        <div className="bg-[#c0c0c0] px-2 py-1 border-t border-[#dfdfdf] flex gap-2">
          <div className="win95-border-inset px-2 py-0.5 text-xs flex-1">
            {VIDEO_CLIPS.length} clips available
          </div>
          <div className="win95-border-inset px-2 py-0.5 text-xs">
            {isPlaying ? '▶ Playing' : '⏹ Stopped'}
          </div>
        </div>
      </div>
    </main>
  );
}
