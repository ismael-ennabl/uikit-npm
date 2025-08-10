import type { Meta, StoryObj } from '@storybook/react';
import PDFSheet from './PDFSheet';

const meta: Meta<typeof PDFSheet> = {
  title: 'Auto/Components/Comparison/PDFSheet',
  component: PDFSheet,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof PDFSheet>;

export const Default: Story = {
  args: {},
  render: (args) => {
    // @ts-ignore - minimal default rendering
    return <PDFSheet {...args} />;
  },
};
