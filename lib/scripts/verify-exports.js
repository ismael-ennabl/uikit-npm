#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔍 Verifying component exports...');

// Check if we're in the lib directory
const currentDir = process.cwd();
const isLibDir = currentDir.endsWith('lib') || fs.existsSync('package.json');

if (!isLibDir) {
  console.log('❌ Please run this script from the lib directory');
  process.exit(1);
}

// Verify main index.ts exists
if (!fs.existsSync('index.ts')) {
  console.log('❌ index.ts not found');
  process.exit(1);
}

// Read main index file
const indexContent = fs.readFileSync('index.ts', 'utf8');
console.log('✅ Main index.ts found');

// Check components directory
const componentsDir = 'components';
if (!fs.existsSync(componentsDir)) {
  console.log('❌ components directory not found');
  process.exit(1);
}

// Get all component directories
const componentDirs = fs.readdirSync(componentsDir)
  .filter(dir => {
    const fullPath = path.join(componentsDir, dir);
    return fs.statSync(fullPath).isDirectory() && 
           !dir.startsWith('.') &&
           dir !== 'ui';
  });

console.log(`📁 Found ${componentDirs.length} component directories`);

let issues = 0;

// Check each component directory
componentDirs.forEach(dir => {
  const indexPath = path.join(componentsDir, dir, 'index.ts');
  const componentFile = path.join(componentsDir, dir, `${dir}.tsx`);
  
  // Check if index.ts exists
  if (!fs.existsSync(indexPath)) {
    console.log(`⚠️  Warning: ${indexPath} not found`);
    issues++;
    return;
  }
  
  // Check if main component file exists
  if (!fs.existsSync(componentFile)) {
    console.log(`⚠️  Warning: ${componentFile} not found`);
    issues++;
    return;
  }
  
  // Check if index.ts has exports
  const indexContent = fs.readFileSync(indexPath, 'utf8');
  if (!indexContent.includes('export')) {
    console.log(`⚠️  Warning: ${indexPath} has no exports`);
    issues++;
  } else {
    console.log(`✅ ${dir} - exports found`);
  }
});

// Check if components are exported from main index
const mainIndexContent = fs.readFileSync('index.ts', 'utf8');
if (!mainIndexContent.includes("export * from './components'")) {
  console.log('⚠️  Warning: components not exported from main index.ts');
  issues++;
} else {
  console.log('✅ Components exported from main index.ts');
}

// Check if dist directory exists and has files
if (fs.existsSync('dist')) {
  const distFiles = fs.readdirSync('dist');
  const hasJsFiles = distFiles.some(file => file.endsWith('.js'));
  const hasDtsFiles = distFiles.some(file => file.endsWith('.d.ts'));
  
  if (hasJsFiles && hasDtsFiles) {
    console.log('✅ Build artifacts found in dist/');
  } else {
    console.log('⚠️  Warning: Missing build artifacts in dist/');
    issues++;
  }
} else {
  console.log('⚠️  Warning: dist/ directory not found - run npm run build first');
  issues++;
}

console.log('\n📊 Export Verification Summary:');
console.log(`   Components checked: ${componentDirs.length}`);
console.log(`   Issues found: ${issues}`);

if (issues === 0) {
  console.log('🎉 All exports verified successfully!');
  process.exit(0);
} else {
  console.log('❌ Export verification failed. Please fix the issues above.');
  process.exit(1);
}
