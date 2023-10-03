import type { Meta, StoryObj } from '@storybook/react';

// Components
import { ProductCard } from '@/components';

// Mocks
import { productCardProps } from '@/mocks';

const meta: Meta<typeof ProductCard> = {
  component: ProductCard,
};

export default meta;
type Story = StoryObj<typeof ProductCard>;

export const LightMode: Story = {
  args: {
    ...productCardProps,
  },
};

export const LightModeIsLike: Story = {
  args: {
    ...productCardProps,
    info: {
      ...productCardProps.info,
      isLiked: true,
    },
  },
};

// Todo: Looking into some more optimized ideas for handling theme toggle
