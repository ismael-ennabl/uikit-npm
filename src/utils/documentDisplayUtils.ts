export const getPrimaryDocumentName = () => {
  return "ABC Auto Policy 2025 Package";
};

export const getDocumentDisplayName = (docId: string) => {
  if (docId === 'policy') {
    return getPrimaryDocumentName();
  }
  // Return actual document names, mapping common IDs to their full names
  const documentNameMap: Record<string, string> = {
    'certificate': 'ABC_COI_Certificate.pdf',
    'endorsement': 'Policy_Endorsement_2025.pdf',
    'additional_insured': 'Additional_Insured_Endorsement.pdf',
    'waiver': 'Waiver_of_Subrogation.pdf',
    'auto_id': 'Auto_ID_Cards.pdf',
    'additional_docs': 'Vehicle_Schedule_2025.pdf'
  };
  return documentNameMap[docId] || docId;
};

export const getUniqueDocuments = (categoryDiscrepancies: Array<{ documentId: string }>) => {
  const docs = new Set<string>();
  categoryDiscrepancies.forEach(d => docs.add(d.documentId));
  const docArray = Array.from(docs);
  
  // Always include primary document first, even if it doesn't have discrepancies
  const reorderedDocs = ['policy'];
  
  // Add up to 3 other documents that have discrepancies
  docArray.forEach(docId => {
    if (docId !== 'policy' && reorderedDocs.length < 4) {
      reorderedDocs.push(docId);
    }
  });
  
  return reorderedDocs;
};

export const getUniqueFields = (categoryDiscrepancies: Array<{ field: string }>) => {
  const fields = new Set<string>();
  categoryDiscrepancies.forEach(d => fields.add(d.field));
  return Array.from(fields).slice(0, 6); // Max 6 differences
};