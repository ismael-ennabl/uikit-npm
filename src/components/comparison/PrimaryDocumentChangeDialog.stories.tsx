import type { Meta, StoryObj } from '@storybook/react';
import PrimaryDocumentChangeDialog from './PrimaryDocumentChangeDialog';

const meta: Meta<typeof PrimaryDocumentChangeDialog> = {
  title: 'Auto/Components/Comparison/PrimaryDocumentChangeDialog',
  component: PrimaryDocumentChangeDialog,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof PrimaryDocumentChangeDialog>;

export const Default: Story = {
  args: {},
  render: (args) => {
    // @ts-ignore - minimal default rendering
    return <PrimaryDocumentChangeDialog {...args} />;
  },
};
