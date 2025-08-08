import type { Meta, StoryObj } from '@storybook/react';
import { Toggle } from '../../lib';

const meta: Meta<typeof Toggle> = {
  title: 'Auto/UI/Toggle',
  component: Toggle,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Toggle>;

export const Default: Story = {
  render: () => {
    // @ts-ignore - minimal render without required props for preview purposes
    return <Toggle />;
  },
};
