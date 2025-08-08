# 🚀 Release Workflow for ennabl-ui-kit-beta

This document outlines the complete release process for the npm package.

## 📋 Quick Release Commands

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

## 🔄 Complete Release Process

### Phase 1: Pre-Release Preparation

1. **Sync with GitHub**
   ```bash
   git pull origin main
   git status  # Check for uncommitted changes
   ```

2. **Run Component Tracking**
   ```bash
   cd lib
   npm run track-components
   npm run check-status
   npm run check-recent
   ```

### Phase 2: Quality Assurance

3. **Install Dependencies & Clean**
   ```bash
   npm install
   rm -rf dist node_modules/.cache
   ```

4. **Type Checking & Linting**
   ```bash
   npm run type-check
   npm run lint  # if eslint is configured
   ```

5. **Build Verification**
   ```bash
   npm run build
   ls -la dist/  # Verify all files are generated
   ```

### Phase 3: Component Validation

6. **Verify Component Exports**
   ```bash
   npm run verify-exports
   ```

7. **Test Component Imports**
   ```bash
   node -e "
   const pkg = require('./dist/index.js');
   console.log('Available exports:', Object.keys(pkg));
   "
   ```

### Phase 4: Version Management

8. **Determine Version Bump Type**
   - `patch`: bug fixes (0.1.20 → 0.1.21)
   - `minor`: new features (0.1.20 → 0.1.21)
   - `major`: breaking changes (0.1.20 → 0.2.0)

9. **Bump Version**
   ```bash
   npm version patch  # or minor/major
   ```

### Phase 5: Pre-Publish Verification

10. **Dry Run Package**
    ```bash
    npm pack  # Creates .tgz file without publishing
    tar -tzf ennabl-ui-kit-beta-*.tgz  # Inspect contents
    ```

11. **Test in Isolation**
    ```bash
    mkdir test-install
    cd test-install
    npm init -y
    npm install ../ennabl-ui-kit-beta-*.tgz
    node -e "
    const { Header, Footer } = require('ennabl-ui-kit-beta');
    console.log('✅ Components imported successfully');
    "
    ```

### Phase 6: Publish & Deploy

12. **Publish to npm**
    ```bash
    npm publish --access public
    ```

13. **Push to GitHub with Tags**
    ```bash
    git push origin main --tags
    ```

### Phase 7: Post-Release Verification

14. **Verify npm Package**
    ```bash
    npm view ennabl-ui-kit-beta version
    npm view ennabl-ui-kit-beta files
    ```

15. **Test in Fresh Project**
    ```bash
    mkdir fresh-test
    cd fresh-test
    npm init -y
    npm install ennabl-ui-kit-beta@latest
    ```

## 🤖 Automated Release with GitHub Actions

When you push a tag, GitHub Actions automatically:

1. **Runs all pre-release checks**
2. **Builds the package**
3. **Publishes to npm**
4. **Creates a GitHub release**

### Setup for Automated Releases

1. **Add NPM Token to GitHub Secrets:**
   - Go to your GitHub repository settings
   - Navigate to Secrets and variables → Actions
   - Add `NPM_TOKEN` with your npm access token

2. **Create a tag to trigger release:**
   ```bash
   git tag v0.1.21
   git push origin v0.1.21
   ```

## 🛠️ Available Scripts

### Development Scripts
```bash
npm run dev              # Development build with watch mode
npm run build            # Production build
npm run type-check       # TypeScript type checking
npm run lint             # Code linting
```

### Component Management Scripts
```bash
npm run track-components # Track component changes
npm run check-status     # Check component status
npm run check-recent     # View recent activity
npm run check-new        # View new components
npm run verify-exports   # Verify component exports
```

### Release Scripts
```bash
npm run pre-release      # Run all pre-release checks
npm run release-checklist # Automated release checklist
npm run dry-run          # Create test package
npm run test-install     # Test package installation
```

## 📊 Release Checklist Summary

### ✅ Automated Checks
- [ ] Git status clean
- [ ] Latest changes pulled
- [ ] Component tracking updated
- [ ] TypeScript compilation successful
- [ ] Build artifacts generated
- [ ] Component exports verified
- [ ] Package contents validated

### 📝 Manual Steps
- [ ] Version bump decision (patch/minor/major)
- [ ] Version bump execution
- [ ] npm publish
- [ ] GitHub push with tags

### 🔍 Post-Release Verification
- [ ] npm package available
- [ ] GitHub release created
- [ ] Fresh installation test
- [ ] Component functionality verified

## 🚨 Troubleshooting

### Common Issues

1. **Build fails with TypeScript errors**
   ```bash
   npm run type-check  # Check specific errors
   # Fix type issues in components
   ```

2. **Components not exported**
   ```bash
   npm run verify-exports  # Check export issues
   # Ensure components are in components/index.ts
   ```

3. **npm publish fails**
   ```bash
   npm whoami  # Check npm login
   npm login   # Login if needed
   ```

4. **GitHub Actions fails**
   - Check NPM_TOKEN secret is set
   - Verify npm package name is available
   - Check build logs for specific errors

### Emergency Rollback

If a release has issues:

1. **Unpublish (within 72 hours):**
   ```bash
   npm unpublish ennabl-ui-kit-beta@0.1.21
   ```

2. **Fix issues and re-release:**
   ```bash
   npm version patch
   npm publish --access public
   git push origin main --tags
   ```

## 📈 Version Strategy

### Semantic Versioning
- **Patch (0.1.20 → 0.1.21)**: Bug fixes, minor improvements
- **Minor (0.1.20 → 0.1.21)**: New features, non-breaking changes
- **Major (0.1.20 → 0.2.0)**: Breaking changes, major refactors

### Release Frequency
- **Weekly**: Patch releases for bug fixes
- **Monthly**: Minor releases for new features
- **As needed**: Major releases for breaking changes

## 🔗 Useful Links

- [npm Package Page](https://www.npmjs.com/package/ennabl-ui-kit-beta)
- [GitHub Repository](https://github.com/your-username/uikit-npm)
- [Component Documentation](./lib/README.md)
- [GitHub Actions Workflow](.github/workflows/release.yml)
