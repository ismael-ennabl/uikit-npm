#!/usr/bin/env node
/*
 Auto-generate minimal Storybook stories for components exported from `lib`.
 - Scans `lib/components/index.ts` for named exports
 - Scans `lib/components/ui/*.tsx` for exported component names
 - Writes stories to `src/stories/autogen/<Component>.stories.tsx`
*/

import fs from 'fs';
import path from 'path';

const repoRoot = process.cwd();
const libComponentsIndex = path.join(repoRoot, 'lib', 'components', 'index.ts');
const libUiDir = path.join(repoRoot, 'lib', 'components', 'ui');
const outDir = path.join(repoRoot, 'src', 'stories', 'autogen');
const libDir = path.join(repoRoot, 'lib');
const libImportPath = path
  .relative(outDir, libDir)
  .split(path.sep)
  .join('/');

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function emptyDir(dir) {
  if (!fs.existsSync(dir)) return;
  for (const f of fs.readdirSync(dir)) {
    fs.rmSync(path.join(dir, f), { recursive: true, force: true });
  }
}

function isPascalCase(name) {
  return /^[A-Z][A-Za-z0-9]*$/.test(name);
}

function parseNamedExportsFromComponentsIndex(filePath) {
  const results = new Set();
  if (!fs.existsSync(filePath)) return results;
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split(/\r?\n/);

  for (const line of lines) {
    if (line.trim().startsWith('export type')) continue; // skip type-only

    // export { default as Foo } from './Foo';
    const m1 = line.match(/export\s*\{\s*default\s+as\s+([A-Za-z0-9_]+)\s*\}/);
    if (m1 && isPascalCase(m1[1])) results.add(m1[1]);

    // export { Foo, Bar as Baz } from './X';
    const m2 = line.match(/export\s*\{\s*([^}]+)\s*\}\s*from/);
    if (m2) {
      const parts = m2[1].split(',');
      parts.forEach(part => {
        // e.g., "Bar as Baz" or "Foo"
        const token = part.trim();
        const name = token.includes(' as ')
          ? token.split(/\s+as\s+/)[1].trim()
          : token;
        if (isPascalCase(name)) results.add(name);
      });
    }
  }
  return results;
}

function parseExportsFromUiFile(filePath) {
  const names = new Set();
  const content = fs.readFileSync(filePath, 'utf8');

  // export const Foo ... | export function Foo ... | export class Foo ...
  const reDecl = /export\s+(?:const|function|class)\s+([A-Za-z0-9_]+)/g;
  let match;
  while ((match = reDecl.exec(content)) !== null) {
    const name = match[1];
    if (isPascalCase(name)) names.add(name);
  }

  // export { Foo, fooHelper, Bar as Baz }
  const reList = /export\s*\{\s*([^}]+)\s*\}/g;
  let m;
  while ((m = reList.exec(content)) !== null) {
    const parts = m[1].split(',');
    for (const part of parts) {
      const token = part.trim();
      const name = token.includes(' as ')
        ? token.split(/\s+as\s+/)[1].trim()
        : token;
      if (isPascalCase(name)) names.add(name);
    }
  }

  return Array.from(names);
}

function collectUiComponentNames(uiDir) {
  const names = new Set();
  if (!fs.existsSync(uiDir)) return names;
  const files = fs.readdirSync(uiDir).filter(f => f.endsWith('.tsx'));
  for (const f of files) {
    const exports = parseExportsFromUiFile(path.join(uiDir, f));
    // Prefer first PascalCase export as the component name for story
    const main = exports.find(isPascalCase);
    if (main) names.add(main);
  }
  return names;
}

function storyContent(componentName, group) {
  // Use render with @ts-ignore to avoid prop requirement friction
  return `import type { Meta, StoryObj } from '@storybook/react';
import { ${componentName} } from '${libImportPath}';

const meta: Meta<typeof ${componentName}> = {
  title: 'Auto/${group}/${componentName}',
  component: ${componentName},
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof ${componentName}>;

export const Default: Story = {
  render: () => {
    // @ts-ignore - minimal render without required props for preview purposes
    return <${componentName} />;
  },
};
`;
}

function writeStory(componentName, group) {
  const filePath = path.join(outDir, `${componentName}.stories.tsx`);
  const content = storyContent(componentName, group);
  fs.writeFileSync(filePath, content);
}

function main() {
  ensureDir(outDir);
  emptyDir(outDir);

  const domainExportNames = parseNamedExportsFromComponentsIndex(libComponentsIndex);
  const uiExportNames = collectUiComponentNames(libUiDir);

  let written = 0;

  // UI components
  for (const name of uiExportNames) {
    writeStory(name, 'UI');
    written++;
  }

  // Domain/components (excluding those already in UI)
  for (const name of domainExportNames) {
    if (uiExportNames.has(name)) continue;
    writeStory(name, 'Components');
    written++;
  }

  console.log(`✅ Generated ${written} stories in ${path.relative(repoRoot, outDir)}`);
}

main();


