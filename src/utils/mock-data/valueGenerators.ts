import { faker } from '@faker-js/faker';

// Generate realistic values based on field type
export const generateRealisticValues = (category: string, field: string) => {
  const companyNames = ['ABC Construction LLC', 'Smith Manufacturing Inc', 'Metro Retail Corp', 'TechForward Solutions', 'Healthcare Partners LLC', 'Elite Transportation Co'];
  const carrierNames = ['State Farm Insurance', 'Liberty Mutual', 'Travelers Insurance', 'Hartford Insurance', 'Zurich North America', 'CNA Insurance'];
  
  switch (category) {
    case 'Premiums':
      if (field.includes('Premium')) {
        const amounts = ['$15,485', '$28,750', '$42,300', '$65,890', '$89,250'];
        return {
          sourceValue: faker.helpers.arrayElement(amounts),
          compareValue: faker.helpers.arrayElement(amounts.filter(a => a !== amounts[0]))
        };
      } else if (field.includes('Commission')) {
        const rates = ['12.5%', '15.0%', '18.5%', '20.0%'];
        return {
          sourceValue: faker.helpers.arrayElement(rates),
          compareValue: faker.helpers.arrayElement(rates.filter(r => r !== rates[0]))
        };
      }
      break;

    case 'Limits':
      if (field.includes('Limit')) {
        const limits = ['$1,000,000', '$2,000,000', '$5,000,000', '$10,000,000'];
        return {
          sourceValue: faker.helpers.arrayElement(limits),
          compareValue: faker.helpers.arrayElement(limits.filter(l => l !== limits[0]))
        };
      } else if (field.includes('Deductible')) {
        const deductibles = ['$2,500', '$5,000', '$10,000', '$25,000'];
        return {
          sourceValue: faker.helpers.arrayElement(deductibles),
          compareValue: faker.helpers.arrayElement(deductibles.filter(d => d !== deductibles[0]))
        };
      }
      break;

    case 'Basic Info':
      if (field.includes('Policy Number')) {
        const basePolicy = faker.string.alphanumeric(6).toUpperCase();
        return {
          sourceValue: `POL-2024-${basePolicy}-001`,
          compareValue: `POL2024${basePolicy}001`
        };
      } else if (field.includes('Date')) {
        const date1 = faker.date.recent({ days: 30 });
        const date2 = faker.date.recent({ days: 60 });
        return {
          sourceValue: date1.toLocaleDateString('en-US'),
          compareValue: date2.toLocaleDateString('en-US')
        };
      } else if (field.includes('Territory')) {
        const territories = ['TX', 'CA', 'NY', 'FL', 'IL'];
        return {
          sourceValue: faker.helpers.arrayElement(territories),
          compareValue: faker.helpers.arrayElement(territories.filter(t => t !== territories[0]))
        };
      } else if (field.includes('Producer')) {
        const producers = ['Johnson Insurance Agency', 'Metro Insurance Brokers', 'Elite Risk Advisors', 'Premier Insurance Group'];
        return {
          sourceValue: faker.helpers.arrayElement(producers),
          compareValue: faker.helpers.arrayElement(producers.filter(p => p !== producers[0]))
        };
      }
      break;

    case 'Insured':
      if (field.includes('Named Insured') || field.includes('Business')) {
        const sourceCompany = faker.helpers.arrayElement(companyNames);
        const compareCompany = sourceCompany.replace(' LLC', ' Inc').replace(' Inc', ' Corp').replace(' Corp', ' LLC');
        return {
          sourceValue: sourceCompany,
          compareValue: compareCompany
        };
      } else if (field.includes('Address')) {
        const address = faker.location.streetAddress();
        const city = faker.location.city();
        const state = faker.location.state({ abbreviated: true });
        const zip = faker.location.zipCode();
        return {
          sourceValue: `${address}, ${city}, ${state} ${zip}`,
          compareValue: `${address.replace('Street', 'St').replace('Avenue', 'Ave')}, ${city}, ${state} ${zip}`
        };
      } else if (field.includes('Entity Type')) {
        const types = ['LLC', 'Corporation', 'Partnership', 'Sole Proprietorship'];
        return {
          sourceValue: faker.helpers.arrayElement(types),
          compareValue: faker.helpers.arrayElement(types.filter(t => t !== types[0]))
        };
      } else if (field.includes('Tax ID')) {
        return {
          sourceValue: `${faker.string.numeric(2)}-${faker.string.numeric(7)}`,
          compareValue: `${faker.string.numeric(2)}-${faker.string.numeric(7)}`
        };
      }
      break;

    case 'Carriers':
      if (field.includes('Insurance Carrier')) {
        return {
          sourceValue: faker.helpers.arrayElement(carrierNames),
          compareValue: faker.helpers.arrayElement(carrierNames.filter(c => c !== carrierNames[0]))
        };
      } else if (field.includes('NAIC')) {
        return {
          sourceValue: faker.string.numeric(5),
          compareValue: faker.string.numeric(5)
        };
      } else if (field.includes('Rating')) {
        const ratings = ['A++', 'A+', 'A', 'A-', 'B++'];
        return {
          sourceValue: faker.helpers.arrayElement(ratings),
          compareValue: faker.helpers.arrayElement(ratings.filter(r => r !== ratings[0]))
        };
      } else if (field.includes('Code')) {
        return {
          sourceValue: faker.string.alphanumeric(4).toUpperCase(),
          compareValue: faker.string.alphanumeric(4).toUpperCase()
        };
      }
      break;

    case 'Coverages':
      if (field.includes('Coverage Type')) {
        const types = ['General Liability', 'Commercial Auto', 'Workers Compensation', 'Property', 'Umbrella'];
        return {
          sourceValue: faker.helpers.arrayElement(types),
          compareValue: faker.helpers.arrayElement(types.filter(t => t !== types[0]))
        };
      } else if (field.includes('Form')) {
        const forms = ['CG 00 01', 'CA 00 01', 'WC 00 01', 'CP 00 10'];
        return {
          sourceValue: faker.helpers.arrayElement(forms),
          compareValue: faker.helpers.arrayElement(forms.filter(f => f !== forms[0]))
        };
      } else if (field.includes('Endorsement')) {
        return {
          sourceValue: `END-${faker.string.numeric(3)}`,
          compareValue: `END-${faker.string.numeric(3)}`
        };
      } else if (field.includes('Primary')) {
        return {
          sourceValue: 'Yes - Primary and Non-Contributory',
          compareValue: 'Not Specified'
        };
      }
      break;

    case 'Schedule of Operations':
      if (field.includes('Classification')) {
        const codes = ['8810 - Clerical', '5403 - Carpentry', '8742 - Salespersons', '3724 - Manufacturing'];
        return {
          sourceValue: faker.helpers.arrayElement(codes),
          compareValue: faker.helpers.arrayElement(codes.filter(c => c !== codes[0]))
        };
      } else if (field.includes('Operations')) {
        const ops = ['General Office Work', 'Construction Activities', 'Sales Operations', 'Manufacturing'];
        return {
          sourceValue: faker.helpers.arrayElement(ops),
          compareValue: faker.helpers.arrayElement(ops.filter(o => o !== ops[0]))
        };
      }
      break;

    case 'Endorsements':
      if (field.includes('Additional Insured')) {
        return {
          sourceValue: 'Included per CG 20 10',
          compareValue: 'Not Specified'
        };
      } else if (field.includes('Waiver')) {
        return {
          sourceValue: 'Waiver of Subrogation Applies',
          compareValue: 'Standard Subrogation Rights'
        };
      } else if (field.includes('Primary')) {
        return {
          sourceValue: 'Primary and Non-Contributory',
          compareValue: 'Contributory Coverage'
        };
      }
      break;

    case 'Exclusions':
      if (field.includes('Professional Liability')) {
        return {
          sourceValue: 'Professional Services Excluded',
          compareValue: 'Limited Professional Coverage'
        };
      } else if (field.includes('Pollution')) {
        return {
          sourceValue: 'Pollution Exclusion Applies',
          compareValue: 'Limited Pollution Coverage'
        };
      } else if (field.includes('War Risk')) {
        return {
          sourceValue: 'War Risk Excluded',
          compareValue: 'War Risk Coverage Included'
        };
      }
      break;

    default:
      // Fallback with realistic insurance data
      return {
        sourceValue: 'Standard Coverage',
        compareValue: 'Modified Coverage'
      };
  }

  // Additional fallback for specific fields
  if (field.includes('Date')) {
    const date1 = faker.date.recent({ days: 30 });
    const date2 = faker.date.recent({ days: 60 });
    return {
      sourceValue: date1.toLocaleDateString('en-US'),
      compareValue: date2.toLocaleDateString('en-US')
    };
  }

  return {
    sourceValue: 'Standard Value',
    compareValue: 'Alternative Value'
  };
};