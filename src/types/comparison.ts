
export interface Discrepancy {
  id: number;
  type: string;
  field: string;
  section: string;
  sourceValue: string;
  compareValue: string;
  description: string;
  documentId: string;
  page: number;
  row: number;
}

export interface PackageDocument {
  id: number;
  name: string;
  type: string;
  size: string;
  pages: number;
  uploadDate: string;
  confidence: number | null;
  isSourceOfTruth: boolean;
  version?: string;
}

export interface DocumentOption {
  id: string;
  name: string;
}

export interface PackageData {
  name: string;
  syncScore: number;
  sourceDocument: string;
  compareDocument: string;
  lastUpdated: string;
  auditor: string;
  packageCount: number;
}

export interface PrimaryDocumentChangeHandler {
  (documentName: string): void;
}
