import { Section, ProductsTable, ClientsTable } from 'ennabl-ui-kit-beta';
import AnchorNavBar from '@/components/AnchorNavBar';
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

  // Sample data for project tracking table
  const projectData = [
    { id: 1, project: "Website Redesign", client: "Acme Corp", progress: 85, budget: "$45,000", deadline: "2024-09-15" },
    { id: 2, project: "Mobile App", client: "Tech Solutions", progress: 60, budget: "$120,000", deadline: "2024-10-30" },
    { id: 3, project: "Database Migration", client: "Data Systems Inc", progress: 95, budget: "$25,000", deadline: "2024-08-20" },
    { id: 4, project: "API Development", client: "Cloud Services", progress: 40, budget: "$80,000", deadline: "2024-11-15" },
    { id: 5, project: "Security Audit", client: "Finance Corp", progress: 75, budget: "$15,000", deadline: "2024-09-30" }
  ];

  return (
    <div className="relative">
      <AnchorNavBar />
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

        {/* Project Tracking Table */}
        <Section 
          id="project-tracking"
          title="Project Tracking"
          className="mb-8"
          showDragHandle={true}
          badges={[{ text: "Progress", variant: "default" }]}
        >
          <div className="mt-4 rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Project</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead>Budget</TableHead>
                  <TableHead>Deadline</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projectData.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell className="font-medium">{project.id}</TableCell>
                    <TableCell className="font-medium">{project.project}</TableCell>
                    <TableCell>{project.client}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-muted rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full transition-all duration-300"
                            style={{ width: `${project.progress}%` }}
                          />
                        </div>
                        <span className="text-sm font-mono">{project.progress}%</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono">{project.budget}</TableCell>
                    <TableCell className="text-muted-foreground">{project.deadline}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Section>
        </div>
      </div>
    </div>
  );
};

export default Tables;