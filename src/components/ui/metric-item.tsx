import React from 'react';
import { cn } from '@/lib/utils';
import { METRICS } from '@/styles/tokens';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ExternalLink } from 'lucide-react';

interface MetricItemProps {
  value: string | number;
  label: string;
  onClick?: () => void;
  tooltip?: {
    content: string;
    variant?: 'default' | 'dark' | 'light' | 'restricted' | 'info';
  };
  isExternal?: boolean;
  className?: string;
}

const MetricItem = ({ 
  value, 
  label, 
  onClick, 
  tooltip, 
  isExternal = false,
  className 
}: MetricItemProps) => {
  const content = (
    <div 
      className={cn(
        METRICS.statItem,
        onClick && METRICS.clickableStat,
        className
      )}
      onClick={onClick}
    >
      <div className={cn(
        METRICS.statValue,
        onClick && METRICS.hoverValue
      )}>
        {value}
      </div>
      <div className={cn(
        METRICS.statLabel,
        onClick && METRICS.hoverLabel,
        "flex items-center gap-1"
      )}>
        {label}
        {isExternal && <ExternalLink className="h-3 w-3" />}
      </div>
    </div>
  );

  if (tooltip) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            {content}
          </TooltipTrigger>
          <TooltipContent variant={tooltip.variant || 'default'}>
            <p>{tooltip.content}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return content;
};

export default MetricItem;