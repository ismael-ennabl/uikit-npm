import { ChevronDown, LayoutGrid, Table as TableIcon, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { getSortOptionLabel } from '@/utils/packageUtils';

interface StatusFilters {
  allGroups: boolean;
  processing: boolean;
  new: boolean;
  completed: boolean;
}

interface PackageFiltersProps {
  viewMode: 'cards' | 'table';
  onViewModeChange: (mode: 'cards' | 'table') => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortOption: string;
  onSortChange: (option: string) => void;
  statusFilters: StatusFilters;
  onStatusFiltersChange: (filters: StatusFilters) => void;
}

const PackageFilters = ({
  viewMode,
  onViewModeChange,
  searchQuery,
  onSearchChange,
  sortOption,
  onSortChange,
  statusFilters,
  onStatusFiltersChange
}: PackageFiltersProps) => {
  const handleStatusFilterChange = (filterType: keyof StatusFilters, checked: boolean) => {
    const newFilters = { ...statusFilters };
    
    if (filterType === 'allGroups') {
      // Prevent unchecking "All Groups" when all individual filters are currently active
      if (!checked && statusFilters.allGroups) {
        return; // Don't allow unchecking "All Groups" - force user to pick individual filters
      }
      
      // Allow checking "All Groups" (this will select all individual filters)
      if (checked) {
        newFilters.allGroups = checked;
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
      
      // Update allGroups based on individual filters
      newFilters.allGroups = newFilters.processing && newFilters.new && newFilters.completed;
    }
    
    onStatusFiltersChange(newFilters);
  };
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        {/* View Toggle */}
        <div className="flex items-center rounded-lg p-1 bg-secondary py-[2px] px-[2px]">
          <Button
            variant={viewMode === 'cards' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onViewModeChange('cards')}
            className={`h-8 px-3 ${viewMode === 'cards' ? 'bg-foreground text-background' : 'bg-transparent text-muted-foreground'}`}>
            <LayoutGrid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'table' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onViewModeChange('table')}
            className={`h-8 px-3 ${viewMode === 'table' ? 'bg-foreground text-background' : 'bg-transparent text-muted-foreground'}`}>
            <TableIcon className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search documents..."
            value={searchQuery}
            onChange={e => onSearchChange(e.target.value)}
            className="pl-10 w-full border-0 bg-secondary"
          />
        </div>
      </div>
      
      {/* Filters and Sort - Right */}
      <div className="flex items-center gap-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button 
              variant="outline" 
              className={`${!statusFilters.allGroups ? 'border-2 border-brand-blue bg-brand-blue/5' : ''}`}>
              <Filter className="h-4 w-4 mr-2" />
              Filter
              <ChevronDown className="h-4 w-4 ml-auto" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-fit p-0" align="end">
            <div className="py-2 space-y-0">
              <div className="text-sm text-muted-foreground font-normal px-4 py-4">Filter</div>
              <div className="flex items-center space-x-3 hover:bg-brand-blue/5 transition-colors duration-150 px-4 py-4">
                <Checkbox 
                  id="all-groups" 
                  checked={statusFilters.allGroups}
                  onCheckedChange={(checked) => handleStatusFilterChange('allGroups', checked as boolean)}
                />
                <Label htmlFor="all-groups" className="cursor-pointer font-normal">All Groups</Label>
              </div>
              <div className="flex items-center space-x-3 hover:bg-brand-blue/5 transition-colors duration-150 px-4 py-4">
                <Checkbox 
                  id="processing" 
                  checked={statusFilters.processing}
                  onCheckedChange={(checked) => handleStatusFilterChange('processing', checked as boolean)}
                />
                <Label htmlFor="processing" className="cursor-pointer font-normal">Processing</Label>
              </div>
              <div className="flex items-center space-x-3 hover:bg-brand-blue/5 transition-colors duration-150 px-4 py-4">
                <Checkbox 
                  id="new" 
                  checked={statusFilters.new}
                  onCheckedChange={(checked) => handleStatusFilterChange('new', checked as boolean)}
                />
                <Label htmlFor="new" className="cursor-pointer font-normal">New</Label>
              </div>
              <div className="flex items-center space-x-3 hover:bg-brand-blue/5 transition-colors duration-150 px-4 py-4">
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
            <Button variant="outline" className="font-normal">
              {getSortOptionLabel(sortOption)}
              <ChevronDown className="h-4 w-4 ml-2" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-fit p-0" align="end">
            <div className="py-2 space-y-0">
              <div className="text-sm text-muted-foreground font-normal px-4 py-4">Sort by</div>
              <RadioGroup value={sortOption} onValueChange={onSortChange} className="space-y-0">
                <div className="flex items-center space-x-3 hover:bg-brand-blue/5 transition-colors duration-150 px-4 py-4">
                  <RadioGroupItem value="date-newest" id="sort-date-newest" />
                  <Label htmlFor="sort-date-newest" className="cursor-pointer font-normal">Upload date: Newest to Oldest</Label>
                </div>
                <div className="flex items-center space-x-3 hover:bg-brand-blue/5 transition-colors duration-150 px-4 py-4">
                  <RadioGroupItem value="date-oldest" id="sort-date-oldest" />
                  <Label htmlFor="sort-date-oldest" className="cursor-pointer font-normal">Upload date: Oldest to Newest</Label>
                </div>
                <div className="flex items-center space-x-3 hover:bg-brand-blue/5 transition-colors duration-150 px-4 py-4">
                  <RadioGroupItem value="discrepancies-highest" id="sort-discrepancies-highest" />
                  <Label htmlFor="sort-discrepancies-highest" className="cursor-pointer font-normal">Differences: Highest to Lowest</Label>
                </div>
                <div className="flex items-center space-x-3 hover:bg-brand-blue/5 transition-colors duration-150 px-4 py-4">
                  <RadioGroupItem value="discrepancies-lowest" id="sort-discrepancies-lowest" />
                  <Label htmlFor="sort-discrepancies-lowest" className="cursor-pointer font-normal">Differences: Lowest to Highest</Label>
                </div>
                <div className="flex items-center space-x-3 hover:bg-brand-blue/5 transition-colors duration-150 px-4 py-4">
                  <RadioGroupItem value="sync-score-highest" id="sort-sync-score-highest" />
                  <Label htmlFor="sort-sync-score-highest" className="cursor-pointer font-normal">Sync Score: Highest to Lowest</Label>
                </div>
                <div className="flex items-center space-x-3 hover:bg-brand-blue/5 transition-colors duration-150 px-4 py-4">
                  <RadioGroupItem value="sync-score-lowest" id="sort-sync-score-lowest" />
                  <Label htmlFor="sort-sync-score-lowest" className="cursor-pointer font-normal">Sync Score: Lowest to Highest</Label>
                </div>
              </RadioGroup>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default PackageFilters;