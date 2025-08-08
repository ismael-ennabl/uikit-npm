import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  title: 'Ennabl UI Kit/Insurance Domain',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj;

// Simple test stories first
export const ProductsTableTest: Story = {
  render: () => (
    <div style={{ padding: '20px' }}>
      <h2>Insurance Products</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f8f9fa' }}>
            <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Product Name</th>
            <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Type</th>
            <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ padding: '12px', borderBottom: '1px solid #dee2e6' }}>Auto Insurance</td>
            <td style={{ padding: '12px', borderBottom: '1px solid #dee2e6' }}>Vehicle</td>
            <td style={{ padding: '12px', borderBottom: '1px solid #dee2e6' }}>Active</td>
          </tr>
          <tr>
            <td style={{ padding: '12px', borderBottom: '1px solid #dee2e6' }}>Home Insurance</td>
            <td style={{ padding: '12px', borderBottom: '1px solid #dee2e6' }}>Property</td>
            <td style={{ padding: '12px', borderBottom: '1px solid #dee2e6' }}>Active</td>
          </tr>
        </tbody>
      </table>
    </div>
  ),
};

export const ClientsTableTest: Story = {
  render: () => (
    <div style={{ padding: '20px' }}>
      <h2>Insurance Clients</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f8f9fa' }}>
            <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Client Name</th>
            <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Email</th>
            <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ padding: '12px', borderBottom: '1px solid #dee2e6' }}>John Doe</td>
            <td style={{ padding: '12px', borderBottom: '1px solid #dee2e6' }}>john@example.com</td>
            <td style={{ padding: '12px', borderBottom: '1px solid #dee2e6' }}>Active</td>
          </tr>
          <tr>
            <td style={{ padding: '12px', borderBottom: '1px solid #dee2e6' }}>Jane Smith</td>
            <td style={{ padding: '12px', borderBottom: '1px solid #dee2e6' }}>jane@example.com</td>
            <td style={{ padding: '12px', borderBottom: '1px solid #dee2e6' }}>Active</td>
          </tr>
        </tbody>
      </table>
    </div>
  ),
};

export const NavigationTest: Story = {
  render: () => (
    <div style={{ padding: '20px' }}>
      <h2>Section Navigation</h2>
      <nav style={{ 
        display: 'flex', 
        gap: '20px', 
        padding: '10px 0', 
        borderBottom: '1px solid #dee2e6' 
      }}>
        <a href="#" style={{ 
          padding: '8px 16px', 
          textDecoration: 'none', 
          color: '#007bff',
          borderBottom: '2px solid #007bff'
        }}>Overview</a>
        <a href="#" style={{ 
          padding: '8px 16px', 
          textDecoration: 'none', 
          color: '#6c757d' 
        }}>Products</a>
        <a href="#" style={{ 
          padding: '8px 16px', 
          textDecoration: 'none', 
          color: '#6c757d' 
        }}>Clients</a>
        <a href="#" style={{ 
          padding: '8px 16px', 
          textDecoration: 'none', 
          color: '#6c757d' 
        }}>Analytics</a>
      </nav>
    </div>
  ),
};

export const DashboardTest: Story = {
  render: () => (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '20px', borderBottom: '1px solid #e5e7eb' }}>
        <h1>Insurance Management Dashboard</h1>
        <nav style={{ 
          display: 'flex', 
          gap: '20px', 
          padding: '10px 0' 
        }}>
          <a href="#" style={{ 
            padding: '8px 16px', 
            textDecoration: 'none', 
            color: '#007bff',
            borderBottom: '2px solid #007bff'
          }}>Overview</a>
          <a href="#" style={{ 
            padding: '8px 16px', 
            textDecoration: 'none', 
            color: '#6c757d' 
          }}>Products</a>
          <a href="#" style={{ 
            padding: '8px 16px', 
            textDecoration: 'none', 
            color: '#6c757d' 
          }}>Clients</a>
          <a href="#" style={{ 
            padding: '8px 16px', 
            textDecoration: 'none', 
            color: '#6c757d' 
          }}>Analytics</a>
        </nav>
      </div>
      
      <main style={{ flex: 1, padding: '20px' }}>
        <div style={{ marginBottom: '30px' }}>
          <h2>Insurance Products</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8f9fa' }}>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Product Name</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Type</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '12px', borderBottom: '1px solid #dee2e6' }}>Auto Insurance</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #dee2e6' }}>Vehicle</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #dee2e6' }}>Active</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div>
          <h2>Insurance Clients</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8f9fa' }}>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Client Name</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Email</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '12px', borderBottom: '1px solid #dee2e6' }}>John Doe</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #dee2e6' }}>john@example.com</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #dee2e6' }}>Active</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  ),
};
