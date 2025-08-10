import type { Meta, StoryObj } from '@storybook/react';
import { Sheet } from './sheet';

const meta: Meta<typeof Sheet> = {
  title: 'Auto/Components/Ui/Sheet',
  component: Sheet,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Sheet>;

export const Default: Story = {
  args: {},
  render: (args) => {
    // @ts-ignore - minimal default rendering
    return <Sheet {...args} />;
  },
};
