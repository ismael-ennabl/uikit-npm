import type { Meta, StoryObj } from '@storybook/react';
import { Sidebar } from '../../../lib';

const meta: Meta<typeof Sidebar> = {
  title: 'Auto/UI/Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Sidebar>;

export const Default: Story = {
  render: () => {
    // @ts-ignore - minimal render without required props for preview purposes
    return <Sidebar />;
  },
};
