import React from 'react';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../utils/cn';
import { BREADCRUMB_TOKENS } from '../../tokens/headerTokens';

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
            <ArrowLeft className={BREADCRUMB_TOKENS.backIcon} />
            <span className={BREADCRUMB_TOKENS.backText}>Back</span>
          </button>
          
          {items.length > 0 && (
            <ChevronRight className={cn(BREADCRUMB_TOKENS.separatorIcon, BREADCRUMB_TOKENS.separator)} />
          )}
        </>
      )}
      
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          {index > 0 && (
            <ChevronRight className={cn(BREADCRUMB_TOKENS.separatorIcon, BREADCRUMB_TOKENS.separator)} />
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