import type { Meta, StoryObj } from '@storybook/react';
import DocumentComparisonInterface from './DocumentComparisonInterface';

const meta: Meta<typeof DocumentComparisonInterface> = {
  title: 'Auto/Components/DocumentComparisonInterface',
  component: DocumentComparisonInterface,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof DocumentComparisonInterface>;

export const Default: Story = {
  args: {},
  render: (args) => {
    // @ts-ignore - minimal default rendering
    return <DocumentComparisonInterface {...args} />;
  },
};
