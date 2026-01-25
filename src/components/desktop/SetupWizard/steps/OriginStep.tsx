'use client';

import styled from 'styled-components';
import Image from 'next/image';
import { Frame, Button, Checkbox } from 'react95';
import { useState } from 'react';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  height: 100%;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
`;

const Title = styled.h2`
  font-size: 13px;
  font-weight: bold;
  color: #000080;
  margin: 0;
`;

const ToggleButton = styled(Button).withConfig({
  shouldForwardProp: (prop) =>
    !['active', 'primary', 'fullWidth', 'square'].includes(prop),
})`
  font-size: 10px;
  padding: 3px 8px;
  height: 22px;
`;

const ContentFrame = styled(Frame)`
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  background: #fff;
  padding: 6px;
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
  font-size: 10px;
  line-height: 1.4;
  color: #000;

  p {
    margin: 0 0 6px 0;

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const AcknowledgeRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 0;
  flex-shrink: 0;
  font-size: 11px;
`;

export function OriginStep() {
  const [showStory, setShowStory] = useState(false);
  const [acknowledged, setAcknowledged] = useState(false);

  return (
    <Container>
      <Header>
        <Title>Welcome to $DICKBUTT Setup</Title>
        <ToggleButton onClick={() => setShowStory(!showStory)}>
          {showStory ? '🖼️ Comic' : '📖 Story'}
        </ToggleButton>
      </Header>

      <ContentFrame variant="field">
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

      <AcknowledgeRow>
        <Checkbox
          checked={acknowledged}
          onChange={() => setAcknowledged(!acknowledged)}
          label="I acknowledge Dickbutt as a legendary internet meme"
        />
      </AcknowledgeRow>
    </Container>
  );
}
