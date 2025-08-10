import type { Meta, StoryObj } from '@storybook/react';
import { HoverCard } from './hover-card';

const meta: Meta<typeof HoverCard> = {
  title: 'Auto/Components/Ui/HoverCard',
  component: HoverCard,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof HoverCard>;

export const Default: Story = {
  args: {},
  render: (args) => {
    // @ts-ignore - minimal default rendering
    return <HoverCard {...args} />;
  },
};
