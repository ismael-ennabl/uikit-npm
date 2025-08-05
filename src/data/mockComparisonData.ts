import { Discrepancy, PackageDocument, DocumentOption, PackageData } from '@/types/comparison';
import { generateDiscrepancies } from '@/utils/mockDataGenerator';

// Generate realistic discrepancies with multiple occurrences across documents
let generatedDiscrepancies: Discrepancy[] = [];
try {
  console.log('Attempting to generate discrepancies...');
  generatedDiscrepancies = generateDiscrepancies();
  console.log('Successfully generated discrepancies:', generatedDiscrepancies.length);
} catch (error) {
  console.error('Failed to generate discrepancies:', error);
  // Fallback static data
  generatedDiscrepancies = [
    {
      id: 1,
      type: 'Coverage Limit Mismatch',
      field: 'General Liability Limit',
      section: 'Coverage Summary',
      sourceValue: '$1,000,000',
      compareValue: '$2,000,000',
      description: 'Coverage limit amounts do not match',
      documentId: 'certificate',
      page: 1,
      row: 12
    },
    {
      id: 2,
      type: 'Named Insured',
      field: 'Business Name',
      section: 'Policy Information',
      sourceValue: 'ABC Corporation Inc.',
      compareValue: 'ABC Corp',
      description: 'Business name format differs',
      documentId: 'certificate',
      page: 1,
      row: 3
    },
    {
      id: 3,
      type: 'Policy Number',
      field: 'Policy Number',
      section: 'Policy Information',
      sourceValue: 'POL-2025-ABC123-001',
      compareValue: 'POL2025ABC123001',
      description: 'Policy number format differs',
      documentId: 'endorsement',
      page: 2,
      row: 8
    }
  ];
  console.log('Using fallback discrepancies:', generatedDiscrepancies.length);
}

export const packageData: PackageData = {
  name: 'ABC Auto Policy 2025 Package',
  syncScore: 92,
  sourceDocument: 'ABC_Auto_Policy_2025.pdf',
  compareDocument: 'ABC_COI_Certificate.pdf',
  lastUpdated: '2 hours ago',
  auditor: 'Sarah Chen',
  packageCount: 7
};

export const discrepancies: Discrepancy[] = generatedDiscrepancies;

export const documents: DocumentOption[] = [
  {
    id: 'all',
    name: 'All Documents'
  },
  {
    id: 'policy',
    name: 'ABC_Auto_Policy_2025.pdf'
  },
  {
    id: 'certificate',
    name: 'ABC_COI_Certificate.pdf'
  },
  {
    id: 'endorsement',
    name: 'Policy_Endorsement_2025.pdf'
  },
  {
    id: 'additional_insured',
    name: 'Additional_Insured_Endorsement.pdf'
  },
  {
    id: 'waiver',
    name: 'Waiver_of_Subrogation.pdf'
  },
  {
    id: 'auto_id',
    name: 'Auto_ID_Cards.pdf'
  },
  {
    id: 'additional_docs',
    name: 'Additional_Coverage_Forms.pdf'
  }
];

export const packageDocuments: PackageDocument[] = [
  {
    id: 1,
    name: 'ABC_Auto_Policy_2025.pdf',
    type: 'Policy Document',
    size: '2.4 MB',
    pages: 15,
    uploadDate: '2025-01-15',
    confidence: 98,
    isSourceOfTruth: true,
    version: 'V1'
  },
  {
    id: 2,
    name: 'ABC_COI_Certificate.pdf',
    type: 'Certificate of Insurance',
    size: '1.2 MB',
    pages: 2,
    uploadDate: '2025-01-16',
    confidence: 95,
    isSourceOfTruth: false,
    version: 'V2'
  },
  {
    id: 3,
    name: 'Policy_Endorsement_2025.pdf',
    type: 'Endorsement',
    size: '800 KB',
    pages: 3,
    uploadDate: '2025-01-17',
    confidence: 92,
    isSourceOfTruth: false,
    version: 'V1'
  },
  {
    id: 4,
    name: 'Vehicle_Schedule_2025.pdf',
    type: 'Schedule',
    size: '1.5 MB',
    pages: 8,
    uploadDate: '2025-01-18',
    confidence: null,
    isSourceOfTruth: false,
    version: 'V3'
  },
  {
    id: 5,
    name: 'Additional_Insured_Endorsement.pdf',
    type: 'Endorsement',
    size: '650 KB',
    pages: 2,
    uploadDate: '2025-01-19',
    confidence: 94,
    isSourceOfTruth: false,
    version: 'V1'
  },
  {
    id: 6,
    name: 'Waiver_of_Subrogation.pdf',
    type: 'Endorsement',
    size: '450 KB',
    pages: 1,
    uploadDate: '2025-01-20',
    confidence: 96,
    isSourceOfTruth: false,
    version: 'V1'
  },
  {
    id: 7,
    name: 'Auto_ID_Cards.pdf',
    type: 'ID Cards',
    size: '320 KB',
    pages: 4,
    uploadDate: '2025-01-21',
    confidence: 89,
    isSourceOfTruth: false,
    version: 'V1'
  },
  {
    id: 8,
    name: 'Additional_Coverage_Forms.pdf',
    type: 'Coverage Forms',
    size: '1.8 MB',
    pages: 12,
    uploadDate: '2025-01-22',
    confidence: 93,
    isSourceOfTruth: false,
    version: 'V1'
  }
];