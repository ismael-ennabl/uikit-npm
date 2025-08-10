import type { Meta, StoryObj } from '@storybook/react';
import Layout from './Layout';

const meta: Meta<typeof Layout> = {
  title: 'Auto/Components/Layout',
  component: Layout,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Layout>;

export const Default: Story = {
  args: {},
  render: (args) => {
    // @ts-ignore - minimal default rendering
    return <Layout {...args} />;
  },
};
