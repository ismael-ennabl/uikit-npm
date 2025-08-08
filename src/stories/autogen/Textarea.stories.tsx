import type { Meta, StoryObj } from '@storybook/react';
import { Textarea } from '../../../lib';

const meta: Meta<typeof Textarea> = {
  title: 'Auto/UI/Textarea',
  component: Textarea,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  render: () => {
    // @ts-ignore - minimal render without required props for preview purposes
    return <Textarea />;
  },
};
