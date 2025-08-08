import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '../../../lib';

const meta: Meta<typeof Input> = {
  title: 'Auto/UI/Input',
  component: Input,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
  render: () => {
    // @ts-ignore - minimal render without required props for preview purposes
    return <Input />;
  },
};
