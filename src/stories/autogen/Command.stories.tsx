import type { Meta, StoryObj } from '@storybook/react';
import { Command } from '../../../lib';

const meta: Meta<typeof Command> = {
  title: 'Auto/UI/Command',
  component: Command,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Command>;

export const Default: Story = {
  render: () => {
    // @ts-ignore - minimal render without required props for preview purposes
    return <Command />;
  },
};
