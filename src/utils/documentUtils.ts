export const getDocumentNameWithoutExtension = (name: string) => {
  return name.replace(/\.[^/.]+$/, "");
};

export const getFileExtension = (fileName: string) => {
  const match = fileName.match(/\.([^.]+)$/);
  return match ? match[1] : 'pdf';
};

export const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'high':
      return 'bg-red-100 text-red-800 border-red-200';
    case 'medium':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'low':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};