import type { Meta, StoryObj } from '@storybook/react';
import PackageHeader from './PackageHeader';

const meta: Meta<typeof PackageHeader> = {
  title: 'Auto/Components/Upload/PackageHeader',
  component: PackageHeader,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof PackageHeader>;

export const Default: Story = {
  args: {},
  render: (args) => {
    // @ts-ignore - minimal default rendering
    return <PackageHeader {...args} />;
  },
};
