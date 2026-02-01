import { Meta, StoryObj } from '../../../.storybook/types';

import { CalendarComponent, CalendarMode } from './calendar';

const meta: Meta<CalendarComponent> = {
  title: 'Components/Form Elements/Calendar',
  component: CalendarComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Date and/or time picker with popup calendar. Implements `FormValueControl<Date | null>` for Signal Forms `[formField]`. Use `[(value)]` for two-way binding. Modes: date, time, datetime. Supports min/max date and time, locale, sizes, and label/helper/error text.',
      },
    },
  },
  argTypes: {
    mode: {
      options: ['date', 'time', 'datetime'] as CalendarMode[],
      control: { type: 'select' },
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
    showCalendarIcon: {
      control: { type: 'boolean' },
    },
  },
  args: {
    mode: 'date',
    value: null,
    size: 'md',
    error: false,
    disabled: false,
    readOnly: false,
    required: false,
    placeholder: '',
    label: 'Date',
    helperText: '',
    errorText: 'Please select a date',
    showCalendarIcon: true,
    minDate: null,
    maxDate: null,
    minTime: null,
    maxTime: null,
    locale: 'en-US',
  },
};

export default meta;
type Story = StoryObj<CalendarComponent>;

export const DateOnly: Story = {
  args: {
    mode: 'date',
    label: 'Select date',
    helperText: 'Choose a date from the calendar',
  },
  render: (args) => ({
    props: args,
    template: `
      <pe-calendar
        [(value)]="value"
        [mode]="mode"
        [size]="size"
        [error]="error"
        [disabled]="disabled"
        [readOnly]="readOnly"
        [required]="required"
        [placeholder]="placeholder"
        [label]="label"
        [helperText]="helperText"
        [errorText]="errorText"
        [showCalendarIcon]="showCalendarIcon"
        [minDate]="minDate"
        [maxDate]="maxDate"
        [locale]="locale"
      />
    `,
  }),
};

export const TimeOnly: Story = {
  args: {
    mode: 'time',
    label: 'Select time',
    helperText: 'Choose a time',
  },
  render: (args) => ({
    props: args,
    template: `
      <pe-calendar
        [(value)]="value"
        [mode]="mode"
        [size]="size"
        [error]="error"
        [disabled]="disabled"
        [readOnly]="readOnly"
        [required]="required"
        [placeholder]="placeholder"
        [label]="label"
        [helperText]="helperText"
        [errorText]="errorText"
        [showCalendarIcon]="showCalendarIcon"
        [minTime]="minTime"
        [maxTime]="maxTime"
        [locale]="locale"
      />
    `,
  }),
};

export const DateTime: Story = {
  args: {
    mode: 'datetime',
    label: 'Select date and time',
    helperText: 'Choose both date and time',
  },
  render: (args) => ({
    props: args,
    template: `
      <pe-calendar
        [(value)]="value"
        [mode]="mode"
        [size]="size"
        [error]="error"
        [disabled]="disabled"
        [readOnly]="readOnly"
        [required]="required"
        [placeholder]="placeholder"
        [label]="label"
        [helperText]="helperText"
        [errorText]="errorText"
        [showCalendarIcon]="showCalendarIcon"
        [minDate]="minDate"
        [maxDate]="maxDate"
        [minTime]="minTime"
        [maxTime]="maxTime"
        [locale]="locale"
      />
    `,
  }),
};

export const WithConstraints: Story = {
  args: {
    mode: 'datetime',
    label: 'Appointment date and time',
    helperText: 'Select a date and time within the allowed range',
    minDate: new Date(2025, 0, 1),
    maxDate: new Date(2025, 11, 31),
    minTime: new Date(2025, 0, 1, 9, 0),
    maxTime: new Date(2025, 0, 1, 17, 0),
  },
  render: (args) => ({
    props: args,
    template: `
      <pe-calendar
        [(value)]="value"
        [mode]="mode"
        [size]="size"
        [label]="label"
        [helperText]="helperText"
        [minDate]="minDate"
        [maxDate]="maxDate"
        [minTime]="minTime"
        [maxTime]="maxTime"
      />
    `,
  }),
};

export const WithError: Story = {
  args: {
    mode: 'date',
    error: true,
    label: 'Birth date',
    helperText: 'Enter your date of birth',
    errorText: 'This field is required',
  },
  render: (args) => ({
    props: args,
    template: `
      <pe-calendar
        [(value)]="value"
        [mode]="mode"
        [error]="error"
        [label]="label"
        [helperText]="helperText"
        [errorText]="errorText"
        [required]="required"
      />
    `,
  }),
};

export const Disabled: Story = {
  args: {
    mode: 'date',
    disabled: true,
    label: 'Disabled calendar',
    value: new Date(2025, 5, 15),
  },
  render: (args) => ({
    props: args,
    template: `
      <pe-calendar
        [(value)]="value"
        [mode]="mode"
        [disabled]="disabled"
        [label]="label"
      />
    `,
  }),
};

export const AllSizes: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <pe-calendar mode="date" size="sm" label="Small" />
        <pe-calendar mode="date" size="md" label="Medium" />
        <pe-calendar mode="date" size="lg" label="Large" />
        <pe-calendar mode="date" size="xl" label="Extra large" />
      </div>
    `,
  }),
};

export const WithoutIcon: Story = {
  args: {
    mode: 'date',
    showCalendarIcon: false,
    label: 'Date without icon',
  },
  render: (args) => ({
    props: args,
    template: `
      <pe-calendar
        [(value)]="value"
        [mode]="mode"
        [showCalendarIcon]="showCalendarIcon"
        [label]="label"
      />
    `,
  }),
};
