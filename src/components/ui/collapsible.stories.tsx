import type { Meta, StoryObj } from '@storybook/react';
import { Collapsible } from './collapsible';

const meta: Meta<typeof Collapsible> = {
  title: 'Auto/Components/Ui/Collapsible',
  component: Collapsible,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Collapsible>;

export const Default: Story = {
  args: {},
  render: (args) => {
    // @ts-ignore - minimal default rendering
    return <Collapsible {...args} />;
  },
};
