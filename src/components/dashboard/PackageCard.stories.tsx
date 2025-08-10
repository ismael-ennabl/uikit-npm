import type { Meta, StoryObj } from '@storybook/react';
import PackageCard from './PackageCard';

const meta: Meta<typeof PackageCard> = {
  title: 'Auto/Components/Dashboard/PackageCard',
  component: PackageCard,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof PackageCard>;

export const Default: Story = {
  args: {},
  render: (args) => {
    // @ts-ignore - minimal default rendering
    return <PackageCard {...args} />;
  },
};
