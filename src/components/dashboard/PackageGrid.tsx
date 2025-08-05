import { Package } from '@/hooks/usePackageData';
import PackageCard from './PackageCard';

interface PackageGridProps {
  packages: Package[];
  onPackageClick: (packageId: number) => void;
  selectedPackages: number[];
  onPackageSelect: (packageId: number, checked: boolean) => void;
}

const PackageGrid = ({ packages, onPackageClick, selectedPackages, onPackageSelect }: PackageGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {packages.map(pkg => (
        <PackageCard
          key={pkg.id}
          package={pkg}
          onClick={() => onPackageClick(pkg.id)}
          isSelected={selectedPackages.includes(pkg.id)}
          onSelect={(checked) => onPackageSelect(pkg.id, checked)}
        />
      ))}
    </div>
  );
};

export default PackageGrid;