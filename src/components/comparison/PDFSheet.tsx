import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import PDFViewer from '@/components/PDFViewer';

interface PDFSheetProps {
  isOpen: boolean;
  onClose: () => void;
  documentName: string;
  highlightField: string;
}

const PDFSheet = ({ isOpen, onClose, documentName, highlightField }: PDFSheetProps) => {
  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] p-0">
        <DialogHeader className="border-b pb-4 mb-6 px-6 pt-4">
          <DialogTitle className="text-2xl font-bold text-center">
            Document Viewer
          </DialogTitle>
        </DialogHeader>
        <div className="h-[calc(90vh-120px)] overflow-hidden">
          <PDFViewer 
            documentName={documentName} 
            highlightField={highlightField}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PDFSheet;