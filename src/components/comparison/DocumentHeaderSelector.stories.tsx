import type { Meta, StoryObj } from '@storybook/react';
import DocumentHeaderSelector from './DocumentHeaderSelector';

const meta: Meta<typeof DocumentHeaderSelector> = {
  title: 'Auto/Components/Comparison/DocumentHeaderSelector',
  component: DocumentHeaderSelector,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof DocumentHeaderSelector>;

export const Default: Story = {
  args: {},
  render: (args) => {
    // @ts-ignore - minimal default rendering
    return <DocumentHeaderSelector {...args} />;
  },
};
