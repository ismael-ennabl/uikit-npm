# Ennabl UI Kit Beta

🚨 **MANDATORY: Please read our [UI Kit Best Practices & Rules](../BEST_PRACTICES.md) before using or contributing!** 🚨

> All UI must use the `ennabl-ui-kit-beta` package for components, tokens, colors, fonts, and spacing.  
> No custom styles or unrelated UI libraries allowed.  
> See full guidelines in the link above.

---

A React component library with reusable UI components for document management and insurance applications.

## 🚀 Quick Start

```bash
npm install ennabl-ui-kit-beta
```

```jsx
import { Header, Footer, Section, AnchorNavBar } from 'ennabl-ui-kit-beta';

function App() {
  return (
    <div>
      <Header title="My Application" />
      <Section title="Main Content">
        <p>Your content here</p>
      </Section>
      <Footer />
    </div>
  );
}
```

## 📦 Available Components

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
- `ProductsTable` - Products data table
- `ClientsTable` - Clients data table

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

## 🛠️ Development

### Prerequisites
- Node.js 18+
- npm or yarn

### Setup
```bash
cd lib
npm install
```

### Development Commands
```bash
# Start development build with watch mode
npm run dev

# Build for production
npm run build

# Type checking
npm run type-check

# Lint code
npm run lint

# Track component changes
npm run track-components

# Check component status
npm run check-status
```

## 🚀 Release Process

### Automated Release (Recommended)
1. **Run release checklist:**
   ```bash
   npm run release-checklist
   ```

2. **Bump version:**
   ```bash
   npm version patch  # or minor/major
   ```

3. **Push to GitHub:**
   ```bash
   git push origin main --tags
   ```

4. **GitHub Actions will automatically:**
   - Run all checks
   - Build the package
   - Publish to npm
   - Create a GitHub release

### Manual Release
1. **Pre-release checks:**
   ```bash
   npm run pre-release
   npm run verify-exports
   ```

2. **Build and test:**
   ```bash
   npm run build
   npm run dry-run
   ```

3. **Publish:**
   ```bash
   npm publish --access public
   ```

4. **Push changes:**
   ```bash
   git push origin main --tags
   ```

## 📋 Release Checklist

The automated release process includes:

- ✅ Git status check
- ✅ Pull latest changes
- ✅ Component tracking
- ✅ TypeScript type checking
- ✅ Build verification
- ✅ Export verification
- ✅ Package testing
- ✅ npm publishing
- ✅ GitHub release creation

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

**Remember:** All contributions must follow the [Best Practices](../BEST_PRACTICES.md)!

## 📄 License

MIT License - see LICENSE file for details.