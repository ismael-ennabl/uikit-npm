import type { Meta, StoryObj } from '@storybook/react';
import { Toast } from './toast';

const meta: Meta<typeof Toast> = {
  title: 'Auto/Components/Ui/Toast',
  component: Toast,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Toast>;

export const Default: Story = {
  args: {},
  render: (args) => {
    // @ts-ignore - minimal default rendering
    return <Toast {...args} />;
  },
};
