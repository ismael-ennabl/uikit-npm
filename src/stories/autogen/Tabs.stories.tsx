import type { Meta, StoryObj } from '@storybook/react';
import { Tabs } from '../../../lib';

const meta: Meta<typeof Tabs> = {
  title: 'Auto/UI/Tabs',
  component: Tabs,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  render: () => {
    // @ts-ignore - minimal render without required props for preview purposes
    return <Tabs />;
  },
};
