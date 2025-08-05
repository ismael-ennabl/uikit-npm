import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DocumentOption } from '@/types/comparison';
import { getDocumentNameWithoutExtension } from '@/utils/documentUtils';

interface DocumentDropdownTitleProps {
  selectedDocument: string;
  documentsInCategory: DocumentOption[];
  onSelectedDocumentChange: (documentId: string) => void;
}

const DocumentDropdownTitle = ({
  selectedDocument,
  documentsInCategory,
  onSelectedDocumentChange
}: DocumentDropdownTitleProps) => {
  return (
    <div className="flex items-center space-x-2">
      <Select value={selectedDocument} onValueChange={onSelectedDocumentChange}>
        <SelectTrigger className="w-64 h-8 text-sm bg-gray-800 border-gray-600 text-white">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="bg-white z-50">
          {documentsInCategory.map((doc) => (
            <SelectItem key={doc.id} value={doc.id}>
              {getDocumentNameWithoutExtension(doc.name)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default DocumentDropdownTitle;