import type { Meta, StoryObj } from '@storybook/react';
import { Drawer } from './drawer';

const meta: Meta<typeof Drawer> = {
  title: 'Auto/Components/Ui/Drawer',
  component: Drawer,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Drawer>;

export const Default: Story = {
  args: {},
  render: (args) => {
    // @ts-ignore - minimal default rendering
    return <Drawer {...args} />;
  },
};
