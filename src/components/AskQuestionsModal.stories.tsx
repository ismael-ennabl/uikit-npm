import type { Meta, StoryObj } from '@storybook/react';
import AskQuestionsModal from './AskQuestionsModal';

const meta: Meta<typeof AskQuestionsModal> = {
  title: 'Auto/Components/AskQuestionsModal',
  component: AskQuestionsModal,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof AskQuestionsModal>;

export const Default: Story = {
  args: {},
  render: (args) => {
    // @ts-ignore - minimal default rendering
    return <AskQuestionsModal {...args} />;
  },
};
