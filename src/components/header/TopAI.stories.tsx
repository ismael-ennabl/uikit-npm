import type { Meta, StoryObj } from '@storybook/react';
import TopAI from './TopAI';

const meta: Meta<typeof TopAI> = {
  title: 'Auto/Components/Header/TopAI',
  component: TopAI,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof TopAI>;

export const Default: Story = {
  args: {},
  render: (args) => {
    // @ts-ignore - minimal default rendering
    return <TopAI {...args} />;
  },
};
