import type { Meta, StoryObj } from '@storybook/react';
import ProtectedApp from './ProtectedApp';

const meta: Meta<typeof ProtectedApp> = {
  title: 'Auto/Components/Auth/ProtectedApp',
  component: ProtectedApp,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof ProtectedApp>;

export const Default: Story = {
  args: {},
  render: (args) => {
    // @ts-ignore - minimal default rendering
    return <ProtectedApp {...args} />;
  },
};
