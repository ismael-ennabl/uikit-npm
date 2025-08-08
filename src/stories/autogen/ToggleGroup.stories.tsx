import type { Meta, StoryObj } from '@storybook/react';
import { ToggleGroup } from '../../lib';

const meta: Meta<typeof ToggleGroup> = {
  title: 'Auto/UI/ToggleGroup',
  component: ToggleGroup,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof ToggleGroup>;

export const Default: Story = {
  render: () => {
    // @ts-ignore - minimal render without required props for preview purposes
    return <ToggleGroup />;
  },
};
