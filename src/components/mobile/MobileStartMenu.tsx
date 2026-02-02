'use client';

import { useRef, useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useWizard } from '@/context/WizardContext';
import { useClickOutside } from '@/hooks/useClickOutside';
import { MenuList, MenuListItem } from 'react95';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { BASESCAN_CONTRACT_URL } from '@/lib/links';
import { Win98Separator } from '@/components/ui/win98';
import { BSODOverlay } from './BSODOverlay';

interface MobileStartMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const Overlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  z-index: 9998;
`;

const MenuContainer = styled(motion.div)`
  position: fixed;
  bottom: 36px;
  left: 0;
  z-index: 9999;
  display: flex;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`;

const Sidebar = styled.div`
  width: 22px;
  background: linear-gradient(180deg, #000080 0%, #1084d0 100%);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 4px;
`;

const SidebarText = styled.span`
  color: #c0c0c0;
  font-size: 14px;
  font-weight: bold;
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  letter-spacing: 1px;
  text-shadow: 1px 1px 0 #000;
`;

const StyledMenuList = styled(MenuList)`
  width: 200px;
  padding: 2px 0;
`;

const MenuItem = styled(MenuListItem)`
  font-size: 13px;
  padding: 10px 12px;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;

  &:hover, &:active {
    background: #000080;
    color: white;
  }
`;

const MenuIcon = styled.img`
  width: 16px;
  height: 16px;
  image-rendering: pixelated;
  flex-shrink: 0;
`;

const MenuLabel = styled.span`
  flex: 1;
`;

export function MobileStartMenu({ isOpen, onClose }: MobileStartMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { showWizard } = useWizard();
  const [showBSOD, setShowBSOD] = useState(false);

  const handleClickOutside = useCallback(() => {
    onClose();
  }, [onClose]);

  useClickOutside(menuRef, handleClickOutside, {
    excludeSelector: 'button',
    enabled: isOpen,
  });

  const handleRoute = (path: string) => {
    router.push(path);
    onClose();
  };

  const handleLink = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
    onClose();
  };

  const handleWizard = () => {
    showWizard();
    onClose();
  };

  const handleShutDown = () => {
    onClose();
    // Small delay to let menu close animation start
    setTimeout(() => setShowBSOD(true), 100);
  };

  const handleBSODClose = () => {
    setShowBSOD(false);
  };

  return (
    <>
      {showBSOD && <BSODOverlay onClose={handleBSODClose} />}
      <AnimatePresence>
      {isOpen && (
        <>
          <Overlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          />
          <MenuContainer
            ref={menuRef}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          >
            <Sidebar>
              <SidebarText>dickbutt95</SidebarText>
            </Sidebar>
            <StyledMenuList>
              <MenuItem onClick={() => handleRoute('/meme')}>
                <MenuIcon src="/assets/icons/win95/folder-hires.ico" alt="" />
                <MenuLabel>Meme Folder</MenuLabel>
              </MenuItem>

              <MenuItem onClick={() => handleRoute('/branding')}>
                <MenuIcon src="/assets/icons/win95/folder-hires.ico" alt="" />
                <MenuLabel>Branding</MenuLabel>
              </MenuItem>

              <MenuItem onClick={() => handleRoute('/irl')}>
                <MenuIcon src="/assets/icons/win95/folder-hires.ico" alt="" />
                <MenuLabel>Dickbutts IRL</MenuLabel>
              </MenuItem>

              <MenuItem onClick={() => handleRoute('/tv')}>
                <MenuIcon src="/assets/icons/win95/tv.ico" alt="" />
                <MenuLabel>TV Channel</MenuLabel>
              </MenuItem>

              <MenuItem onClick={() => handleRoute('/videos')}>
                <MenuIcon src="/assets/icons/win95/video.ico" alt="" />
                <MenuLabel>Videos</MenuLabel>
              </MenuItem>

              <MenuItem onClick={() => handleRoute('/dickbutt-nfts')}>
                <MenuIcon src="/assets/icons/win95/nft.ico" alt="" />
                <MenuLabel>NFT Collection</MenuLabel>
              </MenuItem>

              <Win98Separator />

              <MenuItem onClick={() => handleLink(BASESCAN_CONTRACT_URL)}>
                <MenuIcon src="/assets/icons/win95/contract.ico" alt="" />
                <MenuLabel>View Contract</MenuLabel>
              </MenuItem>

              <MenuItem onClick={handleWizard}>
                <MenuIcon src="/assets/icons/win95/settings.ico" alt="" />
                <MenuLabel>Run Setup Wizard</MenuLabel>
              </MenuItem>

              <Win98Separator />

              <MenuItem onClick={handleShutDown}>
                <MenuIcon src="/assets/icons/win95/shutdown.ico" alt="" />
                <MenuLabel>Shut Down...</MenuLabel>
              </MenuItem>
            </StyledMenuList>
          </MenuContainer>
        </>
      )}
    </AnimatePresence>
    </>
  );
}
