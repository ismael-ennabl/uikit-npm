import type { Meta, StoryObj } from '@storybook/react';
import MetricItem from './metric-item';

const meta: Meta<typeof MetricItem> = {
  title: 'Auto/Components/Ui/MetricItem',
  component: MetricItem,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof MetricItem>;

export const Default: Story = {
  args: {},
  render: (args) => {
    // @ts-ignore - minimal default rendering
    return <MetricItem {...args} />;
  },
};
