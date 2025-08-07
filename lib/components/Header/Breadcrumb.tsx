import React from 'react';
import { cn } from '../../utils/cn';

export interface BreadcrumbItem {
  label: string;
  path?: string;
  onClick?: () => void;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  showBackButton?: boolean;
  onBack?: () => void;
  className?: string;
}

const BREADCRUMB_TOKENS = {
  // Container
  container: "flex items-center gap-2",
  
  // Back button
  backButton: "flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer",
  backIcon: "h-4 w-4",
  backText: "text-sm font-medium",
  
  // Separator
  separator: "text-muted-foreground/50",
  separatorIcon: "h-4 w-4",
  
  // Current page
  currentPage: "text-sm font-medium text-foreground",
} as const;

const Breadcrumb = ({ 
  items, 
  showBackButton = true, 
  onBack,
  className 
}: BreadcrumbProps) => {
  const handleBack = () => {
    if (onBack) {
      onBack();
    }
  };

  return (
    <nav className={cn(BREADCRUMB_TOKENS.container, className)}>
      {showBackButton && (
        <>
          <button
            onClick={handleBack}
            className={BREADCRUMB_TOKENS.backButton}
          >
            <svg className={BREADCRUMB_TOKENS.backIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className={BREADCRUMB_TOKENS.backText}>Back</span>
          </button>
          
          {items.length > 0 && (
            <svg className={cn(BREADCRUMB_TOKENS.separatorIcon, BREADCRUMB_TOKENS.separator)} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          )}
        </>
      )}
      
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          {index > 0 && (
            <svg className={cn(BREADCRUMB_TOKENS.separatorIcon, BREADCRUMB_TOKENS.separator)} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          )}
          
          {item.path || item.onClick ? (
            <button
              onClick={item.onClick}
              className={BREADCRUMB_TOKENS.backButton}
            >
              {item.label}
            </button>
          ) : (
            <span className={BREADCRUMB_TOKENS.currentPage}>
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  );
};

export default Breadcrumb;