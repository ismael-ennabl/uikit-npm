import type { Meta, StoryObj } from '@storybook/react';
import DocumentSelectionToolbar from './DocumentSelectionToolbar';

const meta: Meta<typeof DocumentSelectionToolbar> = {
  title: 'Auto/Components/DocumentSelectionToolbar',
  component: DocumentSelectionToolbar,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof DocumentSelectionToolbar>;

export const Default: Story = {
  args: {},
  render: (args) => {
    // @ts-ignore - minimal default rendering
    return <DocumentSelectionToolbar {...args} />;
  },
};
