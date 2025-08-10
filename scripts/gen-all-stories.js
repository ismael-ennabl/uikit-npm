#!/usr/bin/env node
/**
 * Auto-generate simple Storybook stories for each component in src/components (recursively)
 * - Creates a sibling <Component>.stories.tsx if missing
 * - Infers component name from the file name (e.g., button.tsx -> Button)
 * - Detects default vs named export to create a correct import
 * - Produces a minimal CSF3 default story with autodocs enabled
 *
 * Usage:
 *   node scripts/gen-all-stories.js           # create only missing stories
 *   OVERWRITE=1 node scripts/gen-all-stories.js  # overwrite existing stories
 */
import fs from 'fs';
import path from 'path';

const repoRoot = process.cwd();
const targetDir = path.join(repoRoot, 'src', 'components');

function toPascalCase(fileBase) {
  return fileBase
    .replace(/[-_]+(.)/g, (_, chr) => chr.toUpperCase())
    .replace(/^(.)/, (_, chr) => chr.toUpperCase());
}

function isStoryFile(file) {
  return file.endsWith('.stories.tsx') || file.endsWith('.stories.ts');
}

function isComponentTsx(file) {
  if (!file.endsWith('.tsx')) return false;
  if (isStoryFile(file)) return false;
  if (file.endsWith('.d.tsx')) return false;
  if (file.endsWith('.test.tsx') || file.endsWith('.spec.tsx')) return false;
  if (file.toLowerCase() === 'index.tsx') return false;
  return true;
}

function detectExportStyle(filePath, componentName) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const hasDefault = /export\s+default\b/.test(content);
    const hasNamedDecl = new RegExp(
      `export\\s+(?:const|function|class)\\s+${componentName}\\b`
    ).test(content);
    const hasNamedList = new RegExp(
      `export\\s*\\{[^}]*(?:${componentName}|(?:[A-Za-z0-9_]+\\s+as\\s+${componentName}))[^}]*\\}`
    ).test(content);
    const hasNamed = hasNamedDecl || hasNamedList;
    if (hasDefault && !hasNamed) return 'default';
    if (hasNamed && !hasDefault) return 'named';
    if (hasDefault && hasNamed) return 'default';
    // Fallback to named import assumption
    return 'named';
  } catch {
    return 'named';
  }
}

function getExports(filePath) {
  try {
    const src = fs.readFileSync(filePath, 'utf8');
    const hasDefault = /export\s+default\b/.test(src);
    const named = new Set();
    const reDecl = /export\s+(?:const|function|class)\s+([A-Za-z0-9_]+)/g;
    let m;
    while ((m = reDecl.exec(src)) !== null) {
      named.add(m[1]);
    }
    const reList = /export\s*\{\s*([^}]+)\s*\}/g;
    let l;
    while ((l = reList.exec(src)) !== null) {
      const parts = l[1].split(',');
      for (const part of parts) {
        const token = part.trim();
        const name = token.includes(' as ')
          ? token.split(/\s+as\s+/)[1].trim()
          : token;
        if (name) named.add(name);
      }
    }
    return { hasDefault, named: Array.from(named), src };
  } catch {
    return { hasDefault: false, named: [], src: '' };
  }
}

function getExportsRecursive(filePath) {
  const direct = getExports(filePath);
  if (direct.hasDefault || direct.named.length > 0) return direct;
  const src = direct.src;
  if (!src) return direct;
  const m = src.match(/export\s*\*\s*from\s*['"]([^'"]+)['"]/);
  if (!m) return direct;
  const rel = m[1];
  const baseDir = path.dirname(filePath);
  const candidates = [
    rel,
    rel + '.tsx',
    rel + '.ts',
    path.join(rel, 'index.tsx'),
    path.join(rel, 'index.ts'),
  ];
  for (const cand of candidates) {
    const p = path.resolve(baseDir, cand);
    if (fs.existsSync(p)) {
      const ex = getExports(p);
      return { hasDefault: ex.hasDefault, named: ex.named, src: ex.src };
    }
  }
  return direct;
}

function generateStoryContent(importPathRel, componentName, titlePrefix, exportStyle) {
  const importLine = exportStyle === 'default'
    ? `import ${componentName} from '${importPathRel}';`
    : `import { ${componentName} } from '${importPathRel}';`;
  return `import type { Meta, StoryObj } from '@storybook/react';
${importLine}

const meta: Meta<typeof ${componentName}> = {
  title: '${titlePrefix}/${componentName}',
  component: ${componentName},
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof ${componentName}>;

export const Default: Story = {
  args: {},
  render: (args) => {
    // @ts-ignore - minimal default rendering
    return <${componentName} {...args} />;
  },
};
`;
}

function ensureStoriesForDir(dir) {
  if (!fs.existsSync(dir)) return 0;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let created = 0;

  for (const entry of entries) {
    const absPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      created += ensureStoriesForDir(absPath);
      continue;
    }
    if (!isComponentTsx(entry.name)) continue;

    const base = entry.name.replace(/\.tsx$/, '');
    const storyFile = path.join(dir, `${base}.stories.tsx`);
    const shouldOverwrite = process.env.OVERWRITE === '1';
    if (!shouldOverwrite && fs.existsSync(storyFile)) continue;

    const componentName = toPascalCase(base);
    // Create a relative import from story file to component file (same folder)
    const importPathRel = `./${base}`;
    const relFromSrc = path.relative(path.join(repoRoot, 'src'), dir);
    const segments = relFromSrc
      .split(path.sep)
      .filter(Boolean)
      .map(seg => seg.charAt(0).toUpperCase() + seg.slice(1));
    const titlePrefix = `Auto/${segments.join('/') || 'Components'}`.replace(/\\/g, '/');
    const exportsInfo = getExportsRecursive(path.join(dir, `${base}.tsx`));
    let importName = componentName;
    let importStyle = 'named';
    if (exportsInfo.named.includes(componentName)) {
      importStyle = 'named';
    } else if (exportsInfo.named.length > 0) {
      const preferred = exportsInfo.named.find(n => n === `${componentName}Container`) ||
                        exportsInfo.named.find(n => /^[A-Z]/.test(n)) ||
                        exportsInfo.named[0];
      importName = preferred;
      importStyle = 'named';
    } else if (exportsInfo.hasDefault) {
      importStyle = 'default';
    }
    const content = generateStoryContent(importPathRel, importName, titlePrefix, importStyle);
    fs.writeFileSync(storyFile, content, 'utf8');
    created += 1;
  }
  return created;
}

function main() {
  const count = ensureStoriesForDir(targetDir);
  console.log(`✅ Generated ${count} story files under src/components`);
}

main();




