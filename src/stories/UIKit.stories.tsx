import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../../lib';

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

// Real component stories
export const PrimaryButton: Story = {
  render: () => (
    <div style={{ padding: '20px' }}>
      <h2>Primary Button</h2>
      <Button variant="primary">Primary Button</Button>
    </div>
  ),
};

export const SecondaryButton: Story = {
  render: () => (
    <div style={{ padding: '20px' }}>
      <h2>Secondary Button</h2>
      <Button variant="secondary">Secondary Button</Button>
    </div>
  ),
};

export const DestructiveButton: Story = {
  render: () => (
    <div style={{ padding: '20px' }}>
      <h2>Destructive Button</h2>
      <Button variant="destructive">Delete</Button>
    </div>
  ),
};

export const OutlineButton: Story = {
  render: () => (
    <div style={{ padding: '20px' }}>
      <h2>Outline Button</h2>
      <Button variant="outline">Outline Button</Button>
    </div>
  ),
};

export const GhostButton: Story = {
  render: () => (
    <div style={{ padding: '20px' }}>
      <h2>Ghost Button</h2>
      <Button variant="ghost">Ghost Button</Button>
    </div>
  ),
};

export const LinkButton: Story = {
  render: () => (
    <div style={{ padding: '20px' }}>
      <h2>Link Button</h2>
      <Button variant="link">Link Button</Button>
    </div>
  ),
};

// HTML-based stories for comparison
export const ButtonTest: Story = {
  render: () => (
    <div style={{ padding: '20px' }}>
      <h2>Button Test (HTML)</h2>
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
