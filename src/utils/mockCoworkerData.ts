import { faker } from '@faker-js/faker';

export interface Coworker {
  id: string;
  name: string;
  email: string;
  department: string;
}

// Pre-defined coworkers
const predefinedCoworkers: Coworker[] = [
  {
    id: '1',
    name: 'Kabir',
    email: 'kabir@ennabl.com',
    department: 'Engineering'
  },
  {
    id: '2', 
    name: 'Jigar',
    email: 'jigar@ennabl.com',
    department: 'Product'
  },
  {
    id: '3',
    name: 'Iviejo',
    email: 'iviejo@ennabl.com',
    department: 'Design'
  },
  {
    id: '4',
    name: 'Marina',
    email: 'marina@ennabl.com',
    department: 'Marketing'
  }
];

// Generate additional fake coworkers
const generateFakeCoworkers = (count: number): Coworker[] => {
  const departments = ['Engineering', 'Product', 'Design', 'Marketing', 'Sales', 'HR', 'Finance'];
  
  return Array.from({ length: count }, (_, index) => {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@ennabl.com`;
    
    return {
      id: `fake-${index + 5}`,
      name: `${firstName} ${lastName}`,
      email,
      department: faker.helpers.arrayElement(departments)
    };
  });
};

// Combine predefined and fake coworkers
export const mockCoworkers: Coworker[] = [
  ...predefinedCoworkers,
  ...generateFakeCoworkers(20)
];

// Filter coworkers by search term
export const filterCoworkers = (searchTerm: string): Coworker[] => {
  if (!searchTerm.trim()) return mockCoworkers;
  
  const term = searchTerm.toLowerCase();
  return mockCoworkers.filter(
    coworker =>
      coworker.name.toLowerCase().includes(term) ||
      coworker.email.toLowerCase().includes(term) ||
      coworker.department.toLowerCase().includes(term)
  );
};