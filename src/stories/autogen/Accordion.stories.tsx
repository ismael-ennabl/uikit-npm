import type { Meta, StoryObj } from '@storybook/react';
import { Accordion } from '../../../lib';

const meta: Meta<typeof Accordion> = {
  title: 'Auto/UI/Accordion',
  component: Accordion,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  render: () => {
    // @ts-ignore - minimal render without required props for preview purposes
    return <Accordion />;
  },
};
