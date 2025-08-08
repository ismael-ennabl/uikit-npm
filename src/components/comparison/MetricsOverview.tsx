import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Share2, Download, ChevronDown } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { PackageData } from '@/types/comparison';
import { discrepancies } from '@/data/mockComparisonData';
import ShareModal from './ShareModal';
import { useState } from 'react';
import { METRICS } from '@/styles/tokens';
import MetricItem from '@/components/ui/metric-item';

interface MetricsOverviewProps {
  packageData: PackageData;
  onAddMoreFiles?: () => void;
}
const MetricsOverview = ({
  packageData,
  onAddMoreFiles
}: MetricsOverviewProps) => {
  const totalDiscrepancies = discrepancies.length;
  const [shareModalOpen, setShareModalOpen] = useState(false);
  
  const handleSendEmail = (selectedEmails: string[]) => {
    console.log('Send via Email functionality', { selectedEmails });
    setShareModalOpen(false);
  };
  
  const handleExportToExcel = () => {
    console.log('Export to Excel functionality');
  };
  
  const handleExportToPDF = () => {
    console.log('Export to PDF functionality');
  };
  
  return (
    <div className="mb-4">
      <Card className={METRICS.container}>
        <CardContent className={METRICS.content}>
          <div className="flex items-center justify-between">
            <div className={METRICS.statsGroup}>
              <MetricItem
                value={packageData.packageCount}
                label="Source Files"
              />
              
              <MetricItem
                value={totalDiscrepancies}
                label="Total Differences"
              />
              
              <MetricItem
                value={`${packageData.syncScore}%`}
                label="Sync Score"
              />
            </div>
            <div className={METRICS.actionsGroup}>
              {onAddMoreFiles && (
                <Button 
                  variant="ctaSecondary"
                  onClick={onAddMoreFiles}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add More Docs
                </Button>
              )}
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ctaSecondary"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                    <ChevronDown className="h-4 w-4 ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={handleExportToExcel}>
                    <Download className="h-4 w-4 mr-2" />
                    Export as Excel
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleExportToPDF}>
                    <Download className="h-4 w-4 mr-2" />
                    Export as PDF
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Button 
                variant="ctaPrimary"
                onClick={() => setShareModalOpen(true)}
                size="icon"
                aria-label="Share comparison"
              >
                <Share2 className="h-4 w-4" />
              </Button>
              
              <ShareModal
                open={shareModalOpen}
                onOpenChange={setShareModalOpen}
                onSendEmail={handleSendEmail}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
export default MetricsOverview;