import type { Meta, StoryObj } from '@storybook/react';
import SourceDocumentsTable from './SourceDocumentsTable';

const meta: Meta<typeof SourceDocumentsTable> = {
  title: 'Auto/Components/Comparison/SourceDocumentsTable',
  component: SourceDocumentsTable,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof SourceDocumentsTable>;

export const Default: Story = {
  args: {},
  render: (args) => {
    // @ts-ignore - minimal default rendering
    return <SourceDocumentsTable {...args} />;
  },
};
