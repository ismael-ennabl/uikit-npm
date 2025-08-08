import type { Meta, StoryObj } from '@storybook/react';
import { Footer } from '../../lib';

const meta: Meta<typeof Footer> = {
  title: 'Auto/Components/Footer',
  component: Footer,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Footer>;

export const Default: Story = {
  render: () => {
    // @ts-ignore - minimal render without required props for preview purposes
    return <Footer />;
  },
};
