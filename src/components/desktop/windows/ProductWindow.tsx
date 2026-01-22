'use client';

import { Button, Frame } from 'react95';
import styled from 'styled-components';
import Image from 'next/image';

const BOOK_IMAGE_URL = 'https://m.media-amazon.com/images/I/51EvPlS4NjL._SL1491_.jpg';
const PRODUCT_URL = 'https://www.amazon.com/dp/B0GHQWJQNN?ref=cm_sw_r_ffobk_cso_cp_apin_dp_EXNXMNTNVB378VWQF5FH&ref_=cm_sw_r_ffobk_cso_cp_apin_dp_EXNXMNTNVB378VWQF5FH&social_share=cm_sw_r_ffobk_cso_cp_apin_dp_EXNXMNTNVB378VWQF5FH&bestFormat=true';

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
    window.open(PRODUCT_URL, '_blank', 'noopener,noreferrer');
  };

  return (
    <Container>
      <BookFrame variant="field">
        <BookImageWrapper>
          <Image
            src={BOOK_IMAGE_URL}
            alt="The Dickbutt Standard"
            fill
            style={{ objectFit: 'contain' }}
            unoptimized
          />
        </BookImageWrapper>
      </BookFrame>

      <InfoSection>
        <div>
          <BookTitle>
            The Dickbutt Standard
            <NewBadge>NEW</NewBadge>
          </BookTitle>
          <ComingSoonBadge>COMING SOON</ComingSoonBadge>
        </div>

        <BookDescription>
          A comprehensive exploration of Dickbutt and its place in monetary history.
          The decentralized alternative to central banking.
        </BookDescription>

        <StyledButton primary onClick={handleViewProduct}>
          📚 Amazon
        </StyledButton>

        <StatusFrame variant="status">
          <span>By Saifedean Ammous • Available on Amazon</span>
        </StatusFrame>
      </InfoSection>
    </Container>
  );
}
