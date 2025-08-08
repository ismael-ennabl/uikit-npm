import { GitCompare } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Package } from '@/hooks/usePackageData';
import { formatDate, getSyncScoreColor } from '@/utils/packageUtils';
import { getDisplayName } from '@/utils/packageNaming';

interface PackageCardProps {
  package: Package;
  onClick: () => void;
  isSelected: boolean;
  onSelect: (checked: boolean) => void;
}

const PackageCard = ({ package: pkg, onClick, isSelected, onSelect }: PackageCardProps) => {
  return (
    <div
      className={`p-4 border rounded-lg transition-all cursor-pointer ${
        isSelected
          ? 'bg-brand-blue/5 border-2 border-brand-blue'
          : pkg.status === 'in-progress'
          ? 'bg-muted border-border cursor-not-allowed'
          : 'hover:bg-hover-primary hover:border-border'
      }`}
      onClick={pkg.status !== 'in-progress' ? onClick : undefined}
    >
      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-2">
            <GitCompare className="h-4 w-4 text-foreground" />
            {pkg.status === 'in-progress' && (
              <Badge variant="processing" className="flex-shrink-0">
                Processing
              </Badge>
            )}
            {pkg.status === 'new' && (
              <Badge variant="new" className="flex-shrink-0">
                New
              </Badge>
            )}
          </div>
          {pkg.status !== 'in-progress' && (
            <Checkbox
              checked={isSelected}
              onCheckedChange={onSelect}
              onClick={(e) => e.stopPropagation()}
            />
          )}
        </div>
        
        <div className="space-y-2">
          <h3 className="font-normal text-foreground text-base leading-tight line-clamp-2 overflow-hidden text-ellipsis">
            {getDisplayName(pkg.sourceDocument)}
          </h3>
        </div>
        
        <div className="space-y-1 text-sm text-muted-foreground">
          {pkg.status === 'in-progress' ? (
            <>
              <div>{pkg.documents} docs</div>
              <div>Upload date: {formatDate(pkg.editedDate)}</div>
            </>
          ) : (
            <>
              <div>
                {pkg.documents} docs · <span className={getSyncScoreColor(pkg.syncScore)}>{pkg.syncScore}% Sync score</span>
              </div>
              <div>{pkg.discrepancies} differences</div>
              <div>Upload date: {formatDate(pkg.editedDate)}</div>
              <div>Edited: {formatDate(pkg.editedDate)}</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PackageCard;