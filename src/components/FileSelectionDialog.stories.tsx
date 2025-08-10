import type { Meta, StoryObj } from '@storybook/react';
import FileSelectionDialog from './FileSelectionDialog';

const meta: Meta<typeof FileSelectionDialog> = {
  title: 'Auto/Components/FileSelectionDialog',
  component: FileSelectionDialog,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof FileSelectionDialog>;

export const Default: Story = {
  args: {},
  render: (args) => {
    // @ts-ignore - minimal default rendering
    return <FileSelectionDialog {...args} />;
  },
};
