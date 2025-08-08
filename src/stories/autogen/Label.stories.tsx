import type { Meta, StoryObj } from '@storybook/react';
import { Label } from '../../lib';

const meta: Meta<typeof Label> = {
  title: 'Auto/UI/Label',
  component: Label,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Label>;

export const Default: Story = {
  render: () => {
    // @ts-ignore - minimal render without required props for preview purposes
    return <Label />;
  },
};
