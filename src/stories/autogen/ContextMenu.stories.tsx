import type { Meta, StoryObj } from '@storybook/react';
import { ContextMenu } from '../../../lib';

const meta: Meta<typeof ContextMenu> = {
  title: 'Auto/UI/ContextMenu',
  component: ContextMenu,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof ContextMenu>;

export const Default: Story = {
  render: () => {
    // @ts-ignore - minimal render without required props for preview purposes
    return <ContextMenu />;
  },
};
