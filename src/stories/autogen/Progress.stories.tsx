import type { Meta, StoryObj } from '@storybook/react';
import { Progress } from '../../../lib';

const meta: Meta<typeof Progress> = {
  title: 'Auto/UI/Progress',
  component: Progress,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Progress>;

export const Default: Story = {
  render: () => {
    // @ts-ignore - minimal render without required props for preview purposes
    return <Progress />;
  },
};
