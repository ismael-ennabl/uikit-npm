const fs = require('fs');
const path = require('path');

const COMPONENTS_DIR = path.join(__dirname, '..', 'components');
const METADATA_PATH = path.join(COMPONENTS_DIR, 'metadata.json');

function readMetadata() {
  try {
    const content = fs.readFileSync(METADATA_PATH, 'utf-8');
    return JSON.parse(content);
  } catch {
    return {
      components: {},
      lastUpdated: new Date().toISOString(),
      libraryVersion: '0.1.0'
    };
  }
}

function writeMetadata(metadata) {
  fs.writeFileSync(METADATA_PATH, JSON.stringify(metadata, null, 2));
}

function scanComponents() {
  const componentDirs = fs.readdirSync(COMPONENTS_DIR, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  return componentDirs;
}

function updateMetadata() {
  const metadata = readMetadata();
  const components = scanComponents();
  const now = new Date().toISOString();
  const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf-8'));

  components.forEach(componentName => {
    if (!metadata.components[componentName]) {
      // New component
      metadata.components[componentName] = {
        createdAt: now,
        lastModified: now,
        publishedAt: null,
        version: packageJson.version
      };
      console.log(`Added new component: ${componentName}`);
    } else {
      // Update existing component
      metadata.components[componentName].lastModified = now;
      console.log(`Updated component: ${componentName}`);
    }
  });

  // Mark all components as published
  Object.keys(metadata.components).forEach(componentName => {
    metadata.components[componentName].publishedAt = now;
    metadata.components[componentName].version = packageJson.version;
  });

  metadata.lastUpdated = now;
  metadata.libraryVersion = packageJson.version;

  writeMetadata(metadata);
  console.log('Metadata updated successfully');
}

updateMetadata();