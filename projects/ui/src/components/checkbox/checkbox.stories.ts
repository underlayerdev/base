import { Meta, StoryObj } from '../../../.storybook/types';

import { CheckboxComponent } from './checkbox';

const meta: Meta<CheckboxComponent> = {
  title: 'Components/Form Elements/Checkbox',
  component: CheckboxComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Checkbox aligned with other form fields (input, textarea, radio-group). Uses shared form field label and helper. Optional label (prop or projected content), helperText, required, and error state. Implements `FormCheckboxControl` for Signal Forms `[formField]`. Use `[(checked)]` for two-way binding. Supports zone variants and size (default, sm).',
      },
    },
  },
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'The checked state of the checkbox',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the checkbox is disabled',
    },
    indeterminate: {
      control: 'boolean',
      description: 'Whether the checkbox is in an indeterminate state',
    },
    zone: {
      control: 'select',
      options: ['none', 'accessible', 'visible', 'checked-visible'],
      description: 'The zone type of the checkbox',
    },
    size: {
      control: 'select',
      options: ['default', 'sm'],
      description: 'The size variant of the checkbox',
    },
    label: {
      control: 'text',
      description: 'Form field label (above the checkbox), same as input/textarea',
    },
    helperText: {
      control: 'text',
      description: 'Helper text below the checkbox when not in error state',
    },
    required: {
      control: 'boolean',
      description: 'Whether the checkbox is required (shows asterisk, aria-required)',
    },
    error: {
      control: 'boolean',
      description: 'Whether the checkbox is in an error state',
    },
    errorText: {
      control: 'text',
      description: 'Error message shown below when in error state',
    },
  },
};

export default meta;
type Story = StoryObj<CheckboxComponent>;

// Base Story
export const Basic: Story = {
  args: {
    checked: false,
    disabled: false,
    indeterminate: false,
    zone: 'none',
    size: 'default',
    error: false,
    errorText: '',
  },
  render: (args) => ({
    props: args,
    template: `
      <pe-checkbox
        [checked]="checked"
        [disabled]="disabled"
        [indeterminate]="indeterminate"
        [zone]="zone"
        [size]="size"
        [error]="error"
      >
        Basic Checkbox
      </pe-checkbox>
    `,
  }),
};

// Without Label
export const NoLabel: Story = {
  args: {
    ...Basic.args,
  },
  render: (args) => ({
    props: args,
    template: `
      <pe-checkbox
        [checked]="checked"
        [disabled]="disabled"
        [indeterminate]="indeterminate"
        [zone]="zone"
        [size]="size"
        [error]="error"
      ></pe-checkbox>
    `,
  }),
};

// Disabled States
export const DisabledStates: Story = {
  args: {
    ...Basic.args,
    disabled: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <pe-checkbox [checked]="checked" [disabled]="true">
          Disabled Unchecked
        </pe-checkbox>
        <pe-checkbox [checked]="false" [disabled]="true">
          Disabled Checked
        </pe-checkbox>
        <pe-checkbox [checked]="checked" [disabled]="true" [indeterminate]="true">
          Disabled Indeterminate
        </pe-checkbox>
      </div>
    `,
  }),
};

// Zone Variants
export const ZoneVariants: Story = {
  args: {
    ...Basic.args,
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <pe-checkbox [checked]="checked" zone="accessible">
          Accessible Zone
        </pe-checkbox>
        <pe-checkbox [checked]="checked" zone="visible">
          Visible Zone
        </pe-checkbox>
        <pe-checkbox [checked]="checked" zone="checked-visible">
          Checked Visible Zone
        </pe-checkbox>
      </div>
    `,
  }),
};

// Size Variants
export const SizeVariants: Story = {
  args: {
    ...Basic.args,
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <pe-checkbox [checked]="checked" size="default">
          Default Size
        </pe-checkbox>
        <pe-checkbox [checked]="checked" size="sm">
          Small Size
        </pe-checkbox>
      </div>
    `,
  }),
};

// Form field (label + helper, aligned with input/textarea)
export const FormField: Story = {
  args: {
    ...Basic.args,
    label: 'Accept terms and conditions',
    helperText: 'You must agree to continue.',
    required: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <pe-checkbox
        [checked]="checked"
        [label]="label"
        [helperText]="helperText"
        [required]="required"
        [disabled]="disabled"
        [size]="size"
      >
        I agree to the terms
      </pe-checkbox>
    `,
  }),
};

// Error State
export const ErrorState: Story = {
  args: {
    ...Basic.args,
    error: true,
    errorText: 'This field is required',
  },
  render: (args) => ({
    props: args,
    template: `
      <pe-checkbox [checked]="checked" [error]="true" [errorText]="errorText">
        Error State Checkbox
      </pe-checkbox>
    `,
  }),
};

// Long Label
export const LongLabel: Story = {
  args: {
    ...Basic.args,
  },
  render: (args) => ({
    props: args,
    template: `
      <pe-checkbox [checked]="checked" zone="visible">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab atque delectus 
        dignissimos, ducimus eligendi esse eveniet, facilis laudantium minus natus 
        nobis quaerat quasi quos sint soluta suscipit tenetur ut voluptatum.
      </pe-checkbox>
    `,
  }),
};
