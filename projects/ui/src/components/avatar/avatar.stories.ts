import { Meta, StoryObj } from '../../../.storybook/types';

import { AvatarComponent } from './avatar';

const meta: Meta<AvatarComponent> = {
  title: 'Components/Data Display/Avatar',
  component: AvatarComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'User or entity avatar showing an image, or fallback to initials or icon when no image. Sizes: sm, md, lg, xl. Use for user lists, headers, and profile placeholders.',
      },
    },
  },
  argTypes: {
    size: {
      options: ['sm', 'md', 'lg', 'xl'],
      control: { type: 'radio' },
      description: 'The size of the avatar',
    },
    src: {
      control: { type: 'text' },
      description: 'The image source URL',
    },
    initials: {
      control: { type: 'text' },
      description: 'Fallback initials to display when image is not available',
    },
    icon: {
      control: { type: 'text' },
      description: 'Fallback icon to display when image and initials are not available',
    },
    alt: {
      control: { type: 'text' },
      description: 'Alt text for the avatar image',
    },
    loading: {
      control: { type: 'boolean' },
      description: 'Show skeleton placeholder instead of avatar content while loading',
    },
  },
  args: {
    size: 'md',
    src: undefined,
    initials: undefined,
    icon: undefined,
    alt: '',
    loading: false,
  },
};

export default meta;
type Story = StoryObj<AvatarComponent>;

/**
 * Default avatar story that demonstrates the basic avatar component.
 * Shows an avatar with initials as fallback.
 */
export const Default: Story = {
  args: {
    initials: 'JD',
  },
  render: (args) => ({
    props: args,
    template: `
      <pe-avatar
        [size]="size"
        [src]="src"
        [initials]="initials"
        [icon]="icon"
        [alt]="alt"
        [loading]="loading"
      />
    `,
  }),
};

/**
 * Demonstrates an avatar with an image.
 */
export const WithImage: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?img=12',
    alt: 'User avatar',
  },
  render: (args) => ({
    props: args,
    template: `
      <pe-avatar
        [size]="size"
        [src]="src"
        [initials]="initials"
        [icon]="icon"
        [alt]="alt"
      />
    `,
  }),
};

/**
 * Demonstrates an avatar with initials fallback.
 */
export const WithInitials: Story = {
  args: {
    initials: 'AB',
  },
  render: (args) => ({
    props: args,
    template: `
      <pe-avatar
        [size]="size"
        [src]="src"
        [initials]="initials"
        [icon]="icon"
        [alt]="alt"
      />
    `,
  }),
};

/**
 * Demonstrates an avatar with icon fallback.
 */
export const WithIcon: Story = {
  args: {
    icon: 'user',
  },
  render: (args) => ({
    props: args,
    template: `
      <pe-avatar
        [size]="size"
        [src]="src"
        [initials]="initials"
        [icon]="icon"
        [alt]="alt"
      />
    `,
  }),
};

/**
 * Demonstrates all available avatar sizes side by side.
 * Shows sm, md, lg, and xl sizes for easy comparison.
 */
export const AllSizes: Story = {
  args: {},
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; gap: 16px; align-items: center; flex-wrap: wrap;">
        <pe-avatar [size]="'sm'" [initials]="'SM'" />
        <pe-avatar [size]="'md'" [initials]="'MD'" />
        <pe-avatar [size]="'lg'" [initials]="'LG'" />
        <pe-avatar [size]="'xl'" [initials]="'XL'" />
      </div>
    `,
  }),
};

/**
 * Demonstrates different avatar variants (image, initials, icon) side by side.
 */
export const AllVariants: Story = {
  args: {},
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; gap: 16px; align-items: center; flex-wrap: wrap;">
        <pe-avatar [size]="'md'" [src]="'https://i.pravatar.cc/150?img=12'" [alt]="'User avatar'" />
        <pe-avatar [size]="'md'" [initials]="'JD'" />
        <pe-avatar [size]="'md'" [icon]="'user'" />
      </div>
    `,
  }),
};

export const Loading: Story = {
  args: {
    initials: 'JD',
    loading: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <pe-avatar
        [size]="size"
        [src]="src"
        [initials]="initials"
        [icon]="icon"
        [alt]="alt"
        [loading]="loading"
      />
    `,
  }),
};

/**
 * Demonstrates avatar with image fallback to initials when image fails to load.
 */
export const ImageWithFallback: Story = {
  args: {
    src: 'https://invalid-url.com/image.jpg',
    initials: 'JD',
    alt: 'User avatar',
  },
  render: (args) => ({
    props: args,
    template: `
      <pe-avatar
        [size]="size"
        [src]="src"
        [initials]="initials"
        [icon]="icon"
        [alt]="alt"
      />
    `,
  }),
};
