import type { Meta, StoryObj } from '@storybook/react';
import TopSearch from './TopSearch';

const meta: Meta<typeof TopSearch> = {
  title: 'Auto/Components/Header/TopSearch',
  component: TopSearch,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof TopSearch>;

export const Default: Story = {
  args: {},
  render: (args) => {
    // @ts-ignore - minimal default rendering
    return <TopSearch {...args} />;
  },
};
