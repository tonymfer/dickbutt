'use client';

import { ScrollView } from 'react95';
import { Win98Frame } from '@/components/ui/win98';
import styled from 'styled-components';
import Image from 'next/image';
import { ORIGIN_CONTENT } from '@/lib/windowContent';

const Container = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
`;

const ImageFrame = styled(Win98Frame)`
  margin: 6px;
  padding: 3px;
  background: white;
`;

const ComicImageWrap = styled.div`
  width: 100%;
  position: relative;
  background: white;
`;

const Content = styled.div`
  padding: 6px 10px;
  font-size: 11px;
  line-height: 1.5;

  p {
    margin: 0 0 8px 0;
    text-align: justify;
  }

  p:last-child {
    margin-bottom: 0;
  }
`;

export function OriginWindow() {
  return (
    <Container>
      <ScrollView style={{ height: '100%' }}>
        <ImageFrame $variant="field">
          <ComicImageWrap>
            <Image
              src={ORIGIN_CONTENT.imageUrl}
              alt={ORIGIN_CONTENT.imageAlt}
              width={ORIGIN_CONTENT.imageWidth}
              height={ORIGIN_CONTENT.imageHeight}
              style={{
                width: '100%',
                height: 'auto',
                imageRendering: 'auto',
                display: 'block',
              }}
              priority
            />
          </ComicImageWrap>
        </ImageFrame>

        <Content>
          {ORIGIN_CONTENT.paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </Content>
      </ScrollView>
    </Container>
  );
}
