# Component Library Automation

This document describes the automated system for tracking components and publishing to NPM.

## 🚀 Features

- **Component Tracking**: Automatically detects new and updated components
- **Timestamp Metadata**: Tracks creation and modification dates
- **Git Integration**: Links components to their commit history
- **Automated Publishing**: Publishes to NPM when new components are detected
- **CLI Tools**: Easy commands to check component status

## 📋 Available Commands

### Component Tracking
```bash
# Track all components and generate metadata
npm run track-components

# Check component status
npm run check-status

# Check recent activity (last 7 days)
npm run check-recent

# Check recent activity (custom days)
npm run check-recent 14

# Check new components (last 24 hours)
npm run check-new
```

### Publishing
```bash
# Build and publish to NPM
npm run build
npm publish

# Or use the automated workflow
git push origin main
```

## 🔧 GitHub Actions Workflow

The `.github/workflows/publish.yml` workflow automatically:

1. **Scans for new components** when you push to main
2. **Generates metadata** with timestamps and git history
3. **Publishes to NPM** if new components are detected
4. **Creates release notes** with component summaries

### Manual Trigger

You can manually trigger the workflow from GitHub:
1. Go to Actions tab
2. Select "Publish to NPM"
3. Click "Run workflow"
4. Choose version type (patch/minor/major)

## 📊 Component Metadata

The system generates `component-metadata.json` with:

```json
{
  "lastUpdate": "2025-08-05T21:02:54.123Z",
  "components": [
    {
      "name": "Button",
      "path": "ui/button.tsx",
      "type": "file",
      "lastModified": "2025-08-05T20:39:04.240Z",
      "exports": ["Button"],
      "git": {
        "lastCommit": {
          "hash": "abc123",
          "author": "Your Name",
          "date": "2025-08-05T20:39:04Z",
          "message": "feat: Add Button component"
        }
      },
      "stats": {
        "size": 1843,
        "created": "2025-08-05T20:39:04.240Z",
        "modified": "2025-08-05T20:39:04.240Z"
      }
    }
  ],
  "stats": {
    "total": 12,
    "new": 1,
    "updated": 0
  }
}
```

## 🔐 NPM Token Setup

To enable automated publishing, add your NPM token to GitHub Secrets:

1. **Generate NPM token**:
   ```bash
   npm login
   npm token create --read-only
   ```

2. **Add to GitHub Secrets**:
   - Go to your repository Settings
   - Navigate to Secrets and variables → Actions
   - Add new secret: `NPM_TOKEN`
   - Paste your NPM token

## 📈 Monitoring

### Component Status Dashboard
```bash
npm run check-status
```

Shows:
- Total component count
- New/updated components
- File sizes and modification dates
- Git commit history

### Recent Activity
```bash
npm run check-recent 7  # Last 7 days
```

### New Components
```bash
npm run check-new  # Last 24 hours
```

## 🛠️ Adding New Components

1. **Create your component** in `lib/components/`
2. **Export it** in `lib/components/index.ts`
3. **Commit and push** to trigger automation
4. **Check status** with `npm run check-status`

The system will automatically:
- Detect the new component
- Track its metadata
- Publish to NPM if configured

## 🔄 Workflow Triggers

The automation triggers on:
- **Push to main branch** (with changes in `lib/`)
- **Manual workflow dispatch** (for custom version bumps)
- **Scheduled runs** (if configured)

## 📝 Release Notes

Each automated release includes:
- Version number
- List of new components
- Component metadata
- NPM package link

## 🚨 Troubleshooting

### No components detected
- Ensure components are in `lib/components/`
- Check file extensions (`.tsx`, `.ts`)
- Run `npm run track-components` manually

### Publishing fails
- Verify NPM token is set in GitHub Secrets
- Check package name availability
- Ensure version is incremented

### Git history missing
- Components must be committed to git
- Check git log for component files
- Ensure proper file paths

## 📚 Examples

### Adding a Footer Component
```bash
# 1. Create component
mkdir lib/components/Footer
touch lib/components/Footer/Footer.tsx
touch lib/components/Footer/index.ts

# 2. Export in main index
echo "export { default as Footer } from './Footer';" >> lib/components/index.ts

# 3. Track and check
npm run track-components
npm run check-status

# 4. Commit and push
git add .
git commit -m "feat: Add Footer component"
git push origin main
```

The automation will detect the new Footer component and publish it to NPM automatically! 