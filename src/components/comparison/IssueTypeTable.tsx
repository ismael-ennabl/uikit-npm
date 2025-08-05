import { useState, useEffect } from 'react';
import { Discrepancy, DocumentOption, PackageData } from '@/types/comparison';
import ViewOnDocsToggle from './ViewOnDocsToggle';
import ComparisonDataTable from './ComparisonDataTable';
import PDFViewersSection from './PDFViewersSection';

interface IssueTypeTableProps {
  categoryDiscrepancies: Array<Discrepancy & { originalIndex: number }>;
  uniqueDocuments: string[];
  uniqueFields: string[];
  categoryType: string;
  onDiscrepancyClick: (index: number) => void;
  documents: DocumentOption[];
  packageData: PackageData;
  viewOnDocs: boolean;
  selectedDocument: string;
  onViewOnDocsChange: (checked: boolean) => void;
  onSelectedDocumentChange: (documentId: string) => void;
  onExpandModal?: () => void;
}

const IssueTypeTable = ({
  categoryDiscrepancies,
  uniqueDocuments,
  uniqueFields,
  categoryType,
  onDiscrepancyClick,
  documents,
  packageData,
  viewOnDocs,
  selectedDocument,
  onViewOnDocsChange,
  onSelectedDocumentChange,
  onExpandModal
}: IssueTypeTableProps) => {
  const [selectedField, setSelectedField] = useState<string | undefined>();

  // Filter documents that have discrepancies in this category
  const documentsInCategory = documents.filter(doc => 
    doc.id !== 'all' && 
    doc.id !== 'policy' && 
    categoryDiscrepancies.some(d => d.documentId === doc.id)
  );

  // Auto-select first field when viewOnDocs becomes true
  useEffect(() => {
    if (viewOnDocs && uniqueFields.length > 0) {
      setSelectedField(uniqueFields[0]);
    }
  }, [viewOnDocs, uniqueFields]);

  const handleFieldClick = (field: string) => {
    setSelectedField(field);
  };

  return (
    <div className="bg-white p-6 rounded-xl">
      <ViewOnDocsToggle
        categoryType={categoryType}
        viewOnDocs={viewOnDocs}
        onViewOnDocsChange={onViewOnDocsChange}
        onExpandModal={onExpandModal}
      />

      {/* Table view - only when NOT viewing on docs */}
      {!viewOnDocs && (
        <ComparisonDataTable
          categoryDiscrepancies={categoryDiscrepancies}
          uniqueDocuments={uniqueDocuments}
          uniqueFields={uniqueFields}
          categoryType={categoryType}
          onDiscrepancyClick={onDiscrepancyClick}
          onFieldClick={handleFieldClick}
          selectedField={selectedField}
        />
      )}

      {/* PDF Viewers - Only when View on Docs is enabled */}
      {viewOnDocs && documentsInCategory.length > 0 && (
        <PDFViewersSection
          documentsInCategory={documentsInCategory}
          packageData={packageData}
          selectedDocument={selectedDocument}
          uniqueFields={uniqueFields}
          onSelectedDocumentChange={onSelectedDocumentChange}
          scrollToField={selectedField}
        />
      )}
    </div>
  );
};

export default IssueTypeTable;