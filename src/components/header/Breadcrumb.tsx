import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { BREADCRUMB_TOKENS } from '@/styles/headerTokens';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbProps {
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
  const navigate = useNavigate();
  
  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
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
            <ChevronLeft className={BREADCRUMB_TOKENS.backIcon} />
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
          
          {item.path ? (
            <button
              onClick={() => navigate(item.path!)}
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