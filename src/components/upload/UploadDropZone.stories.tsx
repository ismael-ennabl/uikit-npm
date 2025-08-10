import type { Meta, StoryObj } from '@storybook/react';
import UploadDropZone from './UploadDropZone';

const meta: Meta<typeof UploadDropZone> = {
  title: 'Auto/Components/Upload/UploadDropZone',
  component: UploadDropZone,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof UploadDropZone>;

export const Default: Story = {
  args: {},
  render: (args) => {
    // @ts-ignore - minimal default rendering
    return <UploadDropZone {...args} />;
  },
};
