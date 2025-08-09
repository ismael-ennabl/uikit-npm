import { ProductsTable, ClientsTable } from 'ennabl-ui-kit-beta';
import { Section } from '../../lib/components';
import AnchorNavBar from "@/components/AnchorNavBar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import 'ennabl-ui-kit-beta/dist/index.css';
import { PAGE } from '@/styles/tokens';
import { cn } from '@/lib/utils';

// Refreshed components to use latest library version 0.1.20

const Tables = () => {
  // User Accounts data
  const userAccountsData = [
    { id: 1, username: "john.doe", email: "john@company.com", role: "Admin", status: "Active" },
    { id: 2, username: "sarah.smith", email: "sarah@company.com", role: "Editor", status: "Active" },
    { id: 3, username: "mike.jones", email: "mike@company.com", role: "Viewer", status: "Inactive" }
  ];

  // Sales Reports data
  const salesData = [
    { month: "January", revenue: "$45,230", orders: 156, growth: "+12%" },
    { month: "February", revenue: "$52,100", orders: 187, growth: "+15%" },
    { month: "March", revenue: "$48,750", orders: 173, growth: "-6%" }
  ];

  // Inventory Status data
  const inventoryData = [
    { product: "Laptop Pro", sku: "LTP-001", stock: 45, category: "Electronics" },
    { product: "Office Chair", sku: "OCH-205", stock: 12, category: "Furniture" },
    { product: "Wireless Mouse", sku: "WMS-102", stock: 88, category: "Accessories" }
  ];

  return (
    <div className={cn('relative', PAGE.container)}>
      <AnchorNavBar />
      <div className="p-6 space-y-8">
        <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Tables</h1>
          <p className="text-muted-foreground">Examples of data tables using Ennabl UI Kit components</p>
        </div>

        {/* User Accounts Table - Using Local Section Component */}
        <Section 
          id="user-accounts"
          title="User Accounts"
          className="mb-8"
          showDragHandle={true}
          defaultOpen={false}
          badges={[{ text: "Active Users" }]}
        >
          <div className="mt-4 rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Username</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {userAccountsData.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.id}</TableCell>
                    <TableCell className="font-mono">{user.username}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                        user.status === 'Active' 
                          ? 'bg-green-50 text-green-700 ring-1 ring-green-600/20'
                          : 'bg-gray-50 text-gray-700 ring-1 ring-gray-600/20'
                      }`}>
                        {user.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Section>

        {/* Insurance Products Table - Using Local Section Component */}
        <Section 
          id="insurance-products"
          title="Insurance Products"
          className="mb-8"
          showDragHandle={true}
          defaultOpen={false}
          badges={[{ text: "Products Data" }]}
        >
          <ProductsTable rows={5} showHeader={false} />
        </Section>

        {/* Sales Reports Table */}
        <Section 
          id="sales-reports"
          title="Sales Reports"
          className="mb-8"
          showDragHandle={true}
          defaultOpen={false}
          badges={[{ text: "Monthly Data" }]}
        >
          <div className="mt-4 rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Month</TableHead>
                  <TableHead>Revenue</TableHead>
                  <TableHead>Orders</TableHead>
                  <TableHead>Growth</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {salesData.map((sale, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{sale.month}</TableCell>
                    <TableCell className="font-mono">{sale.revenue}</TableCell>
                    <TableCell>{sale.orders}</TableCell>
                    <TableCell>
                      <span className={`font-medium ${
                        sale.growth.startsWith('+') 
                          ? 'text-green-600'
                          : 'text-red-600'
                      }`}>
                        {sale.growth}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Section>

        {/* Insurance Clients Table - Using Local Section Component */}
        <Section 
          id="insurance-clients"
          title="Insurance Clients"
          className="mb-8"
          showDragHandle={true}
          defaultOpen={false}
          badges={[{ text: "Client Data" }]}
        >
          <ClientsTable rows={4} showHeader={false} showContactInfo={true} />
        </Section>

        {/* Inventory Status Table */}
        <Section 
          id="inventory-status"
          title="Inventory Status"
          className="mb-8"
          showDragHandle={true}
          defaultOpen={false}
          badges={[{ text: "Stock Levels" }]}
        >
          <div className="mt-4 rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>SKU</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Category</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {inventoryData.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{item.product}</TableCell>
                    <TableCell className="font-mono">{item.sku}</TableCell>
                    <TableCell>
                      <span className={`font-medium ${
                        item.stock > 50 ? 'text-green-600' : 
                        item.stock > 20 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {item.stock}
                      </span>
                    </TableCell>
                    <TableCell>{item.category}</TableCell>
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