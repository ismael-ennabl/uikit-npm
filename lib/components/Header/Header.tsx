import React from 'react';
import { cn } from '../../utils/cn';
import { HEADER_TOKENS } from '../../tokens/headerTokens';

export interface HeaderProps {
  left?: React.ReactNode;
  center?: React.ReactNode;
  right?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}

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