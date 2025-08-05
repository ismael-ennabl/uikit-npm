import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import UploadModal from '@/components/UploadModal';
import PackageSelectionToolbar from '@/components/PackageSelectionToolbar';
import { getDisplayName } from '@/utils/packageNaming';
import { usePackageData } from '@/hooks/usePackageData';
import { getSortedPackages } from '@/utils/packageUtils';
import PackageStats from '@/components/dashboard/PackageStats';
import PackageFilters from '@/components/dashboard/PackageFilters';
import PackageGrid from '@/components/dashboard/PackageGrid';
import PackageTable from '@/components/dashboard/PackageTable';
import { TYPOGRAPHY, COMPONENTS } from '@/styles/tokens';

interface StatusFilters {
  allGroups: boolean;
  processing: boolean;
  new: boolean;
  completed: boolean;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [sortOption, setSortOption] = useState<string>('date-newest');
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPackages, setSelectedPackages] = useState<number[]>([]);
  const [statusFilters, setStatusFilters] = useState<StatusFilters>({
    allGroups: true,
    processing: true,
    new: true,
    completed: true
  });
  
  const { packages, totalGroups, totalDocuments, totalDifferences } = usePackageData();

  const handleViewPackage = (packageId: number) => {
    navigate(`/comparison/${packageId}`);
  };

  const handlePackageSelect = (packageId: number, checked: boolean) => {
    if (checked) {
      setSelectedPackages(prev => [...prev, packageId]);
    } else {
      setSelectedPackages(prev => prev.filter(id => id !== packageId));
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedPackages(filteredPackages.map(pkg => pkg.id));
    } else {
      setSelectedPackages([]);
    }
  };

  const handleClearSelection = () => {
    setSelectedPackages([]);
  };

  const handleShare = () => {
    console.log('Share packages:', selectedPackages);
  };

  const handleExportExcel = () => {
    console.log('Export packages as Excel:', selectedPackages);
  };

  const handleExportPDF = () => {
    console.log('Export packages as PDF:', selectedPackages);
  };


  const handleDelete = () => {
    console.log('Delete packages:', selectedPackages);
  };

  // Filter packages based on search query and status filters
  const filteredPackages = useMemo(() => {
    const sorted = getSortedPackages(packages, sortOption);
    
    // Apply status filters
    let statusFiltered = sorted;
    if (!statusFilters.allGroups) {
      statusFiltered = sorted.filter(pkg => {
        if (statusFilters.processing && pkg.status === 'in-progress') return true;
        if (statusFilters.new && pkg.status === 'new') return true;
        if (statusFilters.completed && pkg.status === 'completed') return true;
        return false;
      });
    }
    
    // Apply search filter
    if (!searchQuery) return statusFiltered;
    return statusFiltered.filter(pkg => 
      getDisplayName(pkg.sourceDocument).toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [packages, sortOption, searchQuery, statusFilters]);

  return (
    <div className="px-8 pt-2 pb-8">
      {/* Header */}
      <div className="mb-4">
        <h1 className={TYPOGRAPHY.h1}>Compare Docs</h1>
      </div>

      {/* Statistics Card */}
      <PackageStats
        totalGroups={totalGroups}
        totalDocuments={totalDocuments}
        totalDifferences={totalDifferences}
        onAddClick={() => setUploadModalOpen(true)}
      />

      {/* Packages Title */}
      <div className="mb-4">
        <h2 className={COMPONENTS.cardTitle}>Groups</h2>
      </div>

      {/* Filters */}
      <Card className="shadow-none border-none rounded-b-none">
        <CardHeader>
          <PackageFilters
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            sortOption={sortOption}
            onSortChange={setSortOption}
            statusFilters={statusFilters}
            onStatusFiltersChange={setStatusFilters}
          />
        </CardHeader>
      </Card>

      {/* Content */}
      <Card className="shadow-none border-none rounded-t-none">
        <CardContent>
          {selectedPackages.length > 0 && (
            <div className="mb-6">
              <PackageSelectionToolbar
                selectedCount={selectedPackages.length}
                onClearSelection={handleClearSelection}
                onShare={handleShare}
                onExportExcel={handleExportExcel}
                onExportPDF={handleExportPDF}
                onDelete={handleDelete}
              />
            </div>
          )}
          {viewMode === 'cards' ? (
            <PackageGrid
              packages={filteredPackages}
              onPackageClick={handleViewPackage}
              selectedPackages={selectedPackages}
              onPackageSelect={handlePackageSelect}
            />
          ) : (
            <PackageTable
              packages={filteredPackages}
              onPackageClick={handleViewPackage}
              selectedPackages={selectedPackages}
              onPackageSelect={handlePackageSelect}
              onSelectAll={handleSelectAll}
            />
          )}
        </CardContent>
      </Card>

      <UploadModal
        open={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        onComplete={() => {
          // Refresh the dashboard or handle success
          setUploadModalOpen(false);
        }}
      />
    </div>
  );
};

export default Dashboard;