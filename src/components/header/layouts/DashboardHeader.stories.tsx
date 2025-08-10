import type { Meta, StoryObj } from '@storybook/react';
import DashboardHeader from './DashboardHeader';

const meta: Meta<typeof DashboardHeader> = {
  title: 'Auto/Components/Header/Layouts/DashboardHeader',
  component: DashboardHeader,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof DashboardHeader>;

export const Default: Story = {
  args: {},
  render: (args) => {
    // @ts-ignore - minimal default rendering
    return <DashboardHeader {...args} />;
  },
};
