import type { Meta, StoryObj } from '@storybook/react';
import DocumentView from './DocumentView';

const meta: Meta<typeof DocumentView> = {
  title: 'Auto/Components/Comparison/DocumentView',
  component: DocumentView,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof DocumentView>;

export const Default: Story = {
  args: {},
  render: (args) => {
    // @ts-ignore - minimal default rendering
    return <DocumentView {...args} />;
  },
};
