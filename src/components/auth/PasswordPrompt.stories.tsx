import type { Meta, StoryObj } from '@storybook/react';
import PasswordPrompt from './PasswordPrompt';

const meta: Meta<typeof PasswordPrompt> = {
  title: 'Auto/Components/Auth/PasswordPrompt',
  component: PasswordPrompt,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof PasswordPrompt>;

export const Default: Story = {
  args: {},
  render: (args) => {
    // @ts-ignore - minimal default rendering
    return <PasswordPrompt {...args} />;
  },
};
