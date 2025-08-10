import type { Meta, StoryObj } from '@storybook/react';
import NavigationButtons from './NavigationButtons';

const meta: Meta<typeof NavigationButtons> = {
  title: 'Auto/Components/NavigationButtons',
  component: NavigationButtons,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof NavigationButtons>;

export const Default: Story = {
  args: {},
  render: (args) => {
    // @ts-ignore - minimal default rendering
    return <NavigationButtons {...args} />;
  },
};
