import { faker } from '@faker-js/faker';

export interface InsuranceProduct {
  productName: string;
  carrier: string;
  coverageAmount: string;
  status: 'Active' | 'Pending' | 'Expired';
  policyType: string;
  effectiveDate: string;
  expirationDate: string;
}

export interface InsuranceClient {
  companyName: string;
  broker: string;
  policyNumber: string;
  premium: string;
  status: 'Active' | 'Pending Renewal' | 'Lapsed';
  industry: string;
  contactEmail: string;
  phoneNumber: string;
}

export const generateProductRow = (): InsuranceProduct => ({
  productName: faker.helpers.arrayElement([
    'Cyber Liability',
    'General Liability',
    'Errors & Omissions',
    'Directors & Officers',
    'Workers Comp',
    'Professional Liability',
    'Commercial Auto',
    'Property Insurance',
    'Umbrella Policy',
    'Employment Practices'
  ]),
  carrier: faker.company.name(),
  coverageAmount: `$${faker.number.int({ min: 10000, max: 1000000 }).toLocaleString()}`,
  status: faker.helpers.arrayElement(['Active', 'Pending', 'Expired']),
  policyType: faker.helpers.arrayElement(['Primary', 'Excess', 'Umbrella']),
  effectiveDate: faker.date.recent({ days: 365 }).toLocaleDateString(),
  expirationDate: faker.date.future({ years: 1 }).toLocaleDateString(),
});

export const generateClientRow = (): InsuranceClient => ({
  companyName: faker.company.name(),
  broker: faker.person.fullName(),
  policyNumber: faker.finance.accountNumber(),
  premium: `$${(faker.number.float({ min: 1000, max: 50000 }) * 100 / 100).toFixed(2)}`,
  status: faker.helpers.arrayElement(['Active', 'Pending Renewal', 'Lapsed']),
  industry: faker.helpers.arrayElement([
    'Technology',
    'Healthcare',
    'Manufacturing',
    'Construction',
    'Financial Services',
    'Retail',
    'Real Estate',
    'Consulting'
  ]),
  contactEmail: faker.internet.email(),
  phoneNumber: faker.phone.number(),
});

export const generateProductsData = (count: number = 5): InsuranceProduct[] => {
  return Array.from({ length: count }, generateProductRow);
};

export const generateClientsData = (count: number = 5): InsuranceClient[] => {
  return Array.from({ length: count }, generateClientRow);
}; 