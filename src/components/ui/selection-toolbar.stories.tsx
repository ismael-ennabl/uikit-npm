import type { Meta, StoryObj } from '@storybook/react';
import SelectionToolbar from './selection-toolbar';

const meta: Meta<typeof SelectionToolbar> = {
  title: 'Auto/Components/Ui/SelectionToolbar',
  component: SelectionToolbar,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof SelectionToolbar>;

export const Default: Story = {
  args: {},
  render: (args) => {
    // @ts-ignore - minimal default rendering
    return <SelectionToolbar {...args} />;
  },
};
