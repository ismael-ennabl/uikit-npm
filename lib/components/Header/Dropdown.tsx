import React from 'react';
import { MoreVertical } from 'lucide-react';
import { Button } from '../ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { cn } from '../../utils/cn';
import { DROPDOWN_TOKENS } from '../../tokens/headerTokens';

export interface DropdownItem {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

export interface DropdownProps {
  items: DropdownItem[];
  className?: string;
}


const Dropdown = ({ items, className }: DropdownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm"
          className={cn(DROPDOWN_TOKENS.trigger, className)}
        >
          <MoreVertical className={DROPDOWN_TOKENS.triggerIcon} />
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