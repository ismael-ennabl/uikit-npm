import type { Meta, StoryObj } from '@storybook/react';
import UploadDisclaimer from './UploadDisclaimer';

const meta: Meta<typeof UploadDisclaimer> = {
  title: 'Auto/Components/Upload/UploadDisclaimer',
  component: UploadDisclaimer,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof UploadDisclaimer>;

export const Default: Story = {
  args: {},
  render: (args) => {
    // @ts-ignore - minimal default rendering
    return <UploadDisclaimer {...args} />;
  },
};
