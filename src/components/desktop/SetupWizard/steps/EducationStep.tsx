'use client';

import styled from 'styled-components';
import Image from 'next/image';
import { useState } from 'react';
import { Win98Button, Win98Frame, Win98Checkbox } from '@/components/ui/win98';
import { PRODUCT_CONTENT } from '@/lib/windowContent';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  height: 100%;
`;

const BookSection = styled.div`
  display: flex;
  gap: 16px;
  flex: 1;
  min-height: 0;
`;

const BookFrame = styled(Win98Frame)`
  width: 140px;
  min-width: 140px;
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

const BookInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 0;
`;

const BookTitle = styled.h3`
  font-size: 14px;
  font-weight: bold;
  margin: 0;
  color: #000080;
  flex-shrink: 0;
`;

const ComingSoonBadge = styled.span`
  display: inline-block;
  background: #800000;
  color: white;
  font-size: 9px;
  font-weight: bold;
  padding: 2px 6px;
  margin-left: 6px;
`;

const BookDescription = styled.div`
  flex: 1;
  font-size: 11px;
  line-height: 1.4;
  color: #333;
  overflow-y: auto;
`;

const StyledButton = styled(Win98Button)`
  height: 28px;
  min-height: 28px;
  padding: 4px 16px;
  font-size: 11px;
  font-weight: bold;
  align-self: flex-start;
  flex-shrink: 0;
`;

const AcknowledgeRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 0;
  flex-shrink: 0;
  font-size: 11px;
`;

export function EducationStep() {
  const [acknowledged, setAcknowledged] = useState(false);

  const handleViewProduct = () => {
    window.open(PRODUCT_CONTENT.productUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <Container>
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
            rule — demonstrating a new category of decentralized cultural asset
            with permissionless settlement on Base.
          </BookDescription>

          <StyledButton $primary onClick={handleViewProduct}>
            {PRODUCT_CONTENT.buttonText}
          </StyledButton>
        </BookInfo>
      </BookSection>

      <AcknowledgeRow>
        <Win98Checkbox
          checked={acknowledged}
          onChange={() => setAcknowledged(!acknowledged)}
          label="I will educate myself on the Dickbutt Standard"
        />
      </AcknowledgeRow>
    </Container>
  );
}
