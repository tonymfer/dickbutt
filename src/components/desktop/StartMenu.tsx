'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useDesktop } from '@/context/DesktopContext';
import { MenuList, MenuListItem, Separator } from 'react95';
import styled from 'styled-components';
import { Win95Icon } from '@/components/ui/Win95Icon';

interface StartMenuProps {
  onClose: () => void;
}

const MenuContainer = styled.div`
  position: fixed;
  bottom: 36px;
  left: 0;
  z-index: 10000;
  display: flex;
`;

const Sidebar = styled.div`
  width: 24px;
  background: linear-gradient(180deg, #808080 0%, #000080 100%);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 8px;
`;

const SidebarText = styled.span`
  color: white;
  font-size: 11px;
  font-weight: bold;
  writing-mode: vertical-rl;
  transform: rotate(180deg);
`;

const StyledMenuList = styled(MenuList)`
  width: 200px;
`;

const MenuItem = styled(MenuListItem)`
  font-size: 12px;
`;

const IconSpan = styled.span`
  margin-right: 8px;
  display: inline-flex;
  align-items: center;
`;

export function StartMenu({ onClose }: StartMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { openWindow } = useDesktop();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        const target = e.target as HTMLElement;
        if (!target.closest('button')?.textContent?.includes('Start')) {
          onClose();
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

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
        <MenuItem onClick={() => handleRoute('/meme')}>
          <IconSpan><Win95Icon name="folder" size={16} /></IconSpan>
          Meme Folder
        </MenuItem>
        <MenuItem onClick={() => handleRoute('/irl')}>
          <IconSpan><Win95Icon name="camera" size={16} /></IconSpan>
          IRL
        </MenuItem>
        <MenuItem onClick={() => handleRoute('/branding')}>
          <IconSpan><Win95Icon name="paint" size={16} /></IconSpan>
          Branding
        </MenuItem>
        <MenuItem onClick={() => handleRoute('/videos')}>
          <IconSpan><Win95Icon name="tv" size={16} /></IconSpan>
          Videos
        </MenuItem>
        <MenuItem onClick={() => handleRoute('/tv')}>
          <IconSpan><Win95Icon name="media" size={16} /></IconSpan>
          TV Channel
        </MenuItem>
        <Separator />
        <MenuItem onClick={() => handleOpenWindow('origin', 'Origin Story')}>
          <IconSpan><Win95Icon name="scroll" size={16} /></IconSpan>
          Origin Story
        </MenuItem>
        <MenuItem onClick={() => handleOpenWindow('dickbutt', '$DICKBUTT')}>
          <IconSpan><Win95Icon name="money" size={16} /></IconSpan>
          $DICKBUTT
        </MenuItem>
        <MenuItem onClick={() => handleOpenWindow('roadmap', 'Roadmap')}>
          <IconSpan><Win95Icon name="map" size={16} /></IconSpan>
          Roadmap
        </MenuItem>
        <MenuItem onClick={() => handleOpenWindow('resources', 'Resources')}>
          <IconSpan><Win95Icon name="book" size={16} /></IconSpan>
          Resources
        </MenuItem>
        <MenuItem onClick={() => handleOpenWindow('wheretobuy', 'Where to Buy')}>
          <IconSpan><Win95Icon name="cart" size={16} /></IconSpan>
          Where to Buy
        </MenuItem>
        <MenuItem onClick={() => handleOpenWindow('disclaimer', 'Disclaimer')}>
          <IconSpan><Win95Icon name="warning" size={16} /></IconSpan>
          Disclaimer
        </MenuItem>
        <Separator />
        <MenuItem onClick={() => handleOpenWindow('settings', 'Settings')}>
          <IconSpan><Win95Icon name="settings" size={16} /></IconSpan>
          Settings
        </MenuItem>
      </StyledMenuList>
    </MenuContainer>
  );
}
