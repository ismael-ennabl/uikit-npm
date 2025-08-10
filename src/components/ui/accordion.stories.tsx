import type { Meta, StoryObj } from '@storybook/react';
import { Accordion } from './accordion';

const meta: Meta<typeof Accordion> = {
  title: 'Auto/Components/Ui/Accordion',
  component: Accordion,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  args: {},
  render: (args) => {
    // @ts-ignore - minimal default rendering
    return <Accordion {...args} />;
  },
};
