import React, { useRef } from 'react';
import { Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface UploadDropZoneProps {
  dragActive: boolean;
  onDragEnter: (e: React.DragEvent) => void;
  onDragLeave: (e: React.DragEvent) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
  onFilesSelected: (files: File[]) => void;
}

const UploadDropZone = ({
  dragActive,
  onDragEnter,
  onDragLeave,
  onDragOver,
  onDrop,
  onFilesSelected,
}: UploadDropZoneProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

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
      <input
        ref={fileInputRef}
        type="file"
        accept="application/pdf"
        multiple
        className="hidden"
        onChange={(e) => {
          const files = Array.from(e.target.files || []);
          if (files.length) onFilesSelected(files);
          // reset to allow re-selecting the same file(s)
          if (fileInputRef.current) fileInputRef.current.value = '';
        }}
      />
      <Button 
        variant="ctaPrimary"
        className="mb-4"
        onClick={() => fileInputRef.current?.click()}
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