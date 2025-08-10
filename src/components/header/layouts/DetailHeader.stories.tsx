import type { Meta, StoryObj } from '@storybook/react';
import DetailHeader from './DetailHeader';

const meta: Meta<typeof DetailHeader> = {
  title: 'Auto/Components/Header/Layouts/DetailHeader',
  component: DetailHeader,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof DetailHeader>;

export const Default: Story = {
  args: {},
  render: (args) => {
    // @ts-ignore - minimal default rendering
    return <DetailHeader {...args} />;
  },
};
