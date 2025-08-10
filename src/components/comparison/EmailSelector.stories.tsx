import type { Meta, StoryObj } from '@storybook/react';
import EmailSelector from './EmailSelector';

const meta: Meta<typeof EmailSelector> = {
  title: 'Auto/Components/Comparison/EmailSelector',
  component: EmailSelector,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof EmailSelector>;

export const Default: Story = {
  args: {},
  render: (args) => {
    // @ts-ignore - minimal default rendering
    return <EmailSelector {...args} />;
  },
};
