import type { Meta, StoryObj } from '@storybook/react';
import { ChartContainer } from '../../../lib';

const meta: Meta<typeof ChartContainer> = {
  title: 'Auto/UI/ChartContainer',
  component: ChartContainer,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof ChartContainer>;

export const Default: Story = {
  render: () => {
    // @ts-ignore - minimal render without required props for preview purposes
    return <ChartContainer />;
  },
};
