import type { Meta, StoryObj } from '@storybook/react';
import DocumentActions from './DocumentActions';

const meta: Meta<typeof DocumentActions> = {
  title: 'Auto/Components/Comparison/DocumentActions',
  component: DocumentActions,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof DocumentActions>;

export const Default: Story = {
  args: {},
  render: (args) => {
    // @ts-ignore - minimal default rendering
    return <DocumentActions {...args} />;
  },
};
