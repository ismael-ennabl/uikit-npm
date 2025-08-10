import type { Meta, StoryObj } from '@storybook/react';
import AnswerActions from './AnswerActions';

const meta: Meta<typeof AnswerActions> = {
  title: 'Auto/Components/AnswerActions',
  component: AnswerActions,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof AnswerActions>;

export const Default: Story = {
  args: {},
  render: (args) => {
    // @ts-ignore - minimal default rendering
    return <AnswerActions {...args} />;
  },
};
