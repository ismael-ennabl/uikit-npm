import { useMemo } from 'react';
import { Discrepancy, DocumentOption } from '@/types/comparison';
import { packageDocuments } from '@/data/mockComparisonData';
import { mapIssueTypeToCategory } from '@/utils/discrepancyMappings';

export const useDiscrepancyGrouping = (
  filteredDiscrepancies: Discrepancy[],
  documents: DocumentOption[]
) => {
  const groupedDiscrepancies = useMemo(() => {
    const grouped = filteredDiscrepancies.reduce((acc, discrepancy, index) => {
      const category = mapIssueTypeToCategory(discrepancy.type);
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push({ ...discrepancy, originalIndex: index });
      return acc;
    }, {} as Record<string, Array<Discrepancy & { originalIndex: number }>>);

    return grouped;
  }, [filteredDiscrepancies]);

  const documentCountByType = useMemo(() => {
    return filteredDiscrepancies.reduce((acc, discrepancy) => {
      const category = mapIssueTypeToCategory(discrepancy.type);
      if (!acc[category]) {
        acc[category] = new Set();
      }
      acc[category].add(discrepancy.documentId);
      return acc;
    }, {} as Record<string, Set<string>>);
  }, [filteredDiscrepancies]);

  const { groupedByDocument, sotDoc, sortedDocuments } = useMemo(() => {
    // Get all document names from documents array to ensure we show all 7 docs
    const allDocuments = documents.filter(doc => doc.id !== 'all').map(doc => doc.name);

    // Find Source of Truth document first
    const sotDoc = documents.find(doc => {
      const packageDoc = doc.id !== 'all' && packageDocuments?.find(pd => pd.name === doc.name);
      return packageDoc?.isSourceOfTruth;
    });
    
    // Sort documents: SoT first, then others
    const sortedDocuments = allDocuments.sort((a, b) => {
      const isASoT = sotDoc?.name === a;
      const isBSoT = sotDoc?.name === b;
      if (isASoT) return -1;
      if (isBSoT) return 1;
      return 0;
    });

    const groupedByDocument = sortedDocuments.reduce((acc, docName) => {
      acc[docName] = [];
      return acc;
    }, {} as Record<string, Array<Discrepancy & { originalIndex: number }>>);

    // Populate with actual discrepancies
    filteredDiscrepancies.forEach((discrepancy, index) => {
      // Find matching document name by comparing with the documents array
      const matchingDoc = documents.find(doc => doc.id === discrepancy.documentId);
      const docName = matchingDoc ? matchingDoc.name : discrepancy.documentId;
      
      if (groupedByDocument[docName]) {
        groupedByDocument[docName].push({ ...discrepancy, originalIndex: index });
      }
    });

    return { groupedByDocument, sotDoc, sortedDocuments };
  }, [filteredDiscrepancies, documents]);

  return {
    groupedDiscrepancies,
    documentCountByType,
    groupedByDocument,
    sotDoc,
    sortedDocuments
  };
};