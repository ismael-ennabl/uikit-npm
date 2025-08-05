
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

export const mockInsurancePDF: PDFPage[] = [
  {
    pageNumber: 1,
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
          { text: "ABC Corporation", field: "Business Name", isHighlightable: true, id: "business-name" },
          { text: "456 Business Blvd, Construction City, ST 54321" },
          { text: "Federal Tax ID: 12-3456789" }
        ]
      },
      {
        title: "POLICY INFORMATION",
        content: [
          { text: "Policy Type: Commercial General Liability" },
          { text: "Policy Number: CGL-2025-001234" },
          { text: "Policy Effective Date: ", isHighlightable: false },
          { text: "01/15/2025", field: "Policy Effective Date", isHighlightable: true, id: "policy-effective-date" },
          { text: "Policy Expiration Date: 12/31/2025" },
          { text: "Territory Code: ", isHighlightable: false },
          { text: "FL", field: "Territory Code", isHighlightable: true, id: "territory-code" }
        ]
      }
    ]
  },
  {
    pageNumber: 2,
    sections: [
      {
        title: "COVERAGE LIMITS",
        content: [
          { text: "GENERAL LIABILITY" },
          { text: "General Aggregate Limit: ", isHighlightable: false },
          { text: "$2,000,000", field: "General Liability Limit", isHighlightable: true, id: "general-liability-limit" },
          { text: "Products-Completed Operations Aggregate: $2,000,000" },
          { text: "Personal & Advertising Injury: $1,000,000" },
          { text: "Each Occurrence: $1,000,000" },
          { text: "Fire Damage (Any one fire): $50,000" },
          { text: "Medical Expense (Any one person): $5,000" }
        ]
      },
      {
        title: "AUTOMOBILE LIABILITY",
        content: [
          { text: "Combined Single Limit: $1,000,000" },
          { text: "Bodily Injury (Per person): $500,000" },
          { text: "Bodily Injury (Per accident): $1,000,000" },
          { text: "Property Damage: $500,000" },
          { text: "Commercial Auto Coverage: ", isHighlightable: false },
          { text: "Included", field: "Commercial Auto", isHighlightable: true, id: "commercial-auto" }
        ]
      },
      {
        title: "DEDUCTIBLES",
        content: [
          { text: "General Liability Deductible: $1,000" },
          { text: "Property Deductible: ", isHighlightable: false },
          { text: "$5,000", field: "Property Deductible", isHighlightable: true, id: "property-deductible" },
          { text: "Auto Physical Damage Deductible: $500" }
        ]
      }
    ]
  },
  {
    pageNumber: 3,
    sections: [
      {
        title: "ADDITIONAL COVERAGES",
        content: [
          { text: "Workers' Compensation: As required by law" },
          { text: "Employers' Liability: $1,000,000" },
          { text: "Professional Liability: $1,000,000" },
          { text: "Cyber Liability: $500,000" }
        ]
      },
      {
        title: "CERTIFICATE HOLDER",
        content: [
          { text: "XYZ Property Management" },
          { text: "789 Real Estate Drive" },
          { text: "Property City, ST 98765" }
        ]
      },
      {
        title: "DESCRIPTION OF OPERATIONS",
        content: [
          { text: "General contracting and construction services including but not limited to:" },
          { text: "• Commercial building construction" },
          { text: "• Residential construction" },
          { text: "• Renovation and remodeling" },
          { text: "• Site preparation and excavation" }
        ]
      }
    ]
  },
  // Additional pages for Source of Truth document (19-22)
  {
    pageNumber: 19,
    sections: [
      {
        title: "UMBRELLA LIABILITY COVERAGE",
        content: [
          { text: "Umbrella Liability Limit: ", isHighlightable: false },
          { text: "$5,000,000", field: "Umbrella Liability", isHighlightable: true },
          { text: "Underlying Insurance Requirements:" },
          { text: "• General Liability: $1,000,000" },
          { text: "• Auto Liability: $1,000,000" },
          { text: "• Employers Liability: $1,000,000" }
        ]
      },
      {
        title: "WAIVER OF SUBROGATION",
        content: [
          { text: "Subrogation Rights: ", isHighlightable: false },
          { text: "Waived in favor of certificate holder", field: "Subrogation Waiver", isHighlightable: true },
          { text: "Applies to: All coverages listed herein" },
          { text: "Effective for: Policy term and any renewals" }
        ]
      }
    ]
  },
  {
    pageNumber: 20,
    sections: [
      {
        title: "ADDITIONAL INSURED PROVISIONS",
        content: [
          { text: "Additional Insured Status: ", isHighlightable: false },
          { text: "Blanket Additional Insured", field: "Additional Insured Status", isHighlightable: true },
          { text: "Coverage Scope: Ongoing and completed operations" },
          { text: "Form Numbers: CG 20 10 04 13, CG 20 37 04 13" },
          { text: "Primary and Non-Contributory: ", isHighlightable: false },
          { text: "Yes", field: "Primary and Non-Contributory", isHighlightable: true }
        ]
      },
      {
        title: "RETROACTIVE DATE",
        content: [
          { text: "Retroactive Date: ", isHighlightable: false },
          { text: "01/01/2020", field: "Retroactive Date", isHighlightable: true },
          { text: "Coverage Territory: ", isHighlightable: false },
          { text: "United States and Canada", field: "Territory", isHighlightable: true }
        ]
      }
    ]
  },
  {
    pageNumber: 21,
    sections: [
      {
        title: "PREMIUM INFORMATION",
        content: [
          { text: "Annual Premium: ", isHighlightable: false },
          { text: "$24,500", field: "Annual Premium", isHighlightable: true },
          { text: "Payment Terms: Annual" },
          { text: "Premium Includes: All coverages listed" },
          { text: "Effective Date: 01/15/2025" },
          { text: "Next Premium Due: 01/15/2026" }
        ]
      },
      {
        title: "POLICY FORMS AND ENDORSEMENTS",
        content: [
          { text: "Base Policy Form: CG 00 01 04 13" },
          { text: "Additional Insured Endorsement: CG 20 10 04 13" },
          { text: "Waiver of Subrogation: CG 24 04 05 09" },
          { text: "Primary and Non-Contributory: CG 20 01 04 13" }
        ]
      }
    ]
  },
  {
    pageNumber: 22,
    sections: [
      {
        title: "NAMED INSURED ENTITIES",
        content: [
          { text: "Primary Named Insured: ", isHighlightable: false },
          { text: "ABC Corporation", field: "Business Name", isHighlightable: true },
          { text: "Additional Named Insured: ", isHighlightable: false },
          { text: "ABC Holdings LLC", field: "Additional Named Insured", isHighlightable: true },
          { text: "Subsidiary Companies: Automatically included" },
          { text: "Joint Ventures: Coverage applies when named insured has control" }
        ]
      },
      {
        title: "CONTACT INFORMATION",
        content: [
          { text: "Claims Reporting: 1-800-CLAIMS-1" },
          { text: "Policy Service: (555) 123-4567" },
          { text: "Underwriter: Jane Smith" },
          { text: "Producer: ABC Insurance Agency" },
          { text: "Certificate Prepared By: Sarah Chen" },
          { text: "Date Prepared: 01/20/2025" }
        ]
      }
    ]
  }
];

export const getHighlightableContent = (field: string): { pageNumber: number; sectionTitle: string } | null => {
  for (const page of mockInsurancePDF) {
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
