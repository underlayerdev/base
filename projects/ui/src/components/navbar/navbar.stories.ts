import { moduleMetadata } from '@storybook/angular';

import { Meta, StoryObj } from '../../../.storybook/types';
import { AvatarComponent } from '../avatar/avatar';
import { IconComponent } from '../icon/icon';
import { SearchSelectComponent } from '../search-select/search-select';

import {
  NavbarAvatarSlotDirective,
  NavbarComponent,
  NavbarLogoSlotDirective,
  NavbarSearchSlotDirective,
} from './index';

const meta: Meta<NavbarComponent> = {
  title: 'Components/Navigation/Navbar',
  component: NavbarComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Responsive navbar with logo, optional search, and avatar. Use content projection: [pe-navbar-logo], [pe-navbar-search], [pe-navbar-avatar]. Import the slot directives when using slots so the navbar can detect them. On mobile, when search is projected a toggle button shows; on tablet/desktop search is inline. Default logo/avatar can be set via logoHref/logoSrc/logoAlt and avatarSrc/avatarInitials/avatarAlt when slots are not used.',
      },
    },
  },
  decorators: [
    moduleMetadata({
      imports: [
        NavbarComponent,
        SearchSelectComponent,
        IconComponent,
        AvatarComponent,
        NavbarLogoSlotDirective,
        NavbarSearchSlotDirective,
        NavbarAvatarSlotDirective,
      ],
    }),
    (story) => ({
      ...story(),
      template: `
        <div style="min-height: 100vh; background: var(--color-background-main, #0a0a0a);">
          ${story().template}
          <main style="padding: 1.5rem; color: rgba(255,255,255,0.7);">
            Resize the viewport to see mobile (search toggle) vs tablet/desktop (inline search).
          </main>
        </div>
      `,
    }),
  ],
  argTypes: {
    logoHref: { control: 'text', description: 'Default logo link when logo slot is not used' },
    logoAlt: { control: 'text' },
    avatarInitials: { control: 'text', description: 'Default avatar initials when avatar slot is not used' },
  },
};

export default meta;
type Story = StoryObj<NavbarComponent>;

export const Default: Story = {
  args: {
    logoHref: '/',
    logoAlt: 'Home',
    avatarInitials: 'JD',
  },
  render: (args) => ({
    props: args,
    template: `
      <pe-navbar
        [logoHref]="logoHref"
        [logoAlt]="logoAlt"
        [avatarInitials]="avatarInitials"
      >
        <a pe-navbar-logo href="/" style="font-weight: 700; color: inherit; text-decoration: none;">PERPETUA</a>
        <div pe-navbar-search>
          <pe-search-select
            placeholder="Search..." 
            [options]="[
              { label: 'Apple', value: 'apple' },
              { label: 'Banana', value: 'banana' },
              { label: 'Cherry', value: 'cherry' },
            ]"
            size="md"
          />
        </div>
        <pe-avatar pe-navbar-avatar initials="JD" size="md" />
      </pe-navbar>
    `,
  }),
};

export const WithDefaultLogoAndAvatar: Story = {
  args: {
    logoHref: '/',
    logoSrc: 'assets/img/logo.png',
    logoAlt: 'Pinake logo',
    avatarInitials: 'AB',
    avatarAlt: 'User',
  },
  render: (args) => ({
    props: args,
    template: `
      <pe-navbar
        [logoHref]="logoHref"
        [logoSrc]="logoSrc"
        [logoAlt]="logoAlt"
        [avatarInitials]="avatarInitials"
        [avatarAlt]="avatarAlt"
      />
    `,
  }),
};

export const WithoutSearch: Story = {
  args: {
    logoHref: '/',
    avatarInitials: 'U',
  },
  render: (args) => ({
    props: args,
    template: `
      <pe-navbar
        [logoHref]="logoHref"
        [avatarInitials]="avatarInitials"
      >
                <pe-avatar pe-navbar-avatar initials="U" size="md" />
      </pe-navbar>
    `,
  }),
};

export const MobileViewport: Story = {
  ...Default,
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
  },
};

export const TabletViewport: Story = {
  ...Default,
  parameters: {
    viewport: { defaultViewport: 'tablet' },
  },
};
