import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton } from '../../lib';

const meta: Meta<typeof Skeleton> = {
  title: 'Auto/UI/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {
  render: () => {
    // @ts-ignore - minimal render without required props for preview purposes
    return <Skeleton />;
  },
};
