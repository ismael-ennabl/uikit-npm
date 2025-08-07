import React from 'react';
import { cn } from '../../utils/cn';

export interface HeaderProps {
  left?: React.ReactNode;
  center?: React.ReactNode;
  right?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}

const HEADER_TOKENS = {
  // Base header container
  container: "flex items-center justify-between px-6 py-4 bg-background border-b border-border",
  
  // Layout sections
  leftSection: "flex items-center gap-4",
  rightSection: "flex items-center gap-3",
  centerSection: "flex-1 flex justify-center",
  
  // Responsive spacing
  mobileContainer: "px-4 py-3",
  desktopContainer: "px-6 py-4",
} as const;

const Header = ({ left, center, right, className, children }: HeaderProps) => {
  if (children) {
    return (
      <header className={cn(
        HEADER_TOKENS.container,
        className
      )}>
        {children}
      </header>
    );
  }
  
  return (
    <header className={cn(
      HEADER_TOKENS.container,
      className
    )}>
      {left && (
        <div className={HEADER_TOKENS.leftSection}>
          {left}
        </div>
      )}
      
      {center && (
        <div className={HEADER_TOKENS.centerSection}>
          {center}
        </div>
      )}
      
      {right && (
        <div className={HEADER_TOKENS.rightSection}>
          {right}
        </div>
      )}
    </header>
  );
};

export default Header;