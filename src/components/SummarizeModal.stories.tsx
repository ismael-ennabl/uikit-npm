import type { Meta, StoryObj } from '@storybook/react';
import SummarizeModal from './SummarizeModal';

const meta: Meta<typeof SummarizeModal> = {
  title: 'Auto/Components/SummarizeModal',
  component: SummarizeModal,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof SummarizeModal>;

export const Default: Story = {
  args: {},
  render: (args) => {
    // @ts-ignore - minimal default rendering
    return <SummarizeModal {...args} />;
  },
};
