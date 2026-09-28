import { Meta, StoryObj } from '../../../.storybook/types';

import { CategoryPickerComponent, type CategoryPickerNode } from './category-picker';

const defaultNodes: CategoryPickerNode[] = [
  { id: 'electronics', parentId: null, label: 'Electronics', icon: 'computer', isLeaf: false },
  { id: 'electronics-cameras', parentId: 'electronics', label: 'Cameras', isLeaf: false },
  {
    id: 'electronics-cameras-drones',
    parentId: 'electronics-cameras',
    label: 'Drones',
    isLeaf: true,
  },
  {
    id: 'electronics-cameras-lenses',
    parentId: 'electronics-cameras',
    label: 'Lenses & Filters',
    isLeaf: true,
  },
  { id: 'electronics-phones', parentId: 'electronics', label: 'Cell Phones', isLeaf: false },
  {
    id: 'electronics-phones-smartphones',
    parentId: 'electronics-phones',
    label: 'Smartphones',
    isLeaf: true,
  },
  { id: 'fashion', parentId: null, label: 'Fashion', icon: 'tag', isLeaf: false },
  { id: 'fashion-clothing', parentId: 'fashion', label: 'Clothing & Accessories', isLeaf: true },
  { id: 'other', parentId: null, label: 'Other', icon: 'external_link', isLeaf: true },
];

const meta: Meta<CategoryPickerComponent> = {
  title: 'Components/Form Elements/CategoryPicker',
  component: CategoryPickerComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Picker for a hierarchical category tree of unbounded depth: a closed field that opens a drill-down + search modal (one level of children at a time, with a breadcrumb trail) and resolves to a single leaf node id. Implements `FormValueControl<string | null>` for Signal Forms. Use `[(value)]` for two-way binding.',
      },
    },
    layout: 'centered',
  },
  decorators: [
    (story) => ({
      ...story(),
      template: `<div style="min-height: 500px; min-width: 400px;">${story().template}</div>`,
    }),
  ],
  argTypes: {
    size: {
      options: ['sm', 'md', 'lg', 'xl'],
      control: { type: 'radio' },
    },
    error: { control: { type: 'boolean' } },
    disabled: { control: { type: 'boolean' } },
    required: { control: { type: 'boolean' } },
    showRequiredIndicator: { control: { type: 'boolean' } },
    label: { control: { type: 'text' } },
    helperText: { control: { type: 'text' } },
    errorText: { control: { type: 'text' } },
    placeholder: { control: { type: 'text' } },
    searchPlaceholder: { control: { type: 'text' } },
    modalTitle: { control: { type: 'text' } },
    rootLabel: { control: { type: 'text' } },
    noResultsText: { control: { type: 'text' } },
  },
  args: {
    size: 'md',
    error: false,
    disabled: false,
    required: false,
    showRequiredIndicator: true,
    label: 'Category',
    helperText: 'Choose the most specific category that fits',
    errorText: 'Please select a category',
    placeholder: 'Select a category',
    searchPlaceholder: 'Search categories',
    modalTitle: 'Select a category',
    rootLabel: 'All categories',
    noResultsText: 'No results',
    nodes: defaultNodes,
    value: null,
  },
};

export default meta;
type Story = StoryObj<CategoryPickerComponent>;

export const Default: Story = {
  args: {
    nodes: defaultNodes,
  },
  render: (args) => ({
    props: args,
    template: `
      <ul-category-picker
        [size]="size"
        [label]="label"
        [helperText]="helperText"
        [error]="error"
        [disabled]="disabled"
        [required]="required"
        [showRequiredIndicator]="showRequiredIndicator"
        [placeholder]="placeholder"
        [searchPlaceholder]="searchPlaceholder"
        [modalTitle]="modalTitle"
        [rootLabel]="rootLabel"
        [noResultsText]="noResultsText"
        [nodes]="nodes"
        [(value)]="value"
      />
    `,
  }),
};

export const Preselected: Story = {
  args: {
    nodes: defaultNodes,
    value: 'electronics-cameras-drones',
  },
  render: (args) => ({
    props: args,
    template: `
      <ul-category-picker
        [label]="label"
        [nodes]="nodes"
        [(value)]="value"
      />
    `,
  }),
};

export const WithError: Story = {
  args: {
    nodes: defaultNodes,
    error: true,
    required: true,
    value: null,
  },
  render: (args) => ({
    props: args,
    template: `
      <ul-category-picker
        [label]="label"
        [errorText]="errorText"
        [error]="error"
        [required]="required"
        [nodes]="nodes"
        [(value)]="value"
      />
    `,
  }),
};

export const Disabled: Story = {
  args: {
    nodes: defaultNodes,
    disabled: true,
    value: 'electronics-phones-smartphones',
  },
  render: (args) => ({
    props: args,
    template: `
      <ul-category-picker [label]="label" [disabled]="disabled" [nodes]="nodes" [(value)]="value" />
    `,
  }),
};
