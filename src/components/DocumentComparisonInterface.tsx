import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MetricsOverview from './comparison/MetricsOverview';
import DiscrepancyList from './comparison/DiscrepancyList';

import SectionNavigationList from './comparison/SectionNavigationList';
import UploadModal from './UploadModal';
import { packageData, discrepancies, documents, packageDocuments } from '@/data/mockComparisonData';
import { usePackageData } from '@/hooks/usePackageData';
const DocumentComparisonInterface = () => {
  const params = useParams();
  const { packages } = usePackageData();
  
  // Get the current package data based on route parameter
  const currentPackage = packages.find(pkg => pkg.id.toString() === params.id);
  const currentPackageData = currentPackage ? {
    ...packageData,
    syncScore: currentPackage.syncScore,
    packageCount: currentPackage.documents,
    name: currentPackage.sourceDocument.replace('.pdf', '').replace(/_/g, ' ')
  } : packageData;
  const [selectedDiscrepancy, setSelectedDiscrepancy] = useState<number | null>(null);
  const [resolvedDiscrepancies, setResolvedDiscrepancies] = useState<Set<number>>(new Set());
  const viewMode = 'type'; // Always use "By Issue" view
  const [selectedDocument, setSelectedDocument] = useState('all');
  
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  // Always show all discrepancies in "By Issue" mode
  const filteredDiscrepancies = discrepancies;

  // Set initial selected discrepancy when data is available
  useEffect(() => {
    if (filteredDiscrepancies.length > 0 && selectedDiscrepancy === null) {
      setSelectedDiscrepancy(0);
    }
  }, [filteredDiscrepancies.length, selectedDiscrepancy]);

  const handleDiscrepancyClick = (index: number) => {
    setSelectedDiscrepancy(index);
  };
  const handleAddMoreFiles = () => {
    setUploadModalOpen(true);
  };
  const getPackageName = (id: string) => {
    const packages: {
      [key: string]: string;
    } = {
      '1': 'ABC Corp - Auto Policy Package',
      '2': 'XYZ Insurance - Liability COI',
      '3': 'Global Manufacturing - Workers Comp'
    };
    return packages[id] || 'Document Package';
  };
  const handleEditSourceOfTruth = () => {
    console.log('Edit source of truth functionality');
  };
  const handlePrimaryDocumentChange = (documentName: string) => {
    console.log(`Changing primary document to: ${documentName}`);
    // Simulate reloading the comparison with new primary document
    setSelectedDiscrepancy(0);
    // Here you would typically update the packageData and trigger a data refetch
  };

  // Get available sections from discrepancies
  const availableSections = Array.from(new Set([
    ...filteredDiscrepancies.map(d => {
      // Map issue types back to categories using the same logic as useDiscrepancyGrouping
      if (d.type.includes('Premium') || d.type.includes('Commission')) return 'Financials';
      if (d.type.includes('Policy Number') || d.type.includes('Date') || d.type.includes('Territory') || d.type.includes('Producer')) return 'Basic Info';
      if (d.type.includes('Named Insured') || d.type.includes('Address') || d.type.includes('Entity') || d.type.includes('Business')) return 'Insured';
      if (d.type.includes('Carrier') || d.type.includes('NAIC') || d.type.includes('Rating')) return 'Carriers';
      if (d.type.includes('Coverage') || d.type.includes('Form') || d.type.includes('Policy Form')) return 'Coverages';
      if (d.type.includes('Limit') || d.type.includes('Deductible') || d.type.includes('Aggregate')) return 'Limits';
      if (d.type.includes('Classification') || d.type.includes('Operations') || d.type.includes('Industry')) return 'Schedule of Operations';
      if (d.type.includes('Endorsement') || d.type.includes('Additional') || d.type.includes('Waiver') || d.type.includes('Primary')) return 'Endorsements';
      if (d.type.includes('Exclusion')) return 'Exclusions';
      return 'Coverages'; // fallback
    }),
    'Source Files' // Always include Source Files section
  ])).filter(Boolean);

  const allExpanded = availableSections.every(section => expandedCategories.has(section));

  const handleToggleExpandAll = () => {
    if (allExpanded) {
      setExpandedCategories(new Set());
    } else {
      setExpandedCategories(new Set(availableSections));
    }
  };
  return <div className="w-full" style={{
    backgroundColor: '#F5F8FD'
  }}>
      <div className="px-8 py-0">
        {/* Metrics Overview */}
        <MetricsOverview packageData={currentPackageData} onAddMoreFiles={handleAddMoreFiles} />

        {/* Section Navigation List */}
        <SectionNavigationList
          availableSections={availableSections}
          allExpanded={allExpanded}
          onToggleExpandAll={handleToggleExpandAll}
          expandedCategories={expandedCategories}
          onExpandedCategoriesChange={setExpandedCategories}
        />

        {/* Summary Content */}
        <DiscrepancyList 
          discrepancies={discrepancies} 
          filteredDiscrepancies={filteredDiscrepancies} 
          documents={documents} 
          selectedDocument={selectedDocument} 
          selectedDiscrepancy={selectedDiscrepancy} 
          resolvedDiscrepancies={resolvedDiscrepancies} 
          viewMode={viewMode} 
          expandedCategories={expandedCategories}
          packageDocuments={packageDocuments}
          packageData={currentPackageData}
          onDocumentChange={setSelectedDocument} 
          onDiscrepancyClick={handleDiscrepancyClick} 
          onDiscrepancySelect={setSelectedDiscrepancy}
          onExpandedCategoriesChange={setExpandedCategories}
          onPrimaryDocumentChange={handlePrimaryDocumentChange}
        />

      </div>

      {/* Upload Modal */}
      <UploadModal open={uploadModalOpen} onClose={() => setUploadModalOpen(false)} packageId={params.id} packageName={params.id ? getPackageName(params.id) : undefined} onComplete={() => {
      // Refresh data or show success message
      console.log('Files uploaded successfully');
    }} />
    </div>;
};
export default DocumentComparisonInterface;