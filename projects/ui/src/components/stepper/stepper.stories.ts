import { Meta, StoryObj } from '../../../.storybook/types';

import { StepperComponent } from './stepper';

const meta: Meta<StepperComponent> = {
  title: 'Components/Navigation/Stepper',
  component: StepperComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Presentational step indicator for a multi-step flow (e.g. onboarding, checkout) — dots connected by a line, current/completed/upcoming states. Has no notion of step content or navigation; the consumer owns that. `currentStep` is 1-indexed.',
      },
    },
  },
  argTypes: {
    totalSteps: {
      control: 'number',
      description: 'The total number of steps',
    },
    currentStep: {
      control: 'number',
      description: 'The current step (1-indexed)',
    },
    labels: {
      control: 'object',
      description: 'Optional label shown under each step',
    },
    ariaLabel: {
      control: 'text',
      description: 'Accessible name for the whole step list',
    },
  },
};

export default meta;
type Story = StoryObj<StepperComponent>;

export const Basic: Story = {
  args: {
    totalSteps: 3,
    currentStep: 1,
  },
  render: (args) => ({
    props: args,
    template: `<ul-stepper [totalSteps]="totalSteps" [currentStep]="currentStep" style="display: block; width: 320px;" />`,
  }),
};

export const MidFlow: Story = {
  args: {
    ...Basic.args,
    currentStep: 2,
  },
  render: (args) => ({
    props: args,
    template: `<ul-stepper [totalSteps]="totalSteps" [currentStep]="currentStep" style="display: block; width: 320px;" />`,
  }),
};

export const LastStep: Story = {
  args: {
    ...Basic.args,
    currentStep: 3,
  },
  render: (args) => ({
    props: args,
    template: `<ul-stepper [totalSteps]="totalSteps" [currentStep]="currentStep" style="display: block; width: 320px;" />`,
  }),
};

export const WithLabels: Story = {
  args: {
    totalSteps: 3,
    currentStep: 2,
    labels: ['Name', 'Photo', 'Location'],
  },
  render: (args) => ({
    props: args,
    template: `<ul-stepper [totalSteps]="totalSteps" [currentStep]="currentStep" [labels]="labels" style="display: block; width: 320px;" />`,
  }),
};

export const FiveSteps: Story = {
  args: {
    totalSteps: 5,
    currentStep: 3,
  },
  render: (args) => ({
    props: args,
    template: `<ul-stepper [totalSteps]="totalSteps" [currentStep]="currentStep" style="display: block; width: 320px;" />`,
  }),
};
