import { GitCompare } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Package } from '@/hooks/usePackageData';
import { formatDate, getSyncScoreColor } from '@/utils/packageUtils';
import { getDisplayName } from '@/utils/packageNaming';

interface PackageTableProps {
  packages: Package[];
  onPackageClick: (packageId: number) => void;
  selectedPackages: number[];
  onPackageSelect: (packageId: number, checked: boolean) => void;
  onSelectAll: (checked: boolean) => void;
}

const PackageTable = ({ packages, onPackageClick, selectedPackages, onPackageSelect, onSelectAll }: PackageTableProps) => {
  const isAllSelected = packages.length > 0 && selectedPackages.length === packages.filter(pkg => pkg.status !== 'in-progress').length;
  const isIndeterminate = selectedPackages.length > 0 && selectedPackages.length < packages.filter(pkg => pkg.status !== 'in-progress').length;

  return (
    <Table wrapperClassName="border rounded-xl overflow-hidden">
      <TableHeader className="bg-secondary">
        <TableRow>
          <TableHead className="w-12">
            <Checkbox
              checked={isAllSelected}
              onCheckedChange={(checked) => onSelectAll(checked as boolean)}
              className={isIndeterminate ? "data-[state=checked]:bg-primary" : ""}
            />
          </TableHead>
          <TableHead>Docs</TableHead>
          <TableHead>Source of Truth</TableHead>
          <TableHead>Sync Score</TableHead>
          <TableHead>Differences</TableHead>
          <TableHead>Upload Date</TableHead>
          <TableHead>Edited</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {packages.map(pkg => (
          <TableRow
            key={pkg.id}
            className={`${
              selectedPackages.includes(pkg.id)
                ? 'bg-brand-blue/5 border-brand-blue'
                : pkg.status === 'in-progress'
                ? 'cursor-not-allowed opacity-60'
                : 'cursor-pointer hover:bg-hover-subtle'
            }`}
            onClick={pkg.status !== 'in-progress' ? () => onPackageClick(pkg.id) : undefined}
          >
            <TableCell>
              {pkg.status !== 'in-progress' && (
                <Checkbox
                  checked={selectedPackages.includes(pkg.id)}
                  onCheckedChange={(checked) => onPackageSelect(pkg.id, checked as boolean)}
                  onClick={(e) => e.stopPropagation()}
                />
              )}
            </TableCell>
            <TableCell>
              <div className="flex items-center space-x-2">
                <GitCompare className="h-4 w-4 text-foreground" />
                <span className="font-normal text-foreground">{pkg.documents}</span>
              </div>
            </TableCell>
            <TableCell>
              <span className="font-normal text-foreground max-w-xs truncate">
                {getDisplayName(pkg.sourceDocument)}
              </span>
            </TableCell>
            <TableCell>
              {pkg.status === 'in-progress' ? (
                <span className="text-muted-foreground">—</span>
              ) : (
                <span className={getSyncScoreColor(pkg.syncScore)}>{pkg.syncScore}%</span>
              )}
            </TableCell>
            <TableCell>
              {pkg.status === 'in-progress' ? (
                <span className="text-muted-foreground">—</span>
              ) : (
                pkg.discrepancies
              )}
            </TableCell>
            <TableCell className="text-sm text-secondary">
              {formatDate(pkg.editedDate)}
            </TableCell>
            <TableCell className="text-sm text-secondary">
              {pkg.status === 'in-progress' ? (
                <span className="text-muted-foreground">—</span>
              ) : (
                formatDate(pkg.editedDate)
              )}
            </TableCell>
            <TableCell>
              {pkg.status === 'in-progress' && (
                <Badge variant="processing">
                  Processing
                </Badge>
              )}
              {pkg.status === 'new' && (
                <Badge variant="new">
                  New
                </Badge>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default PackageTable;