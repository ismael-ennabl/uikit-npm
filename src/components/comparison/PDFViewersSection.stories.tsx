import type { Meta, StoryObj } from '@storybook/react';
import PDFViewersSection from './PDFViewersSection';

const meta: Meta<typeof PDFViewersSection> = {
  title: 'Auto/Components/Comparison/PDFViewersSection',
  component: PDFViewersSection,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof PDFViewersSection>;

export const Default: Story = {
  args: {},
  render: (args) => {
    // @ts-ignore - minimal default rendering
    return <PDFViewersSection {...args} />;
  },
};
