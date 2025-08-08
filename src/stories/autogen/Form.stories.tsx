import type { Meta, StoryObj } from '@storybook/react';
import { Form } from '../../../lib';

const meta: Meta<typeof Form> = {
  title: 'Auto/UI/Form',
  component: Form,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Form>;

export const Default: Story = {
  render: () => {
    // @ts-ignore - minimal render without required props for preview purposes
    return <Form />;
  },
};
