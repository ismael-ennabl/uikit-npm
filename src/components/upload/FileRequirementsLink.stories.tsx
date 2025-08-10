import type { Meta, StoryObj } from '@storybook/react';
import FileRequirementsLink from './FileRequirementsLink';

const meta: Meta<typeof FileRequirementsLink> = {
  title: 'Auto/Components/Upload/FileRequirementsLink',
  component: FileRequirementsLink,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof FileRequirementsLink>;

export const Default: Story = {
  args: {},
  render: (args) => {
    // @ts-ignore - minimal default rendering
    return <FileRequirementsLink {...args} />;
  },
};
