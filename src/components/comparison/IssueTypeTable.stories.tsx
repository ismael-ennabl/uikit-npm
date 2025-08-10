import type { Meta, StoryObj } from '@storybook/react';
import IssueTypeTable from './IssueTypeTable';

const meta: Meta<typeof IssueTypeTable> = {
  title: 'Auto/Components/Comparison/IssueTypeTable',
  component: IssueTypeTable,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof IssueTypeTable>;

export const Default: Story = {
  args: {},
  render: (args) => {
    // @ts-ignore - minimal default rendering
    return <IssueTypeTable {...args} />;
  },
};
