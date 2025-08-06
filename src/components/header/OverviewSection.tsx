import { Button } from '@/components/ui/button';
import MetricItem from '@/components/ui/metric-item';
import { cn } from '@/lib/utils';
import { OVERVIEW_SECTION_TOKENS } from '@/styles/headerTokens';
import { useIsMobile } from '@/hooks/use-mobile';

interface MetricData {
  value: string | number;
  label: string;
  onClick?: () => void;
  tooltip?: {
    content: string;
    variant?: 'default' | 'dark' | 'light' | 'restricted' | 'info';
  };
  isExternal?: boolean;
}

interface ActionButton {
  label: string;
  onClick: () => void;
  variant?: 'ctaPrimary' | 'ctaSecondary';
  disabled?: boolean;
}

interface OverviewSectionProps {
  metrics: MetricData[];
  actions?: ActionButton[];
  className?: string;
}

const OverviewSection = ({ metrics, actions, className }: OverviewSectionProps) => {
  const isMobile = useIsMobile();
  
  return (
    <div className={cn(
      OVERVIEW_SECTION_TOKENS.container,
      isMobile && OVERVIEW_SECTION_TOKENS.mobileContainer,
      className
    )}>
      <div className={OVERVIEW_SECTION_TOKENS.content}>
        {/* Metrics Section */}
        <div className={cn(
          OVERVIEW_SECTION_TOKENS.metricsSection,
          isMobile && OVERVIEW_SECTION_TOKENS.mobileMetrics
        )}>
          <div className={OVERVIEW_SECTION_TOKENS.metricsGroup}>
            {metrics.map((metric, index) => (
              <MetricItem
                key={index}
                value={metric.value}
                label={metric.label}
                onClick={metric.onClick}
                tooltip={metric.tooltip}
                isExternal={metric.isExternal}
              />
            ))}
          </div>
        </div>
        
        {/* Actions Section */}
        {actions && actions.length > 0 && (
          <div className={cn(
            OVERVIEW_SECTION_TOKENS.actionsSection,
            isMobile && OVERVIEW_SECTION_TOKENS.mobileActions
          )}>
            {actions.map((action, index) => (
              <Button
                key={index}
                variant={action.variant || 'ctaPrimary'}
                onClick={action.onClick}
                disabled={action.disabled}
              >
                {action.label}
              </Button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OverviewSection;