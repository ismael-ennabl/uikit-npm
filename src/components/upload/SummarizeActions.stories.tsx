import type { Meta, StoryObj } from '@storybook/react';
import { SummarizeActions } from './SummarizeActions';

const meta: Meta<typeof SummarizeActions> = {
  title: 'Auto/Components/Upload/SummarizeActions',
  component: SummarizeActions,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof SummarizeActions>;

export const Default: Story = {
  args: {},
  render: (args) => {
    // @ts-ignore - minimal default rendering
    return <SummarizeActions {...args} />;
  },
};
