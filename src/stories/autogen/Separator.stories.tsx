import type { Meta, StoryObj } from '@storybook/react';
import { Separator } from '../../lib';

const meta: Meta<typeof Separator> = {
  title: 'Auto/UI/Separator',
  component: Separator,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Separator>;

export const Default: Story = {
  render: () => {
    // @ts-ignore - minimal render without required props for preview purposes
    return <Separator />;
  },
};
