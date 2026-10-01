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
          'Compact label or tag with multiple variants (interactive, read-only, dismissible, selectable), sizes (sm, md, lg), and themes (fill, transparent, outline). sm reuses the same (smallest available) type scale as md and shrinks via tighter padding/gap/icon size instead of smaller text. Outline themes use transparent background with border and semantic text. stroke-white is an alias for outline-white.',
      },
    },
  },
  argTypes: {
    variant: {
      options: ['interactive', 'interactive-rounded', 'read-only', 'dismissible', 'selectable'],
      control: { type: 'radio' },
    },
    size: {
      options: ['sm', 'md', 'lg'],
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
      <ul-pill [variant]="variant" [size]="size" [theme]="theme" [disabled]="disabled">
        <span>Pill Label</span>
      </ul-pill>
    `,
  }),
};

/**
 * All three sizes side by side. 'sm' and 'md' share the same text size —
 * 'caption-l' is already the smallest type scale step in the system — and
 * differ only in padding/gap/icon size.
 */
export const Sizes: Story = {
  args: {},
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; align-items: center; gap: 12px">
        <ul-pill [variant]="variant" size="sm" [theme]="theme" [disabled]="disabled">
          <span>Small</span>
        </ul-pill>
        <ul-pill [variant]="variant" size="md" [theme]="theme" [disabled]="disabled">
          <span>Medium</span>
        </ul-pill>
        <ul-pill [variant]="variant" size="lg" [theme]="theme" [disabled]="disabled">
          <span>Large</span>
        </ul-pill>
      </div>
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
      <ul-pill [variant]="variant" [size]="size" [theme]="theme" [disabled]="disabled">
        <span class="ul-icon ul-icon-games"></span>
        <span>Pill with Icons</span>
        <span class="ul-icon ul-icon-chevron_right"></span>
      </ul-pill>
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
      <ul-pill [variant]="variant" [size]="size" [theme]="theme" [disabled]="disabled">
        <span>Dismissible Pill</span>
      </ul-pill>
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
      <ul-pill [variant]="variant" [size]="size" [theme]="theme" [disabled]="disabled">
        <span>Read Only Pill</span>
      </ul-pill>
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
      <ul-pill [variant]="variant" [size]="size" [theme]="theme" [disabled]="disabled">
        <span>Selectable Pill</span>
      </ul-pill>
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
      <ul-pill [variant]="variant" [size]="size" [theme]="theme" [disabled]="disabled">
        <span>Disabled Pill</span>
      </ul-pill>
    `,
  }),
};
