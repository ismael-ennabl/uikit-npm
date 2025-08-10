import type { Meta, StoryObj } from '@storybook/react';
import { ContextMenu } from './context-menu';

const meta: Meta<typeof ContextMenu> = {
  title: 'Auto/Components/Ui/ContextMenu',
  component: ContextMenu,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof ContextMenu>;

export const Default: Story = {
  args: {},
  render: (args) => {
    // @ts-ignore - minimal default rendering
    return <ContextMenu {...args} />;
  },
};
