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
          'User or entity avatar showing an image, or fallback to initials or icon when no image. Sizes: sm, md, lg, xl, 2xl. 2xl is avatar-only (not part of the shared UiSize scale) — use it where the avatar itself is the focal point, e.g. an onboarding photo step, rather than one control among many.',
      },
    },
  },
  argTypes: {
    size: {
      options: ['sm', 'md', 'lg', 'xl', '2xl'],
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
    editable: {
      control: { type: 'boolean' },
      description:
        'Marks this avatar as a photo picker: shows a default person icon when nothing else is set, and layers a dimmed photo-icon overlay on top — even once a real photo is showing, so it stays clear the photo can be changed. Purely visual — wrap the avatar in your own button/link to handle the click.',
    },
  },
  args: {
    size: 'md',
    src: undefined,
    initials: undefined,
    icon: undefined,
    alt: '',
    loading: false,
    editable: false,
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
      <ul-avatar
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
      <ul-avatar
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
      <ul-avatar
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
      <ul-avatar
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
 * Shows sm, md, lg, xl, and 2xl sizes for easy comparison.
 */
export const AllSizes: Story = {
  args: {},
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; gap: 16px; align-items: center; flex-wrap: wrap;">
        <ul-avatar [size]="'sm'" [initials]="'SM'" />
        <ul-avatar [size]="'md'" [initials]="'MD'" />
        <ul-avatar [size]="'lg'" [initials]="'LG'" />
        <ul-avatar [size]="'xl'" [initials]="'XL'" />
        <ul-avatar [size]="'2xl'" [initials]="'XXL'" />
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
        <ul-avatar [size]="'md'" [src]="'https://i.pravatar.cc/150?img=12'" [alt]="'User avatar'" />
        <ul-avatar [size]="'md'" [initials]="'JD'" />
        <ul-avatar [size]="'md'" [icon]="'user'" />
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
      <ul-avatar
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
 * Editable photo-picker avatars: a dimmed photo-icon overlay signals it's
 * clickable, layered over whatever's showing underneath — a default person
 * icon when nothing is set, initials once the user has a name but no photo
 * yet, or a real photo. The overlay stays even once a photo is set, so it's
 * clear the photo can still be changed, not just added the first time.
 */
export const Editable: Story = {
  args: { editable: true },
  render: () => ({
    template: `
      <div style="display: flex; gap: 16px; align-items: center; flex-wrap: wrap;">
        <ul-avatar size="xl" [editable]="true" />
        <ul-avatar size="xl" [editable]="true" initials="JD" />
        <ul-avatar size="xl" [editable]="true" src="https://i.pravatar.cc/150?img=12" alt="User avatar" />
      </div>
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
      <ul-avatar
        [size]="size"
        [src]="src"
        [initials]="initials"
        [icon]="icon"
        [alt]="alt"
      />
    `,
  }),
};
