'use client';

import { Button } from 'react95';
import styled from 'styled-components';
import { RESOURCE_LINKS } from '@/lib/links';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 4px;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow: auto;
`;

const ButtonList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const StyledButton = styled(Button).withConfig({
  shouldForwardProp: (prop) =>
    !['active', 'primary', 'fullWidth', 'square'].includes(prop),
})`
  width: 100%;
  height: 20px;
  font-size: 10px;
  font-weight: bold;
`;

// Specialty tools and sites (main links are in Dickbutt on Base banner)
const allResources = [
  { label: 'dextools', url: RESOURCE_LINKS.dextools },
  { label: 'instagram', url: RESOURCE_LINKS.instagram },
  { label: 'price checker', url: RESOURCE_LINKS.priceCheckerExtension },
  { label: 'CC0 store', url: RESOURCE_LINKS.cc0Store },
  { label: 'accept dickbutt', url: RESOURCE_LINKS.acceptDickbutt },
  { label: 'dickbuttazon', url: RESOURCE_LINKS.dickbuttazon },
  { label: 'dickbuttify', url: RESOURCE_LINKS.dickbuttify },
];

export function ResourcesWindow() {
  const handleClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <Container>
      <ButtonList>
        {allResources.map((resource) => (
          <StyledButton key={resource.label} onClick={() => handleClick(resource.url)}>
            {resource.label}
          </StyledButton>
        ))}
      </ButtonList>
    </Container>
  );
}
