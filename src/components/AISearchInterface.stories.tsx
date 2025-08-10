import type { Meta, StoryObj } from '@storybook/react';
import AISearchInterface from './AISearchInterface';

const meta: Meta<typeof AISearchInterface> = {
  title: 'Auto/Components/AISearchInterface',
  component: AISearchInterface,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof AISearchInterface>;

export const Default: Story = {
  args: {},
  render: (args) => {
    // @ts-ignore - minimal default rendering
    return <AISearchInterface {...args} />;
  },
};
