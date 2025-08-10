import type { Meta, StoryObj } from '@storybook/react';
import PackageStats from './PackageStats';

const meta: Meta<typeof PackageStats> = {
  title: 'Auto/Components/Dashboard/PackageStats',
  component: PackageStats,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof PackageStats>;

export const Default: Story = {
  args: {},
  render: (args) => {
    // @ts-ignore - minimal default rendering
    return <PackageStats {...args} />;
  },
};
