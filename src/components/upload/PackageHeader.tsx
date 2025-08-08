import React from 'react';
import { Badge } from '@/components/ui/badge';
import { TYPOGRAPHY } from '@/styles/tokens';

interface PackageHeaderProps {
  packageId: string | null;
  getPackageName: (id: string) => string;
}

const PackageHeader = ({ packageId, getPackageName }: PackageHeaderProps) => {
  if (!packageId) {
    return <h1 className={TYPOGRAPHY.h1}>Upload Documents</h1>;
  }

  return (
    <div>
      <h1 className={TYPOGRAPHY.h1}>Add More Documents</h1>
      <div className="flex items-center gap-2">
        <span className="text-lg text-muted-foreground">Adding to:</span>
        <span className="text-lg font-medium text-foreground">{getPackageName(packageId)}</span>
        <Badge variant="static" className="bg-success/10 text-success border-success/30">Source of Truth</Badge>
      </div>
    </div>
  );
};

export default PackageHeader;