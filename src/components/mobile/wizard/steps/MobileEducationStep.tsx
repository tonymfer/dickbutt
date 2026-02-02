'use client';

import styled from 'styled-components';
import Image from 'next/image';
import { PRODUCT_CONTENT } from '@/lib/windowContent';
import { Win98Button, Win98Frame } from '@/components/ui/win98';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
  height: 100%;
  overflow-y: auto;
`;

const Title = styled.h2`
  font-size: 18px;
  font-weight: bold;
  color: #000080;
  margin: 0;
  text-align: center;
`;

const BookSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 1;
  min-height: 0;
`;

const BookFrame = styled(Win98Frame)`
  width: 100%;
  height: 200px;
  padding: 8px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BookImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const BookInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const BookTitle = styled.h3`
  font-size: 16px;
  font-weight: bold;
  margin: 0;
  color: #000080;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
`;

const ComingSoonBadge = styled.span`
  display: inline-block;
  background: #800000;
  color: white;
  font-size: 10px;
  font-weight: bold;
  padding: 2px 8px;
`;

const BookDescription = styled.div`
  font-size: 13px;
  line-height: 1.5;
  color: #333;
`;

const StyledButton = styled(Win98Button)`
  height: 36px;
  min-height: 36px;
  padding: 6px 20px;
  font-size: 14px;
  font-weight: bold;
  align-self: center;
`;

export function MobileEducationStep() {
  const handleViewProduct = () => {
    window.open(PRODUCT_CONTENT.productUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <Container>
      <Title>Education</Title>

      <BookSection>
        <BookFrame $variant="field">
          <BookImageWrapper>
            <Image
              src={PRODUCT_CONTENT.imageUrl}
              alt={PRODUCT_CONTENT.imageAlt}
              fill
              style={{ objectFit: 'contain' }}
              unoptimized
            />
          </BookImageWrapper>
        </BookFrame>

        <BookInfo>
          <BookTitle>
            {PRODUCT_CONTENT.title}
            <ComingSoonBadge>{PRODUCT_CONTENT.badge}</ComingSoonBadge>
          </BookTitle>

          <BookDescription>
            A comprehensive exploration of Dickbutt and its place in memetic
            and monetary history. The book analyzes how a 2006 meme became a
            durable cultural artifact and introduces the <strong>1D = 1B</strong> identity
            rule.
          </BookDescription>

          <StyledButton $primary onClick={handleViewProduct}>
            {PRODUCT_CONTENT.buttonText}
          </StyledButton>
        </BookInfo>
      </BookSection>
    </Container>
  );
}
