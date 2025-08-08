import type { Meta, StoryObj } from '@storybook/react';
import { AnchorNavBar } from '../../lib';

const meta: Meta<typeof AnchorNavBar> = {
  title: 'Auto/Components/AnchorNavBar',
  component: AnchorNavBar,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof AnchorNavBar>;

export const Default: Story = {
  render: () => {
    // @ts-ignore - minimal render without required props for preview purposes
    return <AnchorNavBar />;
  },
};
