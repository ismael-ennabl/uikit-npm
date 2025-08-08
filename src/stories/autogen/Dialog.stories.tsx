import type { Meta, StoryObj } from '@storybook/react';
import { Dialog } from '../../lib';

const meta: Meta<typeof Dialog> = {
  title: 'Auto/UI/Dialog',
  component: Dialog,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Dialog>;

export const Default: Story = {
  render: () => {
    // @ts-ignore - minimal render without required props for preview purposes
    return <Dialog />;
  },
};
