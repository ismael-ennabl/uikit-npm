import type { Meta, StoryObj } from '@storybook/react';
import PageTitle from './PageTitle';

const meta: Meta<typeof PageTitle> = {
  title: 'Auto/Components/Header/PageTitle',
  component: PageTitle,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof PageTitle>;

export const Default: Story = {
  args: {},
  render: (args) => {
    // @ts-ignore - minimal default rendering
    return <PageTitle {...args} />;
  },
};
