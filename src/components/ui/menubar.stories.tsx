import type { Meta, StoryObj } from '@storybook/react';
import { Menubar } from './menubar';

const meta: Meta<typeof Menubar> = {
  title: 'Auto/Components/Ui/Menubar',
  component: Menubar,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Menubar>;

export const Default: Story = {
  args: {},
  render: (args) => {
    // @ts-ignore - minimal default rendering
    return <Menubar {...args} />;
  },
};
