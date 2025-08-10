import type { Meta, StoryObj } from '@storybook/react';
import { AspectRatio } from './aspect-ratio';

const meta: Meta<typeof AspectRatio> = {
  title: 'Auto/Components/Ui/AspectRatio',
  component: AspectRatio,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof AspectRatio>;

export const Default: Story = {
  args: {},
  render: (args) => {
    // @ts-ignore - minimal default rendering
    return <AspectRatio {...args} />;
  },
};
