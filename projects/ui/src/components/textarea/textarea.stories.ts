import { Meta, StoryObj } from '../../../.storybook/types';

import { TextareaComponent, TextareaResize } from './textarea';

const meta: Meta<TextareaComponent> = {
  title: 'Components/Form Elements/Textarea',
  component: TextareaComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Multi-line text input with label, helper/error text, and optional left/right slots. Implements `FormValueControl` for Signal Forms `[formField]`. Use `[(value)]` for two-way binding. Supports sizes, resize behavior (none/vertical/horizontal/both), and disabled/readonly/required/error states.',
      },
    },
  },
  argTypes: {
    value: {
      control: { type: 'text' },
    },
    size: {
      options: ['sm', 'md', 'lg', 'xl'],
      control: { type: 'select' },
    },
    error: {
      control: { type: 'boolean' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
    readOnly: {
      control: { type: 'boolean' },
    },
    required: {
      control: { type: 'boolean' },
    },
    placeholder: {
      control: { type: 'text' },
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
    maxLength: {
      control: { type: 'number' },
    },
    minLength: {
      control: { type: 'number' },
    },
    rows: {
      control: { type: 'number' },
    },
    resize: {
      options: ['none', 'vertical', 'horizontal', 'both'] as TextareaResize[],
      control: { type: 'select' },
    },
  },
  args: {
    value: '',
    size: 'md',
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
    rows: 3,
    resize: 'vertical',
  },
};

export default meta;
type Story = StoryObj<TextareaComponent>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <pe-textarea
        [(value)]="value"
        [size]="size"
        [error]="error"
        [disabled]="disabled"
        [readOnly]="readOnly"
        [placeholder]="placeholder"
        [label]="label"
        [helperText]="helperText"
        [errorText]="errorText"
        [maxLength]="maxLength"
        [minLength]="minLength"
        [rows]="rows"
        [resize]="resize"
      />
    `,
  }),
};

export const WithLabelAndHelper: Story = {
  args: {
    label: 'Description',
    helperText: 'Enter a short description',
    placeholder: 'Type here...',
  },
  render: (args) => ({
    props: args,
    template: `
      <pe-textarea
        [(value)]="value"
        [size]="size"
        [placeholder]="placeholder"
        [label]="label"
        [helperText]="helperText"
        [rows]="rows"
      />
    `,
  }),
};

export const WithError: Story = {
  args: {
    error: true,
    label: 'Comments',
    helperText: 'Optional feedback',
    errorText: 'This field is required',
    value: '',
  },
  render: (args) => ({
    props: args,
    template: `
      <pe-textarea
        [(value)]="value"
        [size]="size"
        [error]="error"
        [label]="label"
        [helperText]="helperText"
        [errorText]="errorText"
        [rows]="rows"
      />
    `,
  }),
};

export const AllSizes: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <pe-textarea size="sm" placeholder="Small textarea" [rows]="2" />
        <pe-textarea size="md" placeholder="Medium textarea" [rows]="3" />
        <pe-textarea size="lg" placeholder="Large textarea" [rows]="4" />
        <pe-textarea size="xl" placeholder="Extra large textarea" [rows]="3" />
      </div>
    `,
  }),
};

export const States: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <pe-textarea
          [disabled]="true"
          label="Disabled textarea"
          value="This textarea is disabled"
          [rows]="3"
        />
        <pe-textarea
          [readOnly]="true"
          label="Readonly textarea"
          value="This textarea is readonly"
          [rows]="3"
        />
      </div>
    `,
  }),
};

export const WithSlots: Story = {
  render: (args) => ({
    props: args,
    template: `
      <pe-textarea
        [(value)]="value"
        [size]="size"
        [label]="label"
        [helperText]="helperText"
        [rows]="rows"
        [maxLength]="200">
        <ng-container pe-textarea-left-elements>
          <i class="pe-icon pe-icon-size-6 pe-icon-message"></i>
        </ng-container>
        <ng-container pe-textarea-right-elements>
          <span>{{ value?.length ?? 0 }}/200</span>
        </ng-container>
      </pe-textarea>
    `,
  }),
  args: {
    label: 'Message',
    helperText: 'Max 200 characters',
    maxLength: 200,
  },
};

export const Resize: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <pe-textarea
          resize="none"
          label="Resize: none"
          placeholder="Cannot resize"
          [rows]="3"
        />
        <pe-textarea
          resize="vertical"
          label="Resize: vertical (default)"
          placeholder="Resize vertically"
          [rows]="3"
        />
        <pe-textarea
          resize="both"
          label="Resize: both"
          placeholder="Resize both directions"
          [rows]="3"
        />
      </div>
    `,
  }),
};
