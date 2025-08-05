
import { Discrepancy, DocumentOption, PackageDocument, PackageData, PrimaryDocumentChangeHandler } from '@/types/comparison';
import { useDiscrepancyGrouping } from '@/hooks/useDiscrepancyGrouping';
import IssueTypeView from './IssueTypeView';
import DocumentView from './DocumentView';

interface DiscrepancyListProps {
  discrepancies: Discrepancy[];
  filteredDiscrepancies: Discrepancy[];
  documents: DocumentOption[];
  selectedDocument: string;
  selectedDiscrepancy: number | null;
  resolvedDiscrepancies: Set<number>;
  viewMode: 'type' | 'document';
  
  expandedCategories?: Set<string>;
  packageDocuments: PackageDocument[];
  packageData: PackageData;
  onDocumentChange: (value: string) => void;
  onDiscrepancyClick: (index: number) => void;
  onDiscrepancySelect: (value: number | null) => void;
  onExpandedCategoriesChange?: (categories: Set<string>) => void;
  onPrimaryDocumentChange: PrimaryDocumentChangeHandler;
}

const DiscrepancyList = ({
  discrepancies,
  filteredDiscrepancies,
  documents,
  selectedDocument,
  selectedDiscrepancy,
  resolvedDiscrepancies,
  viewMode,
  expandedCategories,
  packageDocuments,
  packageData,
  onDocumentChange,
  onDiscrepancyClick,
  onDiscrepancySelect,
  onExpandedCategoriesChange,
  onPrimaryDocumentChange
}: DiscrepancyListProps) => {

  const {
    groupedDiscrepancies,
    documentCountByType,
    groupedByDocument,
    sotDoc
  } = useDiscrepancyGrouping(filteredDiscrepancies, documents);

  return (
    <div className="space-y-6">
      {/* Issue Type View - always displayed */}
      <div className="space-y-3">
        <IssueTypeView
          groupedDiscrepancies={groupedDiscrepancies}
          documentCountByType={documentCountByType}
          onDiscrepancyClick={onDiscrepancyClick}
          expandedCategories={expandedCategories}
          onExpandedCategoriesChange={onExpandedCategoriesChange}
          packageDocuments={packageDocuments}
          packageData={packageData}
          onPrimaryDocumentChange={onPrimaryDocumentChange}
          documents={documents}
        />
      </div>
    </div>
  );
};

export default DiscrepancyList;
