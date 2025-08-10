import type { Meta, StoryObj } from '@storybook/react';
import DiscrepancyNavigation from './DiscrepancyNavigation';

const meta: Meta<typeof DiscrepancyNavigation> = {
  title: 'Auto/Components/DiscrepancyNavigation',
  component: DiscrepancyNavigation,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof DiscrepancyNavigation>;

export const Default: Story = {
  args: {},
  render: (args) => {
    // @ts-ignore - minimal default rendering
    return <DiscrepancyNavigation {...args} />;
  },
};
