import type { Meta, StoryObj } from '@storybook/react';
import { DropdownMenu } from '../../../lib';

const meta: Meta<typeof DropdownMenu> = {
  title: 'Auto/UI/DropdownMenu',
  component: DropdownMenu,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof DropdownMenu>;

export const Default: Story = {
  render: () => {
    // @ts-ignore - minimal render without required props for preview purposes
    return <DropdownMenu />;
  },
};
