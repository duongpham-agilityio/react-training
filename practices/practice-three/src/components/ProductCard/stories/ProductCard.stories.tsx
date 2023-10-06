import { ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

// Components
import { ProductCard } from '@/components';

// Mocks
import { productCardProps } from '@/mocks';
import { Box } from '@chakra-ui/react';

const Component = (args: ComponentProps<typeof ProductCard>) => (
  <Box w={525}>
    <ProductCard {...args} />
  </Box>
);

const meta: Meta<typeof Component> = {
  component: Component,
};

export default meta;
type Story = StoryObj<typeof Component>;

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
