// Main category mapping function
export const mapIssueTypeToCategory = (issueType: string): string => {
  // Financials category
  if (issueType.includes('Premium') || issueType.includes('Commission')) {
    return 'Financials';
  }
  
  // Limits category
  if (issueType.includes('Coverage Limit') || issueType.includes('Limit') || 
      issueType.includes('Deductible')) {
    return 'Limits';
  }
  
  // Basic Info category  
  if (issueType.includes('Policy Number') || issueType.includes('Date') || 
      issueType.includes('Territory') || issueType.includes('Producer') ||
      issueType.includes('Retroactive')) {
    return 'Basic Info';
  }
  
  // Insured category
  if (issueType.includes('Named Insured') || issueType.includes('Address') || 
      issueType.includes('Additional Insured') || issueType.includes('Certificate Holder') ||
      issueType.includes('Insured')) {
    return 'Insured';
  }
  
  // Carriers category
  if (issueType.includes('Carrier') || issueType.includes('Insurance Company')) {
    return 'Carriers';
  }
  
  // Schedule of Operations category
  if (issueType.includes('Schedule') || issueType.includes('Operations') || 
      issueType.includes('Classification')) {
    return 'Schedule of Operations';
  }
  
  // Endorsements category
  if (issueType.includes('Endorsement') || issueType.includes('Additional Insured') ||
      issueType.includes('Waiver') || issueType.includes('Primary Non-Contributory')) {
    return 'Endorsements';
  }
  
  // Exclusions category
  if (issueType.includes('Exclusion') || issueType.includes('War Risk') ||
      issueType.includes('Pollution') || issueType.includes('Professional Liability')) {
    return 'Exclusions';
  }
  
  // Coverages category (default for coverage-related items)
  return 'Coverages';
};

// Fixed count mapping for main categories - max 6 differences per category
export const categoryCountMap: Record<string, number> = {
  'Basic Info': 1,
  'Financials': 3,
  'Insured': 6,
  'Carriers': 4,
  'Coverages': 6,
  'Limits': 4,
  'Schedule of Operations': 3,
  'Endorsements': 4,
  'Exclusions': 3
};

// Document issue count mapping - distribute 59 issues across 6 non-SoT documents
export const documentIssueCount: Record<string, number> = {
  'ABC_Auto_Policy_2025.pdf': 0, // Source of Truth - no issues
  'ABC_COI_Certificate.pdf': 12,
  'Policy_Endorsement_2025.pdf': 9,
  'Vehicle_Schedule_2025.pdf': 8,
  'Additional_Insured_Endorsement.pdf': 11,
  'Waiver_of_Subrogation.pdf': 7,
  'Auto_ID_Cards.pdf': 12
  // Total: 59 issues (0+12+9+8+11+7+12=59)
};