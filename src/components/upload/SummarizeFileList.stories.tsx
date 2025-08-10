import type { Meta, StoryObj } from '@storybook/react';
import { SummarizeFileList } from './SummarizeFileList';

const meta: Meta<typeof SummarizeFileList> = {
  title: 'Auto/Components/Upload/SummarizeFileList',
  component: SummarizeFileList,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof SummarizeFileList>;

export const Default: Story = {
  args: {},
  render: (args) => {
    // @ts-ignore - minimal default rendering
    return <SummarizeFileList {...args} />;
  },
};
