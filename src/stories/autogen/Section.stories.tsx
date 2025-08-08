import type { Meta, StoryObj } from '@storybook/react';
import { Section } from '../../../lib';

const meta: Meta<typeof Section> = {
  title: 'Auto/Components/Section',
  component: Section,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Section>;

export const Default: Story = {
  render: () => {
    // @ts-ignore - minimal render without required props for preview purposes
    return <Section />;
  },
};
