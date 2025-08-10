import type { Meta, StoryObj } from '@storybook/react';
import PDFViewer from './PDFViewer';

const meta: Meta<typeof PDFViewer> = {
  title: 'Auto/Components/PDFViewer',
  component: PDFViewer,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof PDFViewer>;

export const Default: Story = {
  args: {},
  render: (args) => {
    // @ts-ignore - minimal default rendering
    return <PDFViewer {...args} />;
  },
};
