import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Expand } from 'lucide-react';

interface ViewOnDocsToggleProps {
  categoryType: string;
  viewOnDocs: boolean;
  onViewOnDocsChange: (checked: boolean) => void;
  onExpandModal?: () => void;
}

const ViewOnDocsToggle = ({
  categoryType,
  viewOnDocs,
  onViewOnDocsChange,
  onExpandModal
}: ViewOnDocsToggleProps) => {
  return (
    <div className="flex items-center space-x-3 mb-4">
      <div className="flex items-center space-x-2">
        <Label 
          onClick={() => onViewOnDocsChange(false)}
          className={`text-sm font-medium min-w-[2.5rem] cursor-pointer hover:opacity-80 transition-opacity ${!viewOnDocs ? 'text-foreground' : 'text-muted-foreground'}`}
        >
          Table
        </Label>
        <Switch 
          id={`pdf-view-toggle-${categoryType}`} 
          checked={viewOnDocs} 
          onCheckedChange={onViewOnDocsChange}
          className="data-[state=checked]:bg-muted data-[state=unchecked]:bg-muted [&>span]:bg-foreground"
        />
        <Label 
          onClick={() => onViewOnDocsChange(true)}
          className={`text-sm font-medium min-w-[1.75rem] cursor-pointer hover:opacity-80 transition-opacity ${viewOnDocs ? 'text-foreground' : 'text-muted-foreground'}`}
        >
          Doc
        </Label>
      </div>
      <div className="w-8 h-8 flex items-center justify-center">
        {viewOnDocs && onExpandModal && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onExpandModal}
            className="p-1 h-8 w-8"
          >
            <Expand className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default ViewOnDocsToggle;