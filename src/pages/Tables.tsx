import { Section, ProductsTable, ClientsTable } from 'ennabl-ui-kit-beta';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import 'ennabl-ui-kit-beta/dist/index.css';

const Tables = () => {
  // Sample data for custom table
  const sampleData = [
    { id: 1, name: "John Doe", department: "Engineering", salary: "$85,000", status: "Active" },
    { id: 2, name: "Jane Smith", department: "Marketing", salary: "$72,000", status: "Active" },
    { id: 3, name: "Bob Johnson", department: "Sales", salary: "$68,000", status: "On Leave" },
    { id: 4, name: "Alice Brown", department: "HR", salary: "$75,000", status: "Active" },
    { id: 5, name: "Charlie Wilson", department: "Finance", salary: "$82,000", status: "Active" }
  ];

  return (
    <div className="p-6 space-y-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Tables</h1>
          <p className="text-muted-foreground">Examples of data tables using Ennabl UI Kit components</p>
        </div>

        {/* Insurance Products Table */}
        <Section 
          id="insurance-products"
          title="Insurance Products"
          className="mb-8"
          showDragHandle={true}
          badges={[{ text: "Live Data", variant: "secondary" }]}
        >
          <ProductsTable 
            rows={8}
            showHeader={false}
            className="mt-4"
          />
        </Section>

        {/* Insurance Clients Table */}
        <Section 
          id="insurance-clients"
          title="Insurance Clients"
          className="mb-8"
          showDragHandle={true}
          badges={[{ text: "Contact Info", variant: "outline" }]}
        >
          <ClientsTable 
            rows={6}
            showHeader={false}
            showContactInfo={true}
            className="mt-4"
          />
        </Section>

        {/* Custom Employee Table */}
        <Section 
          id="employee-directory"
          title="Employee Directory"
          className="mb-8"
          showDragHandle={true}
          badges={[{ text: "Static Data", variant: "destructive" }]}
        >
          <div className="mt-4 rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Salary</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sampleData.map((employee) => (
                  <TableRow key={employee.id}>
                    <TableCell className="font-medium">{employee.id}</TableCell>
                    <TableCell>{employee.name}</TableCell>
                    <TableCell>{employee.department}</TableCell>
                    <TableCell className="font-mono">{employee.salary}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                        employee.status === 'Active' 
                          ? 'bg-green-50 text-green-700 ring-1 ring-green-600/20'
                          : 'bg-yellow-50 text-yellow-700 ring-1 ring-yellow-600/20'
                      }`}>
                        {employee.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Section>
      </div>
    </div>
  );
};

export default Tables;