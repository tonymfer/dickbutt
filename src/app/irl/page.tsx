'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useCallback, useEffect } from 'react';
import { Window, WindowHeader, WindowContent, Button, Toolbar, Frame } from 'react95';
import { React95Provider } from '@/components/providers/React95Provider';
import styled from 'styled-components';

const R2_BASE = 'https://pub-c5bbdf1eaf68478a9783e46a36a3c3b5.r2.dev/v1/gallery';

const IRL_ITEMS = [
  {
    id: 'dickbuttgraffiti',
    title: 'Dickbutt Graffiti',
    description: 'Classic street art',
    thumb: 'thumb/9422616489bb-dickbuttgraffiti.webp',
    full: 'full/9422616489bb-dickbuttgraffiti.jpg',
  },
  {
    id: 'dbnightgraffiti',
    title: 'Night Graffiti',
    description: 'Spotted at night',
    thumb: 'thumb/6117da8bba42-dbnightgraffiti.webp',
    full: 'full/6117da8bba42-dbnightgraffiti.jpg',
  },
  {
    id: 'graffitibrick',
    title: 'Brick Wall',
    description: 'On a brick wall',
    thumb: 'thumb/1ba6acacd544-graffitibrick.webp',
    full: 'full/1ba6acacd544-graffitibrick.webp',
  },
  {
    id: 'graffitidb',
    title: 'Graffiti DB',
    description: 'Urban dickbutt',
    thumb: 'thumb/b107b3a6c7bc-graffitidb.webp',
    full: 'full/b107b3a6c7bc-graffitidb.png',
  },
  {
    id: 'dickbuttgraffiti2',
    title: 'More Graffiti',
    description: 'Another sighting',
    thumb: 'thumb/47dfd784bc85-dickbuttgraffiti2.webp',
    full: 'full/47dfd784bc85-dickbuttgraffiti2.jpeg',
  },
  {
    id: 'dickbuttonstreet',
    title: 'On The Street',
    description: 'Street-level dickbutt',
    thumb: 'thumb/7d28aec988e5-dickbuttonstreet.webp',
    full: 'full/7d28aec988e5-dickbuttonstreet.webp',
  },
  {
    id: 'gmmfersgraffiti',
    title: 'GM Mfers Graffiti',
    description: 'Crossover art',
    thumb: 'thumb/0f874c001317-gmmfersgraffiti.webp',
    full: 'full/0f874c001317-gmmfersgraffiti.png',
  },
  {
    id: 'newsgraffitikids',
    title: 'News Report',
    description: 'Made the news',
    thumb: 'thumb/6a17a146a7ab-newsgraffitikids.webp',
    full: 'full/6a17a146a7ab-newsgraffitikids.webp',
  },
  {
    id: 'protestgirldb',
    title: 'Protest Sign',
    description: 'At a protest',
    thumb: 'thumb/bcf093bc58d3-protestgirldb.webp',
    full: 'full/bcf093bc58d3-protestgirldb.webp',
  },
  {
    id: 'dickbuttartistgirlpose',
    title: 'Artist Photo',
    description: 'With the artist',
    thumb: 'thumb/4526dc56952a-dickbuttartistgirlpose.webp',
    full: 'full/4526dc56952a-dickbuttartistgirlpose.jpg',
  },
  {
    id: 'girlclassdb',
    title: 'In Class',
    description: 'Classroom sighting',
    thumb: 'thumb/7e2fec96c08d-girlclassdb.webp',
    full: 'full/7e2fec96c08d-girlclassdb.jpg',
  },
  {
    id: 'dickbuttrealeyes',
    title: 'Real Eyes',
    description: 'Realistic version',
    thumb: 'thumb/5ae5ad474190-dickbuttrealeyes.webp',
    full: 'full/5ae5ad474190-dickbuttrealeyes.png',
  },
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
  max-width: 1000px;
`;

const StyledWindowHeader = styled(WindowHeader)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CloseButton = styled(Button).withConfig({
  shouldForwardProp: (prop) =>
    !['active', 'primary', 'fullWidth', 'square'].includes(prop),
})`
  padding: 0 4px;
  min-width: 20px;
  height: 18px;
  font-weight: bold;
`;

const Description = styled.p`
  font-size: 12px;
  margin-bottom: 16px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 12px;

  @media (min-width: 640px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const ThumbnailButton = styled.button<{ $selected?: boolean }>`
  padding: 4px;
  border: none;
  background: ${props => props.$selected ? '#000080' : '#fff'};
  cursor: pointer;
  display: flex;
  flex-direction: column;
  text-align: left;
  transition: background-color 0.1s;

  &:hover {
    background: #000080;
  }

  &:hover span {
    color: #fff;
  }
`;

const ThumbnailFrame = styled(Frame)`
  background: #008080;
  padding: 0;
  overflow: hidden;
`;

const ImageWrapper = styled.div`
  aspect-ratio: 1;
  position: relative;
  background: #008080;
`;

const ItemTitle = styled.span<{ $selected?: boolean }>`
  display: block;
  font-size: 11px;
  font-weight: bold;
  padding: 4px 2px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${props => props.$selected ? '#fff' : '#000'};
`;

const ItemDescription = styled.span<{ $selected?: boolean }>`
  display: block;
  font-size: 10px;
  padding: 0 2px 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${props => props.$selected ? '#ccc' : '#666'};
`;

const StatusBar = styled.div`
  display: flex;
  gap: 4px;
  padding: 4px 8px;
`;

const StatusItem = styled.div`
  padding: 2px 8px;
  font-size: 11px;
`;

// Lightbox components
const LightboxOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
`;

const LightboxWindow = styled(Window)`
  max-width: 90vw;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
`;

const LightboxHeader = styled(WindowHeader)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
`;

const LightboxContent = styled(WindowContent)`
  flex: 1;
  overflow: auto;
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const LightboxImageFrame = styled(Frame)`
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LightboxNavigation = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
`;

const NavButton = styled(Button).withConfig({
  shouldForwardProp: (prop) =>
    !['active', 'primary', 'fullWidth', 'square'].includes(prop),
})`
  min-width: 80px;
`;

function IrlContent() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const selectedItem = selectedIndex !== null ? IRL_ITEMS[selectedIndex] : null;

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (selectedIndex === null) return;

    switch (e.key) {
      case 'Escape':
        setSelectedIndex(null);
        break;
      case 'ArrowLeft':
        if (selectedIndex > 0) setSelectedIndex(selectedIndex - 1);
        break;
      case 'ArrowRight':
        if (selectedIndex < IRL_ITEMS.length - 1) setSelectedIndex(selectedIndex + 1);
        break;
    }
  }, [selectedIndex]);

  useEffect(() => {
    if (selectedIndex !== null) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = '';
      };
    }
  }, [selectedIndex, handleKeyDown]);

  return (
    <>
      <PageContainer>
        <StyledWindow>
          <StyledWindowHeader>
            <span>Dickbutt IRL - Real World Sightings</span>
            <Link href="/">
              <CloseButton size="sm">
                <span>X</span>
              </CloseButton>
            </Link>
          </StyledWindowHeader>

          <Toolbar>
            <Link href="/">
              <Button variant="thin" size="sm">← Back to Desktop</Button>
            </Link>
          </Toolbar>

          <WindowContent>
            <Description>
              Dickbutt spotted in the wild! Graffiti, street art, protests, and more.
              Click any image to view full size.
            </Description>

            <Grid>
              {IRL_ITEMS.map((item, index) => (
                <ThumbnailButton
                  key={item.id}
                  $selected={selectedIndex === index}
                  onClick={() => setSelectedIndex(index)}
                >
                  <ThumbnailFrame variant="field">
                    <ImageWrapper>
                      <Image
                        src={`${R2_BASE}/${item.thumb}`}
                        alt={item.title}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        style={{ objectFit: 'cover' }}
                      />
                    </ImageWrapper>
                  </ThumbnailFrame>
                  <ItemTitle $selected={selectedIndex === index}>
                    {item.title}
                  </ItemTitle>
                  <ItemDescription $selected={selectedIndex === index}>
                    {item.description}
                  </ItemDescription>
                </ThumbnailButton>
              ))}
            </Grid>
          </WindowContent>

          <StatusBar>
            <Frame variant="status" style={{ flex: 1 }}>
              <StatusItem>{IRL_ITEMS.length} items | Click to enlarge</StatusItem>
            </Frame>
          </StatusBar>
        </StyledWindow>
      </PageContainer>

      {selectedItem && (
        <LightboxOverlay onClick={() => setSelectedIndex(null)}>
          <LightboxWindow onClick={(e) => e.stopPropagation()}>
            <LightboxHeader>
              <span>{selectedItem.title}</span>
              <CloseButton size="sm" onClick={() => setSelectedIndex(null)}>
                <span>X</span>
              </CloseButton>
            </LightboxHeader>

            <LightboxContent>
              <LightboxImageFrame variant="well">
                <Image
                  src={`${R2_BASE}/${selectedItem.full}`}
                  alt={selectedItem.title}
                  width={1200}
                  height={900}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '70vh',
                    width: 'auto',
                    height: 'auto',
                    objectFit: 'contain',
                  }}
                  priority
                />
              </LightboxImageFrame>

              <LightboxNavigation>
                <NavButton
                  onClick={() => setSelectedIndex(selectedIndex! - 1)}
                  disabled={selectedIndex === 0}
                >
                  ← Previous
                </NavButton>
                <span style={{ fontSize: 12 }}>
                  {selectedIndex! + 1} of {IRL_ITEMS.length}
                </span>
                <NavButton
                  onClick={() => setSelectedIndex(selectedIndex! + 1)}
                  disabled={selectedIndex === IRL_ITEMS.length - 1}
                >
                  Next →
                </NavButton>
              </LightboxNavigation>

              <StatusBar style={{ padding: 0 }}>
                <Frame variant="status" style={{ flex: 1 }}>
                  <StatusItem>{selectedItem.description}</StatusItem>
                </Frame>
              </StatusBar>
            </LightboxContent>
          </LightboxWindow>
        </LightboxOverlay>
      )}
    </>
  );
}

export default function IrlPage() {
  return (
    <React95Provider>
      <IrlContent />
    </React95Provider>
  );
}
