import type { Meta, StoryObj } from '@storybook/react';
import AnchorNavBar from './AnchorNavBar';

const meta: Meta<typeof AnchorNavBar> = {
  title: 'Auto/Components/AnchorNavBar',
  component: AnchorNavBar,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof AnchorNavBar>;

export const Default: Story = {
  args: {},
  render: (args) => {
    // @ts-ignore - minimal default rendering
    return <AnchorNavBar {...args} />;
  },
};
