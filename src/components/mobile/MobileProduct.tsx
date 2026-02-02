'use client';

import styled from 'styled-components';
import Image from 'next/image';
import { PRODUCT_CONTENT } from '@/lib/windowContent';
import { Win98Button, Win98Frame } from '@/components/ui/win98';

const Container = styled.div`
  padding: 12px;
  background: #c0c0c0;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const BookFrame = styled(Win98Frame)`
  padding: 8px;
  background: white;
  display: flex;
  justify-content: center;
`;

const BookImageWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 280px;
  aspect-ratio: 0.75;
`;

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const BookTitle = styled.h3`
  font-size: 14px;
  font-weight: bold;
  margin: 0;
  color: #000080;
`;

const BookDescription = styled.p`
  font-size: 11px;
  line-height: 1.5;
  margin: 0;
  color: #333;
`;

const ComingSoonBadge = styled.span`
  display: inline-block;
  background: #800000;
  color: white;
  font-size: 10px;
  font-weight: bold;
  padding: 2px 8px;
  margin-top: 4px;
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 8px;
`;

const StyledButton = styled(Win98Button)`
  flex: 1;
  height: 32px;
  font-size: 12px;
  font-weight: bold;
`;

const StatusFrame = styled(Win98Frame)`
  padding: 4px 8px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 10px;
`;

const NewBadge = styled.span`
  background: #ff0000;
  color: white;
  font-size: 9px;
  font-weight: bold;
  padding: 1px 4px;
  animation: blink 1s infinite;

  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
`;

export function MobileProduct() {
  const handleViewProduct = () => {
    window.open(PRODUCT_CONTENT.productUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <Container>
      <BookFrame $variant="field">
        <BookImageWrapper>
          <Image
            src={PRODUCT_CONTENT.imageUrl}
            alt={PRODUCT_CONTENT.imageAlt}
            fill
            style={{
              objectFit: 'contain',
            }}
            unoptimized
          />
        </BookImageWrapper>
      </BookFrame>

      <InfoSection>
        <div>
          <BookTitle>{PRODUCT_CONTENT.title}</BookTitle>
          <ComingSoonBadge>{PRODUCT_CONTENT.badge}</ComingSoonBadge>
        </div>
        <BookDescription>{PRODUCT_CONTENT.description}</BookDescription>
      </InfoSection>

      <ButtonRow>
        <StyledButton $primary onClick={handleViewProduct}>
          {PRODUCT_CONTENT.buttonText}
        </StyledButton>
      </ButtonRow>

      <StatusFrame $variant="status">
        {PRODUCT_CONTENT.newBadge && <NewBadge>NEW</NewBadge>}
        <span>{PRODUCT_CONTENT.availability}</span>
        <span style={{ marginLeft: 'auto' }}>By {PRODUCT_CONTENT.author}</span>
      </StatusFrame>
    </Container>
  );
}
