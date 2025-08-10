import type { Meta, StoryObj } from '@storybook/react';
import CategoryHeader from './CategoryHeader';

const meta: Meta<typeof CategoryHeader> = {
  title: 'Auto/Components/Comparison/CategoryHeader',
  component: CategoryHeader,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof CategoryHeader>;

export const Default: Story = {
  args: {},
  render: (args) => {
    // @ts-ignore - minimal default rendering
    return <CategoryHeader {...args} />;
  },
};
