import type { Meta, StoryObj } from '@storybook/react';
import { Table } from '../../lib';

const meta: Meta<typeof Table> = {
  title: 'Auto/UI/Table',
  component: Table,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Table>;

export const Default: Story = {
  render: () => {
    // @ts-ignore - minimal render without required props for preview purposes
    return <Table />;
  },
};
