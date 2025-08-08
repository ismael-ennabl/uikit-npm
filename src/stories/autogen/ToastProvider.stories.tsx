import type { Meta, StoryObj } from '@storybook/react';
import { ToastProvider } from '../../lib';

const meta: Meta<typeof ToastProvider> = {
  title: 'Auto/UI/ToastProvider',
  component: ToastProvider,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof ToastProvider>;

export const Default: Story = {
  render: () => {
    // @ts-ignore - minimal render without required props for preview purposes
    return <ToastProvider />;
  },
};
