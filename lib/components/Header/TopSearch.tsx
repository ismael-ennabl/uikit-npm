import React from 'react';
import { cn } from '../../utils/cn';

export interface TopSearchProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

const TOP_SEARCH_TOKENS = {
  // Container
  container: "flex items-center gap-2",
  
  // Search input wrapper
  searchWrapper: "relative bg-background border border-input rounded-lg shadow-sm flex items-center min-w-[280px]",
  searchIcon: "absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground",
  searchInput: "border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 pl-10 pr-3 py-2 text-sm placeholder:text-muted-foreground w-full",
  
  // Mobile responsive
  mobileSearchWrapper: "min-w-[200px]",
} as const;

const TopSearch = ({ 
  placeholder = "Search", 
  value, 
  onChange,
  className 
}: TopSearchProps) => {
  return (
    <div className={cn(TOP_SEARCH_TOKENS.container, className)}>
      <div className={TOP_SEARCH_TOKENS.searchWrapper}>
        <svg className={TOP_SEARCH_TOKENS.searchIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input 
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