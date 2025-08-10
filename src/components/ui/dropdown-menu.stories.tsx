import type { Meta, StoryObj } from '@storybook/react';
import { DropdownMenu } from './dropdown-menu';

const meta: Meta<typeof DropdownMenu> = {
  title: 'Auto/Components/Ui/DropdownMenu',
  component: DropdownMenu,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof DropdownMenu>;

export const Default: Story = {
  args: {},
  render: (args) => {
    // @ts-ignore - minimal default rendering
    return <DropdownMenu {...args} />;
  },
};
