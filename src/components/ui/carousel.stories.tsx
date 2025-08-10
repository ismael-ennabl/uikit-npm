import type { Meta, StoryObj } from '@storybook/react';
import { Carousel } from './carousel';

const meta: Meta<typeof Carousel> = {
  title: 'Auto/Components/Ui/Carousel',
  component: Carousel,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Carousel>;

export const Default: Story = {
  args: {},
  render: (args) => {
    // @ts-ignore - minimal default rendering
    return <Carousel {...args} />;
  },
};
