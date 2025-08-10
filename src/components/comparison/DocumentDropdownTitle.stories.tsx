import type { Meta, StoryObj } from '@storybook/react';
import DocumentDropdownTitle from './DocumentDropdownTitle';

const meta: Meta<typeof DocumentDropdownTitle> = {
  title: 'Auto/Components/Comparison/DocumentDropdownTitle',
  component: DocumentDropdownTitle,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof DocumentDropdownTitle>;

export const Default: Story = {
  args: {},
  render: (args) => {
    // @ts-ignore - minimal default rendering
    return <DocumentDropdownTitle {...args} />;
  },
};
