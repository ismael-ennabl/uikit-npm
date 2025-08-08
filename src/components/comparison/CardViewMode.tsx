import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Discrepancy, DocumentOption, PackageDocument } from '@/types/comparison';
import { TYPOGRAPHY } from '@/styles/tokens';
import DocumentHeaderSelector from './DocumentHeaderSelector';
interface CardViewModeProps {
  selectedDiscrepancy: number | null;
  selectedDocument: string;
  selectedIssueType: string;
  viewMode: 'type' | 'document';
  filteredDiscrepancies: Discrepancy[];
  documents: DocumentOption[];
  packageDocuments: PackageDocument[];
  isPdfViewMode: boolean;
  onDiscrepancyChange: (value: string) => void;
  onDocumentChange: (value: string) => void;
  onIssueTypeChange: (value: string) => void;
  onPdfViewModeChange: (checked: boolean) => void;
}
const CardViewMode = ({
  selectedDiscrepancy,
  selectedDocument,
  selectedIssueType,
  viewMode,
  filteredDiscrepancies,
  documents,
  packageDocuments,
  isPdfViewMode,
  onDiscrepancyChange,
  onDocumentChange,
  onIssueTypeChange,
  onPdfViewModeChange
}: CardViewModeProps) => {
  const secondColumnDocuments = documents.filter(doc => doc.id !== 'all');
  
  // Get unique issue types from filteredDiscrepancies
  const issueTypes = [...new Set(filteredDiscrepancies.map(d => d.type))];
  
  // Helper functions for By Issue mode
  const getDocumentsWithIssueType = (issueType: string) => {
    const docIds = [...new Set(filteredDiscrepancies.filter(d => d.type === issueType).map(d => d.documentId))];
    return documents.filter(doc => docIds.includes(doc.id) && doc.id !== 'all');
  };
  
  const getSelectedItemIndex = () => {
    if (viewMode === 'document') {
      return selectedDiscrepancy;
    } else {
      // By Issue mode: find index of selected document in documents with selected issue
      const docsWithIssue = getDocumentsWithIssueType(selectedIssueType);
      return docsWithIssue.findIndex(doc => doc.id === selectedDocument);
    }
  };
  
  const getItemsCount = () => {
    if (viewMode === 'document') {
      return filteredDiscrepancies.length;
    } else {
      return getDocumentsWithIssueType(selectedIssueType).length;
    }
  };
  
  const handlePreviousDiscrepancy = () => {
    if (viewMode === 'document') {
      if (selectedDiscrepancy === null || selectedDiscrepancy <= 0) return;
      onDiscrepancyChange((selectedDiscrepancy - 1).toString());
    } else {
      // By Issue mode: navigate through documents with selected issue
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
      // By Issue mode: navigate through documents with selected issue
      const docsWithIssue = getDocumentsWithIssueType(selectedIssueType);
      const currentIndex = docsWithIssue.findIndex(doc => doc.id === selectedDocument);
      if (currentIndex >= docsWithIssue.length - 1) return;
      onDocumentChange(docsWithIssue[currentIndex + 1].id);
    }
  };
  const getDiscrepancyCountsByField = () => {
    const counts: {
      [key: string]: {
        count: number;
        sourceValue: string;
        section: string;
      };
    } = {};
    filteredDiscrepancies.forEach(d => {
      if (!counts[d.field]) {
        counts[d.field] = {
          count: 0,
          sourceValue: d.sourceValue,
          section: d.section
        };
      }
      counts[d.field].count++;
    });
    return counts;
  };
  return (
    <>
      {/* Control Bar */}
      <div className="flex items-center justify-between mb-6 p-4 bg-blue-50 rounded-lg">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <Label htmlFor="pdf-view-toggle" className="text-sm font-medium text-gray-700">
              View on Docs
            </Label>
            <Switch id="pdf-view-toggle" checked={isPdfViewMode} onCheckedChange={onPdfViewModeChange} />
          </div>
          <div className="flex items-center space-x-2">
            {viewMode === 'document' ? (
              <DocumentHeaderSelector label="Doc" selectedDocument={selectedDocument} documents={secondColumnDocuments} onDocumentChange={onDocumentChange} packageDocuments={packageDocuments} />
            ) : (
              <div className="flex items-center space-x-2">
                <Label className={TYPOGRAPHY.sectionLabel}>Differences</Label>
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
                <Label className={TYPOGRAPHY.sectionLabel}>Issue</Label>
                <Select value={selectedDiscrepancy === null ? '0' : selectedDiscrepancy.toString()} onValueChange={onDiscrepancyChange}>
                  <SelectTrigger className="w-80">
                    <SelectValue placeholder="Select mismatch" />
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
                <Label className={TYPOGRAPHY.sectionLabel}>Doc</Label>
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

      <div className="grid grid-cols-2 gap-6">
        {/* Source Document Content */}
        <div className="bg-white p-4 rounded-lg min-h-96 border">
          {selectedDiscrepancy !== null && (
            <div className="space-y-4">
              <div className="p-3 bg-card border-l-4 border-success rounded">
                <p className={`${TYPOGRAPHY.sectionLabel} mb-1`}>
                  {filteredDiscrepancies[selectedDiscrepancy].field}
                </p>
                <p className={`${TYPOGRAPHY.cardHeading} text-success`}>
                  {filteredDiscrepancies[selectedDiscrepancy].sourceValue}
                </p>
              </div>
              <div className="text-sm text-muted-foreground">
                <p><strong>Type:</strong> {filteredDiscrepancies[selectedDiscrepancy].type}</p>
              </div>
            </div>
          )}
        </div>

        {/* Compare Document Content */}
        <div className="bg-white p-4 rounded-lg min-h-96 border">
          {selectedDiscrepancy !== null && (
            <div className="space-y-4">
              <div className="p-3 bg-card border-l-4 border-brand-blue rounded">
                <p className={`${TYPOGRAPHY.sectionLabel} mb-1`}>
                  {filteredDiscrepancies[selectedDiscrepancy].field}
                </p>
                <p className={`${TYPOGRAPHY.cardHeading} text-brand-blue`}>
                  {filteredDiscrepancies[selectedDiscrepancy].compareValue}
                </p>
              </div>
              <div className="text-sm text-muted-foreground">
                <p className="mb-2"><strong>Doc Name:</strong> {documents.find(doc => doc.id === filteredDiscrepancies[selectedDiscrepancy].documentId)?.name || 'Unknown Document'}</p>
                <p className="mb-2"><strong>Page:</strong> {filteredDiscrepancies[selectedDiscrepancy].page}</p>
                <p><strong>Row:</strong> {filteredDiscrepancies[selectedDiscrepancy].row}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default CardViewMode;