import type { Meta, StoryObj } from '@storybook/react';
import { Drawer } from '../../lib';

const meta: Meta<typeof Drawer> = {
  title: 'Auto/UI/Drawer',
  component: Drawer,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Drawer>;

export const Default: Story = {
  render: () => {
    // @ts-ignore - minimal render without required props for preview purposes
    return <Drawer />;
  },
};
