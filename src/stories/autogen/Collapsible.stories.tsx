import type { Meta, StoryObj } from '@storybook/react';
import { Collapsible } from '../../../lib';

const meta: Meta<typeof Collapsible> = {
  title: 'Auto/UI/Collapsible',
  component: Collapsible,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Collapsible>;

export const Default: Story = {
  render: () => {
    // @ts-ignore - minimal render without required props for preview purposes
    return <Collapsible />;
  },
};
