# Ennabl UI Kit Beta

A comprehensive React component library built for modern web applications, with special focus on document management and insurance applications. This library provides a set of high-quality, accessible, and customizable components built on top of Radix UI and Tailwind CSS.

## Features

✨ **Modern Design System** - Consistent design tokens and theming  
🎯 **Fully Typed** - Complete TypeScript support  
♿ **Accessible** - Built with accessibility in mind using Radix UI  
🎨 **Customizable** - Easy to theme and customize  
📱 **Responsive** - Mobile-first responsive design  
⚡ **Tree Shakeable** - Import only what you need  
🧠 **AI-Friendly** - Smart mock data generation for insurance domain  

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

## Components

### Core Components

#### Section
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

#### MetricItem
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

#### SelectionToolbar
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

### Insurance Domain Components

#### ProductsTable
Displays a table of insurance products with auto-generated mock data.

```tsx
import { ProductsTable } from 'ennabl-ui-kit-beta';

// No props needed - uses realistic mock data by default
<ProductsTable />

// Or with custom data
<ProductsTable data={customData} rows={10} />
```

**Features:**
- Auto-generates realistic insurance product data
- Includes product name, carrier, coverage amount, status
- Color-coded status badges
- Responsive design
- Hover effects

#### ClientsTable
Displays a table of insurance clients with auto-generated mock data.

```tsx
import { ClientsTable } from 'ennabl-ui-kit-beta';

// No props needed - uses realistic mock data by default
<ClientsTable />

// With contact information
<ClientsTable showContactInfo={true} rows={8} />
```

**Features:**
- Auto-generates realistic client data
- Includes company name, broker, policy number, premium
- Industry classification
- Contact information (optional)
- Color-coded status badges

## Mock Data Utilities

The library includes smart mock data generation for insurance applications:

```tsx
import { 
  generateProductsData, 
  generateClientsData,
  type InsuranceProduct,
  type InsuranceClient 
} from 'ennabl-ui-kit-beta';

// Generate 10 insurance products
const products = generateProductsData(10);

// Generate 5 clients
const clients = generateClientsData(5);
```

## AI-Friendly Usage

This library is designed to work seamlessly with AI coding tools. You can simply say:

> "Add a products table and clients table to my dashboard"

And the AI can render:

```tsx
import { ProductsTable, ClientsTable } from 'ennabl-ui-kit-beta';

function Dashboard() {
  return (
    <div>
      <ProductsTable />
      <ClientsTable />
    </div>
  );
}
```

The components will automatically generate realistic insurance domain data without any manual configuration.

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

## Peer Dependencies

Make sure you have these dependencies installed in your project:

- react >= 16.8.0
- react-dom >= 16.8.0
- @radix-ui/react-dropdown-menu ^2.1.1
- @radix-ui/react-tooltip ^1.1.4
- class-variance-authority ^0.7.1
- clsx ^2.1.1
- lucide-react ^0.462.0

## TypeScript Support

Full TypeScript support with exported types:

```tsx
import type { 
  ToolbarAction, 
  MetricItemProps, 
  ProductsTableProps,
  ClientsTableProps,
  InsuranceProduct,
  InsuranceClient
} from 'ennabl-ui-kit-beta';
```

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