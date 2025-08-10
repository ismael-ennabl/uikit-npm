import type { Meta, StoryObj } from '@storybook/react';
import { ResizablePanelGroup } from './resizable';

const meta: Meta<typeof ResizablePanelGroup> = {
  title: 'Auto/Components/Ui/ResizablePanelGroup',
  component: ResizablePanelGroup,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof ResizablePanelGroup>;

export const Default: Story = {
  args: {},
  render: (args) => {
    // @ts-ignore - minimal default rendering
    return <ResizablePanelGroup {...args} />;
  },
};
