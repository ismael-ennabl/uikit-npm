import type { Meta, StoryObj } from '@storybook/react';
import CardViewMode from './CardViewMode';

const meta: Meta<typeof CardViewMode> = {
  title: 'Auto/Components/Comparison/CardViewMode',
  component: CardViewMode,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof CardViewMode>;

export const Default: Story = {
  args: {},
  render: (args) => {
    // @ts-ignore - minimal default rendering
    return <CardViewMode {...args} />;
  },
};
