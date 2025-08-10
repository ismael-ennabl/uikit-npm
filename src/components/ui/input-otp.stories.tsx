import type { Meta, StoryObj } from '@storybook/react';
import { InputOTP } from './input-otp';

const meta: Meta<typeof InputOTP> = {
  title: 'Auto/Components/Ui/InputOTP',
  component: InputOTP,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof InputOTP>;

export const Default: Story = {
  args: {},
  render: (args) => {
    // @ts-ignore - minimal default rendering
    return <InputOTP {...args} />;
  },
};
