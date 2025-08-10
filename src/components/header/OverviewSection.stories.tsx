import type { Meta, StoryObj } from '@storybook/react';
import OverviewSection from './OverviewSection';

const meta: Meta<typeof OverviewSection> = {
  title: 'Auto/Components/Header/OverviewSection',
  component: OverviewSection,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof OverviewSection>;

export const Default: Story = {
  args: {},
  render: (args) => {
    // @ts-ignore - minimal default rendering
    return <OverviewSection {...args} />;
  },
};
