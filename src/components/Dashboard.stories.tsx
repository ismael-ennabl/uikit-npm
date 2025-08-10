import type { Meta, StoryObj } from '@storybook/react';
import Dashboard from './Dashboard';

const meta: Meta<typeof Dashboard> = {
  title: 'Auto/Components/Dashboard',
  component: Dashboard,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Dashboard>;

export const Default: Story = {
  args: {},
  render: (args) => {
    // @ts-ignore - minimal default rendering
    return <Dashboard {...args} />;
  },
};
