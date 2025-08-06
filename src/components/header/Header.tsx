import { cn } from '@/lib/utils';
import { HEADER_TOKENS } from '@/styles/headerTokens';
import { useIsMobile } from '@/hooks/use-mobile';

interface HeaderProps {
  left?: React.ReactNode;
  center?: React.ReactNode;
  right?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}

const Header = ({ left, center, right, className, children }: HeaderProps) => {
  const isMobile = useIsMobile();
  
  if (children) {
    return (
      <header className={cn(
        HEADER_TOKENS.container,
        isMobile ? HEADER_TOKENS.mobileContainer : HEADER_TOKENS.desktopContainer,
        className
      )}>
        {children}
      </header>
    );
  }
  
  return (
    <header className={cn(
      HEADER_TOKENS.container,
      isMobile ? HEADER_TOKENS.mobileContainer : HEADER_TOKENS.desktopContainer,
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