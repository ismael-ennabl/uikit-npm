# Ennabl UI Kit Beta

A comprehensive React component library built for modern web applications. This library provides a set of high-quality, accessible, and customizable components built on top of Radix UI and Tailwind CSS.

## Features

✨ **Modern Design System** - Consistent design tokens and theming
🎯 **Fully Typed** - Complete TypeScript support
♿ **Accessible** - Built with accessibility in mind using Radix UI
🎨 **Customizable** - Easy to theme and customize
📱 **Responsive** - Mobile-first responsive design
⚡ **Tree Shakeable** - Import only what you need

## Components

### SelectionToolbar
A powerful multi-selection interface component for handling bulk actions.

```tsx
import { SelectionToolbar } from 'ennabl-ui-kit-beta';

const actions = [
  {
    icon: Share2,
    label: 'Share',
    onClick: handleShare
  },
  {
    icon: Download,
    label: 'Download',
    dropdownItems: [
      { icon: Table2, label: 'Export as Excel', onClick: handleExportExcel },
      { icon: FileType, label: 'Export as PDF', onClick: handleExportPDF }
    ]
  }
];

<SelectionToolbar
  selectedCount={5}
  onClearSelection={handleClear}
  actions={actions}
/>
```

### MetricItem
A flexible metric display component with optional tooltip support.

```tsx
import { MetricItem } from 'ennabl-ui-kit-beta';

<MetricItem
  value="1,234"
  label="Total Documents"
  onClick={handleClick}
  tooltip={{
    content: "Total number of processed documents",
    variant: "info"
  }}
  isExternal
/>
```

### PackageSelectionToolbar
Pre-configured selection toolbar for package management.

### DocumentSelectionToolbar
Pre-configured selection toolbar for document management.

## Installation

```bash
npm install ennabl-ui-kit-beta
```

## Peer Dependencies

Make sure you have these installed in your project:

```bash
npm install react react-dom lucide-react @radix-ui/react-dropdown-menu @radix-ui/react-tooltip
```

## Setup

The components expect Tailwind CSS to be configured in your project. Make sure you have the necessary design tokens in your CSS:

```css
:root {
  --foreground: 222.2 84% 4.9%;
  --muted-foreground: 215.4 16.3% 46.9%;
  --brand-blue: 217 91% 60%;
  /* ... other design tokens */
}
```

## Usage

```tsx
import { 
  SelectionToolbar, 
  MetricItem, 
  TYPOGRAPHY,
  METRICS 
} from 'ennabl-ui-kit-beta';

function MyComponent() {
  return (
    <div>
      <MetricItem value="42" label="Active Users" />
      <SelectionToolbar 
        selectedCount={3}
        onClearSelection={() => {}}
        actions={[]}
      />
    </div>
  );
}
```

## Design Tokens

The library exports design tokens that you can use in your application:

```tsx
import { TYPOGRAPHY, METRICS, SELECTION_TOOLBAR } from 'ennabl-ui-kit-beta';

// Use in your components
<h1 className={TYPOGRAPHY.h1}>My Title</h1>
<div className={METRICS.container}>...</div>
```

## TypeScript Support

Full TypeScript support with exported types:

```tsx
import type { 
  ToolbarAction, 
  MetricItemProps, 
  TooltipConfig 
} from 'ennabl-ui-kit-beta';
```

## License

MIT