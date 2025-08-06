import { MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { DROPDOWN_TOKENS } from '@/styles/headerTokens';

interface DropdownItem {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

interface DropdownProps {
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