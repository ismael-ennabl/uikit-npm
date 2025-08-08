import type { Meta, StoryObj } from '@storybook/react';
import { Menubar } from '../../../lib';

const meta: Meta<typeof Menubar> = {
  title: 'Auto/UI/Menubar',
  component: Menubar,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Menubar>;

export const Default: Story = {
  render: () => {
    // @ts-ignore - minimal render without required props for preview purposes
    return <Menubar />;
  },
};
