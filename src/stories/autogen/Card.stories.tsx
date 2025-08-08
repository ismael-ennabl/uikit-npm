import type { Meta, StoryObj } from '@storybook/react';
import { Card } from '../../lib';

const meta: Meta<typeof Card> = {
  title: 'Auto/UI/Card',
  component: Card,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: () => {
    // @ts-ignore - minimal render without required props for preview purposes
    return <Card />;
  },
};
