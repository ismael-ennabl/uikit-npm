import { Search, MoreVertical, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const AISearchInterface = () => {
  return (
    <div className="flex items-center space-x-2">
      {/* AI Button */}
      <Button 
        variant="outline"
        className="h-10 bg-white hover:bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 flex items-center space-x-1 text-gray-600 shadow-sm"
      >
        <Sparkles className="h-5 w-5 text-gray-400" />
        <span className="text-sm font-medium">AI</span>
      </Button>
      
      {/* Search Input Container */}
      <div className="relative bg-white border border-gray-200 rounded-lg shadow-sm flex items-center">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input 
          placeholder="Search"
          className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 pl-10 pr-3 py-2 text-sm placeholder:text-gray-500 min-w-[200px]"
        />
      </div>
      
      {/* Menu Button - Transparent */}
      <Button 
        variant="ghost" 
        size="sm"
        className="hover:bg-gray-100 rounded-lg p-2 bg-transparent"
      >
        <MoreVertical className="h-4 w-4 text-gray-600" />
      </Button>
    </div>
  );
};

export default AISearchInterface;