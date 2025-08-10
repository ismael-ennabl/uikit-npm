import type { Meta, StoryObj } from '@storybook/react';
import { Form } from './form';

const meta: Meta<typeof Form> = {
  title: 'Auto/Components/Ui/Form',
  component: Form,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Form>;

export const Default: Story = {
  args: {},
  render: (args) => {
    // @ts-ignore - minimal default rendering
    return <Form {...args} />;
  },
};
