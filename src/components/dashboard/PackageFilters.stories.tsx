import type { Meta, StoryObj } from '@storybook/react';
import PackageFilters from './PackageFilters';

const meta: Meta<typeof PackageFilters> = {
  title: 'Auto/Components/Dashboard/PackageFilters',
  component: PackageFilters,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof PackageFilters>;

export const Default: Story = {
  args: {},
  render: (args) => {
    // @ts-ignore - minimal default rendering
    return <PackageFilters {...args} />;
  },
};
