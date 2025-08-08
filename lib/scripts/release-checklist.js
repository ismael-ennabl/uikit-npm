#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 Release Checklist for ennabl-ui-kit-beta');
console.log('==========================================\n');

let step = 0;
const totalSteps = 12;

function runStep(description, command, isOptional = false) {
  step++;
  console.log(`\n${step}/${totalSteps} ${description}`);
  console.log('─'.repeat(50));
  
  try {
    if (command) {
      const result = execSync(command, { encoding: 'utf8', stdio: 'pipe' });
      console.log('✅ Success');
      if (result) console.log(result.trim());
    } else {
      console.log('✅ Manual check required');
    }
  } catch (error) {
    if (isOptional) {
      console.log('⚠️  Optional step failed (continuing...)');
      console.log(error.message);
    } else {
      console.log('❌ Failed');
      console.log(error.message);
      console.log('\n💡 To continue, fix the issue and run this script again.');
      process.exit(1);
    }
  }
}

// Step 1: Check git status
runStep('Checking git status', 'git status --porcelain');

// Step 2: Pull latest changes
runStep('Pulling latest changes from GitHub', 'git pull origin main');

// Step 3: Track components
runStep('Tracking component changes', 'npm run track-components');

// Step 4: Check component status
runStep('Checking component status', 'npm run check-status');

// Step 5: Type checking
runStep('Running TypeScript type check', 'npm run type-check');

// Step 6: Build the library
runStep('Building the library', 'npm run build');

// Step 7: Verify exports
runStep('Verifying component exports', 'npm run verify-exports');

// Step 8: Check package.json version
runStep('Checking current version', 'node -e "console.log(JSON.parse(fs.readFileSync(\'package.json\')).version)"');

// Step 9: Dry run pack
runStep('Creating test package', 'npm pack');

// Step 10: Check package contents
runStep('Checking package contents', 'tar -tzf ennabl-ui-kit-beta-*.tgz | head -20');

// Step 11: Manual version bump reminder
runStep('Version bump required', null);

console.log('\n📋 Manual Steps Required:');
console.log('1. Decide on version bump type:');
console.log('   - patch: bug fixes (0.1.20 → 0.1.21)');
console.log('   - minor: new features (0.1.20 → 0.1.21)');
console.log('   - major: breaking changes (0.1.20 → 0.2.0)');
console.log('\n2. Run: npm version <patch|minor|major>');
console.log('\n3. Review the changes and commit if needed');
console.log('\n4. Run: npm publish --access public');
console.log('\n5. Push to GitHub: git push origin main --tags');

// Step 12: Final verification
runStep('Final verification - checking dist files', 'ls -la dist/');

console.log('\n🎉 Release checklist completed!');
console.log('\nNext steps:');
console.log('1. Bump version: npm version <type>');
console.log('2. Publish: npm publish --access public');
console.log('3. Push tags: git push origin main --tags');
console.log('4. Verify on npm: npm view ennabl-ui-kit-beta version');
