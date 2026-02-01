import { Meta, StoryObj } from '../../../.storybook/types';

import { AvatarGroupComponent, AvatarData } from './avatar-group';

const meta: Meta<AvatarGroupComponent> = {
  title: 'Components/Data Display/Avatar Group',
  component: AvatarGroupComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Group of avatars with optional stacking and max-visible overflow. Pass an array of avatar data (src, initials, icon, alt). When maxVisible is set, extra avatars are collapsed into a "+N" indicator.',
      },
    },
  },
  argTypes: {
    size: {
      options: ['sm', 'md', 'lg', 'xl'],
      control: { type: 'radio' },
      description: 'The size of all avatars in the group',
    },
    maxVisible: {
      control: { type: 'number', min: 0 },
      description: 'Maximum number of avatars to display before showing overflow indicator',
    },
    stacked: {
      control: { type: 'boolean' },
      description: 'Whether avatars should overlap (stacked) or have spacing between them',
    },
  },
  args: {
    size: 'md',
    maxVisible: null,
    stacked: false,
  },
};

export default meta;
type Story = StoryObj<AvatarGroupComponent>;

const sampleAvatars: AvatarData[] = [
  { src: 'https://i.pravatar.cc/150?img=12', alt: 'User 1' },
  { src: 'https://i.pravatar.cc/150?img=13', alt: 'User 2' },
  { src: 'https://i.pravatar.cc/150?img=14', alt: 'User 3' },
  { initials: 'JD', alt: 'John Doe' },
  { initials: 'AB', alt: 'Alice Brown' },
  { icon: 'user', alt: 'User 6' },
];

/**
 * Default avatar group story that demonstrates the basic avatar group component.
 * Shows multiple avatars with spacing between them.
 */
export const Default: Story = {
  args: {
    avatars: sampleAvatars.slice(0, 4),
  },
  render: (args) => ({
    props: args,
    template: `
      <pe-avatar-group
        [avatars]="avatars"
        [size]="size"
        [maxVisible]="maxVisible"
        [stacked]="stacked"
      />
    `,
  }),
};

/**
 * Demonstrates an avatar group with overflow indicator.
 * Shows only the first 3 avatars and displays "+3" for the remaining ones.
 */
export const WithOverflow: Story = {
  args: {
    avatars: sampleAvatars,
    maxVisible: 3,
  },
  render: (args) => ({
    props: args,
    template: `
      <pe-avatar-group
        [avatars]="avatars"
        [size]="size"
        [maxVisible]="maxVisible"
        [stacked]="stacked"
      />
    `,
  }),
};

/**
 * Demonstrates stacked avatars that overlap each other.
 * Useful for showing a compact group view.
 */
export const Stacked: Story = {
  args: {
    avatars: sampleAvatars.slice(0, 5),
    stacked: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <pe-avatar-group
        [avatars]="avatars"
        [size]="size"
        [maxVisible]="maxVisible"
        [stacked]="stacked"
      />
    `,
  }),
};

/**
 * Demonstrates stacked avatars with overflow indicator.
 */
export const StackedWithOverflow: Story = {
  args: {
    avatars: sampleAvatars,
    stacked: true,
    maxVisible: 4,
  },
  render: (args) => ({
    props: args,
    template: `
      <pe-avatar-group
        [avatars]="avatars"
        [size]="size"
        [maxVisible]="maxVisible"
        [stacked]="stacked"
      />
    `,
  }),
};

/**
 * Demonstrates all available sizes side by side.
 */
export const AllSizes: Story = {
  args: {
    avatars: sampleAvatars.slice(0, 3),
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px; align-items: flex-start;">
        <div>
          <div style="margin-bottom: 8px; font-size: 12px; color: #999;">Small</div>
          <pe-avatar-group [avatars]="avatars" [size]="'sm'" [stacked]="stacked" />
        </div>
        <div>
          <div style="margin-bottom: 8px; font-size: 12px; color: #999;">Medium</div>
          <pe-avatar-group [avatars]="avatars" [size]="'md'" [stacked]="stacked" />
        </div>
        <div>
          <div style="margin-bottom: 8px; font-size: 12px; color: #999;">Large</div>
          <pe-avatar-group [avatars]="avatars" [size]="'lg'" [stacked]="stacked" />
        </div>
        <div>
          <div style="margin-bottom: 8px; font-size: 12px; color: #999;">Extra Large</div>
          <pe-avatar-group [avatars]="avatars" [size]="'xl'" [stacked]="stacked" />
        </div>
      </div>
    `,
  }),
};

/**
 * Demonstrates a large group of avatars with overflow.
 */
export const LargeGroup: Story = {
  args: {
    avatars: [
      ...sampleAvatars,
      { initials: 'CD', alt: 'Charlie Davis' },
      { initials: 'EF', alt: 'Emma Foster' },
      { initials: 'GH', alt: 'George Harris' },
      { icon: 'user', alt: 'User 9' },
      { icon: 'user', alt: 'User 10' },
    ],
    maxVisible: 5,
  },
  render: (args) => ({
    props: args,
    template: `
      <pe-avatar-group
        [avatars]="avatars"
        [size]="size"
        [maxVisible]="maxVisible"
        [stacked]="stacked"
      />
    `,
  }),
};
