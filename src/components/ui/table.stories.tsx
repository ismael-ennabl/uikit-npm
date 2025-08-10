import type { Meta, StoryObj } from '@storybook/react';
import { Table } from './table';

const meta: Meta<typeof Table> = {
  title: 'Auto/Components/Ui/Table',
  component: Table,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Table>;

export const Default: Story = {
  args: {},
  render: (args) => {
    // @ts-ignore - minimal default rendering
    return <Table {...args} />;
  },
};
