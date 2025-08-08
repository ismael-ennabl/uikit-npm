import { ChevronLeft, ChevronRight, Expand } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Discrepancy, DocumentOption, PackageData, PackageDocument } from '@/types/comparison';
import PDFViewer from '@/components/PDFViewer';
import DocumentHeaderSelector from './DocumentHeaderSelector';
import { getDocumentNameWithoutExtension } from '@/utils/documentUtils';

interface PDFViewModeProps {
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
  onExpandModal?: () => void;
}

const PDFViewMode = ({
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
  onPdfViewModeChange,
  onExpandModal
}: PDFViewModeProps) => {
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
  return <div>
      {/* Mismatches Title */}
      

      {/* Control Bar */}
      <div className="flex items-center justify-between mb-6 p-4 bg-brand-blue/10 rounded-lg">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <Label htmlFor="pdf-view-toggle-2" className="text-sm font-medium text-secondary">
              View on Docs
            </Label>
            <Switch id="pdf-view-toggle-2" checked={isPdfViewMode} onCheckedChange={onPdfViewModeChange} />
          </div>
          <div className="flex items-center space-x-2">
            {viewMode === 'document' ? (
              <DocumentHeaderSelector label="Doc" selectedDocument={selectedDocument} documents={secondColumnDocuments} onDocumentChange={onDocumentChange} packageDocuments={packageDocuments} />
            ) : (
              <div className="flex items-center space-x-2">
                <Label className="text-sm font-medium text-muted-foreground">Differences</Label>
                <Select value={selectedIssueType} onValueChange={onIssueTypeChange}>
                  <SelectTrigger className="w-60">
                    <SelectValue placeholder="Select issue type" />
                  </SelectTrigger>
                  <SelectContent className="bg-card z-50">
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
                <Label className="text-sm font-medium text-secondary">Issue</Label>
                <Select value={selectedDiscrepancy === null ? '0' : selectedDiscrepancy.toString()} onValueChange={onDiscrepancyChange}>
                  <SelectTrigger className="w-80">
                    <SelectValue placeholder="Select mismatch to highlight" />
                  </SelectTrigger>
                   <SelectContent className="bg-card z-50">
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
                <Label className="text-sm font-medium text-secondary">Doc</Label>
                <Select value={selectedDocument} onValueChange={onDocumentChange}>
                  <SelectTrigger className="w-80">
                    <SelectValue placeholder="Select document" />
                  </SelectTrigger>
                  <SelectContent className="bg-card z-50">
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
                {onExpandModal && (
                  <Button variant="ghost" size="icon" onClick={onExpandModal} className="h-8 w-8">
                    <Expand className="h-4 w-4" />
                  </Button>
                )}
          </div>
        </div>
      </div>

      {/* PDF Content Area - Third */}
      <div className="grid grid-cols-2 gap-6">
        {/* Source PDF */}
        <div>
          <div className="h-[600px] border rounded-lg overflow-hidden">
            <PDFViewer documentName={`Primary Doc: ${getDocumentNameWithoutExtension(packageData.sourceDocument)}`} highlightFields={getHighlightFields()} isSourceDocument={true} />
          </div>
        </div>

        {/* Compare PDF */}
        <div>
          <div className="h-[600px] border rounded-lg overflow-hidden">
            <PDFViewer documentName={getDocumentNameWithoutExtension(getCompareDocumentName())} highlightFields={getHighlightFields()} isSourceDocument={false} />
          </div>
        </div>
      </div>
    </div>;
};

export default PDFViewMode;
