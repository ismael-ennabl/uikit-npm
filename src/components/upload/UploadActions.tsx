import React from 'react';
import { Button } from '@/components/ui/button';

interface UploadActionsProps {
  hasFiles: boolean;
  packageId: string | null;
  onCancel: () => void;
  onStartComparison: () => void;
}

const UploadActions = ({ hasFiles, packageId, onCancel, onStartComparison }: UploadActionsProps) => {
  if (!hasFiles) return null;

  return (
    <div className="flex justify-end space-x-4 mt-4">
      <Button variant="outline" onClick={onCancel}>
        Cancel
      </Button>
      <Button 
        variant="ctaPrimary"
        onClick={onStartComparison}
      >
        {packageId ? 'Add and Compare' : 'Start Comparison'}
      </Button>
    </div>
  );
};

export default UploadActions;