import type { Meta, StoryObj } from '@storybook/react';
import { ResizablePanelGroup } from '../../lib';

const meta: Meta<typeof ResizablePanelGroup> = {
  title: 'Auto/UI/ResizablePanelGroup',
  component: ResizablePanelGroup,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof ResizablePanelGroup>;

export const Default: Story = {
  render: () => {
    // @ts-ignore - minimal render without required props for preview purposes
    return <ResizablePanelGroup />;
  },
};
