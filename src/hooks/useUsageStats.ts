import { useState } from 'react';

interface UsageStats {
  documentseSummarized: number;
  documentsCompared: number;
  totalDocuments: number;
  digitizedPages: number;
}

export const useUsageStats = () => {
  const [stats] = useState<UsageStats>({
    documentseSummarized: 234,
    documentsCompared: 34,
    totalDocuments: 1908,
    digitizedPages: 95400,
  });

  return {
    compareCounter: `(${stats.documentsCompared} Docs compared)`,
    lossRunsCounter: '(34 Loss Runs analyzed)',
    allDocumentsCounter: `(${stats.totalDocuments.toLocaleString()} Total docs)`,
    writeBackCounter: '(Service restricted)',
    othersCounter: '(Coming soon)',
    stats,
  };
};