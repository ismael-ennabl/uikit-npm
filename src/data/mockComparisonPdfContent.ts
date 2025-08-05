export interface PDFPage {
  pageNumber: number;
  sections: PDFSection[];
}

export interface PDFSection {
  title: string;
  content: PDFContent[];
}

export interface PDFContent {
  text: string;
  field?: string; // Maps to discrepancy field for highlighting
  isHighlightable?: boolean;
  id?: string; // Unique identifier for auto-scrolling
}

export const mockComparisonPDF: PDFPage[] = [
  // Pages 23-43 for comparison documents
  {
    pageNumber: 23,
    sections: [
      {
        title: "CERTIFICATE OF LIABILITY INSURANCE",
        content: [
          { text: "This Certificate is issued as a matter of information only and confers no rights upon the certificate holder." },
          { text: "PRODUCER: ABC Insurance Agency" },
          { text: "123 Main Street, Anytown, ST 12345" },
          { text: "Phone: (555) 123-4567" }
        ]
      },
      {
        title: "INSURED INFORMATION",
        content: [
          { text: "INSURED: ", isHighlightable: false },
          { text: "ABC Corp", field: "Business Name", isHighlightable: true, id: "business-name" },
          { text: "456 Business Blvd, Construction City, ST 54321" },
          { text: "Federal Tax ID: 12-3456789" }
        ]
      }
    ]
  },
  {
    pageNumber: 24,
    sections: [
      {
        title: "POLICY INFORMATION",
        content: [
          { text: "Policy Type: Commercial General Liability" },
          { text: "Policy Number: CGL-2025-001234" },
          { text: "Policy Effective Date: ", isHighlightable: false },
          { text: "01/16/2025", field: "Policy Effective Date", isHighlightable: true, id: "policy-effective-date" },
          { text: "Policy Expiration Date: ", isHighlightable: false },
          { text: "01/14/2026", field: "Expiration Date", isHighlightable: true },
          { text: "Territory Code: ", isHighlightable: false },
          { text: "IL", field: "Territory Code", isHighlightable: true, id: "territory-code" }
        ]
      },
      {
        title: "COVERAGE LIMITS",
        content: [
          { text: "GENERAL LIABILITY" },
          { text: "General Aggregate Limit: ", isHighlightable: false },
          { text: "$1,000,000", field: "General Liability Limit", isHighlightable: true, id: "general-liability-limit" },
          { text: "Products-Completed Operations Aggregate: $1,000,000" },
          { text: "Personal & Advertising Injury: $500,000" },
          { text: "Each Occurrence: $1,000,000" }
        ]
      }
    ]
  },
  {
    pageNumber: 25,
    sections: [
      {
        title: "AUTOMOBILE LIABILITY",
        content: [
          { text: "Combined Single Limit: ", isHighlightable: false },
          { text: "$1,000,000 Each Occurrence", field: "Auto Liability Limit", isHighlightable: true },
          { text: "Bodily Injury (Per person): $500,000" },
          { text: "Property Damage: $500,000" },
          { text: "Commercial Auto Coverage: ", isHighlightable: false },
          { text: "Not Listed", field: "Commercial Auto", isHighlightable: true, id: "commercial-auto" }
        ]
      },
      {
        title: "DEDUCTIBLES",
        content: [
          { text: "General Liability Deductible: $1,000" },
          { text: "Property Deductible: ", isHighlightable: false },
          { text: "$2,500", field: "Property Deductible", isHighlightable: true, id: "property-deductible" },
          { text: "Auto Physical Damage: ", isHighlightable: false },
          { text: "$500 Comprehensive / $500 Collision", field: "Auto Physical Damage", isHighlightable: true }
        ]
      }
    ]
  },
  {
    pageNumber: 26,
    sections: [
      {
        title: "CERTIFICATE HOLDER",
        content: [
          { text: "Certificate Holder Name: ", isHighlightable: false },
          { text: "Main Street Property Mgmt", field: "Certificate Holder Name", isHighlightable: true },
          { text: "789 Real Estate Drive" },
          { text: "Property City, ST 98765" }
        ]
      },
      {
        title: "PRODUCER INFORMATION",
        content: [
          { text: "Producer Name: ", isHighlightable: false },
          { text: "ABC Insurance Agency", field: "Producer Name", isHighlightable: true },
          { text: "License Number: 12345" },
          { text: "Contact: (555) 123-4567" }
        ]
      }
    ]
  },
  {
    pageNumber: 27,
    sections: [
      {
        title: "WORKERS COMPENSATION",
        content: [
          { text: "WC Statutory Limits: ", isHighlightable: false },
          { text: "Statutory Limits", field: "WC Statutory Limits", isHighlightable: true },
          { text: "Employers Liability: $1,000,000" },
          { text: "Experience Modifier: 0.85" }
        ]
      },
      {
        title: "DESCRIPTION OF OPERATIONS",
        content: [
          { text: "Operations Description: ", isHighlightable: false },
          { text: "Construction Services", field: "Operations Description", isHighlightable: true },
          { text: "Including but not limited to:" },
          { text: "• Commercial construction" },
          { text: "• Renovation work" }
        ]
      }
    ]
  },
  {
    pageNumber: 28,
    sections: [
      {
        title: "CERTIFICATE DATES",
        content: [
          { text: "Certificate Issue Date: ", isHighlightable: false },
          { text: "01/19/2025", field: "Certificate Issue Date", isHighlightable: true },
          { text: "Certificate Valid Through: 01/14/2026" },
          { text: "Authorized Representative: John Doe" }
        ]
      },
      {
        title: "SPECIAL PROVISIONS",
        content: [
          { text: "Additional provisions and requirements:" },
          { text: "• Certificate holder must be notified 30 days prior to cancellation" },
          { text: "• Coverage is primary and non-contributory" },
          { text: "• Waiver of subrogation applies" }
        ]
      }
    ]
  },
  {
    pageNumber: 29,
    sections: [
      {
        title: "ENDORSEMENT INFORMATION",
        content: [
          { text: "Endorsement Effective Date: ", isHighlightable: false },
          { text: "01/15/2025", field: "Endorsement Effective Date", isHighlightable: true },
          { text: "Premium Adjustment: ", isHighlightable: false },
          { text: "+$300.00", field: "Premium Adjustment", isHighlightable: true },
          { text: "Form Number: ", isHighlightable: false },
          { text: "CG 20 10 10 01", field: "Form Number", isHighlightable: true }
        ]
      }
    ]
  },
  {
    pageNumber: 30,
    sections: [
      {
        title: "UMBRELLA COVERAGE",
        content: [
          { text: "Umbrella Liability: ", isHighlightable: false },
          { text: "$10,000,000", field: "Umbrella Liability", isHighlightable: true },
          { text: "Self-Insured Retention: $10,000" },
          { text: "Coverage Territory: ", isHighlightable: false },
          { text: "US and Canada Only", field: "Coverage Territory", isHighlightable: true }
        ]
      }
    ]
  }
];

export const getComparisonHighlightableContent = (field: string): { pageNumber: number; sectionTitle: string } | null => {
  for (const page of mockComparisonPDF) {
    for (const section of page.sections) {
      const hasField = section.content.some(content => content.field === field);
      if (hasField) {
        return {
          pageNumber: page.pageNumber,
          sectionTitle: section.title
        };
      }
    }
  }
  return null;
};