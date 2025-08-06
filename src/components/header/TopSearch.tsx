import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { TOP_SEARCH_TOKENS } from '@/styles/headerTokens';
import { useIsMobile } from '@/hooks/use-mobile';

interface TopSearchProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

const TopSearch = ({ 
  placeholder = "Search", 
  value, 
  onChange,
  className 
}: TopSearchProps) => {
  const isMobile = useIsMobile();
  
  return (
    <div className={cn(TOP_SEARCH_TOKENS.container, className)}>
      <div className={cn(
        TOP_SEARCH_TOKENS.searchWrapper,
        isMobile && TOP_SEARCH_TOKENS.mobileSearchWrapper
      )}>
        <Search className={TOP_SEARCH_TOKENS.searchIcon} />
        <Input 
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          className={TOP_SEARCH_TOKENS.searchInput}
        />
      </div>
    </div>
  );
};

export default TopSearch;