import { useState, useEffect } from 'react';
import { Discrepancy, PackageDocument, PackageData, PrimaryDocumentChangeHandler, DocumentOption } from '@/types/comparison';
import { Collapsible, CollapsibleContent } from '@/components/ui/collapsible';
import { getUniqueDocuments, getUniqueFields } from '@/utils/documentDisplayUtils';
import CategoryHeader from './CategoryHeader';
import IssueTypeTable from './IssueTypeTable';
import SourceDocumentsTable from './SourceDocumentsTable';
import ExpandedPDFModal from './ExpandedPDFModal';

interface IssueTypeViewProps {
  groupedDiscrepancies: Record<string, Array<Discrepancy & { originalIndex: number }>>;
  documentCountByType: Record<string, Set<string>>;
  onDiscrepancyClick: (index: number) => void;
  expandedCategories?: Set<string>;
  onExpandedCategoriesChange?: (categories: Set<string>) => void;
  packageDocuments: PackageDocument[];
  packageData: PackageData;
  onPrimaryDocumentChange: PrimaryDocumentChangeHandler;
  documents: DocumentOption[];
}

const CATEGORY_ORDER = [
  'Basic Info',
  'Financials', 
  'Insured',
  'Carriers',
  'Coverages',
  'Limits',
  'Schedule of Operations',
  'Endorsements',
  'Exclusions',
  'Source Files'
];

const IssueTypeView = ({
  groupedDiscrepancies,
  documentCountByType,
  onDiscrepancyClick,
  expandedCategories: externalExpandedCategories,
  onExpandedCategoriesChange,
  packageDocuments,
  packageData,
  onPrimaryDocumentChange,
  documents
}: IssueTypeViewProps) => {
  const [internalExpandedCategories, setInternalExpandedCategories] = useState<Set<string>>(new Set());
  const [viewOnDocsPerCategory, setViewOnDocsPerCategory] = useState<Record<string, boolean>>({});
  const [selectedDocumentPerCategory, setSelectedDocumentPerCategory] = useState<Record<string, string>>({});
  const [expandedModalPerCategory, setExpandedModalPerCategory] = useState<Record<string, boolean>>({});
  
  // Use external state if provided, otherwise use internal state
  const expandedCategories = externalExpandedCategories || internalExpandedCategories;
  const setExpandedCategories = onExpandedCategoriesChange || setInternalExpandedCategories;

  const toggleCategory = (categoryType: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryType)) {
      newExpanded.delete(categoryType);
    } else {
      newExpanded.add(categoryType);
    }
    setExpandedCategories(newExpanded);
  };

  const handleViewOnDocsChange = (categoryType: string, checked: boolean) => {
    setViewOnDocsPerCategory(prev => ({
      ...prev,
      [categoryType]: checked
    }));
  };

  const handleSelectedDocumentChange = (categoryType: string, documentId: string) => {
    setSelectedDocumentPerCategory(prev => ({
      ...prev,
      [categoryType]: documentId
    }));
  };

  const handleExpandModal = (categoryType: string) => {
    setExpandedModalPerCategory(prev => ({
      ...prev,
      [categoryType]: true
    }));
  };

  const handleCloseModal = (categoryType: string) => {
    setExpandedModalPerCategory(prev => ({
      ...prev,
      [categoryType]: false
    }));
  };

  const getSelectedDocumentForCategory = (categoryType: string, categoryDiscrepancies: Array<Discrepancy & { originalIndex: number }>) => {
    if (selectedDocumentPerCategory[categoryType]) {
      return selectedDocumentPerCategory[categoryType];
    }
    
    // Auto-select first document that has discrepancies in this category
    const docsInCategory = documents.filter(doc => 
      doc.id !== 'all' && 
      doc.id !== 'policy' && 
      categoryDiscrepancies.some(d => d.documentId === doc.id)
    );
    
    return docsInCategory[0]?.id || '';
  };

  // Sort categories based on predefined order
  const sortedCategories = Object.entries(groupedDiscrepancies).sort(([a], [b]) => {
    const indexA = CATEGORY_ORDER.indexOf(a);
    const indexB = CATEGORY_ORDER.indexOf(b);
    
    // If category not in order, put it at the end
    if (indexA === -1 && indexB === -1) return 0;
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;
    
    return indexA - indexB;
  });

  return (
    <>
      {sortedCategories.map(([categoryType, categoryDiscrepancies]) => {
        const isExpanded = expandedCategories.has(categoryType);
        const uniqueDocuments = getUniqueDocuments(categoryDiscrepancies);
        const uniqueFields = getUniqueFields(categoryDiscrepancies);
        // Use actual unique fields count to match table rows exactly
        const categoryCount = uniqueFields.length;
        const documentCount = documentCountByType[categoryType]?.size || 0;
        
        // Generate section ID for smooth scrolling
        const sectionId = `section-${categoryType.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`;
        
        return (
          <Collapsible key={categoryType} open={isExpanded} onOpenChange={() => toggleCategory(categoryType)}>
            <div id={sectionId} className="scroll-mt-4">
              <CategoryHeader
                categoryType={categoryType}
                isExpanded={isExpanded}
                categoryCount={categoryCount}
                documentCount={documentCount}
              />

              <CollapsibleContent>
                <IssueTypeTable
                  categoryDiscrepancies={categoryDiscrepancies}
                  uniqueDocuments={uniqueDocuments}
                  uniqueFields={uniqueFields}
                  categoryType={categoryType}
                  onDiscrepancyClick={onDiscrepancyClick}
                  documents={documents}
                  packageData={packageData}
                  viewOnDocs={viewOnDocsPerCategory[categoryType] || false}
                  selectedDocument={getSelectedDocumentForCategory(categoryType, categoryDiscrepancies)}
                  onViewOnDocsChange={(checked) => handleViewOnDocsChange(categoryType, checked)}
                  onSelectedDocumentChange={(documentId) => handleSelectedDocumentChange(categoryType, documentId)}
                  onExpandModal={() => handleExpandModal(categoryType)}
                />
              </CollapsibleContent>
            </div>
          </Collapsible>
        );
      })}

      {/* Source Files Section */}
      <Collapsible 
        key="source-files" 
        open={expandedCategories.has('Source Files')} 
        onOpenChange={() => toggleCategory('Source Files')}
      >
        <div id="section-source-files" className="scroll-mt-4">
          <CategoryHeader
            categoryType="Source Files"
            isExpanded={expandedCategories.has('Source Files')}
            categoryCount={packageDocuments.length}
            documentCount={packageDocuments.length}
          />

          <CollapsibleContent>
            <SourceDocumentsTable 
              packageDocuments={packageDocuments} 
              packageData={packageData}
              onPrimaryDocumentChange={onPrimaryDocumentChange}
            />
          </CollapsibleContent>
        </div>
      </Collapsible>

      {/* Expanded PDF Modals for each category */}
      {sortedCategories.map(([categoryType, categoryDiscrepancies]) => (
        expandedModalPerCategory[categoryType] && (
          <ExpandedPDFModal
            key={`modal-${categoryType}`}
            isOpen={expandedModalPerCategory[categoryType]}
            onClose={() => handleCloseModal(categoryType)}
            selectedDiscrepancy={null}
            selectedDocument={getSelectedDocumentForCategory(categoryType, categoryDiscrepancies)}
            selectedIssueType={categoryType}
            viewMode="type"
            packageData={packageData}
            filteredDiscrepancies={categoryDiscrepancies}
            documents={documents}
            packageDocuments={packageDocuments}
            isPdfViewMode={true}
            onDiscrepancyChange={() => {}}
            onDocumentChange={(documentId) => handleSelectedDocumentChange(categoryType, documentId)}
            onIssueTypeChange={() => {}}
            onPdfViewModeChange={() => {}}
          />
        )
      ))}
    </>
  );
};

export default IssueTypeView;