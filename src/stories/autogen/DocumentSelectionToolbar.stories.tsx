import type { Meta, StoryObj } from '@storybook/react';
import { DocumentSelectionToolbar } from '../../lib';

const meta: Meta<typeof DocumentSelectionToolbar> = {
  title: 'Auto/Components/DocumentSelectionToolbar',
  component: DocumentSelectionToolbar,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof DocumentSelectionToolbar>;

export const Default: Story = {
  render: () => {
    // @ts-ignore - minimal render without required props for preview purposes
    return <DocumentSelectionToolbar />;
  },
};
