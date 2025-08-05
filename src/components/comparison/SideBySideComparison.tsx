import { useState } from 'react';
import { Discrepancy, DocumentOption, PackageData, PackageDocument } from '@/types/comparison';
import CardViewMode from './CardViewMode';
import PDFViewMode from './PDFViewMode';
import PDFSheet from './PDFSheet';
import ExpandedPDFModal from './ExpandedPDFModal';
interface SideBySideComparisonProps {
  packageData: PackageData;
  discrepancies: Discrepancy[];
  filteredDiscrepancies: Discrepancy[];
  documents: DocumentOption[];
  selectedDocument: string;
  selectedDiscrepancy: number | null;
  selectedIssueType: string;
  viewMode: 'type' | 'document';
  onDocumentChange: (value: string) => void;
  onDiscrepancyChange: (value: string) => void;
  onIssueTypeChange: (value: string) => void;
  packageDocuments?: PackageDocument[];
}
const SideBySideComparison = ({
  packageData,
  discrepancies,
  filteredDiscrepancies,
  documents,
  selectedDocument,
  selectedDiscrepancy,
  selectedIssueType,
  viewMode,
  onDocumentChange,
  onDiscrepancyChange,
  onIssueTypeChange,
  packageDocuments = []
}: SideBySideComparisonProps) => {
  const [pdfSheetOpen, setPdfSheetOpen] = useState(false);
  const [currentPdfDocument, setCurrentPdfDocument] = useState('');
  const [highlightField, setHighlightField] = useState<string>('');
  const [isPdfViewMode, setIsPdfViewMode] = useState(false);
  const [selectedSourceDocument, setSelectedSourceDocument] = useState('policy');
  const [isSourceEditable, setIsSourceEditable] = useState(false);
  const [expandedModalOpen, setExpandedModalOpen] = useState(false);
  const handleToggleSourceEdit = () => {
    setIsSourceEditable(!isSourceEditable);
  };
  const handleViewOriginalDoc = (documentName: string, fieldToHighlight?: string) => {
    if (isPdfViewMode) {
      // In PDF mode, we don't need the sheet - highlighting happens inline
      return;
    }
    setCurrentPdfDocument(documentName);
    setHighlightField(fieldToHighlight || '');
    setPdfSheetOpen(true);
  };
  return <div className="pt-6 py-0">
      {!isPdfViewMode ? <CardViewMode 
        selectedDiscrepancy={selectedDiscrepancy} 
        selectedDocument={selectedDocument} 
        selectedIssueType={selectedIssueType}
        viewMode={viewMode}
        filteredDiscrepancies={filteredDiscrepancies} 
        documents={documents} 
        packageDocuments={packageDocuments} 
        isPdfViewMode={isPdfViewMode} 
        onDiscrepancyChange={onDiscrepancyChange} 
        onDocumentChange={onDocumentChange} 
        onIssueTypeChange={onIssueTypeChange}
        onPdfViewModeChange={setIsPdfViewMode} 
      /> : <PDFViewMode 
        selectedDiscrepancy={selectedDiscrepancy} 
        selectedDocument={selectedDocument} 
        selectedIssueType={selectedIssueType}
        viewMode={viewMode}
        packageData={packageData} 
        filteredDiscrepancies={filteredDiscrepancies} 
        documents={documents} 
        packageDocuments={packageDocuments} 
        isPdfViewMode={isPdfViewMode} 
        onDiscrepancyChange={onDiscrepancyChange} 
        onDocumentChange={onDocumentChange} 
        onIssueTypeChange={onIssueTypeChange}
        onPdfViewModeChange={setIsPdfViewMode}
        onExpandModal={() => setExpandedModalOpen(true)}
      />}
      
      {/* PDF Viewer Sheet - only for card mode */}
      {!isPdfViewMode && <PDFSheet isOpen={pdfSheetOpen} onClose={() => setPdfSheetOpen(false)} documentName={currentPdfDocument} highlightField={highlightField} />}
      
      {/* Expanded PDF Modal - only for PDF view mode */}
      {isPdfViewMode && (
        <ExpandedPDFModal
          isOpen={expandedModalOpen}
          onClose={() => setExpandedModalOpen(false)}
          selectedDiscrepancy={selectedDiscrepancy}
          selectedDocument={selectedDocument}
          selectedIssueType={selectedIssueType}
          viewMode={viewMode}
          packageData={packageData}
          filteredDiscrepancies={filteredDiscrepancies}
          documents={documents}
          packageDocuments={packageDocuments}
          isPdfViewMode={isPdfViewMode}
          onDiscrepancyChange={onDiscrepancyChange}
          onDocumentChange={onDocumentChange}
          onIssueTypeChange={onIssueTypeChange}
          onPdfViewModeChange={setIsPdfViewMode}
        />
      )}
    </div>;
};
export default SideBySideComparison;