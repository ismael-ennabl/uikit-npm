import type { Meta, StoryObj } from '@storybook/react';
import DocumentTable from './DocumentTable';

const meta: Meta<typeof DocumentTable> = {
  title: 'Auto/Components/Documents/DocumentTable',
  component: DocumentTable,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof DocumentTable>;

export const Default: Story = {
  args: {},
  render: (args) => {
    // @ts-ignore - minimal default rendering
    return <DocumentTable {...args} />;
  },
};
