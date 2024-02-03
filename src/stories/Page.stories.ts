import type { Meta, StoryObj } from '@storybook/react';
import { Page } from './Page.js';

const meta = {
  title: 'Example/FortuneSheet',
  component: Page,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Importer: Story = {};
