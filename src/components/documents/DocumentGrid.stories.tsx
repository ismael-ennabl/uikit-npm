import type { Meta, StoryObj } from '@storybook/react';
import DocumentGrid from './DocumentGrid';

const meta: Meta<typeof DocumentGrid> = {
  title: 'Auto/Components/Documents/DocumentGrid',
  component: DocumentGrid,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof DocumentGrid>;

export const Default: Story = {
  args: {},
  render: (args) => {
    // @ts-ignore - minimal default rendering
    return <DocumentGrid {...args} />;
  },
};
