import { Package } from '@/hooks/usePackageData';

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const year = String(date.getFullYear()).slice(-2);
  return `${month}/${day}/${year}`;
};

export const getSyncScoreColor = (score: number) => {
  if (score >= 50) return 'text-green-600';
  if (score >= 25) return 'text-yellow-600';
  return 'text-red-600';
};

export const getStatusPriority = (status: string) => {
  switch (status) {
    case 'in-progress': return 0;
    case 'new': return 1;
    case 'completed': return 2;
    default: return 3;
  }
};

export const getSortedPackages = (packages: Package[], sortOption: string) => {
  const sorted = [...packages];
  switch (sortOption) {
    case 'discrepancies-highest':
      return sorted.sort((a, b) => b.discrepancies - a.discrepancies);
    case 'discrepancies-lowest':
      return sorted.sort((a, b) => a.discrepancies - b.discrepancies);
    case 'sync-score-highest':
      return sorted.sort((a, b) => b.syncScore - a.syncScore);
    case 'sync-score-lowest':
      return sorted.sort((a, b) => a.syncScore - b.syncScore);
    case 'date-oldest':
      return sorted.sort((a, b) => {
        const statusDiff = getStatusPriority(a.status) - getStatusPriority(b.status);
        if (statusDiff !== 0) return statusDiff;
        return new Date(a.editedDate).getTime() - new Date(b.editedDate).getTime();
      });
    case 'date-newest':
    default:
      return sorted.sort((a, b) => {
        const statusDiff = getStatusPriority(a.status) - getStatusPriority(b.status);
        if (statusDiff !== 0) return statusDiff;
        return new Date(b.editedDate).getTime() - new Date(a.editedDate).getTime();
      });
  }
};

export const getSortedDocuments = (documents: any[], sortOption: string) => {
  const sorted = [...documents];
  switch (sortOption) {
    case 'name-a-z':
      return sorted.sort((a, b) => {
        const statusDiff = getStatusPriority(a.status) - getStatusPriority(b.status);
        if (statusDiff !== 0) return statusDiff;
        return a.name.localeCompare(b.name);
      });
    case 'name-z-a':
      return sorted.sort((a, b) => {
        const statusDiff = getStatusPriority(a.status) - getStatusPriority(b.status);
        if (statusDiff !== 0) return statusDiff;
        return b.name.localeCompare(a.name);
      });
    case 'company-a-z':
      return sorted.sort((a, b) => {
        const statusDiff = getStatusPriority(a.status) - getStatusPriority(b.status);
        if (statusDiff !== 0) return statusDiff;
        return a.company.localeCompare(b.company);
      });
    case 'date-oldest':
      return sorted.sort((a, b) => {
        const statusDiff = getStatusPriority(a.status) - getStatusPriority(b.status);
        if (statusDiff !== 0) return statusDiff;
        return new Date(a.uploadDate).getTime() - new Date(b.uploadDate).getTime();
      });
    case 'date-newest':
    default:
      return sorted.sort((a, b) => {
        const statusDiff = getStatusPriority(a.status) - getStatusPriority(b.status);
        if (statusDiff !== 0) return statusDiff;
        return new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime();
      });
  }
};

export const getSortOptionLabel = (option: string) => {
  switch (option) {
    case 'date-newest':
      return 'Upload date: Newest to Oldest';
    case 'date-oldest':
      return 'Upload date: Oldest to Newest';
    case 'discrepancies-highest':
      return 'Differences: Highest to Lowest';
    case 'discrepancies-lowest':
      return 'Differences: Lowest to Highest';
    case 'sync-score-highest':
      return 'Sync Score: Highest to Lowest';
    case 'sync-score-lowest':
      return 'Sync Score: Lowest to Highest';
    default:
      return 'Upload date: Newest to Oldest';
  }
};