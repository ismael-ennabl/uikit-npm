import { X, ChevronDown, type LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { SELECTION_TOOLBAR } from '@/styles/tokens';
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

interface SelectionToolbarProps {
  selectedCount: number;
  onClearSelection: () => void;
  actions: ToolbarAction[];
  className?: string;
}

const SelectionToolbar = ({
  selectedCount,
  onClearSelection,
  actions,
  className
}: SelectionToolbarProps) => {
  return (
    <div className={cn(SELECTION_TOOLBAR.container, className)}>
      {/* Left Section - Selection Info */}
      <div className={SELECTION_TOOLBAR.leftSection}>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearSelection}
          className={SELECTION_TOOLBAR.clearButton}
        >
          <X className={SELECTION_TOOLBAR.clearIcon} />
        </Button>
        <span className={SELECTION_TOOLBAR.selectionText}>
          {selectedCount} Selected
        </span>
      </div>

      {/* Right Section - Action Buttons */}
      <div className={SELECTION_TOOLBAR.rightSection}>
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
                    className={SELECTION_TOOLBAR.actionButton}
                  >
                    <IconComponent className={SELECTION_TOOLBAR.actionIcon} />
                    {action.label}
                    <ChevronDown className={SELECTION_TOOLBAR.chevronIcon} />
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
              className={SELECTION_TOOLBAR.actionButton}
            >
              <IconComponent className={SELECTION_TOOLBAR.actionIcon} />
              {action.label}
              {action.hasChevron && (
                <ChevronDown className={SELECTION_TOOLBAR.chevronIcon} />
              )}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default SelectionToolbar;