import { useState, useMemo } from 'react';

export interface Package {
  id: number;
  sourceDocument: string;
  documents: number;
  status: 'completed' | 'in-progress' | 'new';
  discrepancies: number;
  submitForReview: number;
  dataMerged: number;
  editedDate: string;
  syncScore: number;
}

export const usePackageData = () => {
  const [packages, setPackages] = useState<Package[]>([{
    id: 1,
    sourceDocument: 'ABC_Auto_Policy_2025.pdf',
    documents: 23,
    status: 'new',
    discrepancies: 8,
    submitForReview: 3,
    dataMerged: 5,
    editedDate: '2025-01-15',
    syncScore: 98
  }, {
    id: 2,
    sourceDocument: 'XYZ_Liability_COI_2025.pdf',
    documents: 31,
    status: 'completed',
    discrepancies: 5,
    submitForReview: 2,
    dataMerged: 3,
    editedDate: '2025-01-14',
    syncScore: 67
  }, {
    id: 3,
    sourceDocument: 'Global_Workers_Comp_Master.pdf',
    documents: 44,
    status: 'completed',
    discrepancies: 2,
    submitForReview: 1,
    dataMerged: 1,
    editedDate: '2025-01-13',
    syncScore: 45
  }, {
    id: 4,
    sourceDocument: 'TechCorp_Cyber_Liability.pdf',
    documents: 27,
    status: 'completed',
    discrepancies: 12,
    submitForReview: 4,
    dataMerged: 8,
    editedDate: '2025-01-12',
    syncScore: 23
  }, {
    id: 5,
    sourceDocument: 'Manufacturing_GL_Package.pdf',
    documents: 38,
    status: 'completed',
    discrepancies: 1,
    submitForReview: 0,
    dataMerged: 1,
    editedDate: '2025-01-11',
    syncScore: 89
  }, {
    id: 6,
    sourceDocument: 'Healthcare_Professional_Liability.pdf',
    documents: 35,
    status: 'in-progress',
    discrepancies: 5,
    submitForReview: 2,
    dataMerged: 0,
    editedDate: '2025-01-10',
    syncScore: 34
  }]);

  const totalGroups = packages.length;
  const totalDocuments = packages.reduce((sum, pkg) => sum + pkg.documents, 0);
  const totalDifferences = packages.reduce((sum, pkg) => sum + pkg.discrepancies, 0);

  return {
    packages,
    setPackages,
    totalGroups,
    totalDocuments,
    totalDifferences
  };
};