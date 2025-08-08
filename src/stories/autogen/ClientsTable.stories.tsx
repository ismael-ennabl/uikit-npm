import type { Meta, StoryObj } from '@storybook/react';
import { ClientsTable } from '../../lib';

const meta: Meta<typeof ClientsTable> = {
  title: 'Auto/Components/ClientsTable',
  component: ClientsTable,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof ClientsTable>;

export const Default: Story = {
  render: () => {
    // @ts-ignore - minimal render without required props for preview purposes
    return <ClientsTable />;
  },
};
