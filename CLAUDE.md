# Windows 98 UI Style Guide

This project uses authentic Windows 98 styling. All UI components must follow these specifications.

## Color Palette

### Grays (3D Elements)
- `#dfdfdf` / `rgb(223, 223, 223)` - Highlight (light edge)
- `#c0c0c0` / `rgb(192, 192, 192)` - Button face / base gray
- `#808080` / `rgb(128, 128, 128)` - Shadow (dark edge)
- `#0a0a0a` - Darkest shadow

### Blues (Titlebar)
- `--ActiveTitle` / `#000080` - Active titlebar start
- `--GradientActiveTitle` / `rgb(16, 132, 208)` - Active titlebar end
- `--InactiveTitle` / `#808080` - Inactive titlebar start
- `--GradientInactiveTitle` / `#b5b5b5` - Inactive titlebar end
- `--TitleText` / `#ffffff` - Active title text
- `--InactiveTitleText` / `#c0c0c0` - Inactive title text

## 3D Border / Bevel Specifications

Use plain `<button>` elements (not react95 Button) for consistent styling with the `border` approach.

### Raised Button (default state)
```css
border: 2px solid;
border-color: rgb(223, 223, 223) rgb(128, 128, 128) rgb(128, 128, 128) rgb(223, 223, 223);
```

### Pressed Button (active state)
```css
border-color: rgb(128, 128, 128) rgb(223, 223, 223) rgb(223, 223, 223) rgb(128, 128, 128);
```

### Window Frame
```css
box-shadow: inset -1px -1px #0a0a0a, inset 1px 1px #dfdfdf, inset -2px -2px #808080, inset 2px 2px #ffffff;
```

## Titlebar Structure

- **Height:** 18px
- **Background:** Linear gradient from `--ActiveTitle` to `--GradientActiveTitle` (left to right)
- **Padding:** `0 2px`
- **Gap between elements:** 3px

### Titlebar Components (left to right)
1. **Icon** - 16x16px, `image-rendering: pixelated`
2. **Title** - Flex: 1, overflow ellipsis
3. **Minimize button** - 16x14px
4. **Maximize button** - 16x14px
5. **Close button** - 16x14px

## Window Button Specifications

- **Size:** 16px wide × 14px tall
- **Background:** `#c0c0c0` (var(--ButtonFace))
- **Border:** 2px solid with 3D colors

### Button Styling (styled-components)

```css
const WindowButton = styled.button`
  width: 16px;
  height: 14px;
  padding: 0;
  background: #c0c0c0;
  border: 2px solid;
  border-color: rgb(223, 223, 223) rgb(128, 128, 128) rgb(128, 128, 128) rgb(223, 223, 223);
  cursor: pointer;
  position: relative;

  &:active {
    border-color: rgb(128, 128, 128) rgb(223, 223, 223) rgb(223, 223, 223) rgb(128, 128, 128);
  }
`;
```

### Button Icons (CSS-based)

**Minimize button:**
```css
.window-button-icon {
  width: 6px;
  height: 2px;
  background-color: #000;
  margin-top: 3px;
}
```

**Maximize button:**
```css
.window-button-icon {
  width: 8px;
  height: 8px;
  border: 1px solid #000;
  border-top-width: 2px;
  background: transparent;
}
```

**Close button (X via pseudo-elements):**
```css
.window-button-icon::before,
.window-button-icon::after {
  content: '';
  position: absolute;
  width: 10px;
  height: 2px;
  background-color: #000;
  top: 50%;
  left: 50%;
}
.window-button-icon::before {
  transform: translate(-50%, -50%) rotate(45deg);
}
.window-button-icon::after {
  transform: translate(-50%, -50%) rotate(-45deg);
}
```

## Typography

- **Titlebar:** `font-family: 'Segoe UI', sans-serif; font-size: 12px; font-weight: bold;`
- **Content:** `font-family: Arial, sans-serif;`
- **Status bar:** `font-size: 11px;`

## Key Dimensions Reference

| Element | Dimension |
|---------|-----------|
| Titlebar height | 18px |
| Window button | 16×14px |
| Titlebar icon | 16×16px |
| Titlebar padding | 0 2px |
| Icon-to-title gap | 3px (via margin-right on icon) |
| Button spacing | 2px (via margin-left) |

## CSS Variables Reference

The following CSS variables are defined in `globals.css`:

```css
--ActiveTitle: #000080;
--GradientActiveTitle: rgb(16, 132, 208);
--InactiveTitle: #808080;
--GradientInactiveTitle: #b5b5b5;
--TitleText: #ffffff;
--InactiveTitleText: #c0c0c0;
--ButtonFace: #c0c0c0;
```

## Reference Implementation

See `src/components/desktop/Window.tsx` for the canonical Window component implementation with proper Win98 styling.
