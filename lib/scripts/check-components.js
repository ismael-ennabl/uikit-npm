#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const METADATA_FILE = path.join(__dirname, '../component-metadata.json');

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
}

function formatSize(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

function showComponentStatus() {
  if (!fs.existsSync(METADATA_FILE)) {
    console.log('❌ No component metadata found. Run the tracking script first.');
    console.log('   npm run track-components');
    return;
  }

  const metadata = JSON.parse(fs.readFileSync(METADATA_FILE, 'utf8'));
  const { components, stats, lastUpdate } = metadata;

  console.log('🎨 Component Library Status');
  console.log('==========================');
  console.log(`Last Updated: ${formatDate(lastUpdate)}`);
  console.log(`Total Components: ${stats.total}`);
  console.log(`New Components: ${stats.new}`);
  console.log(`Updated Components: ${stats.updated}`);
  console.log('');

  if (components.length === 0) {
    console.log('No components found.');
    return;
  }

  // Group by type
  const byType = components.reduce((acc, comp) => {
    const type = comp.type || 'unknown';
    if (!acc[type]) acc[type] = [];
    acc[type].push(comp);
    return acc;
  }, {});

  Object.entries(byType).forEach(([type, comps]) => {
    console.log(`📁 ${type.toUpperCase()} Components (${comps.length}):`);
    comps
      .sort((a, b) => new Date(b.lastModified) - new Date(a.lastModified))
      .forEach(comp => {
        const size = comp.stats?.size ? ` (${formatSize(comp.stats.size)})` : '';
        const exports = comp.exports?.length ? ` [${comp.exports.join(', ')}]` : '';
        console.log(`  • ${comp.name}${size}${exports}`);
        console.log(`    Modified: ${formatDate(comp.lastModified)}`);
        if (comp.git?.lastCommit) {
          console.log(`    Last commit: ${comp.git.lastCommit.message}`);
        }
        console.log('');
      });
  });
}

function showRecentActivity(days = 7) {
  if (!fs.existsSync(METADATA_FILE)) {
    console.log('❌ No component metadata found.');
    return;
  }

  const metadata = JSON.parse(fs.readFileSync(METADATA_FILE, 'utf8'));
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - days);

  const recent = metadata.components
    .filter(comp => new Date(comp.lastModified) > cutoff)
    .sort((a, b) => new Date(b.lastModified) - new Date(a.lastModified));

  console.log(`🕒 Recent Activity (Last ${days} days)`);
  console.log('=====================================');
  
  if (recent.length === 0) {
    console.log('No recent activity.');
    return;
  }

  recent.forEach(comp => {
    console.log(`• ${comp.name} - ${formatDate(comp.lastModified)}`);
    if (comp.git?.lastCommit) {
      console.log(`  ${comp.git.lastCommit.message}`);
    }
    console.log('');
  });
}

function showNewComponents() {
  if (!fs.existsSync(METADATA_FILE)) {
    console.log('❌ No component metadata found.');
    return;
  }

  const metadata = JSON.parse(fs.readFileSync(METADATA_FILE, 'utf8'));
  const newComps = metadata.components.filter(comp => {
    const created = new Date(comp.stats?.created || comp.lastModified);
    const now = new Date();
    const diffDays = (now - created) / (1000 * 60 * 60 * 24);
    return diffDays <= 1; // Components created in the last 24 hours
  });

  console.log('🆕 New Components (Last 24 hours)');
  console.log('==================================');
  
  if (newComps.length === 0) {
    console.log('No new components in the last 24 hours.');
    return;
  }

  newComps.forEach(comp => {
    console.log(`• ${comp.name}`);
    console.log(`  Created: ${formatDate(comp.stats?.created || comp.lastModified)}`);
    if (comp.exports?.length) {
      console.log(`  Exports: ${comp.exports.join(', ')}`);
    }
    console.log('');
  });
}

// CLI argument parsing
const args = process.argv.slice(2);
const command = args[0];

switch (command) {
  case 'recent':
  case 'activity':
    const days = parseInt(args[1]) || 7;
    showRecentActivity(days);
    break;
  case 'new':
    showNewComponents();
    break;
  case 'status':
  default:
    showComponentStatus();
    break;
} 