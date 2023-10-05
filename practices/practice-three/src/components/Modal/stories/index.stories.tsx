import type { Meta, StoryObj } from '@storybook/react';

// Components
import Modal from '@/components/Modal';

// Mocks
import { defaultModalProps } from '@/mocks';

const meta: Meta<typeof Modal> = {
  component: Modal,
};

export default meta;

type Story = StoryObj<typeof Modal>;

export const Base: Story = {
  args: defaultModalProps,
};
