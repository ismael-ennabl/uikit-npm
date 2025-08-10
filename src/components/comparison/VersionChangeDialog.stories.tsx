import type { Meta, StoryObj } from '@storybook/react';
import VersionChangeDialog from './VersionChangeDialog';

const meta: Meta<typeof VersionChangeDialog> = {
  title: 'Auto/Components/Comparison/VersionChangeDialog',
  component: VersionChangeDialog,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof VersionChangeDialog>;

export const Default: Story = {
  args: {},
  render: (args) => {
    // @ts-ignore - minimal default rendering
    return <VersionChangeDialog {...args} />;
  },
};
