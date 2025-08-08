import type { Meta, StoryObj } from '@storybook/react';
import { AspectRatio } from '../../../lib';

const meta: Meta<typeof AspectRatio> = {
  title: 'Auto/UI/AspectRatio',
  component: AspectRatio,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof AspectRatio>;

export const Default: Story = {
  render: () => {
    // @ts-ignore - minimal render without required props for preview purposes
    return <AspectRatio />;
  },
};
