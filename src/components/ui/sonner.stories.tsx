import type { Meta, StoryObj } from '@storybook/react';
import { Toaster } from './sonner';

const meta: Meta<typeof Toaster> = {
  title: 'Auto/Components/Ui/Sonner Toaster',
  component: Toaster,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Toaster>;

export const Default: Story = {
  args: {},
  render: (args) => {
    // @ts-ignore - minimal default rendering
    return <Toaster {...args} />;
  },
};
