
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, Check, X } from 'lucide-react';

interface DiscrepancyNavigationProps {
  currentIndex: number;
  totalDiscrepancies: number;
  currentDiscrepancy: any;
  onPrevious: () => void;
  onNext: () => void;
  onResolve: () => void;
  onReject: () => void;
}

const DiscrepancyNavigation = ({
  currentIndex,
  totalDiscrepancies,
  currentDiscrepancy,
  onPrevious,
  onNext,
  onResolve,
  onReject
}: DiscrepancyNavigationProps) => {

  return (
    <div className="bg-white p-4 rounded-lg border shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Badge variant="outline">
            Discrepancy {currentIndex + 1} of {totalDiscrepancies}
          </Badge>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onPrevious}
            disabled={currentIndex === 0}
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onNext}
            disabled={currentIndex === totalDiscrepancies - 1}
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="mb-4">
        <h3 className="font-semibold text-lg mb-2">{currentDiscrepancy.type}</h3>
        <p className="text-gray-600 text-sm mb-3">{currentDiscrepancy.description}</p>
        <div className="text-sm text-gray-500">
          <span className="font-medium">Field:</span> {currentDiscrepancy.field} | 
          <span className="font-medium ml-2">Section:</span> {currentDiscrepancy.section}
        </div>
      </div>

      <div className="flex space-x-3">
        <Button 
          className="bg-green-600 hover:bg-green-700 flex-1"
          onClick={onResolve}
        >
          <Check className="h-4 w-4 mr-2" />
          Mark as Resolved
        </Button>
        <Button 
          variant="outline" 
          className="border-red-200 text-red-700 hover:bg-red-50 flex-1"
          onClick={onReject}
        >
          <X className="h-4 w-4 mr-2" />
          Mark as False Positive
        </Button>
      </div>
    </div>
  );
};

export default DiscrepancyNavigation;
