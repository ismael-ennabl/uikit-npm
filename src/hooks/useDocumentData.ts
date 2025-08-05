export interface Document {
  id: number;
  name: string;
  uploadDate: string;
  company: string;
  category: string;
  products: number;
  fileType: string;
  status: 'completed' | 'in-progress' | 'new';
  pages: number;
  size: string;
}

export const useDocumentData = () => {
  const documents: Document[] = [
    // Processing documents (2)
    {
      id: 1,
      name: 'test_wc (2).pdf',
      uploadDate: '2025-06-15',
      company: 'Liberty Mutual Insurance',
      category: 'Workers Compensation',
      products: 2,
      fileType: 'PDF',
      status: 'in-progress',
      pages: 67,
      size: '1.8 MB'
    },
    {
      id: 2,
      name: 'test_gl_cert (1).pdf',
      uploadDate: '2025-06-14',
      company: 'Hartford Insurance',
      category: 'General Liability',
      products: 1,
      fileType: 'PDF',
      status: 'in-progress',
      pages: 45,
      size: '1.2 MB'
    },
    // New documents (2)
    {
      id: 3,
      name: 'property_certificate.pdf',
      uploadDate: '2025-07-07',
      company: 'Zurich Insurance',
      category: 'Property',
      products: 1,
      fileType: 'PDF',
      status: 'new',
      pages: 38,
      size: '1.5 MB'
    },
    {
      id: 4,
      name: 'endorsement_package.pdf',
      uploadDate: '2025-07-06',
      company: 'AIG Insurance',
      category: 'General Liability',
      products: 3,
      fileType: 'PDF',
      status: 'new',
      pages: 23,
      size: '890 KB'
    },
    // Completed documents (14)
    {
      id: 5,
      name: 'policy1.pdf',
      uploadDate: '2025-06-16',
      company: 'AXIS Surplus Insurance Company',
      category: 'Workers Compensation',
      products: 4,
      fileType: 'PDF',
      status: 'completed',
      pages: 85,
      size: '2.4 MB'
    },
    {
      id: 6,
      name: 'commercial_auto_policy_anonymized (2).pdf',
      uploadDate: '2025-06-13',
      company: 'State Farm Insurance',
      category: 'Commercial Auto',
      products: 3,
      fileType: 'PDF',
      status: 'completed',
      pages: 66,
      size: '2.1 MB'
    },
    {
      id: 7,
      name: 'cyber_liability_cert.pdf',
      uploadDate: '2025-06-12',
      company: 'Chubb Insurance',
      category: 'Cyber Liability',
      products: 1,
      fileType: 'PDF',
      status: 'completed',
      pages: 32,
      size: '1.1 MB'
    },
    {
      id: 8,
      name: 'umbrella_policy_2024.pdf',
      uploadDate: '2025-06-11',
      company: 'Travelers Insurance',
      category: 'Umbrella',
      products: 2,
      fileType: 'PDF',
      status: 'completed',
      pages: 54,
      size: '1.9 MB'
    },
    {
      id: 9,
      name: 'loss_run_report_wc.pdf',
      uploadDate: '2025-06-10',
      company: 'Liberty Mutual Insurance',
      category: 'Workers Compensation',
      products: 1,
      fileType: 'PDF',
      status: 'completed',
      pages: 28,
      size: '950 KB'
    },
    {
      id: 10,
      name: 'directors_officers_policy.pdf',
      uploadDate: '2025-06-09',
      company: 'Allianz Insurance',
      category: 'Directors & Officers',
      products: 5,
      fileType: 'PDF',
      status: 'completed',
      pages: 72,
      size: '2.3 MB'
    },
    {
      id: 11,
      name: 'epl_certificate.pdf',
      uploadDate: '2025-06-08',
      company: 'AXA Insurance',
      category: 'Employment Practices',
      products: 1,
      fileType: 'PDF',
      status: 'completed',
      pages: 19,
      size: '780 KB'
    },
    {
      id: 12,
      name: 'fleet_auto_summary.pdf',
      uploadDate: '2025-06-07',
      company: 'Progressive Insurance',
      category: 'Commercial Auto',
      products: 4,
      fileType: 'PDF',
      status: 'completed',
      pages: 41,
      size: '1.4 MB'
    },
    {
      id: 13,
      name: 'professional_liability_dec.pdf',
      uploadDate: '2025-06-06',
      company: 'Hiscox Insurance',
      category: 'Professional Liability',
      products: 2,
      fileType: 'PDF',
      status: 'completed',
      pages: 35,
      size: '1.3 MB'
    },
    {
      id: 14,
      name: 'warehouse_property_policy.pdf',
      uploadDate: '2025-06-05',
      company: 'FM Global',
      category: 'Property',
      products: 3,
      fileType: 'PDF',
      status: 'completed',
      pages: 89,
      size: '2.8 MB'
    },
    {
      id: 15,
      name: 'contractor_gl_cert.pdf',
      uploadDate: '2025-06-04',
      company: 'CNA Insurance',
      category: 'General Liability',
      products: 1,
      fileType: 'PDF',
      status: 'completed',
      pages: 26,
      size: '920 KB'
    },
    {
      id: 16,
      name: 'marine_cargo_policy.pdf',
      uploadDate: '2025-06-03',
      company: 'Lloyd\'s of London',
      category: 'Marine',
      products: 2,
      fileType: 'PDF',
      status: 'completed',
      pages: 58,
      size: '2.0 MB'
    },
    {
      id: 17,
      name: 'product_liability_endorsement.pdf',
      uploadDate: '2025-06-02',
      company: 'Berkshire Hathaway',
      category: 'Product Liability',
      products: 3,
      fileType: 'PDF',
      status: 'completed',
      pages: 43,
      size: '1.6 MB'
    },
    {
      id: 18,
      name: 'aviation_hull_coverage.pdf',
      uploadDate: '2025-06-01',
      company: 'Global Aerospace',
      category: 'Aviation',
      products: 1,
      fileType: 'PDF',
      status: 'completed',
      pages: 61,
      size: '2.2 MB'
    }
  ];

  const totalDocuments = 1908; // Display total as 1908 instead of actual array length
  const digitizedPages = documents.reduce((sum, doc) => sum + doc.pages, 0);
  const processingDocuments = documents.filter(doc => doc.status === 'in-progress' || doc.status === 'new').length;

  return {
    documents,
    totalDocuments,
    digitizedPages,
    processingDocuments
  };
};