import { GitCompare, Database, Merge, Box, Lock, Package } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@/components/ui/tooltip';
import { useUsageStats } from '@/hooks/useUsageStats';
const NavigationButtons = () => {
  const {
    compareCounter,
    lossRunsCounter,
    allDocumentsCounter,
    writeBackCounter,
    othersCounter
  } = useUsageStats();
  return <TooltipProvider>
      <div className="grid grid-cols-3 gap-6 mb-8">
      {/* Row 1: Docs Compare, Docs Write-back, Loss Runs */}
      <Link to="/dashboard">
        <Button variant="ghost" className="relative flex flex-col items-center justify-center gap-2 bg-hover-subtle text-foreground hover:bg-hover-primary h-52 w-full p-8 rounded-[12px]">
          <Badge variant="new" className="absolute top-2 right-2 text-xs">
            New
          </Badge>
          <GitCompare className="w-8 h-8" />
          <span className="text-base font-normal">Docs Compare</span>
          <span className="text-center leading-relaxed max-w-full whitespace-normal my-0 text-sm text-muted-foreground">Compare one or more documents and identify the differences</span>
          <span className="text-center text-xs mt-1 text-muted-foreground">{compareCounter}</span>
        </Button>
      </Link>
      
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="relative">
            <Button variant="ghost" disabled className="relative flex flex-col items-center justify-center gap-2 bg-hover-subtle text-muted-foreground cursor-not-allowed h-52 w-full p-8 rounded-[12px]">
              <Badge variant="soon" className="absolute top-2 right-12 text-xs">
                Coming Soon
              </Badge>
              <Badge variant="restricted" className="absolute top-2 right-2 text-xs">
                <Lock className="w-3 h-3" />
              </Badge>
              <Merge className="w-8 h-8" />
              <span className="text-base font-medium">Docs Write-back</span>
              <span className="text-center leading-relaxed max-w-full whitespace-normal my-0 text-sm text-muted-foreground">Write reviewed policy data back to AMS so your AMs don't have to</span>
              <span className="text-center text-xs mt-1 text-muted-foreground">{writeBackCounter}</span>
            </Button>
          </div>
        </TooltipTrigger>
        <TooltipContent variant="restricted">
          Service restricted. Contact support@ennabl.com
        </TooltipContent>
      </Tooltip>

      <Button variant="ghost" className="flex flex-col items-center justify-center gap-2 bg-hover-subtle text-foreground hover:bg-hover-primary h-52 w-full p-8 rounded-[12px]">
        <Package className="w-8 h-8" />
        <span className="text-base font-normal">Loss Runs</span>
        <span className="text-center leading-relaxed max-w-full whitespace-normal my-0 text-sm text-muted-foreground">Analyze batches of Loss Runs documents and get insights</span>
        <span className="text-center text-xs mt-1 text-muted-foreground">{lossRunsCounter}</span>
      </Button>
      
      {/* Row 2: Docs Library, Others */}
      <Link to="/docs-library">
        <Button variant="ghost" className="flex flex-col items-center justify-center gap-2 bg-hover-subtle text-foreground hover:bg-hover-primary h-52 w-full p-8 rounded-[12px]">
          <Database className="w-8 h-8" />
          <span className="text-base font-normal">Docs Library</span>
          <span className="text-center leading-relaxed max-w-full whitespace-normal my-0 text-sm text-muted-foreground">A single space to view and manage all your documents</span>
          <span className="text-center text-xs mt-1 text-muted-foreground">{allDocumentsCounter}</span>
        </Button>
      </Link>
      
      <Button variant="ghost" disabled className="relative flex flex-col items-center justify-center gap-2 bg-hover-subtle text-muted-foreground cursor-not-allowed h-52 w-full p-8 rounded-[12px]">
        <Badge variant="soon" className="absolute top-2 right-2 text-xs">
          Coming Soon
        </Badge>
        <Box className="w-8 h-8" />
        <span className="text-base font-medium">Others</span>
        <span className="text-center leading-relaxed max-w-full whitespace-normal my-0 text-sm text-muted-foreground">Additional features and tools</span>
        <span className="text-center text-xs mt-1 text-muted-foreground">{othersCounter}</span>
      </Button>
      </div>
    </TooltipProvider>;
};
export default NavigationButtons;