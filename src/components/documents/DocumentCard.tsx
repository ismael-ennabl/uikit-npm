import { File } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Document } from '@/hooks/useDocumentData';
import { formatDate } from '@/utils/packageUtils';

interface DocumentCardProps {
  document: Document;
  onClick: () => void;
  isSelected: boolean;
  onSelect: (checked: boolean) => void;
}

const DocumentCard = ({ document: doc, onClick, isSelected, onSelect }: DocumentCardProps) => {
  return (
    <div
      className={`p-4 border rounded-lg transition-all cursor-pointer ${
        isSelected
          ? 'bg-[#0000c5]/5 border-2 border-[#0000c5]'
          : doc.status === 'in-progress'
          ? 'bg-gray-100 border-gray-200 cursor-not-allowed'
          : 'hover:bg-hover-primary hover:border-gray-300'
      }`}
      onClick={doc.status !== 'in-progress' ? onClick : undefined}
    >
      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-2">
            <File className="h-4 w-4 text-black" />
            {doc.status === 'in-progress' && (
              <Badge variant="processing" className="flex-shrink-0">
                Processing
              </Badge>
            )}
            {doc.status === 'new' && (
              <Badge variant="new" className="flex-shrink-0">
                New
              </Badge>
            )}
          </div>
          {doc.status !== 'in-progress' && (
            <Checkbox
              checked={isSelected}
              onCheckedChange={onSelect}
              onClick={(e) => e.stopPropagation()}
            />
          )}
        </div>
        
        <div className="space-y-2">
          <h3 className="font-normal text-gray-900 text-base leading-tight line-clamp-2 overflow-hidden text-ellipsis">
            {doc.name}
          </h3>
        </div>
        
        <div className="space-y-1 text-sm" style={{ color: '#8287b0cc' }}>
          <div>Upload date: {formatDate(doc.uploadDate)}</div>
          <div>{doc.company}</div>
          {doc.status !== 'in-progress' && (
            <div>{doc.products} {doc.products === 1 ? 'product' : 'products'}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DocumentCard;