import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  title: 'Ennabl UI Kit/Components',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj;

// Simple test stories first
export const SimpleTest: Story = {
  render: () => (
    <div style={{ padding: '20px' }}>
      <h1>Simple Test</h1>
      <p>This is a simple test to verify Storybook is working.</p>
    </div>
  ),
};

export const ButtonTest: Story = {
  render: () => (
    <div style={{ padding: '20px' }}>
      <h2>Button Test</h2>
      <button style={{ 
        padding: '10px 20px', 
        backgroundColor: '#007bff', 
        color: 'white', 
        border: 'none', 
        borderRadius: '4px' 
      }}>
        Test Button
      </button>
    </div>
  ),
};

export const HeaderTest: Story = {
  render: () => (
    <div style={{ padding: '20px' }}>
      <h2>Header Test</h2>
      <div style={{ 
        padding: '20px', 
        backgroundColor: '#f8f9fa', 
        borderBottom: '1px solid #dee2e6' 
      }}>
        <h1>Analytics Dashboard</h1>
        <p>Welcome back, User</p>
      </div>
    </div>
  ),
};

export const SectionTest: Story = {
  render: () => (
    <div style={{ padding: '20px' }}>
      <h2>Section Test</h2>
      <div style={{ 
        border: '1px solid #dee2e6', 
        borderRadius: '8px', 
        padding: '20px', 
        margin: '10px 0' 
      }}>
        <h3>User Information</h3>
        <p>This is a basic section with content.</p>
      </div>
    </div>
  ),
};

export const MetricTest: Story = {
  render: () => (
    <div style={{ padding: '20px' }}>
      <h2>Metric Test</h2>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '20px' 
      }}>
        <div style={{ 
          padding: '20px', 
          backgroundColor: '#f8f9fa', 
          borderRadius: '8px', 
          textAlign: 'center' 
        }}>
          <h3>1,234</h3>
          <p>Total Users</p>
        </div>
        <div style={{ 
          padding: '20px', 
          backgroundColor: '#f8f9fa', 
          borderRadius: '8px', 
          textAlign: 'center' 
        }}>
          <h3>567</h3>
          <p>Active Sessions</p>
        </div>
      </div>
    </div>
  ),
};
