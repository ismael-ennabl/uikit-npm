import type { Meta, StoryObj } from '@storybook/react';
import DocumentFilters from './DocumentFilters';

const meta: Meta<typeof DocumentFilters> = {
  title: 'Auto/Components/Documents/DocumentFilters',
  component: DocumentFilters,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof DocumentFilters>;

export const Default: Story = {
  args: {},
  render: (args) => {
    // @ts-ignore - minimal default rendering
    return <DocumentFilters {...args} />;
  },
};
