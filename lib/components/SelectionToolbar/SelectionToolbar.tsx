import { X, ChevronDown, type LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

export interface DropdownItem {
  label: string;
  icon: LucideIcon;
  onClick: () => void;
}

export interface ToolbarAction {
  icon: LucideIcon;
  label: string;
  onClick?: () => void;
  hasChevron?: boolean;
  dropdownItems?: DropdownItem[];
}

export interface SelectionToolbarProps {
  selectedCount: number;
  onClearSelection: () => void;
  actions: ToolbarAction[];
  className?: string;
}

// Design tokens - these will be configurable in the final package
const SELECTION_TOOLBAR_TOKENS = {
  container: "flex items-center justify-between h-12 px-4 bg-brand-blue/5 rounded-lg",
  leftSection: "flex items-center gap-3",
  clearButton: "h-8 w-8 p-0 text-foreground hover:bg-foreground/10",
  selectionText: "text-foreground font-normal",
  rightSection: "flex items-center gap-2",
  actionButton: "h-8 px-3 text-foreground hover:bg-foreground/10 font-normal",
  clearIcon: "h-4 w-4",
  actionIcon: "h-4 w-4 mr-1",
  chevronIcon: "h-3 w-3 ml-1"
} as const;

const SelectionToolbar = ({
  selectedCount,
  onClearSelection,
  actions,
  className
}: SelectionToolbarProps) => {
  return (
    <div className={cn(SELECTION_TOOLBAR_TOKENS.container, className)}>
      {/* Left Section - Selection Info */}
      <div className={SELECTION_TOOLBAR_TOKENS.leftSection}>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearSelection}
          className={SELECTION_TOOLBAR_TOKENS.clearButton}
        >
          <X className={SELECTION_TOOLBAR_TOKENS.clearIcon} />
        </Button>
        <span className={SELECTION_TOOLBAR_TOKENS.selectionText}>
          {selectedCount} Selected
        </span>
      </div>

      {/* Right Section - Action Buttons */}
      <div className={SELECTION_TOOLBAR_TOKENS.rightSection}>
        {actions.map((action, index) => {
          const IconComponent = action.icon;
          
          // Render dropdown if dropdownItems are provided
          if (action.dropdownItems && action.dropdownItems.length > 0) {
            return (
              <DropdownMenu key={index}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={SELECTION_TOOLBAR_TOKENS.actionButton}
                  >
                    <IconComponent className={SELECTION_TOOLBAR_TOKENS.actionIcon} />
                    {action.label}
                    <ChevronDown className={SELECTION_TOOLBAR_TOKENS.chevronIcon} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-background border shadow-lg">
                  {action.dropdownItems.map((item, itemIndex) => {
                    const ItemIcon = item.icon;
                    return (
                      <DropdownMenuItem
                        key={itemIndex}
                        onClick={item.onClick}
                        className="cursor-pointer"
                      >
                        <ItemIcon className="w-4 h-4 mr-2" />
                        {item.label}
                      </DropdownMenuItem>
                    );
                  })}
                </DropdownMenuContent>
              </DropdownMenu>
            );
          }
          
          // Render regular button
          return (
            <Button
              key={index}
              variant="ghost"
              size="sm"
              onClick={action.onClick}
              className={SELECTION_TOOLBAR_TOKENS.actionButton}
            >
              <IconComponent className={SELECTION_TOOLBAR_TOKENS.actionIcon} />
              {action.label}
              {action.hasChevron && (
                <ChevronDown className={SELECTION_TOOLBAR_TOKENS.chevronIcon} />
              )}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default SelectionToolbar;