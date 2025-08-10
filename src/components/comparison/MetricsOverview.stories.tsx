import type { Meta, StoryObj } from '@storybook/react';
import MetricsOverview from './MetricsOverview';

const meta: Meta<typeof MetricsOverview> = {
  title: 'Auto/Components/Comparison/MetricsOverview',
  component: MetricsOverview,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof MetricsOverview>;

export const Default: Story = {
  args: {},
  render: (args) => {
    // @ts-ignore - minimal default rendering
    return <MetricsOverview {...args} />;
  },
};
