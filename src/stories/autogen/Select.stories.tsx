import type { Meta, StoryObj } from '@storybook/react';
import { Select } from '../../../lib';

const meta: Meta<typeof Select> = {
  title: 'Auto/UI/Select',
  component: Select,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Select>;

export const Default: Story = {
  render: () => {
    // @ts-ignore - minimal render without required props for preview purposes
    return <Select />;
  },
};
