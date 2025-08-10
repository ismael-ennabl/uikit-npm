import type { Meta, StoryObj } from '@storybook/react';
import DocumentStats from './DocumentStats';

const meta: Meta<typeof DocumentStats> = {
  title: 'Auto/Components/Documents/DocumentStats',
  component: DocumentStats,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof DocumentStats>;

export const Default: Story = {
  args: {},
  render: (args) => {
    // @ts-ignore - minimal default rendering
    return <DocumentStats {...args} />;
  },
};
