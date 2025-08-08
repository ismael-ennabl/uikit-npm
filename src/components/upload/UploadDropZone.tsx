import React, { useCallback } from 'react';
import { Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface UploadDropZoneProps {
  dragActive: boolean;
  onDragEnter: (e: React.DragEvent) => void;
  onDragLeave: (e: React.DragEvent) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
}

const UploadDropZone = ({
  dragActive,
  onDragEnter,
  onDragLeave,
  onDragOver,
  onDrop
}: UploadDropZoneProps) => {
  return (
    <div
      className={`bg-page rounded-lg p-12 text-center transition-colors mb-8 ${
        dragActive 
          ? 'bg-hover-primary' 
          : 'hover:bg-hover-primary'
      }`}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      <Button 
        variant="ctaPrimary"
        className="mb-4"
      >
        <Upload className="h-4 w-4 mr-2" />
        Select files
      </Button>
      <p className="text-muted-foreground">
        or drag and drop here
      </p>
    </div>
  );
};

export default UploadDropZone;