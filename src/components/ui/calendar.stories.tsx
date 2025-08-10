import type { Meta, StoryObj } from '@storybook/react';
import { Calendar } from './calendar';

const meta: Meta<typeof Calendar> = {
  title: 'Auto/Components/Ui/Calendar',
  component: Calendar,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Calendar>;

export const Default: Story = {
  args: {},
  render: (args) => {
    // @ts-ignore - minimal default rendering
    return <Calendar {...args} />;
  },
};
