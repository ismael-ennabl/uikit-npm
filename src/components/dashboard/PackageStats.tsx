import { Plus } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { METRICS } from '@/styles/tokens';
import MetricItem from '@/components/ui/metric-item';

interface PackageStatsProps {
  totalGroups: number;
  totalDocuments: number;
  totalDifferences: number;
  onAddClick: () => void;
}

const PackageStats = ({ totalGroups, totalDocuments, totalDifferences, onAddClick }: PackageStatsProps) => {
  return (
    <Card className={`${METRICS.container} mb-8`}>
      <CardContent className={METRICS.content}>
        <div className="flex items-center justify-between">
          <div className={METRICS.statsGroup}>
            <MetricItem
              value={totalGroups}
              label="Total Groups"
            />
            
            <MetricItem
              value={totalDocuments}
              label="Total Documents"
            />
            
            <MetricItem
              value={totalDifferences}
              label="Total Differences"
            />
          </div>
          <Button 
            variant="ctaPrimary"
            onClick={onAddClick}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Docs to Compare
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PackageStats;