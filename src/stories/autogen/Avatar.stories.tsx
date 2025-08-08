import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from '../../../lib';

const meta: Meta<typeof Avatar> = {
  title: 'Auto/UI/Avatar',
  component: Avatar,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  render: () => {
    // @ts-ignore - minimal render without required props for preview purposes
    return <Avatar />;
  },
};
