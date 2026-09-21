import { Meta, StoryObj } from '../../../.storybook/types';

import { ButtonComponent } from './button';

const meta: Meta<ButtonComponent> = {
  title: 'Components/Actions/Button',
  component: ButtonComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Primary action button with multiple themes (fill, transparent, ghost, outline), sizes (sm–xl), and optional icon-only or vertical layout. Outline themes use a transparent background with a 1px border and semantic text color. Content is projected; use icons or text. Supports disabled state.',
      },
    },
  },
  argTypes: {
    size: {
      options: ['sm', 'md', 'lg', 'xl'],
      control: { type: 'radio' },
    },
    theme: {
      options: [
        'fill-purple',
        'fill-white',
        'fill-yellow',
        'fill-red',
        'fill-green',
        'transparent-purple',
        'transparent-white',
        'transparent-red',
        'transparent-black',
        'ghost-purple',
        'ghost-white',
        'ghost-red',
        'ghost-green',
        'outline-white',
        'outline-purple',
        'outline-red',
        'outline-green',
      ],
      control: { type: 'select' },
      description: 'Visual theme (fill, transparent, ghost, outline variants).',
    },
    iconOnly: {
      control: { type: 'boolean' },
      description: 'When true, button shows only icon content with no label.',
    },
    vertical: {
      control: { type: 'boolean' },
      description: 'Stack icon and label vertically (e.g. for large buttons).',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disables the button.',
    },
  },
  args: {
    size: 'md',
    theme: 'fill-purple',
    iconOnly: false,
    vertical: false,
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<ButtonComponent>;

/**
 * Default button story that demonstrates the basic button component.
 * Shows a simple button with configurable size and theme.
 */
export const Default: Story = {
  args: {},
  render: (args) => ({
    props: args,
    template: `
      <ul-button [size]="size" [theme]="theme" [iconOnly]="iconOnly" [disabled]="disabled">
        Button
      </ul-button>
    `,
  }),
};

/**
 * Demonstrates a button with icons on both sides.
 */
export const WithIcons: Story = {
  args: {},
  render: (args) => ({
    props: args,
    template: `
      <ul-button [size]="size" [theme]="theme">
        <i class="ul-icon ul-icon-store"></i>
        Button
        <i class="ul-icon ul-icon-chevron_right"></i>
      </ul-button>
    `,
  }),
};

/**
 * Demonstrates an icon-only button variant.
 * - Sets iconOnly prop to true
 */
export const IconOnly: Story = {
  args: {
    iconOnly: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <ul-button [size]="size" [theme]="theme" [iconOnly]="iconOnly">
        <i class="ul-icon ul-icon-cloud"></i>
      </ul-button>
    `,
  }),
};

/**
 * Demonstrates a vertical layout button available only on large size.
 * - Sets the props size to lg and vertical to true
 */
export const VerticalLarge: Story = {
  args: {
    size: 'lg',
    vertical: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <ul-button [size]="size" [theme]="theme" [vertical]="vertical">
        <i class="ul-icon ul-icon-cloud"></i>
        <span>Vertical Button</span>
      </ul-button>
    `,
  }),
};

/**
 * Demonstrates all available button sizes side by side.
 * Shows sm, md, lg, and xl sizes for easy comparison.
 */
export const AllSizes: Story = {
  args: {},
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; gap: 16px; align-items: center; flex-wrap: wrap;">
        <ul-button [size]="'sm'" [theme]="theme">
          Small Button
        </ul-button>
        <ul-button [size]="'md'" [theme]="theme">
          Medium Button
        </ul-button>
        <ul-button [size]="'lg'" [theme]="theme">
          Large Button
        </ul-button>
        <ul-button [size]="'xl'" [theme]="theme">
          Extra Large Button
        </ul-button>
      </div>
    `,
  }),
};

/**
 * Outline theme: transparent background, 1px border, and semantic text color.
 * Use outline-white, outline-purple, outline-red, or outline-green for secondary or tertiary actions.
 */
export const Outline: Story = {
  args: {
    theme: 'outline-white',
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; gap: 16px; align-items: center; flex-wrap: wrap;">
        <ul-button theme="outline-white">Outline White</ul-button>
        <ul-button theme="outline-purple">Outline Purple</ul-button>
        <ul-button theme="outline-red">Outline Red</ul-button>
        <ul-button theme="outline-green">Outline Green</ul-button>
      </div>
    `,
  }),
};
