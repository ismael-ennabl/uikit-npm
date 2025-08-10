import type { Meta, StoryObj } from '@storybook/react';
import FileList from './FileList';

const meta: Meta<typeof FileList> = {
  title: 'Auto/Components/Upload/FileList',
  component: FileList,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof FileList>;

export const Default: Story = {
  args: {},
  render: (args) => {
    // @ts-ignore - minimal default rendering
    return <FileList {...args} />;
  },
};
