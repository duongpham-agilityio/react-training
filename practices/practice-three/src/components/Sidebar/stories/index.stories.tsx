import type { Meta, StoryObj } from '@storybook/react';

// Components
import { SideBar } from '@/components';

const meta: Meta<typeof SideBar> = {
  component: SideBar,
};

export default meta;
type Story = StoryObj<typeof SideBar>;

export const LightMode: Story = {};

// Todo: Looking into some more optimized ideas for handling theme toggle
