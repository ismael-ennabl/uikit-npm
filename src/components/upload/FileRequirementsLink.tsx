import React from 'react';
import { ExternalLink } from 'lucide-react';

const FileRequirementsLink = () => {
  return (
    <div className="mb-8 text-center">
      <button className="text-base text-black hover:text-gray-800 flex items-center justify-center space-x-1">
        <span>See file requirements</span>
        <ExternalLink className="h-4 w-4" />
      </button>
    </div>
  );
};

export default FileRequirementsLink;