import { Discrepancy } from '@/types/comparison';
import { generatePrimaryDocumentValue } from '@/utils/documentValueGenerator';

export const getDiscrepancyValue = (
  discrepancies: Array<Discrepancy & { originalIndex: number }>, 
  field: string, 
  documentId: string, 
  categoryType: string
): string => {
  const discrepancy = discrepancies.find(d => d.field === field && d.documentId === documentId);
  // For primary document (policy), generate realistic values; for others, show compareValue
  if (documentId === 'policy') {
    return generatePrimaryDocumentValue(field, categoryType);
  }
  return discrepancy?.compareValue || '-';
};