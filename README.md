# Ennabl UI Kit Beta

🚨 **MANDATORY: Please read our [UI Kit Best Practices & Rules](./BEST_PRACTICES.md) before using or contributing!** 🚨

> All UI must use the `ennabl-ui-kit-beta` package for components, tokens, colors, fonts, and spacing.  
> No custom styles or unrelated UI libraries allowed.  
> See full guidelines in the link above.

---

## 📦 Installation

Install the package via npm or yarn:

```bash
npm install ennabl-ui-kit-beta
# or
yarn add ennabl-ui-kit-beta
```

**Important:** Don't forget to import the styles in your main entry file:

```tsx
// In your main entry file (e.g., src/main.tsx or src/index.tsx)
import 'ennabl-ui-kit-beta/dist/index.css';
```

## 🎨 Storybook

Explore the full component library and usage examples live:
**[Storybook Demo](https://your-storybook-url.com)**

## 🚀 Quick Usage Example

```tsx
import React from 'react';
import { Header, Footer, Section, Button } from 'ennabl-ui-kit-beta';

export function App() {
  return (
    <>
      <Header title="My Application" />
      <main>
        <Section title="Welcome" badges={[{ text: "New", variant: "new" }]}>
          <Button variant="primary" aria-label="Get Started">
            Get Started
          </Button>
        </Section>
      </main>
      <Footer />
    </>
  );
}
```

## 📚 Available Components

### Core Components
- `Header` - Main application header with navigation
- `Footer` - Application footer
- `Section` - Content sections with titles and badges
- `AnchorNavBar` - Navigation bar with anchor links

### Toolbars
- `SelectionToolbar` - Generic selection toolbar
- `PackageSelectionToolbar` - Package-specific toolbar
- `DocumentSelectionToolbar` - Document-specific toolbar

### Data Display
- `MetricItem` - Metric display component
- `ProductsTable` - Products data table with mock data
- `ClientsTable` - Clients data table with mock data

### Header Components
- `Breadcrumb` - Navigation breadcrumbs
- `PageTitle` - Page title component
- `TopSearch` - Search functionality
- `TopAI` - AI assistant integration
- `Dropdown` - Dropdown menus
- `OverviewSection` - Overview metrics section

### Layout Headers
- `DashboardHeader` - Dashboard layout header
- `DetailHeader` - Detail page header
- `RootHeader` - Root application header

### UI Components
All standard UI components are available: `Button`, `Input`, `Card`, `Modal`, `Table`, etc.

## 🎯 Important Notes

- **Always use components and tokens from this kit** - avoid creating local copies or using unapproved libraries
- **Keep your project updated** with the latest `ennabl-ui-kit-beta` releases to benefit from improvements and fixes
- **Follow the best practices** outlined in the [BEST_PRACTICES.md](./BEST_PRACTICES.md) document

## 🛠️ Development

### Prerequisites
- Node.js 18+
- npm or yarn

### Setup
```bash
# Clone the repository
git clone https://github.com/ismael-ennabl/uikit-npm.git
cd uikit-npm

# Install dependencies
npm install

# Start development
cd lib
npm run dev
```

### Available Scripts
```bash
# Development
npm run dev              # Start development build with watch mode
npm run build            # Build for production
npm run type-check       # TypeScript type checking
npm run lint             # Code linting

# Component Management
npm run track-components # Track component changes
npm run check-status     # Check component status
npm run verify-exports   # Verify component exports

# Release
npm run release-checklist # Automated release checklist
npm run pre-release      # Run all pre-release checks
```

## 📋 Release Process

### Automated Release (Recommended)
```bash
cd lib
npm run release-checklist
npm version patch  # or minor/major
git push origin main --tags
```

### Manual Release
```bash
cd lib
npm run pre-release
npm run verify-exports
npm version patch
npm publish --access public
git push origin main --tags
```

## 🔧 Configuration

### NPM Token Setup
For automated releases, add your npm token to GitHub Secrets:
1. Go to your GitHub repository settings
2. Navigate to Secrets and variables → Actions
3. Add `NPM_TOKEN` with your npm access token

### Package Configuration
The package is configured with:
- **Main entry:** `dist/index.js` (CommonJS)
- **Module entry:** `dist/index.esm.js` (ESM)
- **Types:** `dist/index.d.ts` (TypeScript definitions)
- **Files:** `dist/` and `README.md`

## 📊 Component Tracking

The library includes automated component tracking:

```bash
# Track all components
npm run track-components

# Check component status
npm run check-status

# View recent activity
npm run check-recent

# View new components
npm run check-new
```

## 🎨 Styling

Components use Tailwind CSS with custom design tokens. Styles are automatically included in the build.

## 📝 TypeScript

Full TypeScript support with generated `.d.ts` files for all components.

## 🤝 Contributing

1. Create a feature branch
2. Add your components to the `components/` directory
3. Update exports in `components/index.ts`
4. Run `npm run track-components` to update metadata
5. Test with `npm run verify-exports`
6. Submit a pull request

**Remember:** All contributions must follow the [Best Practices](./BEST_PRACTICES.md)!

## 📄 License

MIT License - see LICENSE file for details.

---

## 🆘 Support

- **📖 [Component Documentation](./lib/README.md)**
- **🎨 [Storybook](https://your-storybook-url.com)** - Interactive examples
- **📋 [Release Notes](./RELEASE_WORKFLOW.md)** - Version history
- **🐛 [GitHub Issues](https://github.com/ismael-ennabl/uikit-npm/issues)** - Report bugs
- **💬 [Discussions](https://github.com/ismael-ennabl/uikit-npm/discussions)** - Ask questions

Thank you for following the UI Kit guidelines and helping keep our design system consistent! 🚀
