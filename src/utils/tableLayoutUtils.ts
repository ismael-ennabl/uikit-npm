export const getOptimalDifferencesColumnWidth = () => {
  // Based on analysis of all field names across categories:
  // Longest field: "Business Description" (20 characters)
  // Optimal width: w-72 (288px) to accommodate longest content with padding
  return 'w-72';
};

export const getColumnWidth = (docName: string, isPrimary: boolean = false) => {
  if (isPrimary) return 'w-64'; // Fixed width for primary document
  
  const baseCharWidth = 12; // pixels per character
  const padding = 32; // padding in pixels
  const minWidth = 200; // minimum width in pixels
  const maxWidth = 320; // maximum width in pixels
  
  const calculatedWidth = Math.max(minWidth, Math.min(maxWidth, docName.length * baseCharWidth + padding));
  
  // Convert to Tailwind width classes
  if (calculatedWidth <= 224) return 'w-56'; // 224px
  if (calculatedWidth <= 256) return 'w-64'; // 256px
  if (calculatedWidth <= 288) return 'w-72'; // 288px
  if (calculatedWidth <= 320) return 'w-80'; // 320px
  return 'w-80'; // fallback
};