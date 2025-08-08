
import { Badge } from '@/components/ui/badge';
import { PackageDocument } from '@/types/comparison';
import DocumentActions from './DocumentActions';

interface DocumentCardProps {
  document: PackageDocument;
  index: number;
  onVersionSelect: (docId: number, version: string) => void;
  onDownload: (docId: number) => void;
  onView: (docId: number) => void;
  onDelete: (docId: number) => void;
  onMarkAsSourceOfTruth: (docId: number) => void;
}

const DocumentCard = ({
  document: doc,
  index,
  onVersionSelect,
  onDownload,
  onView,
  onDelete,
  onMarkAsSourceOfTruth
}: DocumentCardProps) => {
  const getCurrentVersion = (index: number) => {
    return index === 3 ? 'V4' : `V${index + 1}`;
  };

  const getEditsCount = (index: number) => {
    // Mock data for edits count - in real app this would come from props or API
    const editsCounts = [3, 2, 1, 45]; // Corresponding to each document
    return editsCounts[index] || 0;
  };

  const getFileExtension = (index: number) => {
    const extensions = ['pdf', 'pdf', 'xls', 'docx']; // Different file types
    return extensions[index] || 'pdf';
  };

  const getDocumentNameWithoutExtension = (name: string) => {
    return name.replace(/\.[^/.]+$/, "");
  };

  return (
    <div className="p-4 bg-card border rounded-lg hover:border-border transition-colors">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <h4 className="font-medium text-gray-900">{getDocumentNameWithoutExtension(doc.name)}</h4>
              <Badge variant="static" className="bg-gray-100 text-gray-700 border-gray-200 text-xs rounded-sm">
                {getFileExtension(index)}
              </Badge>
              <Badge variant="static" className="bg-muted text-muted-foreground border-muted text-xs">
                {index === 3 ? 'V4' : `V${index + 1}`}
              </Badge>
              {doc.isSourceOfTruth && (
                <Badge variant="static" className="bg-success/20 text-success border-success/20">
                  Primary Doc to Compare
                </Badge>
              )}
            </div>
            <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
              {doc.confidence && (
                <>
                  <span className="text-foreground">{getEditsCount(index)} changes</span>
                  <span className="text-brand-blue">5 differences</span>
                </>
              )}
              {index === 3 && (
                <>
                  <span className="text-foreground">{getEditsCount(index)} changes</span>
                  <span className="text-success">100% Synced</span>
                </>
              )}
              <span>{doc.size}</span>
              <span>{doc.pages} pages</span>
              <span>Edited: {doc.uploadDate}</span>
            </div>
          </div>
        </div>
        <DocumentActions
          document={doc}
          index={index}
          currentVersion={getCurrentVersion(index)}
          onVersionSelect={onVersionSelect}
          onDownload={onDownload}
          onView={onView}
          onDelete={onDelete}
          onMarkAsSourceOfTruth={onMarkAsSourceOfTruth}
        />
      </div>
    </div>
  );
};

export default DocumentCard;
