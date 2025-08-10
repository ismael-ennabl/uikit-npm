import type { Meta, StoryObj } from '@storybook/react';
import { ScrollArea } from './scroll-area';

const meta: Meta<typeof ScrollArea> = {
  title: 'Auto/Components/Ui/ScrollArea',
  component: ScrollArea,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof ScrollArea>;

export const Default: Story = {
  args: {},
  render: (args) => {
    // @ts-ignore - minimal default rendering
    return <ScrollArea {...args} />;
  },
};
