import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PackageDocument, PackageData, PrimaryDocumentChangeHandler } from '@/types/comparison';
import PrimaryDocumentChangeDialog from './PrimaryDocumentChangeDialog';

interface SourceDocumentsTableProps {
  packageDocuments: PackageDocument[];
  packageData: PackageData;
  onPrimaryDocumentChange: PrimaryDocumentChangeHandler;
}

const SourceDocumentsTable = ({ packageDocuments, packageData, onPrimaryDocumentChange }: SourceDocumentsTableProps) => {
  const [selectedPrimary, setSelectedPrimary] = useState(packageData.sourceDocument);
  const [pendingSelection, setPendingSelection] = useState<string | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const formatConfidence = (confidence: number | null) => {
    if (confidence === null) return 'N/A';
    return `${confidence}%`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const handlePrimaryChange = (documentName: string) => {
    if (documentName !== selectedPrimary) {
      setPendingSelection(documentName);
      setShowConfirmDialog(true);
    }
  };

  const handleConfirmChange = () => {
    if (pendingSelection) {
      setSelectedPrimary(pendingSelection);
      onPrimaryDocumentChange(pendingSelection);
      setShowConfirmDialog(false);
      setPendingSelection(null);
    }
  };

  const handleCancelChange = () => {
    setShowConfirmDialog(false);
    setPendingSelection(null);
  };

  return (
    <div className="bg-white p-6 rounded-xl border">
      <Table wrapperClassName="border rounded-lg overflow-hidden">
        <TableHeader>
          <TableRow className="bg-gray-50 hover:bg-gray-50">
            <TableHead className="w-20 font-medium text-gray-700 bg-gray-50">Primary</TableHead>
            <TableHead className="font-medium text-gray-700 bg-gray-50">Document Name</TableHead>
            <TableHead className="font-medium text-gray-700 bg-gray-50">Pages</TableHead>
            <TableHead className="font-medium text-gray-700 bg-gray-50">Upload Date</TableHead>
            <TableHead className="font-medium text-gray-700 bg-gray-50">Confidence</TableHead>
            <TableHead className="font-medium text-gray-700 bg-gray-50">Version</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {packageDocuments.map((doc) => (
            <TableRow key={doc.id}>
              <TableCell>
                <div className="flex justify-center">
                  <input
                    type="radio"
                    name="primaryDocument"
                    value={doc.name}
                    checked={doc.name === selectedPrimary}
                    onChange={() => handlePrimaryChange(doc.name)}
                    className="h-4 w-4 rounded-full border border-black text-black focus:ring-2 focus:ring-ring focus:ring-offset-2 cursor-pointer"
                  />
                </div>
              </TableCell>
              <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                  {doc.name}
                  {doc.name === packageData.sourceDocument && (
                    <Badge variant="secondary" className="text-xs">
                      Primary Doc
                    </Badge>
                  )}
                </div>
              </TableCell>
              <TableCell>{doc.pages}</TableCell>
              <TableCell>{formatDate(doc.uploadDate)}</TableCell>
              <TableCell>
                <span className={doc.confidence && doc.confidence >= 95 ? 'text-green-600' : 'text-gray-600'}>
                  {formatConfidence(doc.confidence)}
                </span>
              </TableCell>
              <TableCell>{doc.version}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      <PrimaryDocumentChangeDialog
        open={showConfirmDialog}
        onClose={handleCancelChange}
        onConfirm={handleConfirmChange}
        documentName={pendingSelection || ''}
      />
    </div>
  );
};

export default SourceDocumentsTable;