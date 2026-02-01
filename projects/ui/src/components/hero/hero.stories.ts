import { moduleMetadata } from '@storybook/angular';
import { Meta, StoryObj } from '../../../.storybook/types';

import { ButtonComponent } from '../button/button';
import { HeroComponent, type HeroAction } from './hero';
import {
  PeHeroActionsSlotDirective,
  PeHeroBadgesSlotDirective,
  PeHeroContentSlotDirective,
  PeHeroSubtitleSlotDirective,
  PeHeroTitleSlotDirective,
} from './hero-slot.directive';
import { PillComponent } from '../pill/pill';

const meta: Meta<HeroComponent> = {
  title: 'Components/Layout/Hero',
  component: HeroComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Hero component for prominent sections with title, subtitle, call-to-action buttons, optional badges, and background image. Responsive across mobile, tablet, and desktop. Supports alignment (left, center, right), size variants (sm, md, lg), and full-height option. Content projection slots: pe-hero-badges, pe-hero-title, pe-hero-subtitle, pe-hero-actions, pe-hero-content. When a slot is not projected, the corresponding input is used (e.g. title, subtitle, badges, primaryAction, secondaryAction). Import the slot directives when using slots.',
      },
    },
  },
  argTypes: {
    title: {
      control: { type: 'text' },
      description: 'Main headline text',
    },
    subtitle: {
      control: { type: 'text' },
      description: 'Supporting description text',
    },
    alignment: {
      options: ['left', 'center', 'right'],
      control: { type: 'radio' },
      description: 'Text and content alignment',
    },
    size: {
      options: ['sm', 'md', 'lg'],
      control: { type: 'radio' },
      description: 'Hero section size variant',
    },
    fullHeight: {
      control: { type: 'boolean' },
      description: 'Whether hero takes full viewport height',
    },
    backgroundOverlayGradient: {
      control: { type: 'text' },
      description: 'CSS gradient or color for overlay on background image',
    },
    backgroundFilter: {
      control: { type: 'text' },
      description: 'CSS filter applied to the background image',
    },
  },
  args: {
    title: 'Welcome to Our Platform',
    subtitle: 'Build amazing experiences with our component library. Get started in minutes.',
    alignment: 'center',
    size: 'md',
    fullHeight: false,
  },
};

export default meta;
type Story = StoryObj<HeroComponent>;

/**
 * Default hero with title, subtitle, and primary action.
 */
export const Default: Story = {
  args: {
    primaryAction: {
      label: 'Get Started',
      href: '#',
      theme: 'fill-purple',
      size: 'md',
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <pe-hero
        [title]="title"
        [subtitle]="subtitle"
        [primaryAction]="primaryAction"
        [alignment]="alignment"
        [size]="size"
        [fullHeight]="fullHeight"
      />
    `,
  }),
};

/**
 * Hero with both primary and secondary actions.
 */
export const WithPrimaryAndSecondaryActions: Story = {
  args: {
    primaryAction: {
      label: 'Get Started',
      href: '#',
      theme: 'fill-purple',
    },
    secondaryAction: {
      label: 'Learn More',
      href: '#docs',
      theme: 'ghost-white',
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <pe-hero
        [title]="title"
        [subtitle]="subtitle"
        [primaryAction]="primaryAction"
        [secondaryAction]="secondaryAction"
        [alignment]="alignment"
        [size]="size"
      />
    `,
  }),
};

/**
 * Hero with badges above the title.
 */
export const WithBadges: Story = {
  args: {
    badges: ['New', 'Featured', 'v2.0'],
    primaryAction: {
      label: 'Get Started',
      href: '#',
      theme: 'fill-purple',
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <pe-hero
        [title]="title"
        [subtitle]="subtitle"
        [badges]="badges"
        [primaryAction]="primaryAction"
        [alignment]="alignment"
        [size]="size"
      />
    `,
  }),
};

/**
 * Hero with background image.
 */
export const WithBackgroundImage: Story = {
  args: {
    backgroundImage: 'https://picsum.photos/1920/1080',
    primaryAction: {
      label: 'Get Started',
      href: '#',
      theme: 'fill-white',
    },
    secondaryAction: {
      label: 'Learn More',
      href: '#',
      theme: 'outline-white',
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <pe-hero
        [title]="title"
        [subtitle]="subtitle"
        [backgroundImage]="backgroundImage"
        [backgroundOverlayGradient]="backgroundOverlayGradient"
        [backgroundFilter]="backgroundFilter"
        [primaryAction]="primaryAction"
        [secondaryAction]="secondaryAction"
        [alignment]="alignment"
        [size]="size"
      />
    `,
  }),
};

/**
 * Hero with custom overlay gradient (bottom fade).
 */
export const CustomOverlayGradient: Story = {
  args: {
    backgroundImage: 'https://picsum.photos/1920/1080',
    backgroundOverlayGradient:
      'linear-gradient(180deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.85) 100%)',
    primaryAction: { label: 'Get Started', href: '#', theme: 'fill-white' },
    secondaryAction: { label: 'Learn More', href: '#', theme: 'outline-white' },
  },
  render: (args) => ({
    props: args,
    template: `
      <pe-hero
        [title]="title"
        [subtitle]="subtitle"
        [backgroundImage]="backgroundImage"
        [backgroundOverlayGradient]="backgroundOverlayGradient"
        [primaryAction]="primaryAction"
        [secondaryAction]="secondaryAction"
        [alignment]="alignment"
        [size]="size"
      />
    `,
  }),
};

/**
 * Hero with background image filters (darker and slightly blurred).
 */
export const BackgroundWithFilters: Story = {
  args: {
    backgroundImage: 'https://picsum.photos/1920/1080',
    backgroundFilter: 'brightness(0.6) contrast(1.1)',
    primaryAction: { label: 'Get Started', href: '#', theme: 'fill-white' },
    secondaryAction: { label: 'Learn More', href: '#', theme: 'outline-white' },
  },
  render: (args) => ({
    props: args,
    template: `
      <pe-hero
        [title]="title"
        [subtitle]="subtitle"
        [backgroundImage]="backgroundImage"
        [backgroundFilter]="backgroundFilter"
        [primaryAction]="primaryAction"
        [secondaryAction]="secondaryAction"
        [alignment]="alignment"
        [size]="size"
      />
    `,
  }),
};

/**
 * Hero with gradient overlay and filters combined.
 */
export const GradientAndFilters: Story = {
  args: {
    backgroundImage: 'https://picsum.photos/1920/1080',
    backgroundOverlayGradient:
      'linear-gradient(135deg, rgba(111, 61, 224, 0.5) 0%, rgba(0, 0, 0, 0.7) 100%)',
    backgroundFilter: 'brightness(0.75) saturate(1.2)',
    primaryAction: { label: 'Get Started', href: '#', theme: 'fill-white' },
    secondaryAction: { label: 'Learn More', href: '#', theme: 'outline-white' },
  },
  render: (args) => ({
    props: args,
    template: `
      <pe-hero
        [title]="title"
        [subtitle]="subtitle"
        [backgroundImage]="backgroundImage"
        [backgroundOverlayGradient]="backgroundOverlayGradient"
        [backgroundFilter]="backgroundFilter"
        [primaryAction]="primaryAction"
        [secondaryAction]="secondaryAction"
        [alignment]="alignment"
        [size]="size"
      />
    `,
  }),
};

/**
 * Left-aligned hero.
 */
export const AlignmentLeft: Story = {
  args: {
    alignment: 'left',
    primaryAction: { label: 'Get Started', href: '#', theme: 'fill-purple' },
    secondaryAction: { label: 'Learn More', href: '#' },
  },
  render: (args) => ({
    props: args,
    template: `
      <pe-hero
        [title]="title"
        [subtitle]="subtitle"
        [primaryAction]="primaryAction"
        [secondaryAction]="secondaryAction"
        [alignment]="alignment"
        [size]="size"
      />
    `,
  }),
};

/**
 * Right-aligned hero.
 */
export const AlignmentRight: Story = {
  args: {
    alignment: 'right',
    primaryAction: { label: 'Get Started', href: '#', theme: 'fill-purple' },
  },
  render: (args) => ({
    props: args,
    template: `
      <pe-hero
        [title]="title"
        [subtitle]="subtitle"
        [primaryAction]="primaryAction"
        [alignment]="alignment"
        [size]="size"
      />
    `,
  }),
};

/**
 * Small size hero.
 */
export const SizeSmall: Story = {
  args: {
    size: 'sm',
    primaryAction: { label: 'Get Started', href: '#', theme: 'fill-purple' },
  },
  render: (args) => ({
    props: args,
    template: `
      <pe-hero
        [title]="title"
        [subtitle]="subtitle"
        [primaryAction]="primaryAction"
        [alignment]="alignment"
        [size]="size"
      />
    `,
  }),
};

/**
 * Large size hero.
 */
export const SizeLarge: Story = {
  args: {
    size: 'lg',
    primaryAction: { label: 'Get Started', href: '#', theme: 'fill-purple' },
    secondaryAction: { label: 'Learn More', href: '#' },
  },
  render: (args) => ({
    props: args,
    template: `
      <pe-hero
        [title]="title"
        [subtitle]="subtitle"
        [primaryAction]="primaryAction"
        [secondaryAction]="secondaryAction"
        [alignment]="alignment"
        [size]="size"
      />
    `,
  }),
};

/**
 * Full viewport height hero.
 */
export const FullHeight: Story = {
  args: {
    fullHeight: true,
    primaryAction: { label: 'Get Started', href: '#', theme: 'fill-purple' },
    secondaryAction: { label: 'Learn More', href: '#' },
  },
  render: (args) => ({
    props: args,
    template: `
      <pe-hero
        [title]="title"
        [subtitle]="subtitle"
        [primaryAction]="primaryAction"
        [secondaryAction]="secondaryAction"
        [alignment]="alignment"
        [size]="size"
        [fullHeight]="fullHeight"
      />
    `,
  }),
};

/**
 * All features combined: badges, both actions, background image, large size.
 */
export const AllFeatures: Story = {
  args: {
    badges: ['New', 'Featured'],
    backgroundImage: 'https://picsum.photos/1920/1080',
    size: 'lg',
    primaryAction: {
      label: 'Get Started',
      href: '#',
      theme: 'fill-white',
      size: 'lg',
    },
    secondaryAction: {
      label: 'View Documentation',
      href: '#',
      theme: 'outline-white',
      size: 'lg',
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <pe-hero
        [title]="title"
        [subtitle]="subtitle"
        [badges]="badges"
        [backgroundImage]="backgroundImage"
        [backgroundOverlayGradient]="backgroundOverlayGradient"
        [backgroundFilter]="backgroundFilter"
        [primaryAction]="primaryAction"
        [secondaryAction]="secondaryAction"
        [alignment]="alignment"
        [size]="size"
      />
    `,
  }),
};

/**
 * Minimal hero with title only.
 */
export const TitleOnly: Story = {
  args: {
    title: 'Simple Hero',
    subtitle: undefined,
    primaryAction: undefined,
    secondaryAction: undefined,
  },
  render: (args) => ({
    props: args,
    template: `
      <pe-hero
        [title]="title"
        [subtitle]="subtitle"
        [alignment]="alignment"
        [size]="size"
      />
    `,
  }),
};

/**
 * Hero with all content projected via slots (custom title, subtitle, badges, actions).
 */
export const WithProjectedContent: Story = {
  render: () => ({
    template: `
      <pe-hero title="Projected Title" alignment="center" size="md">
        <div pe-hero-badges>
          <pe-pill variant="read-only" theme="transparent-white" size="md">Custom</pe-pill>
          <pe-pill variant="read-only" theme="transparent-white" size="md">Slots</pe-pill>
        </div>
        <h1 pe-hero-title style="margin: 0;">Projected Title</h1>
        <p pe-hero-subtitle style="margin: 0;">Custom subtitle and actions via content projection.</p>
        <div pe-hero-actions>
          <pe-button theme="fill-purple">Primary</pe-button>
          <pe-button theme="ghost-white">Secondary</pe-button>
          <pe-button theme="outline-purple">Tertiary</pe-button>
        </div>
      </pe-hero>
    `,
    moduleMetadata: {
      imports: [
        HeroComponent,
        ButtonComponent,
        PillComponent,
        PeHeroBadgesSlotDirective,
        PeHeroTitleSlotDirective,
        PeHeroSubtitleSlotDirective,
        PeHeroActionsSlotDirective,
      ],
    },
  }),
};

/**
 * Hybrid: input-based title and subtitle with projected actions (three buttons).
 */
export const HybridInputsAndProjectedActions: Story = {
  args: {
    title: 'Hybrid Hero',
    subtitle: 'Title and subtitle from inputs; actions are projected.',
    alignment: 'center',
    size: 'md',
  },
  render: (args) => ({
    props: args,
    template: `
      <pe-hero
        [title]="title"
        [subtitle]="subtitle"
        [alignment]="alignment"
        [size]="size"
      >
        <div pe-hero-actions>
          <pe-button theme="fill-purple">Get Started</pe-button>
          <pe-button theme="ghost-white">Docs</pe-button>
          <pe-button theme="outline-purple">Contact</pe-button>
        </div>
      </pe-hero>
    `,
    moduleMetadata: {
      imports: [
        HeroComponent,
        ButtonComponent,
        PeHeroActionsSlotDirective,
      ],
    },
  }),
};

/**
 * Hero with pe-hero-content slot for extra content between subtitle and actions.
 */
export const WithExtraContentSlot: Story = {
  args: {
    title: 'Hero With Extra Slot',
    subtitle: 'The line below is in pe-hero-content.',
    alignment: 'center',
    size: 'md',
    primaryAction: { label: 'Get Started', href: '#', theme: 'fill-purple' },
  },
  render: (args) => ({
    props: args,
    template: `
      <pe-hero
        [title]="title"
        [subtitle]="subtitle"
        [primaryAction]="primaryAction"
        [alignment]="alignment"
        [size]="size"
      >
        <p pe-hero-content style="margin: 0; opacity: 0.9;">Optional CTA or extra content between subtitle and actions.</p>
      </pe-hero>
    `,
    moduleMetadata: {
      imports: [
        HeroComponent,
        ButtonComponent,
        PeHeroContentSlotDirective,
      ],
    },
  }),
};
