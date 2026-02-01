import { moduleMetadata } from '@storybook/angular';

import { Meta, StoryObj } from '../../../.storybook/types';

import { ButtonComponent } from '../button/button';
import { CardComponent } from '../card/card';

import { SkeletonComponent } from './skeleton';

const meta: Meta<SkeletonComponent> = {
  title: 'Components/Feedback/Skeleton',
  component: SkeletonComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [SkeletonComponent, ButtonComponent, CardComponent],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'Skeleton loader for content placeholders. Use as a primitive block (rect or text) or as an overlay that sits on top of real content while data is loading.',
      },
    },
  },
  argTypes: {
    variant: {
      options: ['rect', 'text'],
      control: { type: 'radio' },
      description: 'Skeleton visual variant.',
    },
    width: {
      control: 'text',
      description: 'Explicit width (e.g. 100%, 200px). Applies to the host container.',
    },
    height: {
      control: 'text',
      description: 'Explicit height (e.g. 16px, 3rem). Applies to the host container.',
    },
    lines: {
      control: { type: 'number', min: 1, max: 10 },
      description: 'Number of lines for text/line variants.',
    },
    borderRadius: {
      options: ['xs', 'sm', 'md', 'lg', 'full', null],
      control: { type: 'radio' },
      description: 'Optional radius override for rect variant.',
    },
    show: {
      control: { type: 'boolean' },
      description: 'Whether the skeleton is visible (useful for overlay mode).',
    },
  },
  args: {
    variant: 'rect',
    width: '200px',
    height: '24px',
    lines: 3,
    borderRadius: 'md',
    show: true,
  },
};

export default meta;
type Story = StoryObj<SkeletonComponent>;

export const Primitive: Story = {
  args: {},
  render: (args) => ({
    props: args,
    template: `
      <div style="padding: 24px; display: flex; flex-direction: column; gap: 16px; max-width: 480px;">
        <pe-skeleton
          [variant]="variant"
          [width]="width"
          [height]="height"
          [lines]="lines"
          [borderRadius]="borderRadius"
          [show]="show">
        </pe-skeleton>

        <pe-skeleton
          variant="text"
          [lines]="lines"
          [show]="show">
        </pe-skeleton>

        <div style="display: flex; align-items: center; gap: 16px;">
          <pe-skeleton
            variant="rect"
            width="40px"
            height="40px"
            borderRadius="full"
            [show]="show">
          </pe-skeleton>
          <pe-skeleton
            variant="text"
            [lines]="2"
            [show]="show"
            style="flex: 1;">
          </pe-skeleton>
        </div>
      </div>
    `,
  }),
};

export const OverlayOnButton: Story = {
  args: {
    show: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="padding: 24px; display: flex; justify-content: center;">
        <pe-skeleton [show]="show" variant="rect">
          <pe-button theme="fill-purple">
            Primary action
          </pe-button>
        </pe-skeleton>
      </div>
    `,
  }),
};

export const ListRowSkeleton: Story = {
  args: {
    show: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="padding: 24px; max-width: 520px;">
        <div style="display: flex; flex-direction: column; gap: 12px;">
          <div style="display: flex; align-items: center; gap: 12px;">
            <pe-skeleton
              variant="rect"
              width="40px"
              height="40px"
              borderRadius="full"
              [show]="show">
            </pe-skeleton>
            <pe-skeleton variant="text" [lines]="2" [show]="show" style="flex: 1;"></pe-skeleton>
          </div>

          <div style="display: flex; align-items: center; gap: 12px;">
            <pe-skeleton
              variant="rect"
              width="40px"
              height="40px"
              borderRadius="full"
              [show]="show">
            </pe-skeleton>
            <pe-skeleton variant="text" [lines]="2" [show]="show" style="flex: 1;"></pe-skeleton>
          </div>
        </div>
      </div>
    `,
  }),
};

