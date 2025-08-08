import type { Meta, StoryObj } from '@storybook/react';
import { InputOTP } from '../../lib';

const meta: Meta<typeof InputOTP> = {
  title: 'Auto/UI/InputOTP',
  component: InputOTP,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof InputOTP>;

export const Default: Story = {
  render: () => {
    // @ts-ignore - minimal render without required props for preview purposes
    return <InputOTP />;
  },
};
