'use client';

import { Frame } from 'react95';
import styled from 'styled-components';
import Image from 'next/image';
import { ORIGIN_CONTENT } from '@/lib/windowContent';

const Container = styled.div`
  width: 100%;
  background: #c0c0c0;
`;

const ImageFrame = styled(Frame)`
  margin: 0;
  padding: 3px;
  background: white;
`;

const ComicImageWrap = styled.div`
  width: 100%;
  position: relative;
  background: white;
`;

const Content = styled.div`
  padding: 10px 12px;
  font-size: 12px;
  line-height: 1.6;

  p {
    margin: 0 0 12px 0;
    text-align: justify;
  }

  p:last-child {
    margin-bottom: 0;
  }
`;

export function MobileOrigin() {
  return (
    <Container>
      <ImageFrame variant="field">
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
    </Container>
  );
}
