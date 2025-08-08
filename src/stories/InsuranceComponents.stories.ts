import type { Meta, StoryObj } from '@storybook/react';
import { ProductsTable, ClientsTable, AnchorNavBar } from '../../lib';

const meta: Meta = {
  title: 'Ennabl UI Kit/Insurance Domain',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj;

// Products Table Stories
export const ProductsTableDefault: Story = {
  render: () => (
    <div style={{ padding: '20px' }}>
      <h2>Insurance Products</h2>
      <ProductsTable />
    </div>
  ),
};

export const ProductsTableCustomRows: Story = {
  render: () => (
    <div style={{ padding: '20px' }}>
      <h2>Insurance Products (5 rows)</h2>
      <ProductsTable rows={5} />
    </div>
  ),
};

// Clients Table Stories
export const ClientsTableDefault: Story = {
  render: () => (
    <div style={{ padding: '20px' }}>
      <h2>Insurance Clients</h2>
      <ClientsTable />
    </div>
  ),
};

export const ClientsTableWithContact: Story = {
  render: () => (
    <div style={{ padding: '20px' }}>
      <h2>Insurance Clients (with contact info)</h2>
      <ClientsTable showContactInfo={true} rows={8} />
    </div>
  ),
};

// Anchor Navigation Stories
export const AnchorNavBarBasicExample: Story = {
  render: () => (
    <div style={{ padding: '20px' }}>
      <h2>Section Navigation</h2>
      <AnchorNavBar 
        sections={[
          { id: 'overview', title: 'Overview' },
          { id: 'products', title: 'Products' },
          { id: 'clients', title: 'Clients' },
          { id: 'analytics', title: 'Analytics' },
          { id: 'settings', title: 'Settings' }
        ]}
      />
    </div>
  ),
};

export const AnchorNavBarWithActiveExample: Story = {
  render: () => (
    <div style={{ padding: '20px' }}>
      <h2>Section Navigation (Active: Products)</h2>
      <AnchorNavBar 
        sections={[
          { id: 'overview', title: 'Overview' },
          { id: 'products', title: 'Products', isActive: true },
          { id: 'clients', title: 'Clients' },
          { id: 'analytics', title: 'Analytics' },
          { id: 'settings', title: 'Settings' }
        ]}
      />
    </div>
  ),
};

// Complete Insurance Dashboard
export const InsuranceDashboard: Story = {
  render: () => (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '20px', borderBottom: '1px solid #e5e7eb' }}>
        <h1>Insurance Management Dashboard</h1>
        <AnchorNavBar 
          sections={[
            { id: 'overview', title: 'Overview' },
            { id: 'products', title: 'Products' },
            { id: 'clients', title: 'Clients' },
            { id: 'analytics', title: 'Analytics' }
          ]}
        />
      </div>
      
      <main style={{ flex: 1, padding: '20px' }}>
        <div style={{ marginBottom: '30px' }}>
          <h2>Insurance Products</h2>
          <ProductsTable rows={3} />
        </div>
        
        <div>
          <h2>Insurance Clients</h2>
          <ClientsTable showContactInfo={true} rows={4} />
        </div>
      </main>
    </div>
  ),
};
