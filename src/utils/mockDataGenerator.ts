import { faker } from '@faker-js/faker';
import { Discrepancy } from '@/types/comparison';
import { categoryCountMap } from './discrepancyMappings';
import { fieldVariations } from './mock-data/fieldVariations';
import { sectionVariations } from './mock-data/sectionVariations';
import { generateRealisticValues } from './mock-data/valueGenerators';
import { generateDescription } from './mock-data/descriptionGenerator';
import { documentIds } from './mock-data/documentIds';

export const generateDiscrepancies = (): Discrepancy[] => {
  console.log('Starting discrepancy generation...');
  console.log('categoryCountMap:', categoryCountMap);
  
  const discrepancies: Discrepancy[] = [];
  let idCounter = 1;
  const availableDocIds = documentIds.slice(1); // Remove 'policy' as it's source of truth

  // Generate discrepancies for each category with controlled distribution
  Object.entries(categoryCountMap).forEach(([category, totalCount]) => {
    const fields = fieldVariations[category] || [category];
    
    // Use exact count from mapping, max 6 differences per category and max 3-4 documents
    const actualCount = Math.min(totalCount, 6);
    const minDocuments = 2;
    const maxDocuments = Math.min(4, availableDocIds.length);
    const numDocuments = Math.max(minDocuments, Math.min(maxDocuments, Math.ceil(actualCount / 2)));
    
    // Select documents for this category
    const selectedDocs = faker.helpers.shuffle([...availableDocIds]).slice(0, numDocuments);
    
    // Distribute count across selected documents
    const baseCountPerDoc = Math.floor(actualCount / numDocuments);
    const remainder = actualCount % numDocuments;
    
    selectedDocs.forEach((documentId, docIndex) => {
      // Add extra discrepancy to first 'remainder' documents
      const countForThisDoc = baseCountPerDoc + (docIndex < remainder ? 1 : 0);
      
      // Track used fields to ensure uniqueness within category
      const usedFields = new Set<string>();
      
      for (let i = 0; i < countForThisDoc; i++) {
        // Get unique field for this category
        let field = faker.helpers.arrayElement(fields);
        let attempts = 0;
        while (usedFields.has(`${field}_${documentId}`) && attempts < 20) {
          field = faker.helpers.arrayElement(fields);
          attempts++;
        }
        usedFields.add(`${field}_${documentId}`);
        
        const section = faker.helpers.arrayElement(sectionVariations);
        const values = generateRealisticValues(category, field);
        const description = generateDescription(category, field, values.sourceValue, values.compareValue);

        discrepancies.push({
          id: idCounter++,
          type: field,
          field,
          section,
          sourceValue: values.sourceValue,
          compareValue: values.compareValue,
          description,
          documentId,
          page: faker.number.int({ min: 1, max: 15 }),
          row: faker.number.int({ min: 1, max: 50 })
        });
      }
    });
  });

  // Shuffle to make distribution less obvious
  const result = faker.helpers.shuffle(discrepancies);
  console.log('Generated discrepancies count:', result.length);
  console.log('Sample discrepancies:', result.slice(0, 3));
  return result;
};