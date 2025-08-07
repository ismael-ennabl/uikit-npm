import { cn } from '@/lib/utils';
import { PAGE_TITLE_TOKENS } from '@/styles/headerTokens';
interface PageTitleProps {
  title: string;
  variant?: 'h1' | 'h2' | 'h3' | 'titlePage';
  className?: string;
}
const PageTitle = ({
  title,
  variant = 'h1',
  className
}: PageTitleProps) => {
  const titleClass = PAGE_TITLE_TOKENS[variant];
  
  return (
    <div className={cn(PAGE_TITLE_TOKENS.container, className)}>
      <div className={PAGE_TITLE_TOKENS.titleRow}>
        <h1 className={titleClass}>{title}</h1>
      </div>
    </div>
  );
};
export default PageTitle;