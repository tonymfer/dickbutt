'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Window, WindowHeader, WindowContent, Toolbar } from 'react95';
import { React95Provider } from '@/components/providers/React95Provider';
import styled from 'styled-components';
import { Win98Button, Win98Frame } from '@/components/ui/win98';

const BRANDING_ASSETS = [
  {
    name: 'Main Dickbutt',
    file: 'maindickbutt.png',
    description: 'The classic dickbutt image',
  },
  {
    name: 'Dickbutt Logo',
    file: 'dickbutt.png',
    description: 'Standard dickbutt logo',
  },
  {
    name: 'Dickbutt with Text',
    file: 'dickbuttwtext.png',
    description: 'Logo with text',
  },
  {
    name: 'Profile Picture',
    file: 'dickbuttpfp.jpg',
    description: 'Square PFP for social media',
  },
  {
    name: 'OG Image',
    file: 'dickbuttog.png',
    description: 'Open Graph / social preview',
  },
  {
    name: 'Banner',
    file: 'dickbuttbanner.png',
    description: 'Header banner image',
  },
  {
    name: 'Based Dickbutt',
    file: 'baseddickbutt.png',
    description: 'Based variant',
  },
  {
    name: 'Dickbutt Flag',
    file: 'dbflag.gif',
    description: 'Animated waving flag',
  },
  {
    name: 'Dickbutt Coin',
    file: 'dickbuttcoin.gif',
    description: 'Animated spinning coin',
  },
  {
    name: 'Coin Static',
    file: 'dickcoin.png',
    description: 'Static coin image',
  },
  {
    name: 'Background',
    file: 'dickbuttbasebg2df.png',
    description: 'Desktop background image',
  },
];

const PageContainer = styled.div`
  min-height: 100vh;
  background: #c0c0c0;
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

const CloseButton = styled(Win98Button)`
  padding: 0 4px;
  min-width: 20px;
  height: 18px;
  font-weight: bold;
`;

const Description = styled.p`
  font-size: 12px;
  margin-bottom: 16px;
`;

const AssetGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 8px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const AssetCard = styled.div`
  display: flex;
  flex-direction: column;
  background: #c0c0c0;
  border: 2px solid;
  border-color: #dfdfdf #808080 #808080 #dfdfdf;
  box-shadow: 1px 1px 0 #000;
`;

const PreviewArea = styled.div`
  background: #ffffff;
  border: 2px solid;
  border-color: #808080 #dfdfdf #dfdfdf #808080;
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 120px;
  margin: 4px;
`;

const InfoSection = styled.div`
  padding: 4px 8px;
  flex: 1;
  background: #c0c0c0;
`;

const AssetName = styled.h3`
  font-size: 11px;
  font-weight: bold;
  margin: 0 0 2px 0;
  color: #000;
`;

const AssetDescription = styled.p`
  font-size: 10px;
  color: #444;
  margin: 0 0 2px 0;
`;

const FileName = styled.p`
  font-size: 9px;
  color: #808080;
  margin: 0;
  font-family: monospace;
`;

const DownloadButton = styled(Win98Button)`
  margin: 4px;
  text-align: center;
  text-decoration: none;
  display: block;
  font-size: 11px;
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

function BrandingContent() {
  return (
    <PageContainer>
      <StyledWindow>
        <StyledWindowHeader>
          <span>Branding Assets</span>
          <Link href="/">
            <CloseButton>
              <span>X</span>
            </CloseButton>
          </Link>
        </StyledWindowHeader>

        <Toolbar>
          <Link href="/">
            <Win98Button>← Back to Desktop</Win98Button>
          </Link>
        </Toolbar>

        <WindowContent>
          <Description>
            Download official Dickbutt branding assets. Right-click and save, or use the download buttons.
          </Description>

          <AssetGrid>
            {BRANDING_ASSETS.map((asset) => (
              <AssetCard key={asset.file}>
                <PreviewArea>
                  <Image
                    src={`/assets/branding/${asset.file}`}
                    alt={asset.name}
                    width={160}
                    height={120}
                    style={{
                      maxWidth: '100%',
                      maxHeight: '100px',
                      width: 'auto',
                      height: 'auto',
                      objectFit: 'contain',
                    }}
                    unoptimized={asset.file.endsWith('.gif')}
                  />
                </PreviewArea>

                <InfoSection>
                  <AssetName>{asset.name}</AssetName>
                  <AssetDescription>{asset.description}</AssetDescription>
                  <FileName>{asset.file}</FileName>
                </InfoSection>

                <a
                  href={`/assets/branding/${asset.file}`}
                  download={asset.file}
                  style={{ textDecoration: 'none' }}
                >
                  <DownloadButton as="span">
                    💾 Download
                  </DownloadButton>
                </a>
              </AssetCard>
            ))}
          </AssetGrid>
        </WindowContent>

        <StatusBar>
          <Win98Frame $variant="status" style={{ flex: 1 }}>
            <StatusItem>{BRANDING_ASSETS.length} items</StatusItem>
          </Win98Frame>
        </StatusBar>
      </StyledWindow>
    </PageContainer>
  );
}

export function BrandingPageClient() {
  return (
    <React95Provider>
      <BrandingContent />
    </React95Provider>
  );
}
