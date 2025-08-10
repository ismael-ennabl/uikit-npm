import type { Meta, StoryObj } from '@storybook/react';
import { Textarea } from './textarea';

const meta: Meta<typeof Textarea> = {
  title: 'Auto/Components/Ui/Textarea',
  component: Textarea,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  args: {},
  render: (args) => {
    // @ts-ignore - minimal default rendering
    return <Textarea {...args} />;
  },
};
