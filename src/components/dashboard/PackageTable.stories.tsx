import type { Meta, StoryObj } from '@storybook/react';
import PackageTable from './PackageTable';

const meta: Meta<typeof PackageTable> = {
  title: 'Auto/Components/Dashboard/PackageTable',
  component: PackageTable,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof PackageTable>;

export const Default: Story = {
  args: {},
  render: (args) => {
    // @ts-ignore - minimal default rendering
    return <PackageTable {...args} />;
  },
};
