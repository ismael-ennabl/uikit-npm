import type { Meta, StoryObj } from '@storybook/react';
import { ProductsTable } from '../../lib';

const meta: Meta<typeof ProductsTable> = {
  title: 'Auto/Components/ProductsTable',
  component: ProductsTable,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof ProductsTable>;

export const Default: Story = {
  render: () => {
    // @ts-ignore - minimal render without required props for preview purposes
    return <ProductsTable />;
  },
};
