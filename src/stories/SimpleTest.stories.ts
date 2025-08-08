import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../../lib';

const meta: Meta = {
  title: 'Test/Simple',
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj;

export const SimpleButton: Story = {
  render: () => <Button>Test Button</Button>,
};
