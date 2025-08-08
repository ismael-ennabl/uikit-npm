import { Badge } from '@/components/ui/badge';
import { ChevronDown, ChevronRight, GripVertical } from 'lucide-react';
import { CollapsibleTrigger } from '@/components/ui/collapsible';
import { TYPOGRAPHY } from '@/styles/tokens';
interface CategoryHeaderProps {
  categoryType: string;
  isExpanded: boolean;
  categoryCount: number;
  documentCount: number;
}
const CategoryHeader = ({
  categoryType,
  isExpanded,
  categoryCount,
  documentCount
}: CategoryHeaderProps) => {
  return <CollapsibleTrigger asChild>
      <div className="py-2 cursor-pointer w-full">
        <div className="flex items-center justify-between">
          <div className="flex items-baseline space-x-3">
            <GripVertical className="h-4 w-4 text-foreground" />
            {isExpanded ? <ChevronDown className="h-4 w-4 text-foreground" /> : <ChevronRight className="h-4 w-4 text-foreground" />}
            <span className={TYPOGRAPHY.h2}>{categoryType}</span>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="text-muted-foreground border-border">
                {categoryCount === 1 ? '1 difference' : `${categoryCount} differences`}
              </Badge>
              <Badge variant="outline" className="text-muted-foreground border-border">
                {documentCount === 1 ? '1 doc' : `${documentCount} docs`}
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </CollapsibleTrigger>;
};
export default CategoryHeader;