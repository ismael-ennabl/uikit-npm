import { Plus, Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useUsageStats } from '@/hooks/useUsageStats';
import { METRICS } from '@/styles/tokens';
import MetricItem from '@/components/ui/metric-item';
interface DocumentStatsProps {
  processingDocuments: number;
  onUploadClick: () => void;
  onAskQuestionsClick: () => void;
}
const DocumentStats = ({
  processingDocuments,
  onUploadClick,
  onAskQuestionsClick
}: DocumentStatsProps) => {
  const {
    stats
  } = useUsageStats();
  const navigate = useNavigate();

  const handleDocsComparedClick = () => {
    navigate('/dashboard');
  };

  const handleLossRunsClick = () => {
    window.open('https://dev.ennabl-test.com/loss-runs', '_blank');
  };
  return (
    <Card className={`${METRICS.container} mb-8`}>
      <CardContent className={METRICS.content}>
        <div className="flex items-center justify-between">
          <div className={METRICS.statsGroup}>
            <MetricItem
              value={stats.totalDocuments.toLocaleString()}
              label="Total Docs"
            />
            
            <MetricItem
              value={stats.documentseSummarized}
              label="Digitized"
            />
            
            <MetricItem
              value={198}
              label="Docs Compared"
              onClick={handleDocsComparedClick}
              tooltip={{
                content: "Go to Comparison Page",
                variant: "dark"
              }}
            />
            
            <MetricItem
              value={34}
              label="Loss Runs"
              onClick={handleLossRunsClick}
              isExternal
              tooltip={{
                content: "Open Loss Runs Page",
                variant: "dark"
              }}
            />
            
            <MetricItem
              value={processingDocuments}
              label="Processing"
            />
          </div>
          
          <div className={METRICS.actionsGroup}>
            <Button 
              variant="ctaSecondary"
              onClick={onAskQuestionsClick}
            >
              <Sparkles className="w-4 h-4" />
              Ask Questions
            </Button>
            <Button 
              variant="ctaPrimary"
              onClick={onUploadClick}
            >
              <Plus className="w-4 h-4" />
              Add Documents
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
export default DocumentStats;