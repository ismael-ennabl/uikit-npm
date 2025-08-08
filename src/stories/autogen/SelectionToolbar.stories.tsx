import type { Meta, StoryObj } from '@storybook/react';
import { SelectionToolbar } from '../../../lib';

const meta: Meta<typeof SelectionToolbar> = {
  title: 'Auto/Components/SelectionToolbar',
  component: SelectionToolbar,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof SelectionToolbar>;

export const Default: Story = {
  render: () => {
    // @ts-ignore - minimal render without required props for preview purposes
    return <SelectionToolbar />;
  },
};
