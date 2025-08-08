import { Document } from '@/hooks/useDocumentData';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { formatDate } from '@/utils/packageUtils';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface DocumentTableProps {
  documents: Document[];
  onDocumentClick: (documentId: number) => void;
  selectedDocuments: number[];
  onDocumentSelect: (documentId: number, checked: boolean) => void;
  onSelectAll: (checked: boolean) => void;
}

const DocumentTable = ({ documents, onDocumentClick, selectedDocuments, onDocumentSelect, onSelectAll }: DocumentTableProps) => {
  const allSelected = documents.length > 0 && selectedDocuments.length === documents.length;
  const someSelected = selectedDocuments.length > 0 && selectedDocuments.length < documents.length;
  return (
    <div className="rounded-lg border bg-card">
      <Table>
        <TableHeader>
          <TableRow className="bg-secondary hover:bg-secondary">
            <TableHead className="w-12">
              <Checkbox
                checked={allSelected}
                onCheckedChange={onSelectAll}
              />
            </TableHead>
            <TableHead className="font-medium text-secondary">Name</TableHead>
            <TableHead className="font-medium text-secondary">Upload Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {documents.map(doc => (
            <TableRow 
              key={doc.id} 
              className="cursor-pointer hover:bg-hover-primary transition-colors border-b border-border"
              onClick={() => onDocumentClick(doc.id)}
            >
              <TableCell className="w-12 py-4">
                <Checkbox
                  checked={selectedDocuments.includes(doc.id)}
                  onCheckedChange={(checked) => onDocumentSelect(doc.id, checked as boolean)}
                  onClick={(e) => e.stopPropagation()}
                />
              </TableCell>
              <TableCell className="font-medium text-foreground py-4">{doc.name}</TableCell>
              <TableCell className="text-secondary py-4">{formatDate(doc.uploadDate)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default DocumentTable;