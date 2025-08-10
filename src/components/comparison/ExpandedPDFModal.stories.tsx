import type { Meta, StoryObj } from '@storybook/react';
import ExpandedPDFModal from './ExpandedPDFModal';

const meta: Meta<typeof ExpandedPDFModal> = {
  title: 'Auto/Components/Comparison/ExpandedPDFModal',
  component: ExpandedPDFModal,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof ExpandedPDFModal>;

export const Default: Story = {
  args: {},
  render: (args) => {
    // @ts-ignore - minimal default rendering
    return <ExpandedPDFModal {...args} />;
  },
};
