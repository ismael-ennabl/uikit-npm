import type { Meta, StoryObj } from '@storybook/react';
import UploadModal from './UploadModal';

const meta: Meta<typeof UploadModal> = {
  title: 'Auto/Components/UploadModal',
  component: UploadModal,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof UploadModal>;

export const Default: Story = {
  args: {},
  render: (args) => {
    // @ts-ignore - minimal default rendering
    return <UploadModal {...args} />;
  },
};
