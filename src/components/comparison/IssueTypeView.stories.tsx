import type { Meta, StoryObj } from '@storybook/react';
import IssueTypeView from './IssueTypeView';

const meta: Meta<typeof IssueTypeView> = {
  title: 'Auto/Components/Comparison/IssueTypeView',
  component: IssueTypeView,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof IssueTypeView>;

export const Default: Story = {
  args: {},
  render: (args) => {
    // @ts-ignore - minimal default rendering
    return <IssueTypeView {...args} />;
  },
};
