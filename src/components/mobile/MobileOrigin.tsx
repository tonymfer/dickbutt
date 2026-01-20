'use client';

import { ScrollView, Frame } from 'react95';
import styled from 'styled-components';
import Image from 'next/image';

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
            src="/assets/dickbutt-comic.png"
            alt="Dickbutt origin comic"
            width={900}
            height={520}
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
        <p>
          Over the years, Dickbutt has remained a timeless meme, beloved by millions
          and widely recognized across social media, forums and internet subcultures.
          Its longevity and universal appeal have solidified its place as one of the
          most legendary and enduring memes in online history.
        </p>

        <p>
          The Dickbutt meme originated on July 2, 2006, when artist K.C. Green published
          a webcomic titled &quot;Tree. You&apos;ve Been Good to Us&quot; as part of his Horribleville
          series. The comic humorously depicted a character who draws a crude,
          anthropomorphic figure with a penis and buttocks protruding from its backside.
          This absurd and intentionally juvenile creation quickly gained traction on
          internet forums like 4Chan and Reddit, becoming a staple of early meme culture.
        </p>

        <p>
          Dickbutt&apos;s enduring popularity can be attributed to its simplicity, shock value
          and adaptability. It became a symbol of internet absurdity, often used in image
          macros, GIFs, and as a punchline in various contexts. Its influence is comparable
          to other early internet memes like Pepe the Frog and Doge, which also emerged
          from niche communities and organically became widely recognized symbols of
          internet culture.
        </p>

        <p>
          Dickbutt has transcended its origins, appearing in various forms of media and
          even inspiring NFT projects like CryptoDickbutts. Despite its crude nature, the
          meme&apos;s longevity and cultural impact highlight the internet&apos;s capacity to
          elevate even the most absurd creations to iconic status.
        </p>
      </Content>
    </Container>
  );
}
