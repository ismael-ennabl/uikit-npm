/**
 * Utility functions for generating consistent package names based on source of truth documents
 */

export interface PackageInfo {
  id: number;
  sourceOfTruthDocument: string;
}

/**
 * Convert a document filename to a friendly package name
 * @param filename - The source of truth document filename
 * @returns Friendly package name
 */
export const generatePackageName = (filename: string): string => {
  // Remove file extension
  const nameWithoutExt = filename.replace(/\.(pdf|PDF)$/, '');
  
  // Replace underscores with spaces and handle common patterns
  let friendlyName = nameWithoutExt
    .replace(/_/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2') // Add space before capital letters
    .trim();
  
  // Handle specific patterns and convert to title case
  friendlyName = friendlyName
    .split(' ')
    .map(word => {
      // Convert common abbreviations to proper case
      const upperWords = ['COI', 'GL', 'ID', 'PDF', 'LLC', 'INC', 'CORP'];
      if (upperWords.includes(word.toUpperCase())) {
        return word.toUpperCase();
      }
      
      // Capitalize first letter of each word
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(' ');
  
  // Add "Package" suffix if not already present and it's a policy document
  if (!friendlyName.toLowerCase().includes('package') && 
      (friendlyName.toLowerCase().includes('policy') || 
       friendlyName.toLowerCase().includes('master'))) {
    friendlyName += ' Package';
  }
  
  return friendlyName;
};

/**
 * Get package information by ID with consistent naming
 */
export const getPackageInfo = (id: string): { name: string; sourceDocument: string } => {
  const packageMappings: { [key: string]: string } = {
    '1': 'ABC_Auto_Policy_2025.pdf',
    '2': 'XYZ_Liability_COI_2025.pdf', 
    '3': 'Global_Workers_Comp_Master.pdf',
    '4': 'TechCorp_Cyber_Liability.pdf',
    '5': 'Manufacturing_GL_Package.pdf',
    '6': 'Healthcare_Professional_Liability.pdf'
  };
  
  const sourceDocument = packageMappings[id] || 'Document_Package.pdf';
  const name = generatePackageName(sourceDocument);
  
  return { name, sourceDocument };
};

/**
 * Get display name for dashboard/cards view
 */
export const getDisplayName = (sourceDocument: string): string => {
  return generatePackageName(sourceDocument);
};