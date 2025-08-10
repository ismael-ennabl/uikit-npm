import type { Meta, StoryObj } from '@storybook/react';
import { ChartContainer } from './chart';

const meta: Meta<typeof ChartContainer> = {
  title: 'Auto/Components/Ui/ChartContainer',
  component: ChartContainer,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof ChartContainer>;

export const Default: Story = {
  args: {},
  render: (args) => {
    // @ts-ignore - minimal default rendering
    return <ChartContainer {...args} />;
  },
};
