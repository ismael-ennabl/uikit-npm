import type { Meta, StoryObj } from '@storybook/react';
import { Header, Footer, Section, Button, MetricItem, SelectionToolbar } from '../../lib';

const meta: Meta = {
  title: 'Ennabl UI Kit/Components',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj;

// Header Stories
export const DashboardHeader: Story = {
  render: () => (
    <Header 
      title="Analytics Dashboard"
      subtitle="Welcome back, User"
      showBreadcrumbs={true}
    />
  ),
};

export const DetailHeader: Story = {
  render: () => (
    <Header 
      title="User Profile"
      subtitle="Manage your account settings"
      showBreadcrumbs={true}
    />
  ),
};

// Section Stories
export const BasicSection: Story = {
  render: () => (
    <Section title="User Information" badges={[{ text: "New", variant: "new" }]}>
      <p>This is a basic section with content.</p>
    </Section>
  ),
};

export const CollapsibleSection: Story = {
  render: () => (
    <Section 
      title="Advanced Settings" 
      badges={[{ text: "Beta", variant: "beta" }]}
      defaultOpen={false}
      showDragHandle={true}
    >
      <p>This section is collapsible and has a drag handle.</p>
      <Button variant="primary">Save Settings</Button>
    </Section>
  ),
};

// Button Stories
export const PrimaryButton: Story = {
  render: () => <Button variant="primary">Primary Button</Button>,
};

export const SecondaryButton: Story = {
  render: () => <Button variant="secondary">Secondary Button</Button>,
};

export const DestructiveButton: Story = {
  render: () => <Button variant="destructive">Delete</Button>,
};

export const OutlineButton: Story = {
  render: () => <Button variant="outline">Outline Button</Button>,
};

export const GhostButton: Story = {
  render: () => <Button variant="ghost">Ghost Button</Button>,
};

export const LinkButton: Story = {
  render: () => <Button variant="link">Link Button</Button>,
};

// Metric Item Stories
export const MetricItemBasic: Story = {
  render: () => (
    <MetricItem 
      value="1,234"
      label="Total Users"
      onClick={() => console.log('Metric clicked')}
    />
  ),
};

export const MetricItemWithTooltip: Story = {
  render: () => (
    <MetricItem 
      value="567"
      label="Active Sessions"
      tooltip={{
        content: "Users currently logged in",
        variant: "info"
      }}
    />
  ),
};

// Selection Toolbar Stories
export const SelectionToolbarBasic: Story = {
  render: () => (
    <SelectionToolbar 
      selectedCount={5}
      onClear={() => console.log('Clear selection')}
      actions={[
        {
          label: "Export",
          onClick: () => console.log('Export clicked'),
          icon: "Download"
        },
        {
          label: "Delete",
          onClick: () => console.log('Delete clicked'),
          icon: "Trash"
        }
      ]}
    />
  ),
};

// Footer Story
export const FooterComponent: Story = {
  render: () => <Footer />,
};

// Complete Layout Story
export const CompleteLayout: Story = {
  render: () => (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header title="Complete Application" subtitle="Full layout example" />
      <main style={{ flex: 1, padding: '20px' }}>
        <Section title="Main Content" badges={[{ text: "Live", variant: "success" }]}>
          <p>This is the main content area with various components.</p>
          <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
            <Button variant="primary">Primary Action</Button>
            <Button variant="secondary">Secondary Action</Button>
          </div>
        </Section>
        
        <Section title="Metrics" defaultOpen={true}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
            <MetricItem value="1,234" label="Total Users" />
            <MetricItem value="567" label="Active Sessions" />
            <MetricItem value="89" label="New Today" />
          </div>
        </Section>
      </main>
      <Footer />
    </div>
  ),
};
