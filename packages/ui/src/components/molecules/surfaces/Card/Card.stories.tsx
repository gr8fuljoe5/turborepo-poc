import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from '../../../atoms/Badge/Badge';
import { Card } from './Card';

const meta: Meta<typeof Card> = {
  title: 'Molecules/Surfaces/Card',
  component: Card,
  tags: ['autodocs'],
  args: {
    title: 'Portfolio summary',
    children: 'Everything looks good.',
    style: { width: 360 },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {};

export const WithSubtitle: Story = {
  args: {
    subtitle: '12 holdings',
  },
};

export const WithAction: Story = {
  args: {
    subtitle: '12 holdings',
    action: <Badge variant="success">Active</Badge>,
  },
};

export const BodyOnly: Story = {
  args: {
    title: undefined,
  },
};
