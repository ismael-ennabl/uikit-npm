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
      <TableHeader className="bg-[#F6F9FD]">
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
                ? 'bg-[#0000c5]/5 border-[#0000c5]'
                : pkg.status === 'in-progress'
                ? 'cursor-not-allowed opacity-60'
                : 'cursor-pointer hover:bg-gray-50'
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
                <GitCompare className="h-4 w-4 text-black" />
                <span className="font-normal text-gray-900">{pkg.documents}</span>
              </div>
            </TableCell>
            <TableCell>
              <span className="font-normal text-gray-900 max-w-xs truncate">
                {getDisplayName(pkg.sourceDocument)}
              </span>
            </TableCell>
            <TableCell>
              {pkg.status === 'in-progress' ? (
                <span className="text-gray-400">—</span>
              ) : (
                <span className={getSyncScoreColor(pkg.syncScore)}>{pkg.syncScore}%</span>
              )}
            </TableCell>
            <TableCell>
              {pkg.status === 'in-progress' ? (
                <span className="text-gray-400">—</span>
              ) : (
                pkg.discrepancies
              )}
            </TableCell>
            <TableCell className="text-sm" style={{ color: '#8287b0cc' }}>
              {formatDate(pkg.editedDate)}
            </TableCell>
            <TableCell className="text-sm" style={{ color: '#8287b0cc' }}>
              {pkg.status === 'in-progress' ? (
                <span className="text-gray-400">—</span>
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