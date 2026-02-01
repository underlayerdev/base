import { Meta, StoryObj } from '../../../.storybook/types';

import { InputComponent, type InputAppearance } from './input';

const meta: Meta<InputComponent> = {
  title: 'Components/Form Elements/Input',
  component: InputComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Single-line text input with label, helper/error text, and optional left/right slots. Implements `FormValueControl` for use with Signal Forms via `[formField]`. Use `[(value)]` for two-way binding. Supports sizes (sm–xl), disabled/readonly/required, and validation states.',
      },
    },
  },
  argTypes: {
    value: {
      control: { type: 'text' },
      description: 'Current input value; use with [(value)] for two-way binding.',
    },
    type: {
      control: { type: 'text' },
      description: 'Native input type: text, password, email, number, tel, url.',
    },
    size: {
      control: { type: 'text' },
      description: 'Visual size: sm, md, lg, xl.',
    },
    appearance: {
      control: { type: 'select' },
      options: ['border-only', 'subtle-tint'] satisfies InputAppearance[],
      description:
        'Border/hover style: border-only (hover = border only), subtle-tint (hover = border + 5% fill).',
    },
    error: {
      control: { type: 'boolean' },
      description: 'When true, shows error styling and optional errorText.',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disables the input.',
    },
    readOnly: {
      control: { type: 'boolean' },
      description: 'Makes the input read-only.',
    },
    required: {
      control: { type: 'boolean' },
      description: 'Marks the field as required (shows indicator).',
    },
    placeholder: {
      control: { type: 'text' },
      description: 'Placeholder text when empty.',
    },
    label: {
      control: { type: 'text' },
      description: 'Label shown above the input.',
    },
    helperText: {
      control: { type: 'text' },
      description: 'Helper text shown below the input.',
    },
    errorText: {
      control: { type: 'text' },
      description: 'Error message shown when error is true.',
    },
    maxLength: {
      control: { type: 'number' },
      description: 'Max length attribute.',
    },
    minLength: {
      control: { type: 'number' },
      description: 'Min length attribute.',
    },
    pattern: {
      control: { type: 'text' },
      description: 'HTML pattern attribute for validation.',
    },
    autocomplete: {
      control: { type: 'text' },
      description: 'Autocomplete attribute (e.g. off, email).',
    },
  },
  args: {
    value: '',
    type: 'text',
    size: 'md',
    appearance: 'border-only',
    error: false,
    disabled: false,
    readOnly: false,
    required: false,
    placeholder: 'Enter text...',
    label: 'Label',
    helperText: 'Helper text',
    errorText: 'Error text',
    maxLength: undefined,
    minLength: undefined,
    pattern: [],
    autocomplete: 'off',
  },
};

export default meta;
type Story = StoryObj<InputComponent>;

/**
 * Default input story that demonstrates the basic input component.
 * Shows a simple input field with configurable size and states.
 */
export const Default: Story = {
  args: {},
  render: (args) => ({
    props: args,
    template: `
      <pe-input
        [value]="value"
        [type]="type"
        [size]="size"
        [appearance]="appearance"
        [error]="error"
        [disabled]="disabled"
        [readOnly]="readOnly"
        [placeholder]="placeholder"
        [label]="label"
        [helperText]="helperText"
        [errorText]="errorText"
        [maxLength]="maxLength"
        [minLength]="minLength"
        [pattern]="pattern"
        [autocomplete]="autocomplete"
      />
    `,
  }),
};

/**
 * Compare border and hover options: border-only vs subtle-tint.
 * Hover and focus each input to see the difference.
 */
export const BorderAndHoverOptions: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 1.5rem; max-width: 24rem;">
        <pe-input
          appearance="border-only"
          label="Border only"
          placeholder="Hover = border only, focus = stronger border"
        />
        <pe-input
          appearance="subtle-tint"
          label="Subtle tint"
          placeholder="Hover = border + 5% fill"
        />
      </div>
    `,
  }),
};

/**
 * Demonstrates an input with a label and helper text.
 */
export const WithLabelAndHelper: Story = {
  args: {
    label: 'Username',
    helperText: 'Enter your username',
    placeholder: 'johndoe',
  },
  render: (args) => ({
    props: args,
    template: `
      <pe-input
        [size]="size"
        [appearance]="appearance"
        [error]="error"
        [disabled]="disabled"
        [readOnly]="readOnly"
        [placeholder]="placeholder"
        [label]="label"
        [helperText]="helperText"
        [value]="value"
      />
    `,
  }),
};

/**
 * Shows an input field in error state.
 */
export const WithError: Story = {
  args: {
    error: true,
    label: 'Email',
    helperText: 'Use your personal email address',
    errorText: 'Please enter a valid email address',
    value: 'invalid-email',
  },
  render: (args) => ({
    props: args,
    template: `
      <pe-input
        [size]="size"
        [appearance]="appearance"
        [error]="error"
        [disabled]="disabled"
        [readOnly]="readOnly"
        [placeholder]="placeholder"
        [label]="label"
        [helperText]="helperText"
        [errorText]="errorText"
        [value]="value"
      />
    `,
  }),
};

/**
 * Demonstrates different input sizes.
 */
export const AllSizes: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <pe-input size="sm" placeholder="Small input" />
        <pe-input size="md" placeholder="Medium input" />
        <pe-input size="lg" placeholder="Large input" />
        <pe-input size="xl" placeholder="Extra large input" />
      </div>
    `,
  }),
};

/**
 * Shows disabled and readonly states.
 */
export const States: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <pe-input
          [disabled]="true"
          label="Disabled input"
          value="This input is disabled"
        />
        <pe-input
          [readOnly]="true"
          label="Readonly input"
          value="This input is readonly"
        />
      </div>
    `,
  }),
};

/**
 * Demonstrates an input with elements on the left and right.
 */
export const WithElements: Story = {
  render: (args) => ({
    props: args,
    template: `
      <pe-input
        [size]="size"
        [appearance]="appearance"
        [error]="error"
        [disabled]="disabled"
        [readOnly]="readOnly"
        [placeholder]="placeholder"
        [label]="label"
        [helperText]="helperText"
        [value]="value"
      >
        <ng-container pe-input-left-elements>
          <i class="pe-icon pe-icon-ultra_games"></i>
        </ng-container>
        <ng-container pe-input-right-elements>
          <span>47</span>
          <i class="pe-icon pe-icon-trash"></i>
          <i class="pe-icon pe-icon-search"></i>
        </ng-container>
      </pe-input>
    `,
  }),
};
