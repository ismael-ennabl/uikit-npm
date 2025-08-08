import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from '../../../lib';

const meta: Meta<typeof Tooltip> = {
  title: 'Auto/UI/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  render: () => {
    // @ts-ignore - minimal render without required props for preview purposes
    return <Tooltip />;
  },
};
