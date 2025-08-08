import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '../../../lib';

const meta: Meta<typeof Badge> = {
  title: 'Auto/UI/Badge',
  component: Badge,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  render: () => {
    // @ts-ignore - minimal render without required props for preview purposes
    return <Badge />;
  },
};
