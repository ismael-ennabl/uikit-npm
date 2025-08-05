import { useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Discrepancy, DocumentOption, PackageData, PackageDocument } from '@/types/comparison';
import PDFViewer from '@/components/PDFViewer';
import DocumentHeaderSelector from './DocumentHeaderSelector';
import { getDocumentNameWithoutExtension } from '@/utils/documentUtils';

interface ExpandedPDFModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDiscrepancy: number | null;
  selectedDocument: string;
  selectedIssueType: string;
  viewMode: 'type' | 'document';
  packageData: PackageData;
  filteredDiscrepancies: Discrepancy[];
  documents: DocumentOption[];
  packageDocuments: PackageDocument[];
  isPdfViewMode: boolean;
  onDiscrepancyChange: (value: string) => void;
  onDocumentChange: (value: string) => void;
  onIssueTypeChange: (value: string) => void;
  onPdfViewModeChange: (checked: boolean) => void;
}

const ExpandedPDFModal = ({
  isOpen,
  onClose,
  selectedDiscrepancy,
  selectedDocument,
  selectedIssueType,
  viewMode,
  packageData,
  filteredDiscrepancies,
  documents,
  packageDocuments,
  isPdfViewMode,
  onDiscrepancyChange,
  onDocumentChange,
  onIssueTypeChange,
  onPdfViewModeChange
}: ExpandedPDFModalProps) => {
  
  // Initialize default values when modal opens
  useEffect(() => {
    if (isOpen) {
      const secondColumnDocuments = documents.filter(doc => doc.id !== 'all');
      const issueTypes = [...new Set(filteredDiscrepancies.map(d => d.type))];
      
      // Set default discrepancy if null
      if (selectedDiscrepancy === null && filteredDiscrepancies.length > 0) {
        onDiscrepancyChange('0');
      }
      
      // Set default document if empty or 'all'
      if ((!selectedDocument || selectedDocument === 'all') && secondColumnDocuments.length > 0) {
        onDocumentChange(secondColumnDocuments[0].id);
      }
      
      // Set default issue type if empty
      if (!selectedIssueType && issueTypes.length > 0) {
        onIssueTypeChange(issueTypes[0]);
      }
    }
  }, [isOpen, filteredDiscrepancies, documents, selectedDiscrepancy, selectedDocument, selectedIssueType, onDiscrepancyChange, onDocumentChange, onIssueTypeChange]);
  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      onClose();
    }
  };

  const secondColumnDocuments = documents.filter(doc => doc.id !== 'all');
  
  // Get unique issue types from filteredDiscrepancies
  const issueTypes = [...new Set(filteredDiscrepancies.map(d => d.type))];
  
  // Helper functions for By Issue mode
  const getDocumentsWithIssueType = (issueType: string) => {
    const docIds = [...new Set(filteredDiscrepancies.filter(d => d.type === issueType).map(d => d.documentId))];
    return documents.filter(doc => docIds.includes(doc.id) && doc.id !== 'all');
  };
  
  const handlePreviousDiscrepancy = () => {
    if (viewMode === 'document') {
      if (selectedDiscrepancy === null || selectedDiscrepancy <= 0) return;
      onDiscrepancyChange((selectedDiscrepancy - 1).toString());
    } else {
      const docsWithIssue = getDocumentsWithIssueType(selectedIssueType);
      const currentIndex = docsWithIssue.findIndex(doc => doc.id === selectedDocument);
      if (currentIndex <= 0) return;
      onDocumentChange(docsWithIssue[currentIndex - 1].id);
    }
  };
  
  const handleNextDiscrepancy = () => {
    if (viewMode === 'document') {
      if (selectedDiscrepancy === null || selectedDiscrepancy >= filteredDiscrepancies.length - 1) return;
      onDiscrepancyChange((selectedDiscrepancy + 1).toString());
    } else {
      const docsWithIssue = getDocumentsWithIssueType(selectedIssueType);
      const currentIndex = docsWithIssue.findIndex(doc => doc.id === selectedDocument);
      if (currentIndex >= docsWithIssue.length - 1) return;
      onDocumentChange(docsWithIssue[currentIndex + 1].id);
    }
  };

  const getHighlightFields = () => {
    if (selectedDiscrepancy === null) {
      return filteredDiscrepancies.map(d => d.field);
    }
    return [filteredDiscrepancies[selectedDiscrepancy]?.field].filter(Boolean);
  };

  const getCompareDocumentName = () => {
    if (selectedDocument === 'all') {
      return packageData.compareDocument;
    }
    const doc = documents.find(d => d.id === selectedDocument);
    return doc?.name || packageData.compareDocument;
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 flex flex-col">
        {/* Fixed Header */}
        <DialogHeader className="border-b pb-4 px-6 pt-4 flex-shrink-0">
          <DialogTitle className="text-2xl font-bold text-center">
            Document Comparison
          </DialogTitle>
        </DialogHeader>
        
        {/* Fixed Control Bar */}
        <div className="flex items-center justify-between p-4 bg-blue-50 mx-6 mt-6 rounded-lg flex-shrink-0">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              {viewMode === 'document' ? (
                <DocumentHeaderSelector label="Doc" selectedDocument={selectedDocument} documents={secondColumnDocuments} onDocumentChange={onDocumentChange} packageDocuments={packageDocuments} />
              ) : (
                <div className="flex items-center space-x-2">
                  <Label className="text-sm font-medium text-gray-700">Differences</Label>
                  <Select value={selectedIssueType} onValueChange={onIssueTypeChange}>
                    <SelectTrigger className="w-60">
                      <SelectValue placeholder="Select issue type" />
                    </SelectTrigger>
                    <SelectContent className="bg-white z-50">
                      {issueTypes.map((issueType) => (
                        <SelectItem key={issueType} value={issueType}>
                          {issueType}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-2">
              {viewMode === 'document' ? (
                <>
                  <Label className="text-sm font-medium text-gray-700">Issue</Label>
                  <Select value={selectedDiscrepancy === null ? '0' : selectedDiscrepancy.toString()} onValueChange={onDiscrepancyChange}>
                    <SelectTrigger className="w-80">
                      <SelectValue placeholder="Select mismatch to highlight" />
                    </SelectTrigger>
                    <SelectContent className="bg-white z-50">
                      {filteredDiscrepancies.map((discrepancy, index) => (
                        <SelectItem key={discrepancy.id} value={index.toString()}>
                          {discrepancy.type} - {discrepancy.field}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </>
              ) : (
                <>
                  <Label className="text-sm font-medium text-gray-700">Doc</Label>
                  <Select value={selectedDocument} onValueChange={onDocumentChange}>
                    <SelectTrigger className="w-80">
                      <SelectValue placeholder="Select document" />
                    </SelectTrigger>
                    <SelectContent className="bg-white z-50">
                      {getDocumentsWithIssueType(selectedIssueType).map((doc, index) => (
                        <SelectItem key={doc.id} value={doc.id}>
                          {doc.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </>
              )}
              <Button variant="outline" size="sm" onClick={handlePreviousDiscrepancy} disabled={
                viewMode === 'document' 
                  ? (selectedDiscrepancy === null || selectedDiscrepancy <= 0)
                  : (getDocumentsWithIssueType(selectedIssueType).findIndex(doc => doc.id === selectedDocument) <= 0)
              }>
                <ChevronLeft className="h-4 w-4" />
                Prev
              </Button>
              <Button variant="outline" size="sm" onClick={handleNextDiscrepancy} disabled={
                viewMode === 'document'
                  ? (selectedDiscrepancy === null || selectedDiscrepancy >= filteredDiscrepancies.length - 1)
                  : (getDocumentsWithIssueType(selectedIssueType).findIndex(doc => doc.id === selectedDocument) >= getDocumentsWithIssueType(selectedIssueType).length - 1)
              }>
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Fixed Height PDF Content Area */}
        <div className="px-6 pb-6 pt-6 overflow-hidden" style={{ height: 'calc(95vh - 200px)' }}>
          <div className="grid grid-cols-2 gap-6 h-full overflow-hidden">
            {/* Source PDF */}
            <div className="h-full overflow-hidden">
              <div className="h-full border rounded-lg overflow-hidden">
                <PDFViewer documentName={`Primary Doc: ${getDocumentNameWithoutExtension(packageData.sourceDocument)}`} highlightFields={getHighlightFields()} isSourceDocument={true} />
              </div>
            </div>

            {/* Compare PDF */}
            <div className="h-full overflow-hidden">
              <div className="h-full border rounded-lg overflow-hidden">
                <PDFViewer documentName={getDocumentNameWithoutExtension(getCompareDocumentName())} highlightFields={getHighlightFields()} isSourceDocument={false} />
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExpandedPDFModal;