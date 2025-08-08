import type { Meta, StoryObj } from '@storybook/react';
import { Breadcrumb } from '../../../lib';

const meta: Meta<typeof Breadcrumb> = {
  title: 'Auto/UI/Breadcrumb',
  component: Breadcrumb,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Breadcrumb>;

export const Default: Story = {
  render: () => {
    // @ts-ignore - minimal render without required props for preview purposes
    return <Breadcrumb />;
  },
};
