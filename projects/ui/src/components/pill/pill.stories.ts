import { Meta, StoryObj } from '../../../.storybook/types';

import { PillComponent } from './pill';

const meta: Meta<PillComponent> = {
  title: 'Components/Actions/Pill',
  component: PillComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Compact label or tag with multiple variants (interactive, read-only, dismissible, selectable), sizes (md, lg), and themes (fill, transparent, outline). Outline themes use transparent background with border and semantic text. stroke-white is an alias for outline-white.',
      },
    },
  },
  argTypes: {
    variant: {
      options: ['interactive', 'interactive-rounded', 'read-only', 'dismissible', 'selectable'],
      control: { type: 'radio' },
    },
    size: {
      options: ['md', 'lg'],
      control: { type: 'radio' },
    },
    theme: {
      options: [
        'fill-white',
        'fill-black',
        'fill-purple',
        'fill-red',
        'fill-green',
        'transparent-white',
        'transparent-purple',
        'transparent-red',
        'transparent-green',
        'stroke-white',
        'outline-white',
        'outline-purple',
        'outline-red',
        'outline-green',
      ],
      control: { type: 'select' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
  },
  args: {
    variant: 'interactive',
    size: 'md',
    theme: 'transparent-white',
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<PillComponent>;

/**
 * Default pill story that demonstrates the basic pill component.
 * Shows a simple pill with configurable variant, size, and theme.
 */
export const Default: Story = {
  args: {},
  render: (args) => ({
    props: args,
    template: `
      <pe-pill [variant]="variant" [size]="size" [theme]="theme" [disabled]="disabled">
        <span>Pill Label</span>
      </pe-pill>
    `,
  }),
};

/**
 * Demonstrates a pill with icons on both sides.
 */
export const WithIcons: Story = {
  args: {},
  render: (args) => ({
    props: args,
    template: `
      <pe-pill [variant]="variant" [size]="size" [theme]="theme" [disabled]="disabled">
        <span class="pe-icon pe-icon-ultra_games"></span>
        <span>Pill with Icons</span>
        <span class="pe-icon pe-icon-chevron_right"></span>
      </pe-pill>
    `,
  }),
};

/**
 * Demonstrates a dismissible pill variant with a close icon.
 */
export const Dismissible: Story = {
  args: {
    variant: 'dismissible',
  },
  render: (args) => ({
    props: args,
    template: `
      <pe-pill [variant]="variant" [size]="size" [theme]="theme" [disabled]="disabled">
        <span>Dismissible Pill</span>
      </pe-pill>
    `,
  }),
};

/**
 * Demonstrates a read-only pill variant.
 */
export const ReadOnly: Story = {
  args: {
    variant: 'read-only',
  },
  render: (args) => ({
    props: args,
    template: `
      <pe-pill [variant]="variant" [size]="size" [theme]="theme" [disabled]="disabled">
        <span>Read Only Pill</span>
      </pe-pill>
    `,
  }),
};

/**
 * Demonstrates a selectable pill variant.
 */
export const Selectable: Story = {
  args: {
    variant: 'selectable',
  },
  render: (args) => ({
    props: args,
    template: `
      <pe-pill [variant]="variant" [size]="size" [theme]="theme" [disabled]="disabled">
        <span>Selectable Pill</span>
      </pe-pill>
    `,
  }),
};

/**
 * Demonstrates a disabled pill state.
 */
export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <pe-pill [variant]="variant" [size]="size" [theme]="theme" [disabled]="disabled">
        <span>Disabled Pill</span>
      </pe-pill>
    `,
  }),
};
