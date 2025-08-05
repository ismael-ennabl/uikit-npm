import { useState, useCallback } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  UploadDropZone,
  FileRequirementsLink
} from './upload';
import { SummarizeActions } from './upload/SummarizeActions';
import { SummarizeFileList } from './upload/SummarizeFileList';

interface FileItem {
  id: number;
  name: string;
  size: number;
  type: string;
  status: string;
}

interface SummarizeModalProps {
  open: boolean;
  onClose: () => void;
  onComplete?: () => void;
}

const SummarizeModal = ({ open, onClose, onComplete }: SummarizeModalProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState<FileItem[]>([]);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    const newFiles = droppedFiles.map((file, index) => ({
      id: files.length + index + 1,
      name: file.name,
      size: file.size,
      type: getDocumentType(file.name),
      status: 'uploaded'
    }));
    
    setFiles(prev => [...prev, ...newFiles]);
  }, [files]);

  const getDocumentType = (filename: string) => {
    if (filename.toLowerCase().includes('coi')) return 'COI';
    if (filename.toLowerCase().includes('policy')) return 'Policy';
    if (filename.toLowerCase().includes('certificate')) return 'Certificate';
    if (filename.toLowerCase().includes('endorsement')) return 'Endorsement';
    return 'Document';
  };

  const removeFile = (fileId: number) => {
    setFiles(prev => prev.filter(f => f.id !== fileId));
  };

  const handleCancel = () => {
    setFiles([]);
    onClose();
  };

  const handleGenerateSummary = () => {
    // Here you would typically process the files for summarization
    setFiles([]);
    onComplete?.();
    onClose();
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      setFiles([]);
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="border-b pb-4 mb-6 -mx-6 px-6">
          <DialogTitle className="text-2xl font-bold text-center">
            Summarize Documents
          </DialogTitle>
          <p className="text-base text-gray-600 text-center mt-2">
            Upload documents and we'll extract key insights instantly
          </p>
        </DialogHeader>

        <div className="space-y-6">
          <UploadDropZone
            dragActive={dragActive}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          />

          <FileRequirementsLink />

          <SummarizeFileList
            files={files}
            onRemoveFile={removeFile}
          />

          <SummarizeActions
            hasFiles={files.length > 0}
            onCancel={handleCancel}
            onGenerateSummary={handleGenerateSummary}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SummarizeModal;