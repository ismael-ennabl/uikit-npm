import { useState } from 'react';
import { Search, Grid3X3, List, Filter, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface StatusFilters {
  allDocs: boolean;
  processing: boolean;
  new: boolean;
  completed: boolean;
}

interface DocumentFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortOption: string;
  onSortChange: (option: string) => void;
  viewMode: 'grid' | 'table';
  onViewModeChange: (mode: 'grid' | 'table') => void;
  statusFilters: StatusFilters;
  onStatusFiltersChange: (filters: StatusFilters) => void;
}

const DocumentFilters = ({
  searchQuery,
  onSearchChange,
  sortOption,
  onSortChange,
  viewMode,
  onViewModeChange,
  statusFilters,
  onStatusFiltersChange
}: DocumentFiltersProps) => {
  const handleStatusFilterChange = (filterType: keyof StatusFilters, checked: boolean) => {
    const newFilters = { ...statusFilters };
    
    if (filterType === 'allDocs') {
      // Prevent unchecking "All Docs" when all individual filters are currently active
      if (!checked && statusFilters.allDocs) {
        return; // Don't allow unchecking "All Docs" - force user to pick individual filters
      }
      
      // Allow checking "All Docs" (this will select all individual filters)
      if (checked) {
        newFilters.allDocs = checked;
        newFilters.processing = checked;
        newFilters.new = checked;
        newFilters.completed = checked;
      }
    } else {
      // Check if unchecking would result in all individual filters being false
      if (!checked) {
        const activeFilters = ['processing', 'new', 'completed'].filter(
          key => key === filterType ? false : statusFilters[key as keyof StatusFilters]
        );
        
        // Prevent unchecking if it would result in no active filters
        if (activeFilters.length === 0) {
          return;
        }
      }
      
      // Update individual filter
      newFilters[filterType] = checked;
      
      // Update allDocs based on individual filters
      newFilters.allDocs = newFilters.processing && newFilters.new && newFilters.completed;
    }
    
    onStatusFiltersChange(newFilters);
  };
  return (
    <div className="flex items-center justify-between gap-4">
      {/* View Toggle and Search - Left Group */}
      <div className="flex items-center gap-4">
        <div className="flex items-center rounded-lg p-1 bg-muted py-[2px] px-[2px]">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onViewModeChange('grid')}
            className={`h-8 px-3 ${viewMode === 'grid' ? '' : 'text-muted-foreground'}`}
          >
            <Grid3X3 className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'table' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onViewModeChange('table')}
            className={`h-8 px-3 ${viewMode === 'table' ? '' : 'text-muted-foreground'}`}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>

        <div className="relative w-80">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search documents..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 w-full border-0 bg-card"
          />
        </div>
      </div>
      
      {/* Filters and Sort - Right */}
      <div className="flex items-center gap-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button 
              variant="outline" 
              className={`${!statusFilters.allDocs ? 'border-2 border-brand-blue bg-brand-blue/5' : ''}`}
            >
              <Filter className="h-4 w-4 mr-2" />
              Filter
              <ChevronDown className="h-4 w-4 ml-auto" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-fit p-0" align="end">
            <div className="py-2 space-y-0">
              <div className="text-sm text-muted-foreground font-normal px-4 py-4">Filter</div>
              <div className="flex items-center space-x-3 hover:bg-hover-primary transition-colors duration-150 px-4 py-4">
                <Checkbox 
                  id="all-docs" 
                  checked={statusFilters.allDocs}
                  onCheckedChange={(checked) => handleStatusFilterChange('allDocs', checked as boolean)}
                />
                <Label htmlFor="all-docs" className="cursor-pointer font-normal">All Docs</Label>
              </div>
              <div className="flex items-center space-x-3 hover:bg-hover-primary transition-colors duration-150 px-4 py-4">
                <Checkbox 
                  id="processing" 
                  checked={statusFilters.processing}
                  onCheckedChange={(checked) => handleStatusFilterChange('processing', checked as boolean)}
                />
                <Label htmlFor="processing" className="cursor-pointer font-normal">Processing</Label>
              </div>
              <div className="flex items-center space-x-3 hover:bg-hover-primary transition-colors duration-150 px-4 py-4">
                <Checkbox 
                  id="new" 
                  checked={statusFilters.new}
                  onCheckedChange={(checked) => handleStatusFilterChange('new', checked as boolean)}
                />
                <Label htmlFor="new" className="cursor-pointer font-normal">New</Label>
              </div>
              <div className="flex items-center space-x-3 hover:bg-hover-primary transition-colors duration-150 px-4 py-4">
                <Checkbox 
                  id="completed" 
                  checked={statusFilters.completed}
                  onCheckedChange={(checked) => handleStatusFilterChange('completed', checked as boolean)}
                />
                <Label htmlFor="completed" className="cursor-pointer font-normal">Completed</Label>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-60 font-normal justify-between">
              Sort by
              <ChevronDown className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-fit p-0" align="end">
            <div className="py-2 space-y-0">
              <div className="text-sm text-muted-foreground font-normal px-4 py-4">Sort by</div>
              <RadioGroup value={sortOption} onValueChange={onSortChange} className="space-y-0">
                <div className="flex items-center space-x-3 hover:bg-hover-primary transition-colors duration-150 px-4 py-4">
                  <RadioGroupItem value="date-newest" id="sort-date-newest-docs" />
                  <Label htmlFor="sort-date-newest-docs" className="cursor-pointer font-normal">Upload date: Newest to Oldest</Label>
                </div>
                <div className="flex items-center space-x-3 hover:bg-hover-primary transition-colors duration-150 px-4 py-4">
                  <RadioGroupItem value="date-oldest" id="sort-date-oldest-docs" />
                  <Label htmlFor="sort-date-oldest-docs" className="cursor-pointer font-normal">Upload date: Oldest to Newest</Label>
                </div>
                <div className="flex items-center space-x-3 hover:bg-hover-primary transition-colors duration-150 px-4 py-4">
                  <RadioGroupItem value="name-a-z" id="sort-name-a-z-docs" />
                  <Label htmlFor="sort-name-a-z-docs" className="cursor-pointer font-normal">Name: A to Z</Label>
                </div>
                <div className="flex items-center space-x-3 hover:bg-hover-primary transition-colors duration-150 px-4 py-4">
                  <RadioGroupItem value="name-z-a" id="sort-name-z-a-docs" />
                  <Label htmlFor="sort-name-z-a-docs" className="cursor-pointer font-normal">Name: Z to A</Label>
                </div>
                <div className="flex items-center space-x-3 hover:bg-hover-primary transition-colors duration-150 px-4 py-4">
                  <RadioGroupItem value="company-a-z" id="sort-company-a-z-docs" />
                  <Label htmlFor="sort-company-a-z-docs" className="cursor-pointer font-normal">Carrier: A to Z</Label>
                </div>
              </RadioGroup>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default DocumentFilters;