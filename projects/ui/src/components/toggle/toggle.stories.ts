import { Meta, StoryObj } from '../../../.storybook/types';

import { ToggleComponent } from './toggle';

const meta: Meta<ToggleComponent> = {
  title: 'Components/Form Elements/Toggle',
  component: ToggleComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'On/off switch, the switch equivalent of ul-checkbox. Renders `role="switch"` with `aria-checked` kept in sync, and responds to both click and Enter (Space is native to the underlying checkbox input). Prefer this over ul-checkbox when the change takes effect immediately (e.g. a setting), rather than being submitted later with the rest of a form. Implements `FormCheckboxControl` for Signal Forms `[formField]`. Use `[(checked)]` for two-way binding. Supports size (default, sm, lg — lg is easier to tap on touch).',
      },
    },
  },
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'The checked (on) state of the toggle',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the toggle is disabled',
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg'],
      description: 'The size variant of the toggle',
    },
    label: {
      control: 'text',
      description: 'Label text rendered inline next to the switch',
    },
    helperText: {
      control: 'text',
      description: 'Helper text below the toggle when not in error state',
    },
    error: {
      control: 'boolean',
      description: 'Whether the toggle is in an error state',
    },
    errorText: {
      control: 'text',
      description: 'Error message shown below when in error state',
    },
  },
};

export default meta;
type Story = StoryObj<ToggleComponent>;

// Base Story
export const Basic: Story = {
  args: {
    checked: false,
    disabled: false,
    size: 'default',
    error: false,
    errorText: '',
  },
  render: (args) => ({
    props: args,
    template: `
      <ul-toggle
        [checked]="checked"
        [disabled]="disabled"
        [size]="size"
        [error]="error"
      >
        Basic Toggle
      </ul-toggle>
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
      <ul-toggle
        [checked]="checked"
        [disabled]="disabled"
        [size]="size"
        [error]="error"
      ></ul-toggle>
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
        <ul-toggle [checked]="false" [disabled]="true">
          Disabled Off
        </ul-toggle>
        <ul-toggle [checked]="true" [disabled]="true">
          Disabled On
        </ul-toggle>
      </div>
    `,
  }),
};

// Size Variants
export const SizeVariants: Story = {
  args: {
    ...Basic.args,
    checked: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <ul-toggle [checked]="checked" size="default">
          Default Size
        </ul-toggle>
        <ul-toggle [checked]="checked" size="sm">
          Small Size
        </ul-toggle>
        <ul-toggle [checked]="checked" size="lg">
          Large Size
        </ul-toggle>
      </div>
    `,
  }),
};

// Form field (label + helper, aligned with input/checkbox)
export const FormField: Story = {
  args: {
    ...Basic.args,
    label: 'Notifications',
    helperText: 'Get notified about new messages and offers.',
  },
  render: (args) => ({
    props: args,
    template: `
      <ul-toggle
        [checked]="checked"
        [label]="label"
        [helperText]="helperText"
        [disabled]="disabled"
        [size]="size"
      >
        Enable notifications
      </ul-toggle>
    `,
  }),
};

// Error State
export const ErrorState: Story = {
  args: {
    ...Basic.args,
    error: true,
    errorText: 'Could not save this setting',
  },
  render: (args) => ({
    props: args,
    template: `
      <ul-toggle [checked]="checked" [error]="true" [errorText]="errorText">
        Error State Toggle
      </ul-toggle>
    `,
  }),
};
