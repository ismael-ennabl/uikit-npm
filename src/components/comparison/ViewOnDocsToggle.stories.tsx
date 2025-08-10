import type { Meta, StoryObj } from '@storybook/react';
import ViewOnDocsToggle from './ViewOnDocsToggle';

const meta: Meta<typeof ViewOnDocsToggle> = {
  title: 'Auto/Components/Comparison/ViewOnDocsToggle',
  component: ViewOnDocsToggle,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof ViewOnDocsToggle>;

export const Default: Story = {
  args: {},
  render: (args) => {
    // @ts-ignore - minimal default rendering
    return <ViewOnDocsToggle {...args} />;
  },
};
