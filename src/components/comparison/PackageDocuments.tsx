
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { PackageDocument } from '@/types/comparison';
import DocumentCard from './DocumentCard';
import VersionChangeDialog from './VersionChangeDialog';
import PDFSheet from './PDFSheet';

interface PackageDocumentsProps {
  documents: PackageDocument[];
  onAddMoreFiles: () => void;
  onEditSourceOfTruth: () => void;
  onVersionChange?: (docId: number, version: string) => void;
}

const PackageDocuments = ({ documents, onAddMoreFiles, onEditSourceOfTruth, onVersionChange }: PackageDocumentsProps) => {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [pendingChange, setPendingChange] = useState<{docId: number, version: string} | null>(null);
  const [showPDFSheet, setShowPDFSheet] = useState(false);
  const [currentDocument, setCurrentDocument] = useState<string>('');

  const handleVersionSelect = (docId: number, version: string) => {
    setPendingChange({ docId, version });
    setShowConfirmDialog(true);
  };

  const confirmVersionChange = () => {
    if (pendingChange) {
      console.log(`Confirmed version change to ${pendingChange.version} for document ${pendingChange.docId}`);
      onVersionChange?.(pendingChange.docId, pendingChange.version);
      setShowConfirmDialog(false);
      setPendingChange(null);
    }
  };

  const cancelVersionChange = () => {
    setShowConfirmDialog(false);
    setPendingChange(null);
  };

  const handleDownload = (docId: number) => {
    console.log(`Download document ${docId}`);
    // Handle download functionality
  };

  const handleView = (docId: number) => {
    const document = documents.find(doc => doc.id === docId);
    if (document) {
      setCurrentDocument(document.name);
      setShowPDFSheet(true);
    }
  };

  const handleDelete = (docId: number) => {
    console.log(`Delete document ${docId}`);
    // Handle delete functionality
  };

  const handleMarkAsSourceOfTruth = (docId: number) => {
    console.log(`Mark document ${docId} as source of truth`);
    // Handle mark as source of truth functionality
  };

  return (
    <>
      <div className="space-y-4">

        {/* Documents List */}
        {documents.map((doc, index) => (
          <DocumentCard
            key={doc.id}
            document={doc}
            index={index}
            onVersionSelect={handleVersionSelect}
            onDownload={handleDownload}
            onView={handleView}
            onDelete={handleDelete}
            onMarkAsSourceOfTruth={handleMarkAsSourceOfTruth}
          />
        ))}
      </div>

      <VersionChangeDialog
        isOpen={showConfirmDialog}
        pendingVersion={pendingChange?.version || null}
        onConfirm={confirmVersionChange}
        onCancel={cancelVersionChange}
      />

      <PDFSheet
        isOpen={showPDFSheet}
        onClose={() => setShowPDFSheet(false)}
        documentName={currentDocument}
        highlightField=""
      />
    </>
  );
};

export default PackageDocuments;
