'use client';

import styled from 'styled-components';
import Image from 'next/image';
import { useState } from 'react';
import { Win98Frame, Win98Button } from '@/components/ui/win98';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
  height: 100%;
`;

const Title = styled.h2`
  font-size: 18px;
  font-weight: bold;
  color: #000080;
  margin: 0;
  text-align: center;
`;

const ToggleButton = styled(Win98Button)`
  font-size: 12px;
  padding: 6px 12px;
  height: 28px;
  align-self: center;
`;

const ContentFrame = styled(Win98Frame)`
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  background: #fff;
  padding: 12px;
  overflow: hidden;
`;

const ComicContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const ComicImage = styled(Image)`
  max-width: 100%;
  height: auto;
`;

const StoryContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  font-size: 14px;
  line-height: 1.6;
  color: #000;

  p {
    margin: 0 0 12px 0;

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

export function MobileOriginStep() {
  const [showStory, setShowStory] = useState(false);

  return (
    <Container>
      <Title>Welcome to $DICKBUTT</Title>

      <ToggleButton onClick={() => setShowStory(!showStory)}>
        {showStory ? 'View Comic' : 'Read Story'}
      </ToggleButton>

      <ContentFrame $variant="field">
        {showStory ? (
          <StoryContainer>
            <p>
              <strong>July 2, 2006</strong> — Artist K.C. Green published a webcomic
              in his Horribleville series featuring a crude, anthropomorphic figure.
              This absurd creation quickly spread across 4chan and Reddit.
            </p>
            <p>
              Dickbutt&apos;s popularity comes from its simplicity and adaptability.
              It became a symbol of internet absurdity, comparable to Pepe and Doge.
            </p>
            <p>
              Nearly two decades later, it remains one of the most legendary memes
              in online history, now evolved into <strong>$DICKBUTT</strong> on Base.
            </p>
          </StoryContainer>
        ) : (
          <ComicContainer>
            <ComicImage
              src="/assets/dickbutt-comic.png"
              alt="The Original Dickbutt Comic"
              width={340}
              height={115}
              style={{ objectFit: 'contain', filter: 'grayscale(100%)' }}
              unoptimized
            />
          </ComicContainer>
        )}
      </ContentFrame>
    </Container>
  );
}
