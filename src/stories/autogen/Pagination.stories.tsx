import type { Meta, StoryObj } from '@storybook/react';
import { Pagination } from '../../../lib';

const meta: Meta<typeof Pagination> = {
  title: 'Auto/UI/Pagination',
  component: Pagination,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Pagination>;

export const Default: Story = {
  render: () => {
    // @ts-ignore - minimal render without required props for preview purposes
    return <Pagination />;
  },
};
