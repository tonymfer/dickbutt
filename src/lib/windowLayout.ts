// Window layout rects (x/y + width/height), computed from viewport
// This creates a consistent "dashboard grid" layout on desktop screens.

export interface WindowLayoutConfig {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Position {
  x: number;
  y: number;
}

export interface WindowRect extends WindowLayoutConfig {}

const HEADER_HEIGHT = 0;
const TASKBAR_HEIGHT = 36;
const GRID_GAP = 16;
const MIN_W = 240;
const MIN_H = 160;
const ICON_ROW_RESERVE_H = 88; // space for the top-right desktop icon row (labels included)

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function clampRectToViewport(
  rect: WindowRect,
  viewportWidth: number,
  viewportHeight: number,
  minWidth: number = MIN_W,
  minHeight: number = MIN_H
): WindowRect {
  const availableHeight = viewportHeight - HEADER_HEIGHT - TASKBAR_HEIGHT;
  const width = clamp(rect.width, minWidth, viewportWidth - GRID_GAP * 2);
  const height = clamp(rect.height, minHeight, availableHeight - GRID_GAP * 2);

  const x = clamp(rect.x, 0, Math.max(0, viewportWidth - width));
  const y = clamp(rect.y, 0, Math.max(0, availableHeight - height));

  return { x, y, width, height };
}

// Winamp is approximately 275px wide
const WINAMP_WIDTH = 275;
const BOTTOM_ICONS_RESERVE = 100; // Space for TV/Videos/NFT icons at bottom

function getDesktopGrid(viewportWidth: number, viewportHeight: number) {
  const availableHeight = viewportHeight - HEADER_HEIGHT - TASKBAR_HEIGHT - GRID_GAP * 2 - BOTTOM_ICONS_RESERVE;

  // Left column matches Winamp width
  let leftW = WINAMP_WIDTH;
  // Center and right columns scale with viewport
  let centerW = viewportWidth >= 1500 ? 520 : viewportWidth >= 1280 ? 460 : 380;
  let rightW = viewportWidth >= 1500 ? 320 : viewportWidth >= 1280 ? 300 : 280;

  // Calculate total grid width needed
  const totalGridWidth = leftW + centerW + rightW + GRID_GAP * 2; // 2 gaps between 3 columns
  const availableWidth = viewportWidth - GRID_GAP * 2; // margins on left and right

  // Ensure it fits; shrink proportionally if needed
  if (totalGridWidth > availableWidth) {
    const scale = availableWidth / totalGridWidth;
    leftW = Math.max(WINAMP_WIDTH, Math.floor(leftW * scale));
    centerW = Math.floor(centerW * scale);
    rightW = Math.max(MIN_W, availableWidth - leftW - centerW - GRID_GAP * 2);
  }

  // Center the grid horizontally when viewport is wider than needed
  const actualGridWidth = leftW + centerW + rightW + GRID_GAP * 2;
  const horizontalOffset = Math.max(GRID_GAP, Math.floor((viewportWidth - actualGridWidth) / 2));

  const topHPreferred = Math.max(280, Math.floor(availableHeight * 0.65));
  let topH = topHPreferred;
  let bottomH = availableHeight - topH - GRID_GAP;
  if (bottomH < 160) {
    bottomH = 160;
    topH = Math.max(280, availableHeight - bottomH - GRID_GAP);
  }

  const leftX = horizontalOffset;
  const centerX = leftX + leftW + GRID_GAP;
  const rightX = centerX + centerW + GRID_GAP;
  const topY = GRID_GAP;
  const bottomY = topY + topH + GRID_GAP;

  return {
    availableHeight,
    left: { x: leftX, width: leftW },
    center: { x: centerX, width: centerW },
    right: { x: rightX, width: rightW },
    top: { y: topY, height: topH },
    bottom: { y: bottomY, height: bottomH },
  };
}

function calculateMobileRect(viewportWidth: number, viewportHeight: number, windowId: string): WindowRect {
  const availableHeight = viewportHeight - HEADER_HEIGHT - TASKBAR_HEIGHT;
  const width = Math.max(MIN_W, viewportWidth - GRID_GAP * 2);
  const height = Math.min(420, Math.max(240, Math.floor(availableHeight * 0.55)));

  const order = ['resources', 'origin', 'dickbutt', 'wheretobuy', 'roadmap', 'disclaimer', 'settings'];
  const idx = Math.max(0, order.indexOf(windowId));
  const cascade = idx >= 0 ? idx : 0;

  const x = GRID_GAP;
  const y = GRID_GAP + cascade * 24;

  return clampRectToViewport({ x, y, width, height }, viewportWidth, viewportHeight);
}

// Get the left column X position for aligning Winamp with Resources
export function getLeftColumnX(viewportWidth: number, viewportHeight: number): number {
  const grid = getDesktopGrid(viewportWidth, viewportHeight);
  return grid.left.x;
}

// Get Webamp position (below Where to Buy window in left column)
export function getWebampPosition(viewportWidth: number, viewportHeight: number): { x: number; y: number } {
  const grid = getDesktopGrid(viewportWidth, viewportHeight);
  const whereToBuyRect = calculateWindowRect(viewportWidth, viewportHeight, 'wheretobuy');

  // Position Webamp below Where to Buy window
  return {
    x: grid.left.x,
    y: whereToBuyRect.y + whereToBuyRect.height + GRID_GAP,
  };
}

export function calculateWindowRect(
  viewportWidth: number,
  viewportHeight: number,
  windowId: string
): WindowRect {
  const isMobile = viewportWidth < 1024;
  if (isMobile) {
    return calculateMobileRect(viewportWidth, viewportHeight, windowId);
  }

  const grid = getDesktopGrid(viewportWidth, viewportHeight);

  // Use available height with space reserved for bottom icons
  const availableHeight = grid.availableHeight;

  // Top banner: Dickbutt on Base window spans center + right columns
  // Must be tall enough that the content area (after window chrome) doesn't overflow.
  const bannerH = 180;
  const bannerW = grid.center.width + GRID_GAP + grid.right.width;
  const bannerY = GRID_GAP;

  // Below banner: remaining height for other windows
  const belowBannerY = bannerY + bannerH + GRID_GAP;
  const belowBannerH = availableHeight - bannerH - GRID_GAP * 2;

  // Center column below banner: Origin + Roadmap
  // Fixed dialog height - must not scroll
  const roadmapH = 150;
  // IMPORTANT: clamp heights BEFORE computing dependent y positions
  // Origin needs more height for full-width image
  const originHMax = Math.max(MIN_H, belowBannerH - roadmapH - GRID_GAP);
  const originH = clamp(Math.floor(originHMax * 0.68), MIN_H, originHMax);

  // Left column: Resources + WhereToBuy stacked above Winamp area
  const whereToBuyH = 160; // Where to Buy with tabs needs decent height
  const resourcesH = clamp(Math.floor(availableHeight * 0.38), 200, availableHeight - whereToBuyH - 200);

  // Right column below banner: stack Tokenomics, Product, Disclaimer
  const rightTopY = belowBannerY;
  const rightAvailable = Math.max(MIN_H, belowBannerH);

  // Right column sizing priorities:
  // - Tokenomics should be compact (just fits the checkboxes)
  // - Product gets the book promo space
  // - Disclaimer stays compact
  const disclaimerH = 140;
  const dickbuttH = 165; // Compact tokenomics - just enough for checkboxes
  const productH = rightAvailable - dickbuttH - disclaimerH - GRID_GAP * 2;

  const rectById: Record<string, WindowRect> = {
    // Top banner spanning center + right
    dickbuttonbase: { x: grid.center.x, y: bannerY, width: bannerW, height: bannerH },

    // Left column - Resources + WhereToBuy stacked
    resources: { x: grid.left.x, y: GRID_GAP, width: grid.left.width, height: resourcesH },
    wheretobuy: { x: grid.left.x, y: GRID_GAP + resourcesH + GRID_GAP, width: grid.left.width, height: whereToBuyH },

    // Center column (below banner)
    origin: { x: grid.center.x, y: belowBannerY, width: grid.center.width, height: originH },
    roadmap: { x: grid.center.x, y: belowBannerY + originH + GRID_GAP, width: grid.center.width, height: roadmapH },

    // Right column (below banner) - Tokenomics + Product + Disclaimer
    dickbutt: { x: grid.right.x, y: rightTopY, width: grid.right.width, height: dickbuttH },
    product: {
      x: grid.right.x,
      y: rightTopY + dickbuttH + GRID_GAP,
      width: grid.right.width,
      height: productH,
    },
    disclaimer: {
      x: grid.right.x,
      y: rightTopY + dickbuttH + GRID_GAP + productH + GRID_GAP,
      width: grid.right.width,
      height: disclaimerH,
    },

    // Overlay (centered)
    settings: {
      x: Math.round((viewportWidth - 420) / 2),
      y: Math.round((grid.availableHeight - 320) / 2),
      width: 420,
      height: 320,
    },
  };

  const fallback: WindowRect = {
    x: GRID_GAP + 40,
    y: GRID_GAP + 40,
    width: 420,
    height: 320,
  };

  // Some windows are intentionally "compact" (Win95 dialog feel) and should not be
  // forced up to the global MIN_H, otherwise they overlap stacked/grid windows.
  const minHeightById: Record<string, number> = {
    dickbuttonbase: 180,
    dickbutt: 165,
    roadmap: 150,
    disclaimer: 140,
    wheretobuy: 160,
    product: 180,
  };

  const minH = minHeightById[windowId] ?? MIN_H;
  return clampRectToViewport(rectById[windowId] || fallback, viewportWidth, viewportHeight, MIN_W, minH);
}

export function calculateWindowPosition(
  viewportWidth: number,
  viewportHeight: number,
  windowId: string
): Position {
  const rect = calculateWindowRect(viewportWidth, viewportHeight, windowId);
  return { x: rect.x, y: rect.y };
}

export function getAllWindowPositions(
  viewportWidth: number,
  viewportHeight: number
): Record<string, Position> {
  const positions: Record<string, Position> = {};
  const windowIds = ['dickbuttonbase', 'resources', 'product', 'origin', 'dickbutt', 'wheretobuy', 'roadmap', 'disclaimer', 'settings'];

  for (const id of windowIds) {
    positions[id] = calculateWindowPosition(viewportWidth, viewportHeight, id);
  }

  return positions;
}
