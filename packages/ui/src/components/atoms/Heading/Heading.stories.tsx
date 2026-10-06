import type { Meta, StoryObj } from '@storybook/react-vite';
import { Heading } from './Heading';

const meta: Meta<typeof Heading> = {
  title: 'Atoms/Heading',
  component: Heading,
  tags: ['autodocs'],
  args: {
    children: 'Portfolio Overview',
  },
};

export default meta;
type Story = StoryObj<typeof Heading>;

export const Default: Story = {};

export const CustomColor: Story = {
  args: {
    color: '#178e96',
  },
};

export const Small: Story = {
  args: {
    as: 'h3',
    variant: 'small',
  },
};
