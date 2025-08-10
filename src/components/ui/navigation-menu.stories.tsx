import type { Meta, StoryObj } from '@storybook/react';
import { NavigationMenu } from './navigation-menu';

const meta: Meta<typeof NavigationMenu> = {
  title: 'Auto/Components/Ui/NavigationMenu',
  component: NavigationMenu,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof NavigationMenu>;

export const Default: Story = {
  args: {},
  render: (args) => {
    // @ts-ignore - minimal default rendering
    return <NavigationMenu {...args} />;
  },
};
