import type { Meta, StoryObj } from '@storybook/react';
import ComparisonDataTable from './ComparisonDataTable';

const meta: Meta<typeof ComparisonDataTable> = {
  title: 'Auto/Components/Comparison/ComparisonDataTable',
  component: ComparisonDataTable,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof ComparisonDataTable>;

export const Default: Story = {
  args: {},
  render: (args) => {
    // @ts-ignore - minimal default rendering
    return <ComparisonDataTable {...args} />;
  },
};
