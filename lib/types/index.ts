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