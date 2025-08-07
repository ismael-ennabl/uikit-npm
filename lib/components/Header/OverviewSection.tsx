import React from 'react';
import { Button } from '../ui/button';
import MetricItem from '../MetricItem';
import { cn } from '../../utils/cn';
import { OVERVIEW_SECTION_TOKENS } from '../../tokens/headerTokens';

export interface MetricData {
  value: string | number;
  label: string;
  onClick?: () => void;
  tooltip?: {
    content: string;
    variant?: 'default' | 'dark' | 'light' | 'restricted' | 'info';
  };
  isExternal?: boolean;
}

export interface ActionButton {
  label: string;
  onClick: () => void;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  disabled?: boolean;
}

export interface OverviewSectionProps {
  metrics: MetricData[];
  actions?: ActionButton[];
  className?: string;
}

const OverviewSection = ({ metrics, actions, className }: OverviewSectionProps) => {
  return (
    <div className={cn(
      OVERVIEW_SECTION_TOKENS.container,
      className
    )}>
      <div className="flex items-center justify-between w-full p-6 rounded-2xl bg-background">
        {/* Metrics Section */}
        <div className={OVERVIEW_SECTION_TOKENS.metricsSection}>
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
          <div className={OVERVIEW_SECTION_TOKENS.actionsSection}>
            {actions.map((action, index) => (
              <Button
                key={index}
                variant={action.variant || 'default'}
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