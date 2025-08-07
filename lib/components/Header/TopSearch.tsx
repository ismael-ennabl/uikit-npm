import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '../ui/input';
import { cn } from '../../utils/cn';
import { TOP_SEARCH_TOKENS } from '../../tokens/headerTokens';

export interface TopSearchProps {
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
  return (
    <div className={cn(TOP_SEARCH_TOKENS.container, className)}>
      <div className={TOP_SEARCH_TOKENS.searchWrapper}>
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