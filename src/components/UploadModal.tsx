import { useState, useCallback } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  UploadDropZone,
  FileList,
  UploadActions,
  FileRequirementsLink,
  UploadDisclaimer
} from './upload';
import { Badge } from '@/components/ui/badge';
import { Info } from 'lucide-react';

interface FileItem {
  id: number;
  name: string;
  size: number;
  type: string;
  status: string;
  isSourceOfTruth: boolean;
}

interface UploadModalProps {
  open: boolean;
  onClose: () => void;
  packageId?: string | null;
  packageName?: string;
  onComplete?: () => void;
}

const UploadModal = ({ open, onClose, packageId, packageName, onComplete }: UploadModalProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState<FileItem[]>([]);
  const [showValidationDialog, setShowValidationDialog] = useState(false);
  const [groupName, setGroupName] = useState('');

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
    addFiles(droppedFiles);
  }, [files]);

  const getDocumentType = (filename: string) => {
    if (filename.toLowerCase().includes('coi')) return 'COI';
    if (filename.toLowerCase().includes('policy')) return 'Policy';
    if (filename.toLowerCase().includes('certificate')) return 'Certificate';
    if (filename.toLowerCase().includes('endorsement')) return 'Endorsement';
    return 'Document';
  };

  const addFiles = useCallback((selected: File[]) => {
    const newFiles = selected.map((file, index) => ({
      id: files.length + index + 1,
      name: file.name,
      size: file.size,
      type: getDocumentType(file.name),
      status: 'uploaded',
      isSourceOfTruth: false,
    }));
    setFiles((prev) => [...prev, ...newFiles]);
  }, [files]);

  const removeFile = (fileId: number) => {
    setFiles(prev => prev.filter(f => f.id !== fileId));
  };

  const toggleSourceOfTruth = (fileId: number) => {
    setFiles(prev => prev.map(file => ({
      ...file,
      isSourceOfTruth: file.id === fileId ? !file.isSourceOfTruth : false
    })));
  };

  const handleCancel = () => {
    setFiles([]);
    setGroupName('');
    onClose();
  };

  const handleStartComparison = () => {
    // Check if at least one file is selected as Primary Doc to Compare
    const hasPrimaryDoc = files.some(file => file.isSourceOfTruth);
    
    // Only require Primary Doc to Compare validation when creating a new package (not adding to existing)
    if (!hasPrimaryDoc && files.length > 0 && !packageId) {
      // Show validation dialog
      setShowValidationDialog(true);
      return;
    }
    
    // Here you would typically save the files and update the package
    setFiles([]);
    setGroupName('');
    onComplete?.();
    onClose();
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      setFiles([]);
      setGroupName('');
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="border-b pb-4 mb-6 -mx-6 px-6">
          <DialogTitle className="text-2xl font-bold text-center">
            {packageId ? 'Add More Documents' : 'Upload Documents'}
          </DialogTitle>
        </DialogHeader>

        {packageId && packageName && (
          <div className="flex items-center gap-2 mb-6">
            <span className="text-sm text-gray-600">Adding to Group:</span>
            <span className="text-sm font-medium text-gray-900">{packageName}</span>
            <Badge variant="static" className="bg-green-100 text-green-800 border-green-200">
              Primary Doc to Compare
            </Badge>
          </div>
        )}

        <div className="space-y-6">
          {!packageId && (
            <div className="space-y-2">
              <Label htmlFor="groupName" className="text-sm font-medium text-gray-900">
                Enter Group Name
              </Label>
              <Input
                id="groupName"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                placeholder="Name"
                className="bg-page border-0"
              />
            </div>
          )}

          <UploadDropZone
            dragActive={dragActive}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onFilesSelected={addFiles}
          />

          <FileRequirementsLink />

          <FileList
            files={files}
            onToggleSourceOfTruth={toggleSourceOfTruth}
            onRemoveFile={removeFile}
          />

          <UploadDisclaimer hasFiles={files.length > 0} packageId={packageId} />

          {packageId && files.length > 0 && (
            <div className="flex items-center space-x-2 text-base text-foreground mt-6">
              <Info className="h-4 w-4" />
              <span>Since you're adding to an existing group, selecting a Primary Doc to Compare is optional.</span>
            </div>
          )}

          <UploadActions
            hasFiles={files.length > 0}
            packageId={packageId}
            onCancel={handleCancel}
            onStartComparison={handleStartComparison}
          />
        </div>
      </DialogContent>

      <AlertDialog open={showValidationDialog} onOpenChange={setShowValidationDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Primary Doc to Compare Required</AlertDialogTitle>
            <AlertDialogDescription>
              Please select at least one document as Primary Doc to Compare before starting comparison.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction 
              onClick={() => setShowValidationDialog(false)}
              className="bg-brand-blue text-brand-blue-foreground hover:bg-brand-blue/90"
            >
              Got it
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Dialog>
  );
};

export default UploadModal;