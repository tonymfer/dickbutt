# React95 - Complete Component Library Guide (FULL DOCUMENTATION)

## Table of Contents

1. [Installation & Setup](#installation--setup)
2. [Controls Components](#controls-components)
3. [Environment Components](#environment-components)
4. [Layout Components](#layout-components)
5. [Typography Components](#typography-components)
6. [Other Components](#other-components)
7. [Theming](#theming)
8. [Common Patterns](#common-patterns)
9. [Component Variants Reference](#component-variants-reference)

---

## Installation & Setup

### Prerequisites
React95 requires `styled-components` as a peer dependency.

### Installation Command
```bash
# Using npm
npm install -S react95 styled-components

# Using yarn
yarn add react95 styled-components
```

### Basic Setup
```javascript
import React from 'react';
import { MenuList, MenuItem, Separator, styleReset } from 'react95';
import { createGlobalStyle, ThemeProvider } from 'styled-components';

// Import your desired theme
import original from 'react95/dist/themes/original';

// Optional: Import Windows95 fonts
import ms_sans_serif from 'react95/dist/fonts/ms_sans_serif.woff2';
import ms_sans_serif_bold from 'react95/dist/fonts/ms_sans_serif_bold.woff2';

const GlobalStyles = createGlobalStyle`
  ${styleReset}
  @font-face {
    font-family: 'ms_sans_serif';
    src: url('${ms_sans_serif}') format('woff2');
    font-weight: 400;
    font-style: normal;
  }
  @font-face {
    font-family: 'ms_sans_serif';
    src: url('${ms_sans_serif_bold}') format('woff2');
    font-weight: bold;
    font-style: normal;
  }
  body, input, select, textarea {
    font-family: 'ms_sans_serif';
  }
`;

export default function App() {
  return (
    <>
      <GlobalStyles />
      <ThemeProvider theme={original}>
        <MenuList>
          <MenuItem>📁 File</MenuItem>
          <MenuItem>✏️ Edit</MenuItem>
          <Separator />
          <MenuItem disabled>🔌 Exit</MenuItem>
        </MenuList>
      </ThemeProvider>
    </>
  );
}
```

---

## Controls Components

### Button

Standard interactive button component with multiple variants and states.

**Props:**
| Name | Type | Description | Default |
|------|------|-------------|---------|
| `active` | boolean | Set active state | false |
| `fullWidth` | boolean | Make button take full width of container | false |
| `primary` | boolean | Use primary button style | false |
| `size` | "sm" \\| "md" \\| "lg" | Button size | "md" |
| `square` | boolean | Make button square shaped | false |
| `variant` | "menu" \\| "default" \\| "flat" \\| "raised" \\| "thin" | Button style variant | "default" |
| `ref` | React.Ref | Forward ref to HTML element | - |
| `children` | React.ReactNode | Button content | - |

**Variants:**
- **default** - Standard 3D button with beveled edges
- **raised** - Raised appearance with shadow effect
- **flat** - Flat appearance without 3D effect
- **thin** - Thin border variant
- **menu** - Menu button style

**Example:**
```javascript
import { Button } from 'react95';

<Button primary onClick={() => console.log('Clicked!')}>
  Click Me
</Button>

<Button variant="flat" fullWidth>
  Full Width Button
</Button>

<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
```

---

### Checkbox

Checkbox input component with label support and indeterminate state.

**Props:**
| Name | Type | Description | Default |
|------|------|-------------|---------|
| `checked` | boolean | Checked state | - |
| `className` | string | CSS class name | - |
| `defaultChecked` | boolean | Initial checked state | false |
| `disabled` | boolean | Disable the checkbox | false |
| `indeterminate` | boolean | Indeterminate state (partially checked) | false |
| `label` | string \\| number | Checkbox label text | - |
| `name` | string | Input name attribute | - |
| `onChange` | ChangeEventHandler | Change event handler | - |
| `style` | CSSProperties | Inline CSS styles | - |
| `value` | string \\| number | Input value | - |
| `variant` | "default" \\| "flat" | Checkbox style variant | "default" |

**Example:**
```javascript
import { Checkbox } from 'react95';

<Checkbox label="Extra cheese" defaultChecked />
<Checkbox label="Bacon" />
<Checkbox label="Broccoli" disabled />
<Checkbox indeterminate label="Partially selected" />
```

---

### TextInput

Text input field with support for single line and multiline textarea.

**Props:**
| Name | Type | Description | Default |
|------|------|-------------|---------|
| `className` | string | CSS class name | - |
| `disabled` | boolean | Disable the input | false |
| `fullWidth` | boolean | Make input full width | - |
| `multiline` | boolean | Enable multiline textarea mode | - |
| `shadow` | boolean | Apply shadow effect to input | true |
| `style` | CSSProperties | Inline CSS styles | - |
| `variant` | "default" \\| "flat" | Input style variant | "default" |
| `onChange` | ChangeEventHandler | Change event handler | - |
| `type` | string | HTML input type attribute | "text" |
| `placeholder` | string | Placeholder text | - |
| `value` | string | Input value | - |

**Example:**
```javascript
import { TextInput } from 'react95';

<TextInput placeholder="Type here..." />

<TextInput 
  multiline 
  rows={5}
  defaultValue="Lorem ipsum dolor sit amet..."
/>

<TextInput disabled placeholder="Disabled input" />

<TextInput type="password" placeholder="Enter password" />
```

---

### Radio

Radio button input for single selection from multiple options.

**Props:**
| Name | Type | Description | Default |
|------|------|-------------|---------|
| `checked` | boolean | Checked state | - |
| `className` | string | CSS class name | - |
| `disabled` | boolean | Disable the radio button | false |
| `label` | string \\| number | Radio label text | - |
| `name` | string | Input name (groups radios together) | - |
| `onChange` | ChangeEventHandler | Change event handler | - |
| `style` | CSSProperties | Inline CSS styles | - |
| `value` | string \\| number \\| boolean | Radio value | - |
| `variant` | "default" \\| "flat" | Radio style variant | "default" |
| `as` | string \\| ComponentType | Render as different element | - |

**Example:**
```javascript
import { Radio } from 'react95';

<fieldset>
  <legend>Choose a fruit:</legend>
  <Radio name="fruits" value="pear" label="🍐 Pear" />
  <Radio name="fruits" value="orange" label="🍊 Orange" />
  <Radio name="fruits" value="kiwi" label="🥝 Kiwi" />
  <Radio name="fruits" value="grape" label="🍇 Grape" />
</fieldset>
```

---

### Select

Dropdown select component for choosing from predefined options.

**Props:**
| Name | Type | Description | Default |
|------|------|-------------|---------|
| `aria-label` | string | Accessible label for the select | - |
| `aria-labelledby` | string | ID of element labeling the select | - |
| `className` | string | CSS class name | - |
| `defaultValue` | string | Default selected option value | - |
| `disabled` | boolean | Disable the select | - |
| `name` | string | Input name attribute | - |
| `onChange` | Handler | Change event handler | - |
| `style` | CSSProperties | Inline CSS styles | - |
| `variant` | "default" \\| "flat" | Select style variant | "default" |
| `children` | React.ReactNode | Option elements | - |

**Example:**
```javascript
import { Select } from 'react95';

<Select defaultValue="option1">
  <option value="option1">Wysaur</option>
  <option value="option2">Abra</option>
  <option value="option3">Kadabra</option>
</Select>

<Select disabled>
  <option>Disabled Select</option>
</Select>
```

---

### Slider

Range slider component for value selection with marks and step control.

**Props:**
| Name | Type | Description | Default |
|------|------|-------------|---------|
| `defaultValue` | number | Initial slider value | - |
| `disabled` | boolean | Disable the slider | false |
| `marks` | boolean \\| Mark[] | Show marks on slider track | - |
| `max` | number | Maximum value | 100 |
| `min` | number | Minimum value | 0 |
| `name` | string | Input name attribute | - |
| `onChange` | Handler | Change event handler | - |
| `onChangeCommitted` | Handler | Handler for when slider is released | - |
| `onMouseDown` | Handler | Mouse down event handler | - |
| `orientation` | "horizontal" \\| "vertical" | Slider direction | "horizontal" |
| `size` | string \\| number | Slider size/width | "100%" |
| `step` | number | Step increment | 1 |
| `value` | number | Current slider value | - |
| `variant` | "default" \\| "flat" | Slider style variant | "default" |

**Example:**
```javascript
import { Slider } from 'react95';

<Slider min={0} max={100} defaultValue={50} />

<Slider 
  min={-5}
  max={5}
  step={0.5}
  marks
  orientation="vertical"
/>

<Slider disabled defaultValue={30} />
```

---

### ProgressBar

Visual progress indicator showing completion percentage.

**Props:**
| Name | Type | Description | Default |
|------|------|-------------|---------|
| `hideValue` | boolean | Hide the percentage text | false |
| `shadow` | boolean | Apply shadow effect | true |
| `value` | number | Progress value (0-100) | - |
| `variant` | "default" \\| "tile" | ProgressBar style variant | "default" |
| `as` | string \\| ComponentType | Render as different element | - |

**Variants:**
- **default** - Standard progress bar
- **tile** - Tiled/striped progress bar

**Example:**
```javascript
import { ProgressBar } from 'react95';

<ProgressBar value={65} />

<ProgressBar value={99} hideValue={false} />

<ProgressBar value={45} variant="tile" />
```

---

### Table

Data table component with headers, rows, and cells.

**Sub-Components:**
- `Table` - Main container
- `TableHead` - Header section
- `TableBody` - Body section
- `TableRow` - Row element
- `TableHeadCell` - Header cell
- `TableDataCell` - Data cell

**Props:**
| Name | Type | Description | Default |
|------|------|-------------|---------|
| `as` | string \\| ComponentType | Render as different element | - |

**Example:**
```javascript
import { Table, TableHead, TableBody, TableRow, TableHeadCell, TableDataCell } from 'react95';

<Table>
  <TableHead>
    <TableRow>
      <TableHeadCell>Type</TableHeadCell>
      <TableHeadCell>Name</TableHeadCell>
      <TableHeadCell>Level</TableHeadCell>
    </TableRow>
  </TableHead>
  <TableBody>
    <TableRow>
      <TableDataCell>🌱</TableDataCell>
      <TableDataCell>Bulbasaur</TableDataCell>
      <TableDataCell>64</TableDataCell>
    </TableRow>
    <TableRow>
      <TableDataCell>⚡</TableDataCell>
      <TableDataCell>Charizard</TableDataCell>
      <TableDataCell>203</TableDataCell>
    </TableRow>
    <TableRow>
      <TableDataCell>⚡</TableDataCell>
      <TableDataCell>Pikachu</TableDataCell>
      <TableDataCell>82</TableDataCell>
    </TableRow>
  </TableBody>
</Table>
```

---

### MenuList & MenuItem

Menu list component for creating navigation menus and context menus.

**MenuList Props:**
| Name | Type | Description | Default |
|------|------|-------------|---------|
| `fullWidth` | boolean | Make menu full width | - |
| `inline` | boolean | Horizontal menu layout | - |
| `shadow` | boolean | Apply shadow effect | - |
| `theme` | any | Theme object | - |
| `ref` | React.Ref | Forward ref to HTML element | - |
| `forwardedAs` | ElementType | Render as different element | - |

**MenuItem Props:**
| Name | Type | Description | Default |
|------|------|-------------|---------|
| `disabled` | boolean | Disable menu item | - |
| `onClick` | Handler | Click event handler | - |
| `children` | React.ReactNode | Menu item content | - |

**Example:**
```javascript
import { MenuList, MenuItem, Separator } from 'react95';

// Vertical menu
<MenuList>
  <MenuItem>📁 Sing</MenuItem>
  <MenuItem>💿 Dance</MenuItem>
  <MenuItem>🎪 Joke</MenuItem>
  <Separator />
  <MenuItem disabled>😴 Sleep</MenuItem>
</MenuList>

// Horizontal menu
<MenuList inline>
  <MenuItem>📁 File</MenuItem>
  <MenuItem>✏️ Edit</MenuItem>
  <MenuItem>👁️ View</MenuItem>
</MenuList>
```

---

### Tabs

Tabbed interface component for switching between content sections.

**Example:**
```javascript
import { Tabs } from 'react95';

<Tabs>
  <Tabs.Tab label="Tab 1">
    Content for tab 1
  </Tabs.Tab>
  <Tabs.Tab label="Tab 2">
    Content for tab 2
  </Tabs.Tab>
  <Tabs.Tab label="Tab 3">
    Content for tab 3
  </Tabs.Tab>
</Tabs>
```

---

### NumberInput

Numeric input field with increment/decrement spinner controls.

**Props:**
| Name | Type | Description | Default |
|------|------|-------------|---------|
| `className` | string | CSS class name | - |
| `defaultValue` | number | Initial value | - |
| `disabled` | boolean | Disable the input | false |
| `min` | number | Minimum allowed value | - |
| `max` | number | Maximum allowed value | - |
| `onChange` | Handler | Change event handler | - |
| `value` | number | Current input value | - |
| `step` | number | Increment/decrement step | 1 |

**Example:**
```javascript
import { NumberInput } from 'react95';

<NumberInput min={0} max={100} defaultValue={50} />

<NumberInput step={5} defaultValue={10} />

<NumberInput disabled defaultValue={25} />
```

---

### TreeView

Hierarchical tree view component for displaying nested, expandable data.

**Props:**
- Controlled or uncontrolled tree structure
- Expandable/collapsible nodes
- Disabled state support

**Sub-Components:**
- `TreeView` - Main container
- `TreeView.Item` - Individual node

**Example:**
```javascript
import { TreeView } from 'react95';

<TreeView defaultExpandedItems={['root']}>
  <TreeView.Item itemId="root" label="Root Folder">
    <TreeView.Item itemId="child1" label="📄 File 1" />
    <TreeView.Item itemId="child2" label="📁 Folder 2">
      <TreeView.Item itemId="grandchild" label="📄 File 2.1" />
    </TreeView.Item>
  </TreeView.Item>
</TreeView>
```

---

### Tooltip

Tooltip component for displaying helpful information on hover or focus.

**Props:**
| Name | Type | Description | Default |
|------|------|-------------|---------|
| `className` | string | CSS class name | - |
| `disableFocusListener` | boolean | Disable focus trigger | false |
| `disableMouseListener` | boolean | Disable mouse trigger | false |
| `enterDelay` | number | Delay before showing (ms) | 1000 |
| `leaveDelay` | number | Delay before hiding (ms) | 0 |
| `onBlur` | Handler | Focus blur handler | - |
| `onClose` | Handler | Close event handler | - |
| `onFocus` | Handler | Focus handler | - |
| `onMouseEnter` | Handler | Mouse enter handler | - |
| `onMouseLeave` | Handler | Mouse leave handler | - |
| `onOpen` | Handler | Open event handler | - |
| `style` | CSSProperties | Inline CSS styles | - |
| `text` | string | Tooltip text content | - |
| `position` | "left" \\| "right" \\| "top" \\| "bottom" | Tooltip position | "top" |
| `as` | string \\| ComponentType | Render as different element | - |

**Example:**
```javascript
import { Tooltip, Button } from 'react95';

<Tooltip text="Click to save file">
  <Button>Save</Button>
</Tooltip>

<Tooltip text="Hover for help" position="right">
  <span>?</span>
</Tooltip>
```

---

### ColorInput

Color picker input component for selecting colors.

**Props:**
| Name | Type | Description | Default |
|------|------|-------------|---------|
| `ref` | React.Ref | Forward ref to HTML element | - |
| `theme` | any | Theme object | - |
| `as` | undefined | Render as element | - |
| `forwardedAs` | undefined | Forward as element | - |
| `defaultValue` | string | Initial color value | - |
| `disabled` | boolean | Disable the input | false |
| `onChange` | Handler | Change event handler | - |

**Example:**
```javascript
import { ColorInput } from 'react95';

<ColorInput defaultValue="#1088d9" />

<ColorInput disabled defaultValue="#ff0000" />
```

---

### GroupBox

Container component for grouping related form elements with label.

**Props:**
| Name | Type | Description | Default |
|------|------|-------------|---------|
| `label` | ReactNode | GroupBox title label | - |
| `disabled` | boolean | Disable the group | false |
| `variant` | "default" \\| "flat" | GroupBox style variant | "default" |
| `as` | string \\| ComponentType | Render as different element | - |

**Example:**
```javascript
import { GroupBox, TextInput, Checkbox } from 'react95';

<GroupBox label="Personal Information">
  <TextInput placeholder="Name" fullWidth />
  <TextInput placeholder="Email" fullWidth />
  <Checkbox label="Subscribe to newsletter" />
</GroupBox>

<GroupBox label="Settings" disabled>
  <Checkbox label="Disabled option" />
</GroupBox>
```

---

### Handle

Draggable handle element for resizing windows and components.

**Props:**
| Name | Type | Description | Default |
|------|------|-------------|---------|
| `size` | string \\| number | Handle size | - |
| `ref` | React.Ref | Forward ref to HTML element | - |
| `as` | undefined | Render as element | - |
| `theme` | any | Theme object | - |
| `forwardedAs` | undefined | Forward as element | - |

**Example:**
```javascript
import { Handle } from 'react95';

// Used in draggable/resizable components
<Handle />
```

---

## Environment Components

### Window

Main window container with title bar, menu bar, and optional resizable functionality.

**Window Props:**
| Name | Type | Description | Default |
|------|------|-------------|---------|
| `resizable` | boolean | Allow user to resize window | false |
| `resizeRef` | Ref | Reference to resize handle element | - |
| `shadow` | boolean | Apply shadow effect | true |
| `as` | string \\| ComponentType | Render as different element | - |

**Sub-Components:**
- `Window` - Main container
- `WindowHeader` - Title bar with close button
- `WindowContent` - Content area

**Example:**
```javascript
import { Window, WindowHeader, WindowContent, Button } from 'react95';

<Window resizable style={{ width: '400px' }}>
  <WindowHeader>
    <span>📄 Document.txt</span>
    <div style={{ display: 'flex', gap: '4px' }}>
      <Button size="sm">_</Button>
      <Button size="sm">□</Button>
      <Button size="sm">✕</Button>
    </div>
  </WindowHeader>
  <WindowContent>
    <p>Welcome to React95!</p>
  </WindowContent>
</Window>
```

---

### AppBar

Application toolbar component for top navigation and menus.

**AppBar Props:**
| Name | Type | Description | Default |
|------|------|-------------|---------|
| `fixed` | boolean | Fix to top of viewport | true |
| `position` | "inherit" \\| "moz-initial" \\| "initial" \\| "revert" \\| "revert-layer" \\| "unset" \\| "fixed" | CSS position property | "fixed" |
| `as` | string \\| ComponentType | Render as different element | - |

**Example:**
```javascript
import { AppBar, MenuList, MenuItem } from 'react95';

<AppBar>
  <MenuList inline>
    <MenuItem>📁 File</MenuItem>
    <MenuItem>✏️ Edit</MenuItem>
    <MenuItem>👁️ View</MenuItem>
    <MenuItem>❓ Help</MenuItem>
  </MenuList>
</AppBar>
```

---

## Layout Components

### Frame

Container with border styling for creating visual groupings (window, button, field, status, inside, outside, well).

**Frame Props:**
| Name | Type | Description | Default |
|------|------|-------------|---------|
| `shadow` | boolean | Apply shadow effect | false |
| `variant` | "button" \\| "status" \\| "field" \\| "window" \\| "inside" \\| "outside" \\| "well" | Frame border style | "window" |
| `as` | string \\| ComponentType | Render as different element | - |

**Variants Explained:**
- **window** - Lightest border (default for main containers)
- **button** - Raised button frame appearance (use inside windows)
- **field** - Sunken field frame (for input areas)
- **status** - Status bar appearance (use at bottom of windows)
- **inside** - Inside/content frame
- **outside** - External/separate container frame
- **well** - Deeply sunken "well" appearance

**Example:**
```javascript
import { Frame } from 'react95';

<Frame variant="window">
  This is a window frame
</Frame>

<Frame variant="field">
  <TextInput placeholder="Input field" />
</Frame>

<Frame variant="status">
  Status: Ready
</Frame>

<Frame variant="button">
  Button frame content
</Frame>

<Frame variant="well">
  Sunken well area
</Frame>
```

---

### ScrollView

Scrollable container component with vertical and horizontal scrollbars.

**Props:**
| Name | Type | Description | Default |
|------|------|-------------|---------|
| `ref` | React.Ref | Forward ref to HTML element | - |
| `shadow` | boolean | Apply shadow effect | true |
| `theme` | any | Theme object | - |
| `as` | undefined | Render as element | - |
| `forwardedAs` | undefined | Forward as element | - |
| `children` | React.ReactNode | Scrollable content | - |

**Example:**
```javascript
import { ScrollView } from 'react95';

<ScrollView style={{ height: '200px', width: '300px' }}>
  <p>React95 is the best UI library ever created</p>
  <p>React95 is the best UI library ever created</p>
  <p>React95 is the best UI library ever created</p>
  {/* Content that overflows will show scrollbars */}
</ScrollView>
```

---

### Separator

Visual separator line component (horizontal or vertical).

**Separator Props:**
| Name | Type | Description | Default |
|------|------|-------------|---------|
| `size` | string \\| number | Separator thickness/size | - |
| `orientation` | "horizontal" \\| "vertical" | Separator direction | - |
| `ref` | React.Ref | Forward ref | - |
| `theme` | any | Theme object | - |
| `as` | undefined | Render as element | - |
| `forwardedAs` | undefined | Forward as element | - |

**Example:**
```javascript
import { Separator, MenuList, MenuItem } from 'react95';

<MenuList>
  <MenuItem>Option 1</MenuItem>
  <MenuItem>Option 2</MenuItem>
  <Separator />
  <MenuItem>Option 3</MenuItem>
  <MenuItem>Option 4</MenuItem>
</MenuList>

// Vertical separator
<div style={{ display: 'flex' }}>
  <div>Left content</div>
  <Separator orientation="vertical" />
  <div>Right content</div>
</div>
```

---

## Typography Components

### Anchor

Link/anchor text component for navigation with Windows95 styling.

**Example:**
```javascript
import { Anchor } from 'react95';

<Anchor href="https://react95.io">
  Visit React95 Documentation
</Anchor>

<Anchor href="#section">Internal link</Anchor>
```

---

## Other Components

### Avatar

User avatar display component for profile pictures.

**Example:**
```javascript
import { Avatar } from 'react95';

<Avatar src="profile.jpg" alt="User profile" />
```

---

### Counter

Counter display component for showing numeric values.

**Example:**
```javascript
import { Counter } from 'react95';

<Counter value={42} />
```

---

### Hourglass

Loading/wait indicator component with animation.

**Example:**
```javascript
import { Hourglass } from 'react95';

<Hourglass /> {/* Animated hourglass while loading */}
```

---

### Monitor

Monitor/screen display component for showing content in a retro screen appearance.

**Example:**
```javascript
import { Monitor } from 'react95';

<Monitor>
  <p>Screen content here</p>
</Monitor>
```

---

## Theming

### Available Themes

React95 comes with built-in themes. Import and use them:
```javascript
import original from 'react95/dist/themes/original';
// Additional themes may be available
```

### Using a Theme
```javascript
import { ThemeProvider } from 'styled-components';
import original from 'react95/dist/themes/original';

<ThemeProvider theme={original}>
  {/* Your app components */}
</ThemeProvider>
```

### Custom Theme Creation

You can create custom themes by following the React95 theme structure and passing to ThemeProvider.

### Style Reset

Always include the style reset utility to normalize browser styles:
```javascript
import { styleReset } from 'react95';
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  ${styleReset}
  /* Your custom global styles */
`;
```

---

## Common Patterns

### Complete Form Example
```javascript
import React, { useState } from 'react';
import { 
  Window, 
  WindowHeader, 
  WindowContent,
  TextInput,
  Button,
  Checkbox,
  Radio,
  GroupBox,
  Frame,
  Select,
  Separator
} from 'react95';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    agree: false,
    preference: 'email'
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
  };

  return (
    <Window resizable style={{ width: '450px' }}>
      <WindowHeader>📧 Contact Us</WindowHeader>
      <WindowContent>
        <GroupBox label="Your Information">
          <TextInput 
            name="name"
            placeholder="Your name"
            fullWidth
            value={formData.name}
            onChange={handleChange}
            style={{ marginBottom: '8px' }}
          />
          <TextInput 
            name="email"
            type="email"
            placeholder="Your email"
            fullWidth
            value={formData.email}
            onChange={handleChange}
            style={{ marginBottom: '8px' }}
          />
        </GroupBox>

        <GroupBox label="Message">
          <TextInput 
            name="message"
            multiline
            rows={4}
            fullWidth
            value={formData.message}
            onChange={handleChange}
            style={{ marginBottom: '8px' }}
          />
        </GroupBox>

        <GroupBox label="Preferences">
          <Radio 
            name="preference"
            value="email"
            label="Contact via email"
            checked={formData.preference === 'email'}
            onChange={handleChange}
          />
          <Radio 
            name="preference"
            value="phone"
            label="Contact via phone"
            checked={formData.preference === 'phone'}
            onChange={handleChange}
          />
        </GroupBox>

        <Checkbox 
          name="agree"
          label="I agree to the terms and conditions"
          checked={formData.agree}
          onChange={handleChange}
          style={{ marginBottom: '12px' }}
        />

        <Frame variant="status">
          <Button 
            primary 
            fullWidth 
            onClick={handleSubmit}
          >
            Send Message
          </Button>
        </Frame>
      </WindowContent>
    </Window>
  );
}
```

---

### Menu System Example
```javascript
import { MenuList, MenuItem, Separator } from 'react95';

export default function MenuBar() {
  return (
    <MenuList inline>
      <MenuItem onClick={() => console.log('File menu')}>
        📁 File
      </MenuItem>
      <MenuItem onClick={() => console.log('Edit menu')}>
        ✏️ Edit
      </MenuItem>
      <MenuItem onClick={() => console.log('View menu')}>
        👁️ View
      </MenuItem>
      <Separator />
      <MenuItem disabled>Help</MenuItem>
    </MenuList>
  );
}
```

### Windows95 Desktop Example
```javascript
import { Window, WindowHeader, WindowContent, Button, AppBar, MenuList, MenuItem } from 'react95';

export default function Desktop() {
  return (
    <div style={{ 
      height: '100vh', 
      background: '#008080',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <AppBar>
        <MenuList inline>
          <MenuItem>Start</MenuItem>
        </MenuList>
      </AppBar>
      
      <div style={{ flex: 1, padding: '16px' }}>
        <Window style={{ width: '300px' }}>
          <WindowHeader>✕ Welcome</WindowHeader>
          <WindowContent>
            <p>Welcome to React95!</p>
            <div style={{ marginTop: '12px' }}>
              <Button primary fullWidth>OK</Button>
            </div>
          </WindowContent>
        </Window>
      </div>
    </div>
  );
}
```

### Data Table Example
```javascript
import { Table, TableHead, TableBody, TableRow, TableHeadCell, TableDataCell, Frame } from 'react95';

export default function DataTable() {
  const data = [
    { type: '🌱', name: 'Bulbasaur', level: 64 },
    { type: '⚡', name: 'Charizard', level: 203 },
    { type: '⚡', name: 'Pikachu', level: 82 }
  ];

  return (
    <Frame variant="window" style={{ overflow: 'auto' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeadCell>Type</TableHeadCell>
            <TableHeadCell>Name</TableHeadCell>
            <TableHeadCell>Level</TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item, idx) => (
            <TableRow key={idx}>
              <TableDataCell>{item.type}</TableDataCell>
              <TableDataCell>{item.name}</TableDataCell>
              <TableDataCell>{item.level}</TableDataCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Frame>
  );
}
```

---

## Component Variants Reference

### Button Variants
- `default` - Standard 3D beveled button
- `raised` - Raised appearance
- `flat` - Flat appearance
- `thin` - Thin border
- `menu` - Menu button style

### Checkbox Variants
- `default` - Standard checkbox
- `flat` - Flat checkbox style

### TextInput Variants
- `default` - Standard input
- `flat` - Flat input style

### Radio Variants
- `default` - Standard radio
- `flat` - Flat radio style

### Select Variants
- `default` - Standard select
- `flat` - Flat select style

### ProgressBar Variants
- `default` - Standard progress bar
- `tile` - Tiled/striped progress bar

### Frame Variants
- `window` - Light border (main container)
- `button` - Raised button frame
- `field` - Sunken field frame
- `status` - Status bar frame
- `inside` - Inside content frame
- `outside` - External container frame
- `well` - Deeply sunken well frame

### GroupBox Variants
- `default` - Standard group box
- `flat` - Flat group box style

---

## Resources & Links

- **Official Website**: https://react95.io
- **NPM Package**: https://www.npmjs.com/package/react95
- **Storybook Documentation**: https://storybook.react95.io/
- **GitHub Repository**: https://github.com/react95-io/React95

---

## Tips & Best Practices

1. **Always use ThemeProvider** - Wrap your entire app with ThemeProvider for consistent styling
2. **Include styleReset** - Use the styleReset utility in your global styles for proper browser normalization
3. **Font Loading** - Optionally load Windows95 fonts (ms_sans_serif, ms_sans_serif_bold) for authentic appearance
4. **Responsive Design** - Use media queries with styled-components for responsive layouts
5. **Accessibility** - Use proper ARIA labels and semantic HTML elements
6. **Component Composition** - Create reusable component compositions for common UI patterns
7. **Variant Selection** - Choose appropriate frame variants for context (window, field, status, etc.)
8. **Spacing** - Use consistent spacing with styled-components or inline styles
9. **Testing** - Ensure all interactive components are testable with proper name/id attributes
10. **Performance** - Use React memo for components that don't need frequent re-renders

---

## Browser Compatibility

React95 works with all modern browsers that support:
- ES6+ JavaScript
- CSS-in-JS (styled-components)
- React 16.8+ (hooks support)

---

## Notes

- React95 is designed to replicate authentic Windows95 UI aesthetics
- All components are fully themeable via styled-components
- The library maintains historical accuracy while providing modern React patterns
- Support for resizable, draggable windows and interactive elements
- Components support keyboard navigation and accessibility features
- Perfect for retro-themed applications, dashboards, and nostalgic projects

---

## Complete Component List

**Controls (15 components):**
Button, Checkbox, TextInput, Radio, Select, Slider, ProgressBar, Table (with sub-components), MenuList, MenuItem, Tabs, NumberInput, TreeView, Tooltip, ColorInput, GroupBox, Handle

**Environment (2 components):**
Window (with WindowHeader, WindowContent), AppBar

**Layout (3 components):**
Frame, ScrollView, Separator

**Typography (1 component):**
Anchor

**Other (4 components):**
Avatar, Counter, Hourglass, Monitor

**Total: 25+ components with multiple sub-components and variants**