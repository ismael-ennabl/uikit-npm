import React from 'react';
import { Info } from 'lucide-react';

interface UploadDisclaimerProps {
  hasFiles: boolean;
  packageId?: string | null;
}

const UploadDisclaimer = ({ hasFiles, packageId }: UploadDisclaimerProps) => {
  // Only show when creating a new group (no packageId) and has files
  if (!hasFiles || packageId) return null;

  return (
    <div className="flex items-center space-x-2 text-base text-foreground mt-6">
      <Info className="h-4 w-4" />
      <span>All the documents you upload will be consolidated into a single group.</span>
    </div>
  );
};

export default UploadDisclaimer;