# 🚀 Ennabl UI Kit Beta - Quick Reference

> **⚡ Quick reference for developers** - For complete guidelines, see [BEST_PRACTICES.md](./BEST_PRACTICES.md)

**📖 Documentation:** When installed via npm, see the documentation files in your `node_modules/ennabl-ui-kit-beta/` directory:
- `BEST_PRACTICES.md` - Comprehensive guidelines
- `QUICK_REFERENCE.md` - Developer quick reference
- `RELEASE_WORKFLOW.md` - Release process documentation

## 📦 Installation

```bash
npm install ennabl-ui-kit-beta
```

```tsx
// REQUIRED: Import styles
import 'ennabl-ui-kit-beta/dist/index.css';
```

## 🎯 Core Rules

### ✅ DO
- Use `ennabl-ui-kit-beta` for ALL UI components
- Use design tokens for colors, spacing, typography
- Import specific components: `import { Button, Header } from 'ennabl-ui-kit-beta'`
- Follow component variants and props

### ❌ DON'T
- Create custom components that duplicate functionality
- Use other UI libraries (Material-UI, Ant Design, etc.)
- Hardcode colors, sizes, or spacing values
- Override component styles directly

## 🧩 Component Usage

### Basic Components
```tsx
import { Header, Footer, Section, Button } from 'ennabl-ui-kit-beta';

<Header title="My App" />
<Section title="Content" badges={[{ text: "New", variant: "new" }]}>
  <Button variant="primary">Action</Button>
</Section>
<Footer />
```

### Design Tokens
```tsx
import { tokens } from 'ennabl-ui-kit-beta';

const styles = {
  backgroundColor: tokens.colors.primary,
  padding: tokens.spacing.md,
  fontSize: tokens.typography.body.fontSize,
};
```

### Layout Components
```tsx
<DashboardHeader 
  title="Dashboard"
  actions={[
    { label: "Export", onClick: handleExport }
  ]}
/>

<Section title="User Profile">
  <Card>
    <UserProfileForm />
  </Card>
</Section>
```

## 🎨 Design System

### Colors
```tsx
// ✅ CORRECT
tokens.colors.primary
tokens.colors.secondary
tokens.colors.background
tokens.colors.text

// ❌ WRONG
'#007bff'
'#ffffff'
'#000000'
```

### Spacing
```tsx
// ✅ CORRECT
tokens.spacing.xs    // 4px
tokens.spacing.sm    // 8px
tokens.spacing.md    // 16px
tokens.spacing.lg    // 24px
tokens.spacing.xl    // 32px

// ❌ WRONG
'4px'
'16px'
'24px'
```

### Typography
```tsx
// ✅ CORRECT
tokens.typography.h1.fontSize
tokens.typography.body.fontSize
tokens.typography.caption.fontSize

// ❌ WRONG
'font-size: 24px'
'font-size: 14px'
```

## 📝 Code Examples

### ✅ Good Component
```tsx
import React from 'react';
import { Button, Card, Section } from 'ennabl-ui-kit-beta';
import { tokens } from 'ennabl-ui-kit-beta';

interface MyComponentProps {
  title: string;
  onAction: () => void;
}

export function MyComponent({ title, onAction }: MyComponentProps) {
  return (
    <Section title={title}>
      <Card>
        <Button onClick={onAction} variant="primary">
          Take Action
        </Button>
      </Card>
    </Section>
  );
}
```

### ❌ Bad Component
```tsx
// Don't do this!
function CustomButton({ children, ...props }) {
  return (
    <button 
      style={{ 
        backgroundColor: '#007bff',
        padding: '16px',
        border: 'none'
      }}
      {...props}
    >
      {children}
    </button>
  );
}
```

## 🔧 Development Commands

```bash
# Development
npm run dev              # Start development
npm run build            # Build for production
npm run type-check       # TypeScript checking

# Component Management
npm run track-components # Track changes
npm run check-status     # Check status
npm run verify-exports   # Verify exports

# Release
npm run release-checklist # Automated release
```

## 📊 Available Components

### Core
- `Header`, `Footer`, `Section`, `AnchorNavBar`

### Toolbars
- `SelectionToolbar`, `PackageSelectionToolbar`, `DocumentSelectionToolbar`

### Data Display
- `MetricItem`, `ProductsTable`, `ClientsTable`

### Headers
- `Breadcrumb`, `PageTitle`, `TopSearch`, `TopAI`, `Dropdown`, `OverviewSection`

### Layout Headers
- `DashboardHeader`, `DetailHeader`, `RootHeader`

### UI Components
- `Button`, `Input`, `Card`, `Modal`, `Table`, `Form`, etc.

## 🆘 Need Help?

- **📖 [Full Best Practices](./BEST_PRACTICES.md)**
- **🎨 [Storybook](https://ismael-ennabl.github.io/uikit-npm/)**
- **🐛 [GitHub Issues](https://github.com/ismael-ennabl/uikit-npm/issues)**
- **💬 [Discussions](https://github.com/ismael-ennabl/uikit-npm/discussions)**

## 📋 Code Review Checklist

Before submitting code, ensure:

- [ ] All UI components from `ennabl-ui-kit-beta`
- [ ] No hardcoded colors, spacing, or typography
- [ ] Proper TypeScript types used
- [ ] Accessibility attributes included
- [ ] Components properly tested
- [ ] Performance considerations addressed

---

**Remember:** Following these guidelines ensures consistency and maintainability! 🚀
