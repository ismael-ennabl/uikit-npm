import type { Meta, StoryObj } from '@storybook/react';
import { FiltersBar } from '../../../lib';

const meta: Meta<typeof FiltersBar> = {
  title: 'Auto/Ennabl UI/FiltersBar',
  component: FiltersBar,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof FiltersBar>;

export const Default: Story = {
  args: {},
  render: (args) => (
    <div className="p-4">
      <FiltersBar {...args} />
    </div>
  ),
};

export const WrittenPremium: Story = {
  args: {
    premiumType: 'written',
    dateRange: 'last30',
  },
};


