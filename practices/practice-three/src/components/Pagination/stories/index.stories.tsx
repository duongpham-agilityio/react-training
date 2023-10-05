import type { Meta, StoryObj } from '@storybook/react';

// Components
import { Pagination } from '@/components';

// Mocks
import { defaultPropsPagination } from '@/mocks';

const meta: Meta<typeof Pagination> = {
  component: Pagination,
};

export default meta;

type Story = StoryObj<typeof Pagination>;

export const Base: Story = {
  args: defaultPropsPagination,
};

export const ChangePage: Story = {
  args: {
    ...defaultPropsPagination,
    currentPage: 2,
    isPrevPage: true,
  },
};
