import type { Meta, StoryObj } from '@storybook/react';
import SideBySideComparison from './SideBySideComparison';

const meta: Meta<typeof SideBySideComparison> = {
  title: 'Auto/Components/Comparison/SideBySideComparison',
  component: SideBySideComparison,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof SideBySideComparison>;

export const Default: Story = {
  args: {},
  render: (args) => {
    // @ts-ignore - minimal default rendering
    return <SideBySideComparison {...args} />;
  },
};
