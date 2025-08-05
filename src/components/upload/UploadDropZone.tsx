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
      className={`bg-[#F5F8FD] rounded-lg p-12 text-center transition-colors mb-8 ${
        dragActive 
          ? 'bg-[#E8F2FE]' 
          : 'hover:bg-[#E8F2FE]'
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
      <p className="text-gray-600">
        or drag and drop here
      </p>
    </div>
  );
};

export default UploadDropZone;