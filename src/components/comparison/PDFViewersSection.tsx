import { useState, useEffect } from 'react';
import { DocumentOption, PackageData } from '@/types/comparison';
import { getDocumentNameWithoutExtension } from '@/utils/documentUtils';
import PDFViewer from '@/components/PDFViewer';
import DocumentDropdownTitle from './DocumentDropdownTitle';

interface PDFViewersSectionProps {
  documentsInCategory: DocumentOption[];
  packageData: PackageData;
  selectedDocument: string;
  uniqueFields: string[];
  onSelectedDocumentChange: (documentId: string) => void;
  scrollToField?: string;
}

const PDFViewersSection = ({
  documentsInCategory,
  packageData,
  selectedDocument,
  uniqueFields,
  onSelectedDocumentChange,
  scrollToField
}: PDFViewersSectionProps) => {
  const [currentScrollField, setCurrentScrollField] = useState<string | undefined>(scrollToField);

  // Update scroll field when prop changes
  useEffect(() => {
    setCurrentScrollField(scrollToField);
  }, [scrollToField]);

  // Auto-scroll to first field when PDF viewers are first shown
  useEffect(() => {
    if (uniqueFields.length > 0 && !currentScrollField) {
      setCurrentScrollField(uniqueFields[0]);
    }
  }, [uniqueFields]);
  const getHighlightFields = () => {
    return uniqueFields;
  };

  const getCompareDocumentName = () => {
    if (selectedDocument === 'all') {
      return packageData.compareDocument;
    }
    const doc = documentsInCategory.find(d => d.id === selectedDocument);
    return doc?.name || packageData.compareDocument;
  };

  return (
    <div className="mt-6 grid grid-cols-2 gap-6">
      {/* Source PDF */}
      <div>
        <div className="h-[600px] border rounded-lg overflow-hidden">
          <PDFViewer 
            documentName={`Primary Doc: ${getDocumentNameWithoutExtension(packageData.sourceDocument)}`} 
            highlightFields={getHighlightFields()} 
            isSourceDocument={true}
            scrollToField={currentScrollField}
          />
        </div>
      </div>

      {/* Compare PDF */}
      <div>
        <div className="h-[600px] border rounded-lg overflow-hidden">
          <PDFViewer 
            documentName={getDocumentNameWithoutExtension(getCompareDocumentName())} 
            highlightFields={getHighlightFields()} 
            isSourceDocument={false}
            scrollToField={currentScrollField}
            titleComponent={
              <DocumentDropdownTitle 
                selectedDocument={selectedDocument}
                documentsInCategory={documentsInCategory}
                onSelectedDocumentChange={onSelectedDocumentChange}
              />
            }
          />
        </div>
      </div>
    </div>
  );
};

export default PDFViewersSection;