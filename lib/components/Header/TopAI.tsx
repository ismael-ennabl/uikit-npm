import React from 'react';
import { Sparkles } from 'lucide-react';
import { Button } from '../ui/button';
import { cn } from '../../utils/cn';
import { TOP_AI_TOKENS } from '../../tokens/headerTokens';

export interface TopAIProps {
  onClick?: () => void;
  isActive?: boolean;
  className?: string;
}

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
      <Sparkles className={TOP_AI_TOKENS.icon} />
      <span className={TOP_AI_TOKENS.text}>AI</span>
    </Button>
  );
};

export default TopAI;