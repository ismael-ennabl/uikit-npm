/**
 * MetricItem Component
 * Created: 2025-01-08
 * Last Modified: 2025-01-08
 * @version 0.1.0
 */
import React from 'react';
import { cn } from '../../utils/cn';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { ExternalLink } from 'lucide-react';

export interface MetricItemProps {
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

// Design tokens - these will be configurable in the final package
const METRIC_TOKENS = {
  statItem: "flex flex-col",
  statValue: "text-2xl font-semibold text-foreground",
  statLabel: "text-sm font-normal text-muted-foreground",
  clickableStat: "cursor-pointer group transition-colors duration-200",
  hoverValue: "group-hover:text-brand-blue transition-colors",
  hoverLabel: "border-b border-dotted border-muted-foreground/30 group-hover:border-brand-blue group-hover:text-brand-blue transition-colors",
} as const;

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
        METRIC_TOKENS.statItem,
        onClick && METRIC_TOKENS.clickableStat,
        className
      )}
      onClick={onClick}
    >
      <div className={cn(
        METRIC_TOKENS.statValue,
        onClick && METRIC_TOKENS.hoverValue
      )}>
        {value}
      </div>
      <div className={cn(
        METRIC_TOKENS.statLabel,
        onClick && METRIC_TOKENS.hoverLabel,
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