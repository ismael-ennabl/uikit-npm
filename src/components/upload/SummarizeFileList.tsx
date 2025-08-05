import React from 'react';
import { FileText } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface FileItem {
  id: number;
  name: string;
  size: number;
  type: string;
  status: string;
}

interface SummarizeFileListProps {
  files: FileItem[];
  onRemoveFile: (fileId: number) => void;
}

export const SummarizeFileList = ({ files, onRemoveFile }: SummarizeFileListProps) => {
  if (files.length === 0) return null;

  return (
    <Card className="mb-8">
      <CardContent>
        <div className="space-y-0">
          {files.map((file) => (
            <div key={file.id} className="flex items-center justify-between py-3">
              <div className="flex items-center space-x-3">
                <FileText className="h-4 w-4 text-black" />
                <div>
                  <p className="font-normal text-gray-900">{file.name}</p>
                </div>
              </div>
              <div className="flex items-center">
                <button 
                  className="text-sm hover:opacity-75"
                  style={{ color: '#0000C5' }}
                  onClick={() => onRemoveFile(file.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};