import type { Meta, StoryObj } from '@storybook/react';
import { Carousel } from '../../../lib';

const meta: Meta<typeof Carousel> = {
  title: 'Auto/UI/Carousel',
  component: Carousel,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Carousel>;

export const Default: Story = {
  render: () => {
    // @ts-ignore - minimal render without required props for preview purposes
    return <Carousel />;
  },
};
