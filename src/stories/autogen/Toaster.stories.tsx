import type { Meta, StoryObj } from '@storybook/react';
import { Toaster } from '../../lib';

const meta: Meta<typeof Toaster> = {
  title: 'Auto/UI/Toaster',
  component: Toaster,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Toaster>;

export const Default: Story = {
  render: () => {
    // @ts-ignore - minimal render without required props for preview purposes
    return <Toaster />;
  },
};
