import type { Meta, StoryObj } from '@storybook/react';
import { AnchorNavBar } from '../../lib';

const meta: Meta = {
  title: 'Ennabl UI Kit/Insurance',
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj;

export const AnchorNav: Story = {
  render: () => (
    <div style={{ padding: 20 }}>
      <h2>Section Navigation</h2>
      <AnchorNavBar
        sections={[
          { id: 'overview', title: 'Overview', isActive: true },
          { id: 'products', title: 'Products' },
          { id: 'clients', title: 'Clients' },
        ]}
      />
    </div>
  ),
};

export const ProductsTableMock: Story = {
  render: () => (
    <div style={{ padding: 20 }}>
      <h2>Products (Mock)</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left', padding: 8 }}>Name</th>
            <th style={{ textAlign: 'left', padding: 8 }}>Type</th>
            <th style={{ textAlign: 'left', padding: 8 }}>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ padding: 8, borderTop: '1px solid #e5e7eb' }}>Auto Insurance</td>
            <td style={{ padding: 8, borderTop: '1px solid #e5e7eb' }}>Vehicle</td>
            <td style={{ padding: 8, borderTop: '1px solid #e5e7eb' }}>Active</td>
          </tr>
        </tbody>
      </table>
    </div>
  ),
};
