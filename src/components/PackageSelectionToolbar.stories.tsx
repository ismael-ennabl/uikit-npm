import type { Meta, StoryObj } from '@storybook/react';
import PackageSelectionToolbar from './PackageSelectionToolbar';

const meta: Meta<typeof PackageSelectionToolbar> = {
  title: 'Auto/Components/PackageSelectionToolbar',
  component: PackageSelectionToolbar,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof PackageSelectionToolbar>;

export const Default: Story = {
  args: {},
  render: (args) => {
    // @ts-ignore - minimal default rendering
    return <PackageSelectionToolbar {...args} />;
  },
};
