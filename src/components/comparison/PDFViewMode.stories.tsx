import type { Meta, StoryObj } from '@storybook/react';
import PDFViewMode from './PDFViewMode';

const meta: Meta<typeof PDFViewMode> = {
  title: 'Auto/Components/Comparison/PDFViewMode',
  component: PDFViewMode,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof PDFViewMode>;

export const Default: Story = {
  args: {},
  render: (args) => {
    // @ts-ignore - minimal default rendering
    return <PDFViewMode {...args} />;
  },
};
