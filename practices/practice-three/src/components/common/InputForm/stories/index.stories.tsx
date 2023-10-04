import type { Meta, StoryObj } from '@storybook/react';

// Components
import { InputForm } from '@/components/common';

// Mocks
import { inputFormProps } from '@/mocks';

const meta: Meta<typeof InputForm> = {
  component: InputForm,
};

export default meta;

type Story = StoryObj<typeof InputForm>;

export const Base: Story = {
  args: inputFormProps,
};

export const Error: Story = {
  args: {
    ...inputFormProps,
    isError: true,
    errorMessage: 'Is require',
  },
};

// Todo: Looking into some more optimized ideas for handling theme toggle
