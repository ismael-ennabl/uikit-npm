import type { Meta, StoryObj } from '@storybook/react';
import RootHeader from './RootHeader';

const meta: Meta<typeof RootHeader> = {
  title: 'Auto/Components/Header/Layouts/RootHeader',
  component: RootHeader,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof RootHeader>;

export const Default: Story = {
  args: {},
  render: (args) => {
    // @ts-ignore - minimal default rendering
    return <RootHeader {...args} />;
  },
};
