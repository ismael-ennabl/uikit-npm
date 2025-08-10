import type { Meta, StoryObj } from '@storybook/react';
import PackageGrid from './PackageGrid';

const meta: Meta<typeof PackageGrid> = {
  title: 'Auto/Components/Dashboard/PackageGrid',
  component: PackageGrid,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof PackageGrid>;

export const Default: Story = {
  args: {},
  render: (args) => {
    // @ts-ignore - minimal default rendering
    return <PackageGrid {...args} />;
  },
};
