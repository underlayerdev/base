import { Meta, StoryObj } from '../../../.storybook/types';

import { RadioComponent } from './radio';

const meta: Meta<RadioComponent> = {
  title: 'Components/Form Elements/Radio',
  component: RadioComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Single radio option for use in a group. Use with `pe-radio-group` and `[formField]` for Signal Forms, or bind `[(checked)]` per radio. Requires `name` and `value`; supports disabled and custom id. Full accessibility with ARIA and keyboard (Space/Enter).',
      },
    },
  },
  argTypes: {
    value: {
      control: 'text',
      description:
        'The value associated with this radio button. This value identifies the radio button within its group.',
      table: {
        type: { summary: 'string' },
        required: true,
      },
    },
    name: {
      control: 'text',
      description:
        'The name attribute for the radio button group. All radio buttons in the same group should share the same name.',
      table: {
        type: { summary: 'string' },
        required: true,
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the radio button is disabled.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    checked: {
      control: 'boolean',
      description: 'Whether the radio button is currently checked/selected. Supports two-way binding.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    id: {
      control: 'text',
      description: 'Unique identifier for the radio button. If not provided, one will be auto-generated.',
      table: {
        type: { summary: 'string' },
      },
    },
    click: {
      action: 'click',
      description: 'Event emitted when the radio button is clicked. Useful for additional click handling.',
      table: {
        type: { summary: 'EventEmitter<MouseEvent>' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<RadioComponent>;

export const Default: Story = {
  args: {
    value: 'option1',
    name: 'radio-group',
  },
  render: (args) => ({
    props: args,
    template: `
      <pe-radio 
        [value]="value" 
        [name]="name" 
        [disabled]="disabled" 
        [checked]="checked"
        [id]="id"
        (click)="click($event)">
        Option 1
      </pe-radio>
    `,
  }),
};

export const Checked: Story = {
  ...Default,
  args: {
    value: 'option2',
    checked: true,
  },
};

export const DisabledChecked: Story = {
  ...Default,
  args: {
    ...Default.args,
    value: 'option-disabled-checked',
    disabled: true,
    checked: true,
  },
};

export const WithCustomId: Story = {
  ...Default,
  args: {
    ...Default.args,
    value: 'option-custom-id',
    id: 'my-custom-radio-id',
  },
};

export const RadioGroup: Story = {
  args: {
    value: 'option1',
    name: 'radio-group-example',
  },
  render: (args) => ({
    props: {
      ...args,
      selectedValue: 'option1',
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <h3>Select your preferred option:</h3>
        
        <pe-radio 
          value="option1" 
          name="radio-group-example" 
          [checked]="selectedValue === 'option1'"
          (checkedChange)="selectedValue = selectedValue === 'option1' ? '' : 'option1'">
          Option 1 - This is the first choice
        </pe-radio>
        
        <pe-radio 
          value="option2" 
          name="radio-group-example" 
          [checked]="selectedValue === 'option2'"
          (checkedChange)="selectedValue = selectedValue === 'option2' ? '' : 'option2'">
          Option 2 - This is the second choice
        </pe-radio>
        
        <pe-radio 
          value="option3" 
          name="radio-group-example" 
          [checked]="selectedValue === 'option3'"
          (checkedChange)="selectedValue = selectedValue === 'option3' ? '' : 'option3'">
          Option 3 - This is the third choice
        </pe-radio>
        
        <pe-radio 
          value="option4" 
          name="radio-group-example" 
          [checked]="selectedValue === 'option4'"
          [disabled]="true"
          (checkedChange)="selectedValue = selectedValue === 'option4' ? '' : 'option4'">
          Option 4 - This option is disabled
        </pe-radio>
        
        <p style="margin-top: 16px; font-size: 14px; color: #666;">
          Selected value: <strong>{{ selectedValue }}</strong>
        </p>
      </div>
    `,
  }),
};
