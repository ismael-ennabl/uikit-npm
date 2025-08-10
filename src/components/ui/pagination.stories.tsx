import type { Meta, StoryObj } from '@storybook/react';
import { Pagination } from './pagination';

const meta: Meta<typeof Pagination> = {
  title: 'Auto/Components/Ui/Pagination',
  component: Pagination,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Pagination>;

export const Default: Story = {
  args: {},
  render: (args) => {
    // @ts-ignore - minimal default rendering
    return <Pagination {...args} />;
  },
};
