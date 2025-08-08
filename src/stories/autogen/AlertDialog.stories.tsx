import type { Meta, StoryObj } from '@storybook/react';
import { AlertDialog } from '../../../lib';

const meta: Meta<typeof AlertDialog> = {
  title: 'Auto/UI/AlertDialog',
  component: AlertDialog,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof AlertDialog>;

export const Default: Story = {
  render: () => {
    // @ts-ignore - minimal render without required props for preview purposes
    return <AlertDialog />;
  },
};
