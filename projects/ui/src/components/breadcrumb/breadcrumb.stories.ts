import { moduleMetadata } from '@storybook/angular';
import { Meta, StoryObj } from '../../../.storybook/types';

import { BreadcrumbComponent, type BreadcrumbItem } from './breadcrumb';
import { RouterTestingModule } from '@angular/router/testing';

const meta: Meta<BreadcrumbComponent> = {
  title: 'Components/Navigation/Breadcrumb',
  component: BreadcrumbComponent,
  decorators: [
    moduleMetadata({
      imports: [RouterTestingModule],
    }),
  ],
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Navigation breadcrumb component for displaying page hierarchy. Supports responsive collapsing on mobile, customizable separators (chevron, slash, dot), and optional icons. Last item is not a link and uses aria-current="page" for accessibility.',
      },
    },
  },
  argTypes: {
    items: {
      control: { type: 'object' },
      description: 'Array of breadcrumb items to display',
    },
    separator: {
      options: ['chevron_right', 'slash', 'dot'],
      control: { type: 'radio' },
      description: 'Separator type between breadcrumb items',
    },
    maxItems: {
      control: { type: 'number' },
      description: 'Maximum number of items to show before collapsing (for responsive behavior)',
    },
  },
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Products', href: '/products' },
      { label: 'Electronics', href: '/products/electronics' },
      { label: 'Current Page' },
    ],
    separator: 'chevron_right',
    maxItems: undefined,
  },
};

export default meta;
type Story = StoryObj<BreadcrumbComponent>;

/**
 * Default breadcrumb story with 4 items.
 * Shows the basic breadcrumb navigation pattern.
 */
export const Default: Story = {
  args: {},
  render: (args) => ({
    props: args,
    template: `
      <pe-breadcrumb [items]="items" [separator]="separator" [maxItems]="maxItems" />
    `,
  }),
};

/**
 * Breadcrumb with icons on some items.
 * Demonstrates how icons can be added to breadcrumb items.
 */
export const WithIcons: Story = {
  args: {
    items: [
      { label: 'Home', href: '/', icon: 'home' },
      { label: 'Products', href: '/products', icon: 'store' },
      { label: 'Electronics', href: '/products/electronics' },
      { label: 'Current Page', icon: 'chevron_right' },
    ],
  },
  render: (args) => ({
    props: args,
    template: `
      <pe-breadcrumb [items]="items" [separator]="separator" />
    `,
  }),
};

/**
 * Breadcrumb with slash separator.
 * Uses a slash (/) instead of chevron for separation.
 */
export const SlashSeparator: Story = {
  args: {
    separator: 'slash',
  },
  render: (args) => ({
    props: args,
    template: `
      <pe-breadcrumb [items]="items" [separator]="separator" />
    `,
  }),
};

/**
 * Breadcrumb with dot separator.
 * Uses a dot (·) instead of chevron for separation.
 */
export const DotSeparator: Story = {
  args: {
    separator: 'dot',
  },
  render: (args) => ({
    props: args,
    template: `
      <pe-breadcrumb [items]="items" [separator]="separator" />
    `,
  }),
};

/**
 * Breadcrumb with many items showing responsive collapse behavior.
 * On mobile, shows first item + "..." + last 2 items when maxItems is set.
 */
export const ManyItems: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Category 1', href: '/category1' },
      { label: 'Category 2', href: '/category2' },
      { label: 'Category 3', href: '/category3' },
      { label: 'Category 4', href: '/category4' },
      { label: 'Category 5', href: '/category5' },
      { label: 'Current Page' },
    ],
    maxItems: 4,
  },
  render: (args) => ({
    props: args,
    template: `
      <pe-breadcrumb [items]="items" [separator]="separator" [maxItems]="maxItems" />
    `,
  }),
};

/**
 * Simple breadcrumb with only 2 items.
 * Shows minimal breadcrumb usage.
 */
export const Simple: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Current Page' },
    ],
  },
  render: (args) => ({
    props: args,
    template: `
      <pe-breadcrumb [items]="items" [separator]="separator" />
    `,
  }),
};

/**
 * Single item breadcrumb (no separator shown).
 * Demonstrates edge case with only one item.
 */
export const SingleItem: Story = {
  args: {
    items: [{ label: 'Current Page' }],
  },
  render: (args) => ({
    props: args,
    template: `
      <pe-breadcrumb [items]="items" [separator]="separator" />
    `,
  }),
};

/**
 * Breadcrumb with router links (if RouterModule is available).
 * Note: This requires RouterModule to be imported in the story context.
 */
export const WithRouterLinks: Story = {
  args: {
    items: [
      { label: 'Home', routerLink: '/' },
      { label: 'Products', routerLink: '/products' },
      { label: 'Current Page' },
    ],
  },
  render: (args) => ({
    props: args,
    template: `
      <pe-breadcrumb [items]="items" [separator]="separator" />
    `,
  }),
};
