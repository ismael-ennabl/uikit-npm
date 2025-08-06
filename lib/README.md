# Ennabl UI Kit Beta

A React component library with reusable UI components for document management applications.

## Installation

```bash
npm install ennabl-ui-kit-beta
```

## CSS Import (Required)

**Important**: You must import the component styles in your application for the components to display correctly:

```css
/* In your main CSS file (e.g., src/index.css or src/App.css) */
@import 'ennabl-ui-kit-beta/dist/index.css';
```

Or in your JavaScript/TypeScript entry file:

```typescript
// In your main entry file (e.g., src/main.tsx or src/index.tsx)
import 'ennabl-ui-kit-beta/dist/index.css';
```

## Style Protection

This component library uses protected CSS classes to prevent style conflicts with your host application. The components are designed to maintain their appearance regardless of your project's existing styles.

### How it works:

1. **Scoped CSS Classes**: All components use prefixed class names (e.g., `ennabl-section__title`)
2. **CSS Custom Properties**: Components define their own CSS variables with fallback values
3. **High Specificity**: Important styles use `!important` to prevent overrides
4. **Style Isolation**: Components are wrapped in isolation containers

### Customization

If you need to override component styles, you can do so by targeting the specific CSS custom properties:

```css
.ennabl-section {
  --ennabl-section-title-color: #your-color;
  --ennabl-section-title-size: 1.5rem;
  --ennabl-section-content-bg: #your-background;
}
```

## Available Components

### Section

A collapsible section component with drag handle, title, and content area.

```tsx
import { Section } from 'ennabl-ui-kit-beta';

function MyComponent() {
  return (
    <Section
      id="my-section"
      title="Section Title"
      badges={[{ text: "New", variant: "new" }]}
      showDragHandle={true}
      defaultOpen={false}
    >
      <p>Your content here</p>
    </Section>
  );
}
```

### MetricItem

A metric display component with value, label, and optional tooltip.

```tsx
import { MetricItem } from 'ennabl-ui-kit-beta';

function MyComponent() {
  return (
    <MetricItem
      value="123"
      label="Total Items"
      onClick={() => console.log('Clicked')}
      tooltip={{
        content: "Additional information",
        variant: "info"
      }}
    />
  );
}
```

### SelectionToolbar

A toolbar component for handling multiple selections.

```tsx
import { SelectionToolbar } from 'ennabl-ui-kit-beta';

function MyComponent() {
  return (
    <SelectionToolbar
      selectedCount={5}
      onClear={() => console.log('Clear')}
      actions={[
        {
          label: "Export",
          onClick: () => console.log('Export'),
          icon: ExportIcon
        }
      ]}
    />
  );
}
```

## Peer Dependencies

Make sure you have these dependencies installed in your project:

- react >= 16.8.0
- react-dom >= 16.8.0
- @radix-ui/react-dropdown-menu ^2.1.1
- @radix-ui/react-tooltip ^1.1.4
- class-variance-authority ^0.7.1
- clsx ^2.1.1
- lucide-react ^0.462.0

## Troubleshooting

### Styles not appearing correctly

1. Make sure you've imported the CSS file
2. Check that the CSS file is being bundled correctly
3. Verify there are no CSS conflicts in your application

### Component styles being overridden

The components are designed to be style-protected, but if you're still experiencing issues:

1. Check browser developer tools for conflicting CSS rules
2. Ensure the component CSS is loaded after your global styles
3. Use CSS custom properties for customization instead of direct class overrides

## Development

```bash
# Install dependencies
npm install

# Build the library
npm run build

# Watch for changes during development
npm run dev
```

## License

MIT