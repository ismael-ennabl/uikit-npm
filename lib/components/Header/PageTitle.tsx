import React from 'react';
import { cn } from '../../utils/cn';

export interface PageTitleProps {
  title: string;
  subtitle?: string;
  variant?: 'h1' | 'h2' | 'h3';
  className?: string;
}

const PAGE_TITLE_TOKENS = {
  // Title variants
  h1: "text-2xl font-bold text-foreground",
  h2: "text-xl font-semibold text-foreground", 
  h3: "text-lg font-medium text-foreground",
  
  // Subtitle
  subtitle: "text-sm text-muted-foreground mt-1",
  
  // Container
  container: "flex flex-col",
  titleRow: "flex items-center gap-3",
} as const;

const PageTitle = ({ 
  title, 
  subtitle, 
  variant = 'h1',
  className 
}: PageTitleProps) => {
  const titleClass = PAGE_TITLE_TOKENS[variant];
  
  return (
    <div className={cn(PAGE_TITLE_TOKENS.container, className)}>
      <div className={PAGE_TITLE_TOKENS.titleRow}>
        <h1 className={titleClass}>{title}</h1>
      </div>
      {subtitle && (
        <p className={PAGE_TITLE_TOKENS.subtitle}>{subtitle}</p>
      )}
    </div>
  );
};

export default PageTitle;