import { faker } from '@faker-js/faker';

export const generatePrimaryDocumentValue = (field: string, categoryType: string) => {
  const companyNames = ['ABC Construction LLC', 'Smith Manufacturing Inc', 'Metro Retail Corp'];
  const carrierNames = ['State Farm Insurance', 'Liberty Mutual', 'Travelers Insurance'];
  
  switch (categoryType) {
    case 'Premiums':
      if (field.includes('Premium')) {
        return faker.helpers.arrayElement(['$15,485', '$28,750', '$42,300']);
      } else if (field.includes('Commission')) {
        return faker.helpers.arrayElement(['12.5%', '15.0%', '18.5%']);
      }
      break;

    case 'Limits':
      if (field.includes('Limit')) {
        return faker.helpers.arrayElement(['$1,000,000', '$2,000,000', '$5,000,000']);
      } else if (field.includes('Deductible')) {
        return faker.helpers.arrayElement(['$2,500', '$5,000', '$10,000']);
      }
      break;

    case 'Basic Info':
      if (field.includes('Policy Number')) {
        return `POL-2025-${faker.string.alphanumeric(6).toUpperCase()}-001`;
      } else if (field.includes('Date')) {
        return faker.date.recent({ days: 30 }).toLocaleDateString('en-US');
      } else if (field.includes('Territory')) {
        return faker.helpers.arrayElement(['TX', 'CA', 'NY', 'FL']);
      } else if (field.includes('Producer')) {
        return faker.helpers.arrayElement(['Johnson Insurance Agency', 'Metro Insurance Brokers']);
      }
      break;

    case 'Insured':
      if (field.includes('Named Insured') || field.includes('Business')) {
        return faker.helpers.arrayElement(companyNames);
      } else if (field.includes('Address')) {
        const address = faker.location.streetAddress();
        const city = faker.location.city();
        const state = faker.location.state({ abbreviated: true });
        const zip = faker.location.zipCode();
        return `${address}, ${city}, ${state} ${zip}`;
      } else if (field.includes('Entity Type')) {
        return faker.helpers.arrayElement(['LLC', 'Corporation', 'Partnership']);
      } else if (field.includes('Tax ID')) {
        return `${faker.string.numeric(2)}-${faker.string.numeric(7)}`;
      }
      break;

    case 'Carriers':
      if (field.includes('Insurance Carrier')) {
        return faker.helpers.arrayElement(carrierNames);
      } else if (field.includes('NAIC')) {
        return faker.string.numeric(5);
      } else if (field.includes('Rating')) {
        return faker.helpers.arrayElement(['A++', 'A+', 'A', 'A-']);
      } else if (field.includes('Code')) {
        return faker.string.alphanumeric(4).toUpperCase();
      }
      break;

    case 'Coverages':
      if (field.includes('Coverage Type')) {
        return faker.helpers.arrayElement(['General Liability', 'Commercial Auto', 'Workers Compensation']);
      } else if (field.includes('Form')) {
        return faker.helpers.arrayElement(['CG 00 01', 'CA 00 01', 'WC 00 01']);
      } else if (field.includes('Endorsement')) {
        return `END-${faker.string.numeric(3)}`;
      } else if (field.includes('Primary')) {
        return 'Yes - Primary and Non-Contributory';
      }
      break;

    case 'Schedule of Operations':
      if (field.includes('Classification')) {
        return faker.helpers.arrayElement(['8810 - Clerical', '5403 - Carpentry', '8742 - Salespersons']);
      } else if (field.includes('Operations')) {
        return faker.helpers.arrayElement(['General Office Work', 'Construction Activities', 'Sales Operations']);
      }
      break;

    case 'Limits':
      if (field.includes('Limit')) {
        return faker.helpers.arrayElement(['$1,000,000', '$2,000,000', '$5,000,000']);
      } else if (field.includes('Deductible')) {
        return faker.helpers.arrayElement(['$2,500', '$5,000', '$10,000']);
      }
      break;

    case 'Endorsements':
      if (field.includes('Additional Insured')) {
        return 'Included per CG 20 10';
      } else if (field.includes('Waiver')) {
        return 'Waiver of Subrogation Applies';
      } else if (field.includes('Primary')) {
        return 'Primary and Non-Contributory';
      }
      break;

    case 'Exclusions':
      if (field.includes('Professional Liability')) {
        return 'Professional Services Excluded';
      } else if (field.includes('Pollution')) {
        return 'Pollution Exclusion Applies';
      } else if (field.includes('War Risk')) {
        return 'War Risk Excluded';
      }
      break;

    default:
      if (field.includes('Date')) {
        return faker.date.recent({ days: 30 }).toLocaleDateString('en-US');
      }
      return 'Standard Coverage';
  }

  return 'Standard Value';
};