import type { Meta, StoryObj } from '@storybook/react';
import { Slider } from '../../lib';

const meta: Meta<typeof Slider> = {
  title: 'Auto/UI/Slider',
  component: Slider,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Slider>;

export const Default: Story = {
  render: () => {
    // @ts-ignore - minimal render without required props for preview purposes
    return <Slider />;
  },
};
