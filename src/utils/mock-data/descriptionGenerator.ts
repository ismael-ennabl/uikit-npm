import { faker } from '@faker-js/faker';

// Generate description based on category and values
export const generateDescription = (category: string, field: string, sourceValue: string, compareValue: string) => {
  const templates: Record<string, string[]> = {
    'Premiums': [
      `${field} amounts differ between documents`,
      `Financial values do not match`,
      `Premium and commission figures vary`,
      `Premium calculation discrepancy identified`
    ],
    'Limits': [
      `${field} values differ between documents`,
      `Coverage limit discrepancy identified`,
      `Limit amounts do not match`,
      `Deductible values vary`
    ],
    'Basic Info': [
      `Policy information differs`,
      `Basic policy details do not match`,
      `Policy identifier format varies`,
      `Date information inconsistency`,
      `Territory or producer information differs`
    ],
    'Insured': [
      `Named insured information differs`,
      `Business entity details do not match`,
      `Address format varies between documents`,
      `Entity designation inconsistency`,
      `Business information discrepancy`
    ],
    'Carriers': [
      `Insurance carrier information differs`,
      `Carrier details do not match`,
      `Company rating or code varies`,
      `NAIC number inconsistency`
    ],
    'Coverages': [
      `Coverage details differ`,
      `Policy form information varies`,
      `Coverage type designation differs`,
      `Coverage specification inconsistency`,
      `Primary status specification varies`
    ],
    'Schedule of Operations': [
      `Classification code differs`,
      `Business operations description varies`,
      `Risk category designation differs`,
      `Operation type inconsistency`
    ],
    'Endorsements': [
      `Endorsement details differ`,
      `Additional insured status varies`,
      `Waiver provisions inconsistent`,
      `Primary and non-contributory status differs`
    ],
    'Exclusions': [
      `Exclusion language differs`,
      `Coverage exclusions vary`,
      `Risk exclusion inconsistency`,
      `Excluded perils do not match`
    ]
  };

  const categoryTemplates = templates[category] || [`${field} values differ between documents`];
  return faker.helpers.arrayElement(categoryTemplates);
};