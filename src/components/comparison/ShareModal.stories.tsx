import type { Meta, StoryObj } from '@storybook/react';
import ShareModal from './ShareModal';

const meta: Meta<typeof ShareModal> = {
  title: 'Auto/Components/Comparison/ShareModal',
  component: ShareModal,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof ShareModal>;

export const Default: Story = {
  args: {},
  render: (args) => {
    // @ts-ignore - minimal default rendering
    return <ShareModal {...args} />;
  },
};
