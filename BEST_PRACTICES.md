# 🎨 Ennabl UI Kit Beta - Best Practices & Rules

> **⚠️ MANDATORY READING** - This document contains the essential rules and guidelines for using the Ennabl UI Kit Beta. All developers must follow these practices to maintain design consistency and code quality.

## 📋 Table of Contents

- [Core Principles](#core-principles)
- [Installation & Setup](#installation--setup)
- [Component Usage Rules](#component-usage-rules)
- [Design System Guidelines](#design-system-guidelines)
- [Code Quality Standards](#code-quality-standards)
- [Performance Guidelines](#performance-guidelines)
- [Accessibility Requirements](#accessibility-requirements)
- [Testing Standards](#testing-standards)
- [Common Pitfalls](#common-pitfalls)
- [Getting Help](#getting-help)

## 🎯 Core Principles

### 1. **Single Source of Truth**
- ✅ **DO:** Use `ennabl-ui-kit-beta` for ALL UI components
- ❌ **DON'T:** Create custom components that duplicate existing functionality
- ❌ **DON'T:** Use other UI libraries (Material-UI, Ant Design, etc.)

### 2. **Design System Consistency**
- ✅ **DO:** Use design tokens for colors, spacing, typography
- ❌ **DON'T:** Hardcode colors, sizes, or spacing values
- ❌ **DON'T:** Override component styles without approval

### 3. **Component Composition**
- ✅ **DO:** Compose complex UIs using existing components
- ✅ **DO:** Extend components through props and variants
- ❌ **DON'T:** Modify component internals directly

## 📦 Installation & Setup

### Required Setup
```bash
# Install the package
npm install ennabl-ui-kit-beta

# Import styles (REQUIRED)
import 'ennabl-ui-kit-beta/dist/index.css';
```

### TypeScript Configuration
```json
{
  "compilerOptions": {
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  }
}
```

## 🧩 Component Usage Rules

### Import Guidelines
```tsx
// ✅ CORRECT - Import specific components
import { Button, Header, Footer } from 'ennabl-ui-kit-beta';

// ✅ CORRECT - Import types when needed
import type { ButtonProps, HeaderProps } from 'ennabl-ui-kit-beta';

// ❌ INCORRECT - Don't import everything
import * as UI from 'ennabl-ui-kit-beta';
```

### Component Usage Examples
```tsx
// ✅ CORRECT - Use proper variants and props
<Button variant="primary" size="lg" disabled={false}>
  Submit Form
</Button>

// ✅ CORRECT - Use design tokens
<Header 
  title="Dashboard"
  subtitle="Welcome back"
  showBreadcrumbs={true}
/>

// ❌ INCORRECT - Don't override styles directly
<Button style={{ backgroundColor: 'red', fontSize: '20px' }}>
  Custom Button
</Button>
```

### Layout Components
```tsx
// ✅ CORRECT - Use Section for content organization
<Section title="User Profile" badges={[{ text: "New", variant: "new" }]}>
  <UserProfileForm />
</Section>

// ✅ CORRECT - Use proper header layouts
<DashboardHeader 
  title="Analytics Dashboard"
  actions={[
    { label: "Export", onClick: handleExport },
    { label: "Settings", onClick: handleSettings }
  ]}
/>
```

## 🎨 Design System Guidelines

### Color Usage
```tsx
// ✅ CORRECT - Use design tokens
import { tokens } from 'ennabl-ui-kit-beta';

const styles = {
  backgroundColor: tokens.colors.primary,
  color: tokens.colors.onPrimary,
};

// ❌ INCORRECT - Don't use hardcoded colors
const styles = {
  backgroundColor: '#007bff',
  color: '#ffffff',
};
```

### Spacing & Typography
```tsx
// ✅ CORRECT - Use spacing tokens
import { tokens } from 'ennabl-ui-kit-beta';

const containerStyle = {
  padding: tokens.spacing.md,
  marginBottom: tokens.spacing.lg,
  fontSize: tokens.typography.body.fontSize,
};

// ❌ INCORRECT - Don't use arbitrary values
const containerStyle = {
  padding: '16px',
  marginBottom: '24px',
  fontSize: '14px',
};
```

### Responsive Design
```tsx
// ✅ CORRECT - Use responsive utilities
<Grid 
  columns={{ sm: 1, md: 2, lg: 3 }}
  gap={tokens.spacing.md}
>
  <Card>Content 1</Card>
  <Card>Content 2</Card>
  <Card>Content 3</Card>
</Grid>
```

## 📝 Code Quality Standards

### File Organization
```
src/
├── components/          # Custom components (if needed)
│   └── MyCustomComponent.tsx
├── pages/              # Page components
│   └── Dashboard.tsx
├── hooks/              # Custom hooks
│   └── useCustomHook.ts
└── utils/              # Utility functions
    └── helpers.ts
```

### Component Structure
```tsx
// ✅ CORRECT - Proper component structure
import React from 'react';
import { Button, Card, Section } from 'ennabl-ui-kit-beta';
import type { ButtonProps } from 'ennabl-ui-kit-beta';

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

### Error Handling
```tsx
// ✅ CORRECT - Proper error boundaries
import { ErrorBoundary } from 'ennabl-ui-kit-beta';

<ErrorBoundary fallback={<ErrorFallback />}>
  <MyComponent />
</ErrorBoundary>
```

## ⚡ Performance Guidelines

### Bundle Optimization
```tsx
// ✅ CORRECT - Tree-shakeable imports
import { Button } from 'ennabl-ui-kit-beta';

// ❌ INCORRECT - Import entire library
import * as UI from 'ennabl-ui-kit-beta';
```

### Lazy Loading
```tsx
// ✅ CORRECT - Lazy load heavy components
import { lazy, Suspense } from 'react';
import { LoadingSpinner } from 'ennabl-ui-kit-beta';

const HeavyComponent = lazy(() => import('./HeavyComponent'));

<Suspense fallback={<LoadingSpinner />}>
  <HeavyComponent />
</Suspense>
```

### Memoization
```tsx
// ✅ CORRECT - Memoize expensive components
import React, { useMemo } from 'react';
import { DataTable } from 'ennabl-ui-kit-beta';

const memoizedData = useMemo(() => processData(rawData), [rawData]);

<DataTable data={memoizedData} />
```

## ♿ Accessibility Requirements

### ARIA Labels
```tsx
// ✅ CORRECT - Proper accessibility
<Button 
  aria-label="Close dialog"
  aria-describedby="dialog-description"
  onClick={handleClose}
>
  ×
</Button>

// ✅ CORRECT - Form accessibility
<FormField
  label="Email Address"
  required={true}
  error={emailError}
  helperText="We'll never share your email"
>
  <Input 
    type="email"
    aria-describedby="email-error"
    aria-invalid={!!emailError}
  />
</FormField>
```

### Keyboard Navigation
```tsx
// ✅ CORRECT - Keyboard support
<Button 
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleClick();
    }
  }}
>
  Accessible Button
</Button>
```

### Focus Management
```tsx
// ✅ CORRECT - Focus management
import { useFocusTrap } from 'ennabl-ui-kit-beta';

const focusTrapRef = useFocusTrap();

<div ref={focusTrapRef}>
  <Modal>
    <Button>First focusable</Button>
    <Button>Last focusable</Button>
  </Modal>
</div>
```

## 🧪 Testing Standards

### Component Testing
```tsx
// ✅ CORRECT - Test component behavior
import { render, screen } from '@testing-library/react';
import { Button } from 'ennabl-ui-kit-beta';

test('Button renders with correct text', () => {
  render(<Button>Click me</Button>);
  expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
});

test('Button calls onClick when clicked', () => {
  const handleClick = jest.fn();
  render(<Button onClick={handleClick}>Click me</Button>);
  
  screen.getByRole('button').click();
  expect(handleClick).toHaveBeenCalledTimes(1);
});
```

### Integration Testing
```tsx
// ✅ CORRECT - Test component integration
test('Form submission works with validation', async () => {
  render(<UserForm onSubmit={mockSubmit} />);
  
  await userEvent.type(screen.getByLabelText('Email'), 'test@example.com');
  await userEvent.click(screen.getByRole('button', { name: 'Submit' }));
  
  expect(mockSubmit).toHaveBeenCalledWith({
    email: 'test@example.com'
  });
});
```

## 🚫 Common Pitfalls

### ❌ Don't Do This

```tsx
// ❌ DON'T - Override component styles
<Button style={{ 
  backgroundColor: 'red',
  border: 'none',
  borderRadius: '0'
}}>
  Custom Button
</Button>

// ❌ DON'T - Create duplicate components
function CustomButton({ children, ...props }) {
  return (
    <button 
      className="custom-button"
      {...props}
    >
      {children}
    </button>
  );
}

// ❌ DON'T - Use inline styles
<div style={{ 
  padding: '20px',
  margin: '10px',
  backgroundColor: '#f0f0f0'
}}>
  Content
</div>

// ❌ DON'T - Import from wrong paths
import Button from 'ennabl-ui-kit-beta/dist/components/Button';
```

### ✅ Do This Instead

```tsx
// ✅ DO - Use component variants
<Button variant="destructive" size="lg">
  Delete Item
</Button>

// ✅ DO - Extend through composition
function EnhancedButton({ children, ...props }) {
  return (
    <Button 
      variant="outline"
      className="enhanced-button"
      {...props}
    >
      {children}
    </Button>
  );
}

// ✅ DO - Use design tokens
import { tokens } from 'ennabl-ui-kit-beta';

const containerStyle = {
  padding: tokens.spacing.lg,
  margin: tokens.spacing.sm,
  backgroundColor: tokens.colors.background,
};

// ✅ DO - Import from main package
import { Button } from 'ennabl-ui-kit-beta';
```

## 🆘 Getting Help

### Documentation Resources
- **📖 [Component Documentation](./lib/README.md)**
- **🎨 [Storybook](https://your-storybook-url.com)** - Interactive component examples
- **📋 [Release Notes](./RELEASE_WORKFLOW.md)** - Version history and changes

### Support Channels
- **🐛 [GitHub Issues](https://github.com/ismael-ennabl/uikit-npm/issues)** - Report bugs
- **💬 [Discussions](https://github.com/ismael-ennabl/uikit-npm/discussions)** - Ask questions
- **📧 [Email Support](mailto:support@ennabl.com)** - Direct support

### Code Review Checklist
Before submitting code, ensure:

- [ ] All UI components come from `ennabl-ui-kit-beta`
- [ ] No hardcoded colors, spacing, or typography values
- [ ] Proper TypeScript types are used
- [ ] Accessibility attributes are included
- [ ] Components are properly tested
- [ ] Performance considerations are addressed
- [ ] Code follows the established patterns

### Quick Reference

| Task | Correct Approach | Wrong Approach |
|------|------------------|----------------|
| **Colors** | `tokens.colors.primary` | `'#007bff'` |
| **Spacing** | `tokens.spacing.md` | `'16px'` |
| **Typography** | `tokens.typography.h1` | `'font-size: 24px'` |
| **Components** | `import { Button } from 'ennabl-ui-kit-beta'` | Custom button component |
| **Layout** | `<Section>`, `<Grid>`, `<Card>` | `<div>` with custom styles |

---

## 📞 Need Help?

If you're unsure about any of these guidelines or need clarification:

1. **Check the documentation first**
2. **Look at existing code examples**
3. **Ask in team discussions**
4. **Contact the design system team**

Remember: Following these best practices ensures consistency, maintainability, and a better user experience across all Ennabl applications! 🚀
