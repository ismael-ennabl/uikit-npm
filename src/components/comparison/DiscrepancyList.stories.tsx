import type { Meta, StoryObj } from '@storybook/react';
import DiscrepancyList from './DiscrepancyList';

const meta: Meta<typeof DiscrepancyList> = {
  title: 'Auto/Components/Comparison/DiscrepancyList',
  component: DiscrepancyList,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof DiscrepancyList>;

export const Default: Story = {
  args: {},
  render: (args) => {
    // @ts-ignore - minimal default rendering
    return <DiscrepancyList {...args} />;
  },
};
