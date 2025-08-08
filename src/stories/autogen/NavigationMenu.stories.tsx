import type { Meta, StoryObj } from '@storybook/react';
import { NavigationMenu } from '../../lib';

const meta: Meta<typeof NavigationMenu> = {
  title: 'Auto/UI/NavigationMenu',
  component: NavigationMenu,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof NavigationMenu>;

export const Default: Story = {
  render: () => {
    // @ts-ignore - minimal render without required props for preview purposes
    return <NavigationMenu />;
  },
};
