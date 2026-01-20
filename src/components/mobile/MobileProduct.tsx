'use client';

import { Button, Frame, GroupBox } from 'react95';
import styled from 'styled-components';
import Image from 'next/image';

const BOOK_IMAGE_URL = 'https://dickbuttazon.com/wp-content/uploads/2025/05/dickbutt-standard-1.png';
const PRODUCT_URL = 'https://dickbuttazon.com/product/the-dickbutt-standard/';

const Container = styled.div`
  padding: 12px;
  background: #c0c0c0;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const BookFrame = styled(Frame)`
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

const StyledButton = styled(Button).withConfig({
  shouldForwardProp: (prop) =>
    !['active', 'primary', 'fullWidth', 'square'].includes(prop),
})`
  flex: 1;
  height: 32px;
  font-size: 12px;
  font-weight: bold;
`;

const StatusFrame = styled(Frame)`
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
    window.open(PRODUCT_URL, '_blank', 'noopener,noreferrer');
  };

  return (
    <Container>
      <BookFrame variant="field">
        <BookImageWrapper>
          <Image
            src={BOOK_IMAGE_URL}
            alt="The Dickbutt Standard - Book Cover"
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
          <BookTitle>The Dickbutt Standard</BookTitle>
          <ComingSoonBadge>COMING SOON</ComingSoonBadge>
        </div>
        <BookDescription>
          A comprehensive and authoritative exploration of Dickbutt and its place
          in monetary history. The decentralized alternative to central banking.
        </BookDescription>
      </InfoSection>

      <ButtonRow>
        <StyledButton primary onClick={handleViewProduct}>
          View on Dickbuttazon
        </StyledButton>
      </ButtonRow>

      <StatusFrame variant="status">
        <NewBadge>NEW</NewBadge>
        <span>Available soon on Amazon</span>
        <span style={{ marginLeft: 'auto' }}>By Saifedean Ammous</span>
      </StatusFrame>
    </Container>
  );
}
