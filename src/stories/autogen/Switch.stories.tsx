import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from '../../../lib';

const meta: Meta<typeof Switch> = {
  title: 'Auto/UI/Switch',
  component: Switch,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  render: () => {
    // @ts-ignore - minimal render without required props for preview purposes
    return <Switch />;
  },
};
