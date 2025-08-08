import type { Meta, StoryObj } from '@storybook/react';
import { Calendar } from '../../../lib';

const meta: Meta<typeof Calendar> = {
  title: 'Auto/UI/Calendar',
  component: Calendar,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Calendar>;

export const Default: Story = {
  render: () => {
    // @ts-ignore - minimal render without required props for preview purposes
    return <Calendar />;
  },
};
