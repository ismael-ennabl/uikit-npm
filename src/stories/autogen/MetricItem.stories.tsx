import type { Meta, StoryObj } from '@storybook/react';
import { MetricItem } from '../../../lib';

const meta: Meta<typeof MetricItem> = {
  title: 'Auto/Components/MetricItem',
  component: MetricItem,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof MetricItem>;

export const Default: Story = {
  render: () => {
    // @ts-ignore - minimal render without required props for preview purposes
    return <MetricItem />;
  },
};
