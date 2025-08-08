import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../../../lib';

const meta: Meta<typeof Button> = {
  title: 'Auto/UI/Button',
  component: Button,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  render: () => {
    // @ts-ignore - minimal render without required props for preview purposes
    return <Button />;
  },
};
