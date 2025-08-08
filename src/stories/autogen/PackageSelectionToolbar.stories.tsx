import type { Meta, StoryObj } from '@storybook/react';
import { PackageSelectionToolbar } from '../../../lib';

const meta: Meta<typeof PackageSelectionToolbar> = {
  title: 'Auto/Components/PackageSelectionToolbar',
  component: PackageSelectionToolbar,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof PackageSelectionToolbar>;

export const Default: Story = {
  render: () => {
    // @ts-ignore - minimal render without required props for preview purposes
    return <PackageSelectionToolbar />;
  },
};
