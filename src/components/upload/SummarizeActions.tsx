import React from 'react';
import { Button } from '@/components/ui/button';

interface SummarizeActionsProps {
  hasFiles: boolean;
  onCancel: () => void;
  onGenerateSummary: () => void;
}

export const SummarizeActions = ({ hasFiles, onCancel, onGenerateSummary }: SummarizeActionsProps) => {
  if (!hasFiles) return null;

  return (
    <div className="flex justify-end space-x-4 mt-4">
      <Button variant="outline" onClick={onCancel}>
        Cancel
      </Button>
      <Button 
        variant="ctaPrimary"
        onClick={onGenerateSummary}
      >
        Generate Summary
      </Button>
    </div>
  );
};