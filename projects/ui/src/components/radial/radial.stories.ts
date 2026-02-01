import { Meta, StoryObj } from '../../../.storybook/types';

import { RadialComponent } from './radial';

const meta: Meta<RadialComponent> = {
  title: 'Components/Feedback/Radial',
  component: RadialComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Circular progress indicator. Set `percentage` (0–100) and `size` (pixels). Optional `infinite` for indeterminate spinning. Use for loading or progress states.',
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: [96, 64, 48, 32, 24, 20, 16],
      description: 'Size of the radial component in pixels',
    },
    percentage: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Percentage of the radial that is filled (0-100)',
    },
    infinite: {
      control: { type: 'boolean' },
      description: 'If true, the radial will rotate indefinitely',
    },
  },
};

export default meta;
type Story = StoryObj<RadialComponent>;

export const Default: Story = {
  args: {
    size: 96,
    percentage: 25,
    infinite: false,
  },
};

export const HalfProgress: Story = {
  args: {
    size: 96,
    percentage: 50,
    infinite: false,
  },
};

export const FullProgress: Story = {
  args: {
    size: 96,
    percentage: 100,
    infinite: false,
  },
};

export const Infinite: Story = {
  args: {
    size: 96,
    percentage: 0,
    infinite: true,
  },
};

export const SmallSize: Story = {
  args: {
    size: 32,
    percentage: 75,
    infinite: false,
  },
};

export const LargeSize: Story = {
  args: {
    size: 96,
    percentage: 25,
    infinite: false,
  },
};
