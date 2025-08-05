import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TYPOGRAPHY } from '@/styles/tokens';
import { DocumentOption, PackageDocument } from '@/types/comparison';

interface DocumentHeaderSelectorProps {
  label: string;
  selectedDocument: string;
  documents: DocumentOption[];
  onDocumentChange: (value: string) => void;
  packageDocuments?: PackageDocument[];
  selectedSourceDocument?: string;
  isSourceDropdown?: boolean;
  isEditable?: boolean;
  onToggleEdit?: () => void;
}

const DocumentHeaderSelector = ({
  label,
  selectedDocument,
  documents,
  onDocumentChange,
  packageDocuments = [],
  selectedSourceDocument,
  isSourceDropdown = false,
  isEditable = true,
  onToggleEdit
}: DocumentHeaderSelectorProps) => {
  const getDocumentNameWithoutExtension = (name: string) => {
    return name.replace(/\.[^/.]+$/, "");
  };

  const getVersionForDocument = (documentName: string) => {
    const doc = packageDocuments.find(d => d.name === documentName);
    return doc?.version || 'V1';
  };

  const isCompareDropdown = label.includes('Compare');
  
  // For compare dropdown, organize documents with SOT first, then numbered others
  const organizedDocuments = isCompareDropdown && selectedSourceDocument ? (() => {
    const sotDoc = documents.find(doc => doc.id === selectedSourceDocument);
    const otherDocs = documents.filter(doc => doc.id !== selectedSourceDocument);
    return sotDoc ? [sotDoc, ...otherDocs] : documents;
  })() : documents;

  return (
    <div className="flex items-center space-x-2">
      <Label className={TYPOGRAPHY.sectionLabel}>{label}</Label>
      <div className="flex items-center space-x-2">
        <Select 
          value={selectedDocument} 
          onValueChange={onDocumentChange}
          disabled={isSourceDropdown && !isEditable}
        >
          <SelectTrigger className={`w-full ${isSourceDropdown && !isEditable ? 'opacity-60' : ''}`}>
            <SelectValue />
        </SelectTrigger>
        <SelectContent className="bg-white z-50 w-full">
          {organizedDocuments.map((doc, index) => {
            const isSOT = isCompareDropdown && selectedSourceDocument && doc.id === selectedSourceDocument;
            const isDisabled = isSOT;
            
            // Simple numbering: count non-SOT items before current item
            let displayNumber = null;
            if (isCompareDropdown && !isSOT) {
              let count = 1;
              for (let i = 0; i < index; i++) {
                const prevDoc = organizedDocuments[i];
                const prevIsSOT = selectedSourceDocument && prevDoc.id === selectedSourceDocument;
                if (!prevIsSOT) {
                  count++;
                }
              }
              displayNumber = count;
            }
            
            return (
              <SelectItem 
                key={doc.id} 
                value={doc.id}
                disabled={isDisabled}
                className={isDisabled ? "opacity-50 cursor-not-allowed" : ""}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="truncate flex-1 mr-2">
                    {displayNumber ? `${displayNumber} - ` : ''}
                    {getDocumentNameWithoutExtension(doc.name)}
                  </span>
                  <div className="flex items-center space-x-1 flex-shrink-0">
                    <Badge variant="static" className="bg-[#E6EDF9] text-[#8287B0] border-[#E6EDF9] text-xs">
                      {getVersionForDocument(doc.name)}
                    </Badge>
                    {isSOT && (
                      <Badge variant="static" className="bg-[#22C55E] text-white border-[#22C55E] text-xs">
                        Primary Doc
                      </Badge>
                    )}
                  </div>
                </div>
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
      {isSourceDropdown && onToggleEdit && (
        <Button
          variant="outline"
          size="sm"
          onClick={onToggleEdit}
          className="h-9 px-3 text-xs"
        >
          {isEditable ? 'Lock' : 'Edit'}
        </Button>
      )}
      </div>
    </div>
  );
};

export default DocumentHeaderSelector;