import type { Meta, StoryObj } from '@storybook/react';
import ToastDebug from './ToastDebug';

const meta: Meta<typeof ToastDebug> = {
  title: 'Auto/Components/Dev/ToastDebug',
  component: ToastDebug,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof ToastDebug>;

export const Default: Story = {
  args: {},
  render: (args) => {
    // @ts-ignore - minimal default rendering
    return <ToastDebug {...args} />;
  },
};
