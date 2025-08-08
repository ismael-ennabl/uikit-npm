import type { Meta, StoryObj } from '@storybook/react';
import { Popover } from '../../lib';

const meta: Meta<typeof Popover> = {
  title: 'Auto/UI/Popover',
  component: Popover,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Popover>;

export const Default: Story = {
  render: () => {
    // @ts-ignore - minimal render without required props for preview purposes
    return <Popover />;
  },
};
