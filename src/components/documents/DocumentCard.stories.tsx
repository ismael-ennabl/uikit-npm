import type { Meta, StoryObj } from '@storybook/react';
import DocumentCard from './DocumentCard';

const meta: Meta<typeof DocumentCard> = {
  title: 'Auto/Components/Documents/DocumentCard',
  component: DocumentCard,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof DocumentCard>;

export const Default: Story = {
  args: {},
  render: (args) => {
    // @ts-ignore - minimal default rendering
    return <DocumentCard {...args} />;
  },
};
