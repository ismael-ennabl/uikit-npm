#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const COMPONENTS_DIR = path.join(__dirname, '../components');
const METADATA_FILE = path.join(__dirname, '../component-metadata.json');
const GIT_COMMAND = 'git log --format="%H|%an|%ad|%s" --date=iso --follow';

class ComponentTracker {
  constructor() {
    this.metadata = this.loadMetadata();
    this.components = this.scanComponents();
  }

  loadMetadata() {
    try {
      if (fs.existsSync(METADATA_FILE)) {
        return JSON.parse(fs.readFileSync(METADATA_FILE, 'utf8'));
      }
    } catch (error) {
      console.warn('Could not load existing metadata:', error.message);
    }
    
    return {
      lastUpdate: new Date().toISOString(),
      components: [],
      stats: {
        total: 0,
        new: 0,
        updated: 0
      }
    };
  }

  scanComponents() {
    const components = [];
    
    const scanDirectory = (dir, prefix = '') => {
      const items = fs.readdirSync(dir);
      
      for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
          // Check if directory contains component files
          const hasComponent = fs.readdirSync(fullPath).some(file => 
            file.endsWith('.tsx') || file.endsWith('.ts')
          );
          
          if (hasComponent) {
            const componentName = prefix ? `${prefix}/${item}` : item;
            components.push({
              name: componentName,
              path: fullPath,
              type: 'directory'
            });
          }
          
          // Recursively scan subdirectories
          scanDirectory(fullPath, prefix ? `${prefix}/${item}` : item);
        } else if (item.endsWith('.tsx') && !item.includes('index')) {
          // Individual component files
          const componentName = path.basename(item, '.tsx');
          components.push({
            name: componentName,
            path: fullPath,
            type: 'file'
          });
        }
      }
    };
    
    scanDirectory(COMPONENTS_DIR);
    return components;
  }

  getGitInfo(filePath) {
    try {
      const relativePath = path.relative(process.cwd(), filePath);
      const output = execSync(`${GIT_COMMAND} -- "${relativePath}"`, { 
        encoding: 'utf8',
        cwd: process.cwd()
      });
      
      const lines = output.trim().split('\n');
      if (lines.length > 0) {
        const [hash, author, date, message] = lines[0].split('|');
        return {
          firstCommit: {
            hash,
            author,
            date,
            message
          },
          lastCommit: {
            hash,
            author,
            date,
            message
          }
        };
      }
    } catch (error) {
      console.warn(`Could not get git info for ${filePath}:`, error.message);
    }
    
    return null;
  }

  getFileStats(filePath) {
    try {
      const stat = fs.statSync(filePath);
      return {
        size: stat.size,
        created: stat.birthtime.toISOString(),
        modified: stat.mtime.toISOString()
      };
    } catch (error) {
      console.warn(`Could not get file stats for ${filePath}:`, error.message);
      return null;
    }
  }

  analyzeComponent(component) {
    const gitInfo = this.getGitInfo(component.path);
    const fileStats = this.getFileStats(component.path);
    
    return {
      name: component.name,
      path: path.relative(COMPONENTS_DIR, component.path),
      type: component.type,
      git: gitInfo,
      stats: fileStats,
      lastModified: fileStats?.modified || new Date().toISOString(),
      exports: this.getComponentExports(component.path)
    };
  }

  getComponentExports(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const exports = [];
      
      // Look for export statements
      const exportRegex = /export\s+(?:default\s+)?(?:function|const|class)\s+(\w+)/g;
      let match;
      
      while ((match = exportRegex.exec(content)) !== null) {
        exports.push(match[1]);
      }
      
      return exports;
    } catch (error) {
      return [];
    }
  }

  detectChanges() {
    const currentComponents = this.components.map(comp => this.analyzeComponent(comp));
    const existingComponents = this.metadata.components;
    
    let newCount = 0;
    let updatedCount = 0;
    
    for (const current of currentComponents) {
      const existing = existingComponents.find(comp => comp.name === current.name);
      
      if (!existing) {
        newCount++;
        console.log(`🆕 New component detected: ${current.name}`);
      } else if (existing.lastModified !== current.lastModified) {
        updatedCount++;
        console.log(`🔄 Component updated: ${current.name}`);
      }
    }
    
    this.metadata.components = currentComponents;
    this.metadata.lastUpdate = new Date().toISOString();
    this.metadata.stats = {
      total: currentComponents.length,
      new: newCount,
      updated: updatedCount
    };
    
    return { newCount, updatedCount, total: currentComponents.length };
  }

  saveMetadata() {
    try {
      fs.writeFileSync(METADATA_FILE, JSON.stringify(this.metadata, null, 2));
      console.log(`✅ Metadata saved to ${METADATA_FILE}`);
    } catch (error) {
      console.error('❌ Failed to save metadata:', error.message);
    }
  }

  generateReport() {
    const { total, new: newCount, updated } = this.metadata.stats;
    
    console.log('\n📊 Component Tracking Report');
    console.log('========================');
    console.log(`Total Components: ${total}`);
    console.log(`New Components: ${newCount}`);
    console.log(`Updated Components: ${updated}`);
    
    if (newCount > 0) {
      console.log('\n🆕 New Components:');
      this.metadata.components
        .filter(comp => !this.metadata.components.find(existing => 
          existing.name === comp.name && existing.lastModified !== comp.lastModified
        ))
        .forEach(comp => {
          console.log(`  - ${comp.name} (${comp.lastModified})`);
        });
    }
    
    console.log('\n📅 Recent Activity:');
    const recent = this.metadata.components
      .sort((a, b) => new Date(b.lastModified) - new Date(a.lastModified))
      .slice(0, 5);
    
    recent.forEach(comp => {
      console.log(`  - ${comp.name} (${comp.lastModified})`);
    });
  }
}

// Main execution
async function main() {
  console.log('🔍 Scanning components...');
  
  const tracker = new ComponentTracker();
  const changes = tracker.detectChanges();
  
  tracker.saveMetadata();
  tracker.generateReport();
  
  // Set outputs for GitHub Actions
  if (process.env.GITHUB_OUTPUT) {
    const fs = require('fs');
    fs.appendFileSync(process.env.GITHUB_OUTPUT, `new-components=${changes.newCount}\n`);
    fs.appendFileSync(process.env.GITHUB_OUTPUT, `component-count=${changes.total}\n`);
  }
  
  // Exit with code 1 if there are new components (for CI/CD)
  if (changes.newCount > 0) {
    console.log('\n🚀 New components detected - ready for publishing!');
    process.exit(0);
  } else {
    console.log('\n✅ No new components detected');
    process.exit(0);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(error => {
    console.error('❌ Error:', error);
    process.exit(1);
  });
}

export default ComponentTracker; 