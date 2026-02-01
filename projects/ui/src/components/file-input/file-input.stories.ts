import { Meta, StoryObj } from '../../../.storybook/types';

import { FileInputComponent, type FileInputAppearance } from './file-input';

const meta: Meta<FileInputComponent> = {
  title: 'Components/Form Elements/File input',
  component: FileInputComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'File input with label, helper/error text, and optional slots. Implements `FormValueControl<FileList | null>` for Signal Forms `[formField]`. Uses hidden native file input + visible trigger + selected file label. Supports sizes (sm–xl), appearance (border-only / subtle-tint), accept, multiple, and validation states.',
      },
    },
  },
  argTypes: {
    size: {
      options: ['sm', 'md', 'lg', 'xl'],
      control: { type: 'select' },
      description: 'Visual size.',
    },
    appearance: {
      control: { type: 'select' },
      options: ['border-only', 'subtle-tint'] satisfies FileInputAppearance[],
      description: 'Border/hover style.',
    },
    accept: {
      control: { type: 'text' },
      description: 'Accept attribute (e.g. image/*, .pdf).',
    },
    multiple: {
      control: { type: 'boolean' },
      description: 'Allow multiple file selection.',
    },
    error: {
      control: { type: 'boolean' },
      description: 'When true, shows error styling and optional errorText.',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disables the input.',
    },
    required: {
      control: { type: 'boolean' },
      description: 'Marks the field as required.',
    },
    placeholderText: {
      control: { type: 'text' },
      description: 'Text when no file is selected.',
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
  },
  args: {
    size: 'md',
    appearance: 'border-only',
    accept: '',
    multiple: false,
    error: false,
    disabled: false,
    required: false,
    placeholderText: 'No file chosen',
    label: 'Label',
    helperText: 'Helper text',
    errorText: 'Error text',
  },
};

export default meta;
type Story = StoryObj<FileInputComponent>;

export const Default: Story = {
  args: {},
  render: (args) => ({
    props: args,
    template: `
      <pe-file-input
        [size]="size"
        [appearance]="appearance"
        [accept]="accept"
        [multiple]="multiple"
        [error]="error"
        [disabled]="disabled"
        [required]="required"
        [placeholderText]="placeholderText"
        [label]="label"
        [helperText]="helperText"
        [errorText]="errorText"
      />
    `,
  }),
};

export const WithLabelAndHelper: Story = {
  args: {
    label: 'Upload document',
    helperText: 'PDF or images, max 10 MB',
    placeholderText: 'No file chosen',
  },
  render: (args) => ({
    props: args,
    template: `
      <pe-file-input
        [size]="size"
        [appearance]="appearance"
        [label]="label"
        [helperText]="helperText"
        [placeholderText]="placeholderText"
      />
    `,
  }),
};

export const WithError: Story = {
  args: {
    error: true,
    label: 'Attachment',
    helperText: 'Add a file',
    errorText: 'Please select a file',
  },
  render: (args) => ({
    props: args,
    template: `
      <pe-file-input
        [size]="size"
        [appearance]="appearance"
        [error]="error"
        [label]="label"
        [helperText]="helperText"
        [errorText]="errorText"
      />
    `,
  }),
};

export const AllSizes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <pe-file-input size="sm" label="Small" />
        <pe-file-input size="md" label="Medium" />
        <pe-file-input size="lg" label="Large" />
        <pe-file-input size="xl" label="Extra large" />
      </div>
    `,
  }),
};

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'Disabled file input',
  },
  render: (args) => ({
    props: args,
    template: `
      <pe-file-input
        [disabled]="disabled"
        [label]="label"
      />
    `,
  }),
};

export const Multiple: Story = {
  args: {
    multiple: true,
    label: 'Select files',
    placeholderText: 'No files chosen',
    helperText: 'You can select multiple files',
  },
  render: (args) => ({
    props: args,
    template: `
      <pe-file-input
        [multiple]="multiple"
        [label]="label"
        [placeholderText]="placeholderText"
        [helperText]="helperText"
      />
    `,
  }),
};

export const BorderAndHoverOptions: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 1.5rem; max-width: 24rem;">
        <pe-file-input
          appearance="border-only"
          label="Border only"
        />
        <pe-file-input
          appearance="subtle-tint"
          label="Subtle tint"
        />
      </div>
    `,
  }),
};
