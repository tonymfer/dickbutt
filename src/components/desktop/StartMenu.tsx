'use client';

import { useRef, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useDesktop } from '@/context/DesktopContext';
import { useClickOutside } from '@/hooks/useClickOutside';
import { MenuList, MenuListItem } from 'react95';
import styled from 'styled-components';
import { Win98Separator } from '@/components/ui/win98';
/* eslint-disable @next/next/no-img-element */

interface StartMenuProps {
  onClose: () => void;
}

const MenuContainer = styled.div`
  position: fixed;
  bottom: 28px;
  left: 0;
  z-index: 10000;
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
  width: 180px;
  padding: 2px 0;
`;

const MenuItem = styled(MenuListItem)`
  font-size: 11px;
  padding: 4px 8px;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  position: relative;

  &:hover {
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

const Arrow = styled.span`
  font-size: 10px;
  margin-left: auto;
`;

const SubMenu = styled.div`
  position: absolute;
  left: 100%;
  top: -2px;
  background: #c0c0c0;
  border: 2px solid;
  border-color: #ffffff #808080 #808080 #ffffff;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  min-width: 160px;
  z-index: 10001;
`;

const SubMenuItem = styled.div`
  font-size: 11px;
  padding: 4px 8px;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;

  &:hover {
    background: #000080;
    color: white;
  }
`;

export function StartMenu({ onClose }: StartMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { openWindow } = useDesktop();
  const [showPrograms, setShowPrograms] = useState(false);
  const [showDocuments, setShowDocuments] = useState(false);

  const handleClickOutside = useCallback(() => {
    onClose();
  }, [onClose]);

  useClickOutside(menuRef, handleClickOutside, {
    excludeSelector: 'button',
  });

  const handleRoute = (path: string) => {
    router.push(path);
    onClose();
  };

  const handleOpenWindow = (id: string, title: string) => {
    openWindow(id, title, id, { contentType: 'component' });
    onClose();
  };

  return (
    <MenuContainer ref={menuRef}>
      <Sidebar>
        <SidebarText>dickbutt95</SidebarText>
      </Sidebar>
      <StyledMenuList>
        {/* Programs with submenu */}
        <MenuItem
          onMouseEnter={() => { setShowPrograms(true); setShowDocuments(false); }}
        >
          <MenuIcon src="/assets/icons/win95/programs.ico" alt="" />
          <MenuLabel>Programs</MenuLabel>
          <Arrow>▶</Arrow>
          {showPrograms && (
            <SubMenu onMouseLeave={() => setShowPrograms(false)}>
              <SubMenuItem onClick={() => handleOpenWindow('origin', 'Origin Story')}>
                <MenuIcon src="/assets/icons/win95/scroll.ico" alt="" />
                Origin Story
              </SubMenuItem>
              <SubMenuItem onClick={() => handleOpenWindow('dickbutt', '$DICKBUTT')}>
                <MenuIcon src="/assets/icons/win95/money.ico" alt="" />
                $DICKBUTT
              </SubMenuItem>
              <SubMenuItem onClick={() => handleOpenWindow('roadmap', 'Roadmap')}>
                <MenuIcon src="/assets/icons/win95/map.ico" alt="" />
                Roadmap
              </SubMenuItem>
              <SubMenuItem onClick={() => handleOpenWindow('resources', 'Resources')}>
                <MenuIcon src="/assets/icons/win95/book.ico" alt="" />
                Resources
              </SubMenuItem>
              <SubMenuItem onClick={() => handleOpenWindow('wheretobuy', 'Where to Buy')}>
                <MenuIcon src="/assets/icons/win95/cart.ico" alt="" />
                Where to Buy
              </SubMenuItem>
              <SubMenuItem onClick={() => handleOpenWindow('disclaimer', 'Disclaimer')}>
                <MenuIcon src="/assets/icons/win95/warning.ico" alt="" />
                Disclaimer
              </SubMenuItem>
            </SubMenu>
          )}
        </MenuItem>

        {/* Documents with submenu */}
        <MenuItem
          onMouseEnter={() => { setShowDocuments(true); setShowPrograms(false); }}
        >
          <MenuIcon src="/assets/icons/win95/documents.ico" alt="" />
          <MenuLabel>Documents</MenuLabel>
          <Arrow>▶</Arrow>
          {showDocuments && (
            <SubMenu onMouseLeave={() => setShowDocuments(false)}>
              <SubMenuItem onClick={() => handleRoute('/meme')}>
                <MenuIcon src="/assets/icons/win95/folder-hires.ico" alt="" />
                Meme Folder
              </SubMenuItem>
              <SubMenuItem onClick={() => handleRoute('/branding')}>
                <MenuIcon src="/assets/icons/win95/folder-hires.ico" alt="" />
                Branding
              </SubMenuItem>
              <SubMenuItem onClick={() => handleRoute('/irl')}>
                <MenuIcon src="/assets/icons/win95/camera.ico" alt="" />
                Dickbutts IRL
              </SubMenuItem>
              <SubMenuItem onClick={() => handleRoute('/videos')}>
                <MenuIcon src="/assets/icons/win95/video.ico" alt="" />
                Videos
              </SubMenuItem>
            </SubMenu>
          )}
        </MenuItem>

        <MenuItem
          onClick={() => handleOpenWindow('settings', 'Settings')}
          onMouseEnter={() => { setShowPrograms(false); setShowDocuments(false); }}
        >
          <MenuIcon src="/assets/icons/win95/settings.ico" alt="" />
          <MenuLabel>Settings</MenuLabel>
        </MenuItem>

        <MenuItem
          onClick={() => handleRoute('/dickbutt-nfts')}
          onMouseEnter={() => { setShowPrograms(false); setShowDocuments(false); }}
        >
          <MenuIcon src="/assets/icons/win95/find.ico" alt="" />
          <MenuLabel>Find NFTs</MenuLabel>
        </MenuItem>

        <MenuItem
          onClick={() => handleRoute('/tv')}
          onMouseEnter={() => { setShowPrograms(false); setShowDocuments(false); }}
        >
          <MenuIcon src="/assets/icons/win95/help.ico" alt="" />
          <MenuLabel>TV Channel</MenuLabel>
        </MenuItem>

        <Win98Separator />

        <MenuItem
          onClick={() => window.open('https://basescan.org/token/0x...', '_blank')}
          onMouseEnter={() => { setShowPrograms(false); setShowDocuments(false); }}
        >
          <MenuIcon src="/assets/icons/win95/run.ico" alt="" />
          <MenuLabel>Run Contract</MenuLabel>
        </MenuItem>

        <Win98Separator />

        <MenuItem
          onClick={onClose}
          onMouseEnter={() => { setShowPrograms(false); setShowDocuments(false); }}
        >
          <MenuIcon src="/assets/icons/win95/shutdown.ico" alt="" />
          <MenuLabel>Shut Down...</MenuLabel>
        </MenuItem>
      </StyledMenuList>
    </MenuContainer>
  );
}
