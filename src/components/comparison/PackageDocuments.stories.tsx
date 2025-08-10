import type { Meta, StoryObj } from '@storybook/react';
import PackageDocuments from './PackageDocuments';

const meta: Meta<typeof PackageDocuments> = {
  title: 'Auto/Components/Comparison/PackageDocuments',
  component: PackageDocuments,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof PackageDocuments>;

export const Default: Story = {
  args: {},
  render: (args) => {
    // @ts-ignore - minimal default rendering
    return <PackageDocuments {...args} />;
  },
};
