import { Meta, StoryObj } from '../../../.storybook/types';

import { SelectComponent, SelectOption } from './select';

const meta: Meta<SelectComponent> = {
  title: 'Components/Form Elements/Select',
  component: SelectComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Dropdown select built on the dropdown component. Implements `FormValueControl<string | null>` for Signal Forms `[formField]`. Use `[(value)]` or pass `[options]` and bind value. Supports label, helper/error text, placeholder, sizes, and themes (ghost-white, transparent-white).',
      },
    },
  },
  argTypes: {
    size: {
      options: ['sm', 'md', 'lg', 'xl'],
      control: { type: 'radio' },
    },
    theme: {
      options: ['ghost-white', 'transparent-white'],
      control: { type: 'select' },
    },
    error: {
      control: { type: 'boolean' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
    required: {
      control: { type: 'boolean' },
    },
    label: {
      control: { type: 'text' },
    },
    helperText: {
      control: { type: 'text' },
    },
    errorText: {
      control: { type: 'text' },
    },
    placeholder: {
      control: { type: 'text' },
    },
    value: {
      control: { type: 'text' },
    },
  },
  args: {
    size: 'md',
    theme: 'transparent-white',
    error: false,
    disabled: false,
    required: false,
    label: 'Select option',
    helperText: 'Choose an option from the list',
    errorText: 'This field is required',
    placeholder: 'Select an option',
    value: null,
  },
};

export default meta;
type Story = StoryObj<SelectComponent>;

const options: SelectOption[] = [
  {
    label: 'Most recent first',
    value: 'recent_desc',
    leftIcons: ['sort'],
    rightIcons: ['activity'],
  },
  {
    label: 'Most old first',
    value: 'recent_asc',
    leftIcons: ['sort'],
    rightIcons: ['admin'],
  },
  {
    label: 'Lower price first',
    value: 'price_asc',
    leftIcons: ['dollar'],
    rightIcons: ['apple'],
    disabled: true,
  },
  {
    label: 'Higher price first',
    value: 'price_desc',
    leftIcons: ['dollar'],
    rightIcons: ['application'],
  },
  {
    label: 'Alphabetical order A - Z',
    value: 'alpha_asc',
    leftIcons: ['type'],
    rightIcons: ['archive'],
  },
  {
    label: 'Alphabetical order Z - A',
    value: 'alpha_desc',
    leftIcons: ['type'],
    rightIcons: ['award'],
  },
];

/**
 * Default select story that demonstrates the basic select component
 * with label, helper text, and a list of options.
 */
export const Default: Story = {
  args: {
    options,
  },
  render: (args) => ({
    props: args,
    template: `
      <pe-select
        [size]="size"
        [theme]="theme"
        [label]="label"
        [helperText]="helperText"
        [errorText]="errorText"
        [error]="error"
        [disabled]="disabled"
        [required]="required"
        [placeholder]="placeholder"
        [options]="options"
        [(value)]="value"
      />
    `,
  }),
};

/**
 * Demonstrates the select component in error state.
 */
export const WithError: Story = {
  args: {
    options,
    error: true,
    value: null,
  },
  render: (args) => ({
    props: args,
    template: `
      <pe-select
        [size]="size"
        [theme]="theme"
        [label]="label"
        [helperText]="helperText"
        [errorText]="errorText"
        [error]="error"
        [disabled]="disabled"
        [required]="required"
        [placeholder]="placeholder"
        [options]="options"
        [(value)]="value"
      />
    `,
  }),
};

/**
 * Demonstrates different select sizes.
 */
export const AllSizes: Story = {
  args: {
    options,
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 420px;">
        <pe-select
          size="sm"
          label="Small"
          [options]="options"
          helperText="Small select"
        />
        <pe-select
          size="md"
          label="Medium"
          [options]="options"
          helperText="Medium select"
        />
        <pe-select
          size="lg"
          label="Large"
          [options]="options"
          helperText="Large select"
        />
        <pe-select
          size="xl"
          label="Extra large"
          [options]="options"
          helperText="Extra large select"
        />
      </div>
    `,
  }),
};

/**
 * Demonstrates disabled and required states.
 */
export const States: Story = {
  args: {
    options,
  },
  render: () => ({
    props: {
      options,
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 420px;">
        <pe-select
          [options]="options"
          label="Disabled select"
          helperText="This select is disabled"
          [disabled]="true"
        />
        <pe-select
          [options]="options"
          label="Required select"
          helperText="This field is required"
          errorText="Please select an option"
          [required]="true"
        />
      </div>
    `,
  }),
};

