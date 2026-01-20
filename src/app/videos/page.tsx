'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Window, WindowHeader, WindowContent, Button, ScrollView, Frame, Toolbar } from 'react95';
import { React95Provider } from '@/components/providers/React95Provider';
import { Win95MediaPlayer } from '@/components/win95/Win95MediaPlayer';
import styled from 'styled-components';

const R2_BASE = 'https://pub-c5bbdf1eaf68478a9783e46a36a3c3b5.r2.dev/v1';

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

const PageContainer = styled.div`
  min-height: 100vh;
  background: #008080;
  padding: 16px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

const StyledWindow = styled(Window)`
  width: 100%;
  max-width: 900px;
`;

const ContentLayout = styled.div`
  display: flex;
  gap: 16px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const VideoSection = styled.div`
  flex: 1;
`;

const StyledWindowHeader = styled(WindowHeader)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PlaylistSection = styled.div`
  width: 220px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const PlaylistItem = styled.button<{ $active: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px;
  border: none;
  background: ${props => props.$active ? '#000080' : 'transparent'};
  color: ${props => props.$active ? '#fff' : '#000'};
  cursor: pointer;
  text-align: left;

  &:hover {
    background: #000080;
    color: #fff;
  }
`;

const ThumbContainer = styled.div`
  width: 48px;
  height: 36px;
  position: relative;
  flex-shrink: 0;
  background: #808080;
`;

const NowPlaying = styled.div`
  margin-top: 8px;
  padding: 8px;
  font-size: 12px;
`;

const StatusBar = styled.div`
  display: flex;
  gap: 4px;
  margin-top: 8px;
`;

const StatusItem = styled.div`
  padding: 2px 8px;
  font-size: 11px;
`;

const ControlButtons = styled.div`
  display: flex;
  gap: 4px;
  margin-top: 8px;
`;

function VideosContent() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const currentVideo = VIDEO_CLIPS[currentIndex];

  const playVideo = (index: number) => {
    setCurrentIndex(index);
    setIsPlaying(true);
  };

  const playPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsPlaying(true);
    }
  };

  const playNext = () => {
    if (currentIndex < VIDEO_CLIPS.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsPlaying(true);
    }
  };

  return (
    <PageContainer>
      <StyledWindow>
        <StyledWindowHeader>
          <span>Video Clips</span>
          <Link href="/">
            <Button size="sm">
              <span style={{ fontWeight: 'bold' }}>X</span>
            </Button>
          </Link>
        </StyledWindowHeader>
        <Toolbar>
          <Link href="/"><Button variant="thin" size="sm">Back</Button></Link>
          <Link href="/tv"><Button variant="thin" size="sm">TV Channel</Button></Link>
        </Toolbar>
        <WindowContent>
          <ContentLayout>
            <VideoSection>
              <Win95MediaPlayer
                key={currentVideo.id}
                src={`${R2_BASE}/gallery/${currentVideo.video}`}
                poster={`${R2_BASE}/gallery/${currentVideo.thumb}`}
                autoPlay={isPlaying}
                onEnded={playNext}
                showStatic={!isPlaying}
              />

              <ControlButtons>
                <Button onClick={playPrev} disabled={currentIndex === 0}>
                  ⏮ Prev
                </Button>
                <Button onClick={() => setIsPlaying(true)}>
                  ▶ Play
                </Button>
                <Button onClick={playNext} disabled={currentIndex === VIDEO_CLIPS.length - 1}>
                  Next ⏭
                </Button>
              </ControlButtons>

              <Frame variant="field">
                <NowPlaying>
                  {isPlaying ? `Now Playing: ${currentVideo.title}` : 'Select a video to play'}
                </NowPlaying>
              </Frame>
            </VideoSection>

            <PlaylistSection>
              <Frame variant="field" style={{ padding: 0 }}>
                <div style={{ background: '#000080', color: '#fff', padding: '4px 8px', fontSize: 12, fontWeight: 'bold' }}>
                  Playlist ({VIDEO_CLIPS.length})
                </div>
                <ScrollView style={{ height: 350 }}>
                  {VIDEO_CLIPS.map((clip, index) => (
                    <PlaylistItem
                      key={clip.id}
                      $active={index === currentIndex}
                      onClick={() => playVideo(index)}
                    >
                      <ThumbContainer>
                        <Image
                          src={`${R2_BASE}/gallery/${clip.thumb}`}
                          alt={clip.title}
                          fill
                          style={{ objectFit: 'cover' }}
                          sizes="48px"
                        />
                      </ThumbContainer>
                      <span style={{ fontSize: 11, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {clip.title}
                      </span>
                    </PlaylistItem>
                  ))}
                </ScrollView>
              </Frame>
            </PlaylistSection>
          </ContentLayout>

          <StatusBar>
            <Frame variant="status" style={{ flex: 1 }}>
              <StatusItem>{currentIndex + 1} / {VIDEO_CLIPS.length}</StatusItem>
            </Frame>
            <Frame variant="status">
              <StatusItem>{isPlaying ? '▶ Playing' : '⏹ Stopped'}</StatusItem>
            </Frame>
          </StatusBar>
        </WindowContent>
      </StyledWindow>
    </PageContainer>
  );
}

export default function VideosPage() {
  return (
    <React95Provider>
      <VideosContent />
    </React95Provider>
  );
}
