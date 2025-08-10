import type { Meta, StoryObj } from '@storybook/react';
import { Command } from './command';

const meta: Meta<typeof Command> = {
  title: 'Auto/Components/Ui/Command',
  component: Command,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Command>;

export const Default: Story = {
  args: {},
  render: (args) => {
    // @ts-ignore - minimal default rendering
    return <Command {...args} />;
  },
};
