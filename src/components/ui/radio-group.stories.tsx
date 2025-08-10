import type { Meta, StoryObj } from '@storybook/react';
import { RadioGroup } from './radio-group';

const meta: Meta<typeof RadioGroup> = {
  title: 'Auto/Components/Ui/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {
  args: {},
  render: (args) => {
    // @ts-ignore - minimal default rendering
    return <RadioGroup {...args} />;
  },
};
