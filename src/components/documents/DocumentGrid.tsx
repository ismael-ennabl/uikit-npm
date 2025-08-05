import { Document } from '@/hooks/useDocumentData';
import DocumentCard from './DocumentCard';

interface DocumentGridProps {
  documents: Document[];
  onDocumentClick: (documentId: number) => void;
  selectedDocuments: number[];
  onDocumentSelect: (documentId: number, checked: boolean) => void;
}

const DocumentGrid = ({ documents, onDocumentClick, selectedDocuments, onDocumentSelect }: DocumentGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {documents.map(doc => (
        <DocumentCard
          key={doc.id}
          document={doc}
          onClick={() => onDocumentClick(doc.id)}
          isSelected={selectedDocuments.includes(doc.id)}
          onSelect={(checked) => onDocumentSelect(doc.id, checked)}
        />
      ))}
    </div>
  );
};

export default DocumentGrid;