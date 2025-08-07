import React from 'react';
import { Button } from '../ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { cn } from '../../utils/cn';

export interface DropdownItem {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

export interface DropdownProps {
  items: DropdownItem[];
  className?: string;
}

const DROPDOWN_TOKENS = {
  // Trigger button
  trigger: "hover:bg-accent rounded-lg p-2 transition-colors",
  triggerIcon: "h-4 w-4 text-muted-foreground",
  
  // Dropdown content
  content: "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
  
  // Menu items
  item: "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
} as const;

const Dropdown = ({ items, className }: DropdownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm"
          className={cn(DROPDOWN_TOKENS.trigger, className)}
        >
          <svg className={DROPDOWN_TOKENS.triggerIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
          </svg>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className={DROPDOWN_TOKENS.content}>
        {items.map((item, index) => (
          <DropdownMenuItem
            key={index}
            onClick={item.onClick}
            disabled={item.disabled}
            className={DROPDOWN_TOKENS.item}
          >
            {item.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Dropdown;