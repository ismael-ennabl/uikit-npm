
import { ChevronDown, MoreHorizontal, Download, Eye, Bookmark, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { PackageDocument } from '@/types/comparison';

interface DocumentActionsProps {
  document: PackageDocument;
  index: number;
  currentVersion: string;
  onVersionSelect: (docId: number, version: string) => void;
  onDownload: (docId: number) => void;
  onView: (docId: number) => void;
  onDelete: (docId: number) => void;
  onMarkAsSourceOfTruth: (docId: number) => void;
}

const DocumentActions = ({
  document: doc,
  index,
  currentVersion,
  onVersionSelect,
  onDownload,
  onView,
  onDelete,
  onMarkAsSourceOfTruth
}: DocumentActionsProps) => {
  return (
    <div className="flex items-center space-x-2">
      {index > 0 && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              {currentVersion}
              <ChevronDown className="h-4 w-4 ml-1" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-card border shadow-md z-50">
            {Array.from({ length: index + 1 }, (_, i) => (
              <DropdownMenuItem
                key={i + 1}
                onClick={() => onVersionSelect(doc.id, `V${i + 1}`)}
                className="cursor-pointer hover:bg-gray-100"
              >
                {i === index && index === 3 ? 'V4' : `V${i + 1}`}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-card border shadow-md z-50">
          <DropdownMenuItem
            onClick={() => onDownload(doc.id)}
            className="cursor-pointer hover:bg-gray-100"
          >
            <Download className="h-4 w-4 mr-2" />
            Download
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => onView(doc.id)}
            className="cursor-pointer hover:bg-gray-100"
          >
            <Eye className="h-4 w-4 mr-2" />
            View
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => onMarkAsSourceOfTruth(doc.id)}
            className="cursor-pointer hover:bg-gray-100"
          >
            <Bookmark className="h-4 w-4 mr-2" />
            Mark as Source of Truth
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => onDelete(doc.id)}
            className="cursor-pointer hover:bg-gray-100 text-red-600"
          >
            <Trash className="h-4 w-4 mr-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default DocumentActions;
