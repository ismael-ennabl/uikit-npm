import type { Meta, StoryObj } from '@storybook/react';
import { Alert } from '../../lib';

const meta: Meta<typeof Alert> = {
  title: 'Auto/UI/Alert',
  component: Alert,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Alert>;

export const Default: Story = {
  render: () => {
    // @ts-ignore - minimal render without required props for preview purposes
    return <Alert />;
  },
};
