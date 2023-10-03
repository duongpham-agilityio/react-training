import type { Meta, StoryObj } from '@storybook/react';

// Components
import { FilterBar } from '@/components';

// Mocks
import { filterBarProps } from '@/mocks';

const meta: Meta<typeof FilterBar> = {
  component: FilterBar,
};

export default meta;
type Story = StoryObj<typeof FilterBar>;

export const LightMode: Story = {
  args: {
    ...filterBarProps,
  },
};

// Todo: Looking into some more optimized ideas for handling theme toggle
