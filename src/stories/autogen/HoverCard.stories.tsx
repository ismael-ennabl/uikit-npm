import type { Meta, StoryObj } from '@storybook/react';
import { HoverCard } from '../../../lib';

const meta: Meta<typeof HoverCard> = {
  title: 'Auto/UI/HoverCard',
  component: HoverCard,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof HoverCard>;

export const Default: Story = {
  render: () => {
    // @ts-ignore - minimal render without required props for preview purposes
    return <HoverCard />;
  },
};
