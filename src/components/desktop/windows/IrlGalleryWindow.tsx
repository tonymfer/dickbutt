'use client';

import Image from 'next/image';
import { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { Window, WindowContent, Frame } from 'react95';

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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
`;

const Description = styled.p`
  font-size: 12px;
  margin: 0;
  padding: 8px;
  flex-shrink: 0;
`;

const ContentArea = styled.div`
  flex: 1;
  overflow: auto;
  padding: 8px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 10px;
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
  font-size: 10px;
  font-weight: bold;
  padding: 3px 2px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${props => props.$selected ? '#fff' : '#000'};
`;

const ItemDescription = styled.span<{ $selected?: boolean }>`
  display: block;
  font-size: 9px;
  padding: 0 2px 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${props => props.$selected ? '#ccc' : '#666'};
`;

const FooterBar = styled.div`
  display: flex;
  gap: 4px;
  padding: 4px 8px;
  flex-shrink: 0;
`;

const FooterItem = styled.div`
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

const WindowTitlebar = styled.div`
  height: 18px;
  background: linear-gradient(to right, var(--ActiveTitle) 0%, var(--GradientActiveTitle) 100%);
  color: var(--TitleText);
  display: flex;
  align-items: center;
  padding: 0 2px;
  gap: 3px;
  flex-shrink: 0;
  font-family: 'Segoe UI', sans-serif;
  font-size: 12px;
  font-weight: bold;
`;

const TitlebarIcon = styled.img`
  width: 16px;
  height: 16px;
  image-rendering: pixelated;
  flex-shrink: 0;
`;

const WindowTitleArea = styled.div`
  flex: 1;
  min-width: 0;
  overflow: hidden;
`;

const WindowTitle = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1;
`;

const WindowButton = styled.button`
  width: 16px;
  height: 14px;
  padding: 0;
  margin: 0;
  background: #c0c0c0;
  border: none;
  box-shadow: inset -1px -1px #0a0a0a, inset 1px 1px #ffffff, inset -2px -2px #808080, inset 2px 2px #dfdfdf;
  cursor: pointer;
  position: relative;
  flex-shrink: 0;

  &:active {
    box-shadow: inset 1px 1px #0a0a0a, inset -1px -1px #ffffff, inset 2px 2px #808080, inset -2px -2px #dfdfdf;
  }

  &:active .window-button-icon {
    transform: translate(calc(-50% + 1px), calc(-50% + 1px));
  }

  .window-button-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 8px;
    height: 8px;
  }

  .window-button-icon::before,
  .window-button-icon::after {
    content: '';
    position: absolute;
    width: 10px;
    height: 2px;
    background-color: #000;
    top: 50%;
    left: 50%;
  }

  .window-button-icon::before {
    transform: translate(-50%, -50%) rotate(45deg);
  }

  .window-button-icon::after {
    transform: translate(-50%, -50%) rotate(-45deg);
  }
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

const NavButton = styled.button`
  min-width: 80px;
  padding: 4px 12px;
  font-size: 12px;
  background: #c0c0c0;
  border: 2px solid;
  border-color: #dfdfdf #808080 #808080 #dfdfdf;
  cursor: pointer;

  &:active:not(:disabled) {
    border-color: #808080 #dfdfdf #dfdfdf #808080;
  }

  &:disabled {
    color: #808080;
    cursor: default;
  }
`;

export function IrlGalleryWindow() {
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
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [selectedIndex, handleKeyDown]);

  return (
    <>
      <Container>
        <Description>
          Dickbutt spotted in the wild! Graffiti, street art, protests, and more. Click any image to view full size.
        </Description>

        <ContentArea>
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
        </ContentArea>

        <FooterBar>
          <Frame variant="status" style={{ flex: 1 }}>
            <FooterItem>{IRL_ITEMS.length} items | Click to enlarge</FooterItem>
          </Frame>
        </FooterBar>
      </Container>

      {selectedItem && (
        <LightboxOverlay onClick={() => setSelectedIndex(null)}>
          <LightboxWindow onClick={(e) => e.stopPropagation()}>
            <WindowTitlebar>
              <TitlebarIcon src="/assets/icons/win95/camera.ico" alt="" />
              <WindowTitleArea>
                <WindowTitle>{selectedItem.title}</WindowTitle>
              </WindowTitleArea>
              <WindowButton onClick={() => setSelectedIndex(null)}>
                <span className="window-button-icon" />
              </WindowButton>
            </WindowTitlebar>

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

              <FooterBar style={{ padding: 0 }}>
                <Frame variant="status" style={{ flex: 1 }}>
                  <FooterItem>{selectedItem.description}</FooterItem>
                </Frame>
              </FooterBar>
            </LightboxContent>
          </LightboxWindow>
        </LightboxOverlay>
      )}
    </>
  );
}
