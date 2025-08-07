import React from 'react';
import { Button } from '../ui/button';
import { cn } from '../../utils/cn';

export interface TopAIProps {
  onClick?: () => void;
  isActive?: boolean;
  className?: string;
}

const TOP_AI_TOKENS = {
  // AI button
  button: "h-10 bg-background hover:bg-accent border border-input rounded-lg px-3 py-2 flex items-center gap-2 text-muted-foreground shadow-sm transition-colors",
  icon: "h-4 w-4 text-muted-foreground",
  text: "text-sm font-medium",
  
  // States
  hover: "hover:text-foreground hover:bg-accent/80",
  active: "bg-accent text-foreground",
} as const;

const TopAI = ({ onClick, isActive, className }: TopAIProps) => {
  return (
    <Button
      variant="outline"
      onClick={onClick}
      className={cn(
        TOP_AI_TOKENS.button,
        TOP_AI_TOKENS.hover,
        isActive && TOP_AI_TOKENS.active,
        className
      )}
    >
      <svg className={TOP_AI_TOKENS.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
      <span className={TOP_AI_TOKENS.text}>AI</span>
    </Button>
  );
};

export default TopAI;