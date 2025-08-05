import { FileText } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Discrepancy, DocumentOption } from '@/types/comparison';
import { documentIssueCount } from '@/utils/discrepancyMappings';
import { getDocumentNameWithoutExtension, getFileExtension } from '@/utils/documentUtils';

interface DocumentViewProps {
  groupedByDocument: Record<string, Array<Discrepancy & { originalIndex: number }>>;
  sotDoc?: DocumentOption;
  onDiscrepancyClick: (index: number) => void;
}

const DocumentView = ({
  groupedByDocument,
  sotDoc,
  onDiscrepancyClick
}: DocumentViewProps) => {
  return (
    <>
      {Object.entries(groupedByDocument).map(([documentName, documentDiscrepancies], index) => {
        const isSoT = sotDoc?.name === documentName;
        const cleanName = getDocumentNameWithoutExtension(documentName);
        const fileExtension = getFileExtension(documentName);
        const version = index === 3 ? 'V4' : `V${index + 1}`;
        
        return (
          <div 
            key={documentName} 
            className={`p-4 border rounded-lg transition-colors ${documentDiscrepancies.length > 0 ? 'cursor-pointer hover:bg-gray-50' : 'opacity-75'}`}
            onClick={() => documentDiscrepancies.length > 0 && onDiscrepancyClick(documentDiscrepancies[0].originalIndex)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <FileText className="h-4 w-4 text-gray-500" />
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-gray-900">{cleanName}</span>
                  <Badge variant="static" className="bg-gray-100 text-gray-700 border-gray-200 text-xs rounded-sm">
                    {fileExtension}
                  </Badge>
                  <Badge variant="static" className="bg-[#E6EDF9] text-[#8287B0] border-[#E6EDF9] text-xs">
                    {version}
                  </Badge>
                  {isSoT && (
                    <Badge variant="static" className="bg-green-100 text-green-700 border-green-300">
                      Primary Doc to Compare
                    </Badge>
                  )}
                  {!isSoT && (
                    <Badge variant="static" className="bg-gray-100 text-gray-700 border-gray-300">
                      {(() => {
                        const count = documentIssueCount[documentName] || 0;
                        return count === 1 ? '1 difference' : `${count} differences`;
                      })()}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default DocumentView;