import { moduleMetadata } from '@storybook/angular';

import { Meta, StoryObj } from '../../../.storybook/types';

import { ButtonComponent } from '../button/button';

import { TooltipComponent } from './tooltip';

const meta: Meta<TooltipComponent> = {
  title: 'Components/Feedback/Tooltip',
  component: TooltipComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [ButtonComponent, TooltipComponent],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'Simple hover/focus tooltip for inline controls. Wrap any trigger content in `pe-tooltip` and provide the text. Positions: top, bottom, left, right. Tooltips are non-interactive and use ARIA `role="tooltip"`.',
      },
    },
  },
  argTypes: {
    text: {
      control: 'text',
      description: 'Tooltip text content.',
    },
    position: {
      options: ['top', 'bottom', 'left', 'right'],
      control: { type: 'radio' },
      description: 'Preferred tooltip position relative to the trigger.',
    },
    showDelay: {
      control: { type: 'number' },
      description: 'Delay in ms before showing the tooltip on hover/focus.',
    },
    hideDelay: {
      control: { type: 'number' },
      description: 'Delay in ms before hiding the tooltip on leave/blur.',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'When true, the tooltip will never show.',
    },
  },
  args: {
    text: 'Tooltip text',
    position: 'top',
    showDelay: 150,
    hideDelay: 100,
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<TooltipComponent>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="padding: 40px; display: flex; justify-content: center;">
        <pe-tooltip
          [text]="text"
          [position]="position"
          [showDelay]="showDelay"
          [hideDelay]="hideDelay"
          [disabled]="disabled"
        >
          <pe-button theme="fill-purple">
            Hover or focus me
          </pe-button>
        </pe-tooltip>
      </div>
    `,
  }),
};

export const Positions: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="padding: 40px; display: flex; gap: 32px; justify-content: center; flex-wrap: wrap;">
        <pe-tooltip [text]="text + ' (top)'" position="top">
          <pe-button theme="fill-purple">Top</pe-button>
        </pe-tooltip>

        <pe-tooltip [text]="text + ' (right)'" position="right">
          <pe-button theme="fill-purple">Right</pe-button>
        </pe-tooltip>

        <pe-tooltip [text]="text + ' (bottom)'" position="bottom">
          <pe-button theme="fill-purple">Bottom</pe-button>
        </pe-tooltip>

        <pe-tooltip [text]="text + ' (left)'" position="left">
          <pe-button theme="fill-purple">Left</pe-button>
        </pe-tooltip>
      </div>
    `,
  }),
};

