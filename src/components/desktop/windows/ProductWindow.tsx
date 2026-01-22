'use client';

import { Button, Frame } from 'react95';
import styled from 'styled-components';
import Image from 'next/image';
import { PRODUCT_CONTENT } from '@/lib/windowContent';

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background: #c0c0c0;
  padding: 6px;
  gap: 8px;
`;

const BookFrame = styled(Frame)`
  width: 120px;
  height: 160px;
  flex-shrink: 0;
  padding: 4px;
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

const InfoSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
`;

const BookTitle = styled.h3`
  font-size: 12px;
  font-weight: bold;
  margin: 0;
  color: #000080;
`;

const ComingSoonBadge = styled.span`
  display: inline-block;
  background: #800000;
  color: white;
  font-size: 9px;
  font-weight: bold;
  padding: 1px 6px;
`;

const BookDescription = styled.p`
  font-size: 10px;
  line-height: 1.4;
  margin: 0;
  color: #333;
  flex: 1;
`;

const StyledButton = styled(Button).withConfig({
  shouldForwardProp: (prop) =>
    !['active', 'primary', 'fullWidth', 'square'].includes(prop),
})`
  height: 24px;
  font-size: 10px;
  font-weight: bold;
`;

const NewBadge = styled.span`
  background: #ff0000;
  color: white;
  font-size: 8px;
  font-weight: bold;
  padding: 1px 3px;
  margin-left: 4px;
  animation: blink 1s infinite;

  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
`;

const StatusFrame = styled(Frame)`
  padding: 2px 6px;
  display: flex;
  align-items: center;
  font-size: 9px;
`;

export function ProductWindow() {
  const handleViewProduct = () => {
    window.open(PRODUCT_CONTENT.productUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <Container>
      <BookFrame variant="field">
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

      <InfoSection>
        <div>
          <BookTitle>
            {PRODUCT_CONTENT.title}
            {PRODUCT_CONTENT.newBadge && <NewBadge>NEW</NewBadge>}
          </BookTitle>
          <ComingSoonBadge>{PRODUCT_CONTENT.badge}</ComingSoonBadge>
        </div>

        <BookDescription>{PRODUCT_CONTENT.description}</BookDescription>

        <StyledButton primary onClick={handleViewProduct}>
          {PRODUCT_CONTENT.buttonText}
        </StyledButton>

        <StatusFrame variant="status">
          <span>By {PRODUCT_CONTENT.author} • {PRODUCT_CONTENT.availability}</span>
        </StatusFrame>
      </InfoSection>
    </Container>
  );
}
