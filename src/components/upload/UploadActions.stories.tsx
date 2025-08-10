import type { Meta, StoryObj } from '@storybook/react';
import UploadActions from './UploadActions';

const meta: Meta<typeof UploadActions> = {
  title: 'Auto/Components/Upload/UploadActions',
  component: UploadActions,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof UploadActions>;

export const Default: Story = {
  args: {},
  render: (args) => {
    // @ts-ignore - minimal default rendering
    return <UploadActions {...args} />;
  },
};
