// Shared types for the component library

export interface ComponentBaseProps {
  className?: string;
  children?: React.ReactNode;
}

export interface TooltipConfig {
  content: string;
  variant?: 'default' | 'dark' | 'light' | 'restricted' | 'info';
}

export interface ActionItem {
  label: string;
  onClick: () => void;
  icon?: React.ComponentType<{ className?: string }>;
}

export interface DropdownActionItem extends ActionItem {
  icon: React.ComponentType<{ className?: string }>;
}

export interface SectionBadge {
  text: string;
  variant?: 'default' | 'outline' | 'secondary' | 'destructive';
}

export interface SectionProps extends ComponentBaseProps {
  id: string;
  title: string;
  showDragHandle?: boolean;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  badges?: SectionBadge[];
  contentClassName?: string;
}