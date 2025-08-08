import type { Meta, StoryObj } from '@storybook/react';
import { ScrollArea } from '../../lib';

const meta: Meta<typeof ScrollArea> = {
  title: 'Auto/UI/ScrollArea',
  component: ScrollArea,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof ScrollArea>;

export const Default: Story = {
  render: () => {
    // @ts-ignore - minimal render without required props for preview purposes
    return <ScrollArea />;
  },
};
