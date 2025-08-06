import * as fs from 'fs';
import * as path from 'path';

export interface ComponentMetadata {
  createdAt: string;
  lastModified: string;
  publishedAt: string | null;
  version: string;
}

export interface MetadataFile {
  components: Record<string, ComponentMetadata>;
  lastUpdated: string;
  libraryVersion: string;
}

const METADATA_PATH = path.join(__dirname, '..', 'components', 'metadata.json');

export function readMetadata(): MetadataFile {
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

export function writeMetadata(metadata: MetadataFile): void {
  fs.writeFileSync(METADATA_PATH, JSON.stringify(metadata, null, 2));
}

export function updateComponentMetadata(
  componentName: string,
  isNew: boolean = false
): void {
  const metadata = readMetadata();
  const now = new Date().toISOString();

  if (isNew || !metadata.components[componentName]) {
    metadata.components[componentName] = {
      createdAt: now,
      lastModified: now,
      publishedAt: null,
      version: metadata.libraryVersion
    };
  } else {
    metadata.components[componentName].lastModified = now;
  }

  metadata.lastUpdated = now;
  writeMetadata(metadata);
}

export function markComponentPublished(componentName: string): void {
  const metadata = readMetadata();
  if (metadata.components[componentName]) {
    metadata.components[componentName].publishedAt = new Date().toISOString();
    writeMetadata(metadata);
  }
}

export function getComponentTimestamp(componentName: string): string {
  const metadata = readMetadata();
  const component = metadata.components[componentName];
  return component ? component.createdAt : new Date().toISOString();
}