import type { Meta, StoryObj } from '@storybook/react';
import { Progress } from './progress';

const meta: Meta<typeof Progress> = {
  title: 'Auto/Components/Ui/Progress',
  component: Progress,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Progress>;

export const Default: Story = {
  args: {},
  render: (args) => {
    // @ts-ignore - minimal default rendering
    return <Progress {...args} />;
  },
};
