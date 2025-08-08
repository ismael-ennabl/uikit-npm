import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AnchorNavBar from '@/components/AnchorNavBar';
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
  return <div className="w-full bg-page">
      <div className="px-8 py-0">
        {/* Metrics Overview */}
        <MetricsOverview packageData={currentPackageData} onAddMoreFiles={handleAddMoreFiles} />

        {/* Anchor Navigation Bar */}
        <AnchorNavBar 
          sectionSelector='[data-section]'
          onSectionChange={(section) => console.log('Active section:', section)}
        />

        {/* Document Analysis Summary */}
        <div id="analysis-summary" data-section className="mt-8 mb-6">
          <div className="bg-card rounded-lg border border-border shadow-sm p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center">
              <span className="mr-2">📊</span>
              Document Analysis Summary
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-brand-blue/10 p-4 rounded-lg">
                <h3 className="font-medium text-brand-blue mb-2">Documents Analyzed</h3>
                <p className="text-2xl font-bold text-brand-blue">{packageDocuments.length}</p>
                <p className="text-sm text-brand-blue mt-1">Files processed and compared</p>
              </div>
              <div className="bg-warning/10 p-4 rounded-lg">
                <h3 className="font-medium text-warning mb-2">Total Issues Found</h3>
                <p className="text-2xl font-bold text-warning">{discrepancies.length}</p>
                <p className="text-sm text-warning mt-1">Discrepancies requiring attention</p>
              </div>
              <div className="bg-success/10 p-4 rounded-lg">
                <h3 className="font-medium text-success mb-2">Sync Score</h3>
                <p className="text-2xl font-bold text-success">{currentPackageData.syncScore}%</p>
                <p className="text-sm text-success mt-1">Overall document alignment</p>
              </div>
            </div>
          </div>
        </div>

        {/* Key Discrepancies Overview */}
        <div id="key-discrepancies" data-section className="mb-6">
          <div className="bg-card rounded-lg border border-border shadow-sm p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center">
              <span className="mr-2">⚠️</span>
              Key Discrepancies Overview
            </h2>
            <div className="space-y-4">
              {filteredDiscrepancies.slice(0, 3).map((discrepancy, index) => (
                <div key={index} className="bg-destructive/10 border-l-4 border-destructive p-4 rounded-r-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-destructive">{discrepancy.type}</h3>
                      <p className="text-sm text-destructive mt-1">{discrepancy.description}</p>
                      <p className="text-xs text-destructive mt-2">
                        Found in: {packageDocuments.find(doc => doc.name.toLowerCase().includes(discrepancy.documentId))?.name || discrepancy.documentId}
                      </p>
                    </div>
                    <span className="bg-destructive/10 text-destructive text-xs font-medium px-2.5 py-0.5 rounded">
                      High Priority
                    </span>
                  </div>
                </div>
              ))}
              <button 
                onClick={() => setSelectedDiscrepancy(0)}
                className="w-full mt-4 bg-destructive text-destructive-foreground py-2 px-4 rounded-lg hover:bg-destructive/90 transition-colors"
              >
                View All Discrepancies →
              </button>
            </div>
          </div>
        </div>

        {/* Comparison Results */}
        <div id="comparison-results" data-section className="mb-6">
          <div className="bg-card rounded-lg border border-border shadow-sm p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center">
              <span className="mr-2">📋</span>
              Comparison Results
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-foreground mb-3">Document Categories</h3>
                <div className="space-y-2">
                  {availableSections.filter(section => section !== 'Source Files').map((section, index) => {
                    const sectionDiscrepancies = filteredDiscrepancies.filter(d => {
                      if (d.type.includes('Premium') || d.type.includes('Commission')) return section === 'Financials';
                      if (d.type.includes('Policy Number') || d.type.includes('Date') || d.type.includes('Territory') || d.type.includes('Producer')) return section === 'Basic Info';
                      if (d.type.includes('Named Insured') || d.type.includes('Address') || d.type.includes('Entity') || d.type.includes('Business')) return section === 'Insured';
                      if (d.type.includes('Carrier') || d.type.includes('NAIC') || d.type.includes('Rating')) return section === 'Carriers';
                      if (d.type.includes('Coverage') || d.type.includes('Form') || d.type.includes('Policy Form')) return section === 'Coverages';
                      if (d.type.includes('Limit') || d.type.includes('Deductible') || d.type.includes('Aggregate')) return section === 'Limits';
                      if (d.type.includes('Classification') || d.type.includes('Operations') || d.type.includes('Industry')) return section === 'Schedule of Operations';
                      if (d.type.includes('Endorsement') || d.type.includes('Additional') || d.type.includes('Waiver') || d.type.includes('Primary')) return section === 'Endorsements';
                      if (d.type.includes('Exclusion')) return section === 'Exclusions';
                      return section === 'Coverages';
                    }).length;
                    
                    return (
                      <div key={index} className="flex justify-between items-center py-2 px-3 bg-muted rounded">
                        <span className="text-sm font-medium text-muted-foreground">{section}</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          sectionDiscrepancies === 0 
                            ? 'bg-success/10 text-success' 
                            : sectionDiscrepancies <= 2 
                              ? 'bg-warning/10 text-warning'
                              : 'bg-destructive/10 text-destructive'
                        }`}>
                          {sectionDiscrepancies} issues
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div>
                <h3 className="font-medium text-foreground mb-3">Processing Status</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-success rounded-full mr-3"></div>
                    <span className="text-sm text-muted-foreground">Document parsing complete</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-success rounded-full mr-3"></div>
                    <span className="text-sm text-muted-foreground">Field extraction finished</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-success rounded-full mr-3"></div>
                    <span className="text-sm text-muted-foreground">Cross-comparison analysis done</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-brand-blue rounded-full mr-3"></div>
                    <span className="text-sm text-muted-foreground">Ready for review</span>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-brand-blue/10 rounded-lg">
                  <p className="text-sm text-brand-blue">
                    <strong>Next step:</strong> Review discrepancies and resolve conflicts to improve sync score.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

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