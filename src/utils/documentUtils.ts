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
      return 'bg-destructive/10 text-destructive border-destructive/30';
    case 'medium':
      return 'bg-warning/10 text-warning border-warning/30';
    case 'low':
      return 'bg-info/10 text-info border-info/30';
    default:
      return 'bg-muted text-muted-foreground border-border';
  }
};