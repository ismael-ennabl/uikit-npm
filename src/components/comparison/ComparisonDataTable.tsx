import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Discrepancy } from '@/types/comparison';
import { getDocumentDisplayName } from '@/utils/documentDisplayUtils';
import { getOptimalDifferencesColumnWidth, getColumnWidth } from '@/utils/tableLayoutUtils';
import { getDiscrepancyValue } from '@/utils/discrepancyUtils';

interface ComparisonDataTableProps {
  categoryDiscrepancies: Array<Discrepancy & { originalIndex: number }>;
  uniqueDocuments: string[];
  uniqueFields: string[];
  categoryType: string;
  onDiscrepancyClick: (index: number) => void;
  onFieldClick?: (field: string) => void;
  selectedField?: string;
}

const ComparisonDataTable = ({
  categoryDiscrepancies,
  uniqueDocuments,
  uniqueFields,
  categoryType,
  onDiscrepancyClick,
  onFieldClick,
  selectedField
}: ComparisonDataTableProps) => {
  return (
    <ScrollArea className="h-auto max-h-96">
      <Table className="table-fixed min-w-full" wrapperClassName="border rounded-lg overflow-hidden">
        <TableHeader>
          <TableRow className="bg-gray-50 hover:bg-gray-50">
            <TableHead className={`font-medium text-gray-700 ${getOptimalDifferencesColumnWidth()} sticky left-0 z-30 bg-gray-50 border-r shadow-lg`}>
              Differences
            </TableHead>
            {uniqueDocuments.map((docId) => {
              const docName = getDocumentDisplayName(docId);
              const isPrimary = docId === 'policy';
              const widthClass = getColumnWidth(docName, isPrimary);
              return (
                <TableHead 
                  key={docId} 
                  className={`font-medium text-gray-900 ${widthClass} ${
                    isPrimary 
                      ? 'bg-gray-50 sticky left-72 z-20 border-r shadow-lg' 
                      : 'text-center'
                  }`}
                  title={docName}
                >
                  <div className="truncate px-2">
                    {docName}
                  </div>
                </TableHead>
              );
            })}
          </TableRow>
        </TableHeader>
        <TableBody>
          {uniqueFields.map(field => (
            <TableRow 
              key={field}
              className={`hover:bg-gray-50 transition-colors border-b border-gray-100 cursor-pointer ${
                selectedField === field ? 'bg-blue-50 border-blue-200' : ''
              }`}
              onClick={() => {
                const discrepancy = categoryDiscrepancies.find(d => d.field === field);
                if (discrepancy) {
                  onDiscrepancyClick(discrepancy.originalIndex);
                }
                // Also trigger field scroll if callback provided
                if (onFieldClick) {
                  onFieldClick(field);
                }
              }}
            >
              <TableCell className={`font-medium text-gray-900 py-3 sticky left-0 z-30 bg-white border-r shadow-lg ${getOptimalDifferencesColumnWidth()}`}>
                {field}
              </TableCell>
              {uniqueDocuments.map(docId => {
                const isPrimary = docId === 'policy';
                const docName = getDocumentDisplayName(docId);
                const widthClass = getColumnWidth(docName, isPrimary);
                return (
                  <TableCell 
                    key={docId} 
                    className={`py-3 ${widthClass} ${
                      isPrimary 
                        ? 'bg-white text-gray-900 sticky left-72 z-20 border-r shadow-lg' 
                        : 'bg-white text-gray-900 text-center'
                    }`}
                  >
                    <div className="truncate px-2">
                      {getDiscrepancyValue(categoryDiscrepancies, field, docId, categoryType)}
                    </div>
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export default ComparisonDataTable;