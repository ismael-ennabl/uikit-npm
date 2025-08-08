import { useState } from 'react';
import { useDocumentData } from '@/hooks/useDocumentData';
import DocumentStats from '@/components/documents/DocumentStats';
import DocumentFilters from '@/components/documents/DocumentFilters';
import DocumentSelectionToolbar from '@/components/DocumentSelectionToolbar';
import DocumentGrid from '@/components/documents/DocumentGrid';
import DocumentTable from '@/components/documents/DocumentTable';
import UploadModal from '@/components/UploadModal';
import AskQuestionsModal, { Document } from '@/components/AskQuestionsModal';
import { getSortedDocuments } from '@/utils/packageUtils';

const AllDocuments = () => {
  const { documents, totalDocuments, digitizedPages, processingDocuments } = useDocumentData();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('date-newest');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isAskQuestionsModalOpen, setIsAskQuestionsModalOpen] = useState(false);
  const [selectedDocuments, setSelectedDocuments] = useState<number[]>([]);
  const [statusFilters, setStatusFilters] = useState({
    allDocs: true,
    processing: false,
    new: false,
    completed: false
  });

  const handleDocumentClick = (documentId: number) => {
    console.log('Document clicked:', documentId);
    // Handle document click navigation here
  };

  const handleUploadClick = () => {
    setIsUploadModalOpen(true);
  };

  const handleAskQuestionsClick = () => {
    setIsAskQuestionsModalOpen(true);
  };

  const handleDocumentSelect = (documentId: number, checked: boolean) => {
    if (checked) {
      setSelectedDocuments(prev => [...prev, documentId]);
    } else {
      setSelectedDocuments(prev => prev.filter(id => id !== documentId));
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedDocuments(sortedDocuments.map(doc => doc.id));
    } else {
      setSelectedDocuments([]);
    }
  };

  const handleClearSelection = () => {
    setSelectedDocuments([]);
  };

  const handleShare = () => {
    console.log('Share documents:', selectedDocuments);
  };

  const handleAskQuestionsToolbar = () => {
    setIsAskQuestionsModalOpen(true);
    console.log('Ask Questions for documents:', selectedDocuments);
  };

  const handleExportExcel = () => {
    console.log('Export documents as Excel:', selectedDocuments);
  };

  const handleExportPDF = () => {
    console.log('Export documents as PDF:', selectedDocuments);
  };

  const handleDigitize = () => {
    console.log('Digitize documents:', selectedDocuments);
  };

  const handleCompare = () => {
    console.log('Compare documents:', selectedDocuments);
  };

  const handleMove = () => {
    console.log('Move documents:', selectedDocuments);
  };

  const handleDelete = () => {
    console.log('Delete documents:', selectedDocuments);
  };

  const handleRemoveDocument = (documentId: number) => {
    setSelectedDocuments(prev => prev.filter(id => id !== documentId));
  };

  const handleStatusFiltersChange = (newFilters: typeof statusFilters) => {
    setStatusFilters(newFilters);
  };

  // Filter and sort documents
  const filteredDocuments = documents.filter(doc => {
    // Search filter
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Status filter
    const matchesStatus = statusFilters.allDocs || 
      (statusFilters.processing && doc.status === 'in-progress') ||
      (statusFilters.new && doc.status === 'new') ||
      (statusFilters.completed && doc.status === 'completed');
      
    return matchesSearch && matchesStatus;
  });

  const sortedDocuments = getSortedDocuments(filteredDocuments, sortOption);

  return (
    <div className="px-8 pt-4 pb-8">
      <DocumentStats
        processingDocuments={processingDocuments}
        onUploadClick={handleUploadClick}
        onAskQuestionsClick={handleAskQuestionsClick}
      />

      {/* Filters */}
      <div className="bg-card rounded-lg rounded-b-none p-6">
        <DocumentFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          sortOption={sortOption}
          onSortChange={setSortOption}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          statusFilters={statusFilters}
          onStatusFiltersChange={handleStatusFiltersChange}
        />
      </div>

      {/* Content */}
      <div className="bg-card rounded-lg rounded-t-none pb-6 px-6">
        {selectedDocuments.length > 0 && (
          <div className="mb-6">
            <DocumentSelectionToolbar
              selectedCount={selectedDocuments.length}
              onClearSelection={handleClearSelection}
              onAskQuestions={handleAskQuestionsToolbar}
              onShare={handleShare}
              onExportExcel={handleExportExcel}
              onExportPDF={handleExportPDF}
              onDigitize={handleDigitize}
              onCompare={handleCompare}
              onMove={handleMove}
              onDelete={handleDelete}
            />
          </div>
        )}

        {viewMode === 'grid' ? (
          <DocumentGrid
            documents={sortedDocuments}
            onDocumentClick={handleDocumentClick}
            selectedDocuments={selectedDocuments}
            onDocumentSelect={handleDocumentSelect}
          />
        ) : (
          <DocumentTable
            documents={sortedDocuments}
            onDocumentClick={handleDocumentClick}
            selectedDocuments={selectedDocuments}
            onDocumentSelect={handleDocumentSelect}
            onSelectAll={handleSelectAll}
          />
        )}
      </div>

        <UploadModal
          open={isUploadModalOpen}
          onClose={() => setIsUploadModalOpen(false)}
        />

        <AskQuestionsModal
          open={isAskQuestionsModalOpen}
          onClose={() => setIsAskQuestionsModalOpen(false)}
          documentCount={selectedDocuments.length > 0 ? selectedDocuments.length : totalDocuments}
          selectedDocuments={selectedDocuments.length > 0 ? documents.filter(doc => selectedDocuments.includes(doc.id)) : undefined}
          onRemoveDocument={handleRemoveDocument}
          onSelectFiles={() => {
            setIsAskQuestionsModalOpen(false);
            // This would typically open a file selection dialog
            console.log('Opening file selection');
          }}
        />
      </div>
    );
  };

export default AllDocuments;