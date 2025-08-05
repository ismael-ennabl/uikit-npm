# Build and Publish Instructions

## Prerequisites
1. Create an NPM account at https://www.npmjs.com/
2. Install Node.js and npm

## Setup Steps

### 1. Install Dependencies
```bash
cd lib
npm install
```

### 2. Build the Package
```bash
npm run build
```

### 3. Test the Build Locally
```bash
# Link the package locally for testing
npm link

# In a test project, link to use the local version
npm link ennabl-ui-kit-beta
```

### 4. Login to NPM
```bash
npm login
```

### 5. Publish to NPM
```bash
# For first time publish
npm publish

# For subsequent updates, increment version first
npm version patch  # or minor/major
npm publish
```

## Package Structure
```
lib/
├── components/          # React components
├── tokens/             # Design tokens
├── types/              # TypeScript types
├── utils/              # Utility functions
├── dist/               # Built files (generated)
├── package.json        # Package configuration
├── rollup.config.js    # Build configuration
└── tsconfig.json       # TypeScript configuration
```

## Usage in Other Projects
```bash
npm install ennabl-ui-kit-beta
```

```tsx
import { SelectionToolbar, MetricItem } from 'ennabl-ui-kit-beta';
```

## Version Updates
- Patch (0.1.0 → 0.1.1): Bug fixes
- Minor (0.1.0 → 0.2.0): New features  
- Major (0.1.0 → 1.0.0): Breaking changes