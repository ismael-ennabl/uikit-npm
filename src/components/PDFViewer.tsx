
import { useEffect, useRef } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { ZoomIn, ZoomOut, Search, Download } from 'lucide-react';
import { mockInsurancePDF, getHighlightableContent } from '@/data/mockPdfContent';
import { mockComparisonPDF, getComparisonHighlightableContent } from '@/data/mockComparisonPdfContent';

interface PDFViewerProps {
  documentName: string;
  highlightField?: string;
  highlightFields?: string[];
  isSourceDocument?: boolean;
  titleComponent?: React.ReactNode;
  scrollToField?: string;
}

const PDFViewer = ({ documentName, highlightField, highlightFields, isSourceDocument = true, titleComponent, scrollToField }: PDFViewerProps) => {
  const highlightRef = useRef<HTMLSpanElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Determine which fields to highlight and which PDF to use
  const fieldsToHighlight = highlightFields || (highlightField ? [highlightField] : []);
  const pdfContent = isSourceDocument ? mockInsurancePDF : mockComparisonPDF;
  const getHighlightInfo = isSourceDocument ? getHighlightableContent : getComparisonHighlightableContent;

  // Function to create field ID from field name
  const createFieldId = (field: string) => {
    return field.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
  };

  // Auto-scroll to specific field or first highlighted content
  useEffect(() => {
    const targetField = scrollToField || (fieldsToHighlight.length > 0 ? fieldsToHighlight[0] : null);
    
    if (targetField) {
      const targetId = createFieldId(targetField);
      setTimeout(() => {
        const targetElement = scrollAreaRef.current?.querySelector(`[data-field-id="${targetId}"]`) as HTMLElement;
        if (targetElement) {
          targetElement.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center',
            inline: 'nearest'
          });
        } else if (highlightRef.current) {
          // Fallback to first highlight if specific field not found
          highlightRef.current.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
          });
        }
      }, 300);
    }
  }, [fieldsToHighlight, scrollToField]);

  const renderContent = (content: any, index: number) => {
    const shouldHighlight = fieldsToHighlight.includes(content.field) && content.isHighlightable;
    const isFirstHighlight = shouldHighlight && content.field === fieldsToHighlight[0];
    
    return (
      <span
        key={index}
        ref={isFirstHighlight ? highlightRef : undefined}
        data-field-id={content.field ? createFieldId(content.field) : undefined}
      >
        {content.text}
      </span>
    );
  };

  const shouldContentHighlight = (content: any) => {
    return fieldsToHighlight.includes(content.field) && content.isHighlightable;
  };

  const getHighlightInfoForFields = () => {
    if (fieldsToHighlight.length === 0) return null;
    
    if (fieldsToHighlight.length === 1) {
      return getHighlightInfo(fieldsToHighlight[0]);
    }
    
    // For multiple fields, show count
    return {
      pageNumber: 'Multiple',
      sectionTitle: `${fieldsToHighlight.length} fields highlighted`
    };
  };

  const highlightInfo = getHighlightInfoForFields();

  return (
    <div className="h-full flex flex-col">
      {/* Document Name Header - Sticky */}
      <div className="bg-gray-800 text-white p-3 border-b border-gray-600 flex-shrink-0">
        {titleComponent ? (
          titleComponent
        ) : (
          <h3 className="font-medium text-sm truncate" title={documentName}>
            {documentName}
          </h3>
        )}
      </div>
      
      {/* PDF Content */}
      <ScrollArea className="flex-1" ref={scrollAreaRef}>
        <div className="p-6" style={{ backgroundColor: '#333' }}>
          {pdfContent.map((page) => (
            <div key={page.pageNumber} className="mb-8">
              {/* Page Header */}
              <div className="flex justify-between items-center mb-4 pb-2 border-b">
                <h4 className="text-sm font-medium text-gray-500">
                  Page {page.pageNumber} of {pdfContent.length}
                </h4>
                <div className="text-xs text-gray-400">
                  Document ID: INS-2024-{page.pageNumber.toString().padStart(3, '0')}
                </div>
              </div>

              {/* Page Content - A4 Proportions with Full Width */}
              <div 
                className="bg-white border border-gray-200 p-8 shadow-sm overflow-hidden w-full max-w-4xl mx-auto aspect-[1/1.414]"
              >
                {page.sections.map((section, sectionIndex) => (
                  <div key={sectionIndex} className="mb-6">
                    <h5 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wide">
                      {section.title}
                    </h5>
                     <div className="space-y-2">
                       {section.content.map((content, contentIndex) => {
                         const shouldHighlight = shouldContentHighlight(content);
                         return (
                           <div 
                             key={contentIndex} 
                             className={`text-sm leading-relaxed px-2 py-1 -mx-2 ${
                               shouldHighlight 
                                 ? `${isSourceDocument ? 'bg-green-200 border-l-4 border-green-400' : 'bg-red-200 border-l-4 border-red-400'} font-medium shadow-sm transition-all duration-300` 
                                 : 'text-gray-700'
                             }`}
                           >
                             {renderContent(content, contentIndex)}
                           </div>
                         );
                       })}
                     </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Toolbar */}
      <div className="bg-black p-2 flex justify-between items-center rounded-b-lg">
        {/* Search on the left */}
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-white hover:bg-gray-800"
        >
          <Search className="h-4 w-4 mr-1" />
          Search
        </Button>
        
        {/* Zoom controls in the center */}
        <div className="flex items-center space-x-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-white hover:bg-gray-800"
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-white hover:bg-gray-800"
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Download on the right */}
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-white hover:bg-gray-800"
        >
          <Download className="h-4 w-4 mr-1" />
          Download
        </Button>
      </div>
    </div>
  );
};

export default PDFViewer;
