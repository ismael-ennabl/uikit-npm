import { FileText, DollarSign, MapPin, Calendar, Shield, Building } from 'lucide-react';

export const getIssueTypeIcon = (issueType: string) => {
  // Match the 5 main issue categories
  switch (issueType) {
    case 'Insured':
      return <MapPin className="h-4 w-4 text-muted-foreground" />;
    
    case 'Coverages':
      return <Shield className="h-4 w-4 text-muted-foreground" />;
    
    case 'Carriers':
      return <Building className="h-4 w-4 text-muted-foreground" />;
    
    case 'Financial (Premiums, Commissions)':
      return <DollarSign className="h-4 w-4 text-muted-foreground" />;
    
    case 'Basic Info':
      return <Calendar className="h-4 w-4 text-muted-foreground" />;
    
    default:
      return <FileText className="h-4 w-4 text-muted-foreground" />;
  }
};