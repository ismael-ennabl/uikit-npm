import type { Meta, StoryObj } from '@storybook/react';
import { Sheet } from '../../lib';

const meta: Meta<typeof Sheet> = {
  title: 'Auto/UI/Sheet',
  component: Sheet,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Sheet>;

export const Default: Story = {
  render: () => {
    // @ts-ignore - minimal render without required props for preview purposes
    return <Sheet />;
  },
};
