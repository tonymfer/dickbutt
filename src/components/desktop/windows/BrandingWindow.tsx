'use client';

import Image from 'next/image';
import styled from 'styled-components';
import { Win98Frame } from '@/components/ui/win98';

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

const AssetGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 12px;
`;

const AssetCard = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff;
`;

const PreviewArea = styled.div`
  background: #008080;
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 120px;
`;

const InfoSection = styled.div`
  padding: 6px;
  flex: 1;
`;

const AssetName = styled.h3`
  font-size: 11px;
  font-weight: bold;
  margin: 0 0 2px 0;
`;

const AssetDescription = styled.p`
  font-size: 10px;
  color: #666;
  margin: 0 0 2px 0;
`;

const FileName = styled.p`
  font-size: 9px;
  color: #999;
  margin: 0;
`;

const DownloadButton = styled.span`
  display: block;
  margin: 6px;
  padding: 4px 8px;
  text-align: center;
  font-size: 11px;
  background: #c0c0c0;
  border: 2px solid;
  border-color: #dfdfdf #808080 #808080 #dfdfdf;
  cursor: pointer;

  &:active {
    border-color: #808080 #dfdfdf #dfdfdf #808080;
  }
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

export function BrandingWindow() {
  return (
    <Container>
      <Description>
        Download official Dickbutt branding assets. Right-click and save, or use the download buttons.
      </Description>

      <ContentArea>
        <AssetGrid>
          {BRANDING_ASSETS.map((asset) => (
            <Win98Frame key={asset.file} $variant="field">
              <AssetCard>
                <PreviewArea>
                  <Image
                    src={`/assets/branding/${asset.file}`}
                    alt={asset.name}
                    width={160}
                    height={120}
                    style={{
                      maxWidth: '100%',
                      maxHeight: '120px',
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
                  <DownloadButton>Download</DownloadButton>
                </a>
              </AssetCard>
            </Win98Frame>
          ))}
        </AssetGrid>
      </ContentArea>

      <FooterBar>
        <Win98Frame $variant="status" style={{ flex: 1 }}>
          <FooterItem>{BRANDING_ASSETS.length} items</FooterItem>
        </Win98Frame>
      </FooterBar>
    </Container>
  );
}
