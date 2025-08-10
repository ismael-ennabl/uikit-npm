import type { Meta, StoryObj } from '@storybook/react';
import SectionNavigationList from './SectionNavigationList';

const meta: Meta<typeof SectionNavigationList> = {
  title: 'Auto/Components/Comparison/SectionNavigationList',
  component: SectionNavigationList,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof SectionNavigationList>;

export const Default: Story = {
  args: {},
  render: (args) => {
    // @ts-ignore - minimal default rendering
    return <SectionNavigationList {...args} />;
  },
};
