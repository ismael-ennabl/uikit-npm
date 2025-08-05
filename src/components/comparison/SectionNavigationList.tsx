import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronRight } from 'lucide-react';
interface SectionNavigationListProps {
  availableSections: string[];
  allExpanded: boolean;
  onToggleExpandAll: () => void;
  onSectionClick?: (section: string) => void;
  expandedCategories?: Set<string>;
  onExpandedCategoriesChange?: (categories: Set<string>) => void;
}
const SectionNavigationList = ({
  availableSections,
  allExpanded,
  onToggleExpandAll,
  onSectionClick,
  expandedCategories,
  onExpandedCategoriesChange
}: SectionNavigationListProps) => {
  // Map full section names to shorter display names
  // Section order to match the order in IssueTypeView
  const CATEGORY_ORDER = [
    'Basic Info',
    'Financials', 
    'Insured',
    'Carriers',
    'Coverages',
    'Limits',
    'Schedule of Operations',
    'Endorsements',
    'Exclusions'
  ];

  // Sort sections based on predefined order
  const sortedSections = availableSections.sort((a, b) => {
    const indexA = CATEGORY_ORDER.indexOf(a);
    const indexB = CATEGORY_ORDER.indexOf(b);
    
    // If section not in order, put it at the end
    if (indexA === -1 && indexB === -1) return 0;
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;
    
    return indexA - indexB;
  });

  const getSectionDisplayName = (section: string) => {
    const displayMap: Record<string, string> = {
      'Basic Info': 'Basic Info',
      'Financials': 'Financials',
      'Insured': 'Insured',
      'Carriers': 'Carriers',
      'Coverages': 'Coverages',
      'Limits': 'Limits',
      'Schedule of Operations': 'Schedule',
      'Endorsements': 'Endorsements',
      'Exclusions': 'Exclusions'
    };
    return displayMap[section] || section;
  };

  const handleSectionClick = (section: string) => {
    // Generate section ID
    const sectionId = `section-${section.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`;
    
    // Find and scroll to section
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start',
        inline: 'nearest'
      });
    }
    
    // Auto-expand the section if not already expanded
    if (expandedCategories && onExpandedCategoriesChange && !expandedCategories.has(section)) {
      const newExpanded = new Set(expandedCategories);
      newExpanded.add(section);
      onExpandedCategoriesChange(newExpanded);
    }
    
    // Call optional callback
    onSectionClick?.(section);
  };
  return <div className="flex items-center gap-2 mb-4 overflow-x-auto">
      <Button variant="ghost" size="sm" onClick={onToggleExpandAll} className="whitespace-nowrap text-muted-foreground hover:bg-accent hover:text-accent-foreground font-normal rounded">
        {allExpanded ? <ChevronDown className="h-4 w-4 mr-0.5" /> : <ChevronRight className="h-4 w-4 mr-0.5" />}
        {allExpanded ? 'Collapse All' : 'Expand All'}
      </Button>
      
      {sortedSections.map(section => (
        <Button key={section} variant="ghost" size="sm" onClick={() => handleSectionClick(section)} className="whitespace-nowrap text-muted-foreground hover:bg-accent hover:text-accent-foreground font-normal rounded">
          {getSectionDisplayName(section)}
        </Button>
      ))}
    </div>;
};
export default SectionNavigationList;