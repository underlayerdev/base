import { moduleMetadata } from '@storybook/angular';

import { Meta, StoryObj } from '../../../.storybook/types';
import { ButtonComponent } from '../button/button';
import { IconComponent } from '../icon/icon';
import { ListItemComponent } from '../list-item/list-item';

import { SidebarComponent, SidebarItem } from './sidebar';

const defaultItems: SidebarItem[] = [
  { label: 'Home', leftIcons: ['home'], value: 'home' },
  { label: 'Library', leftIcons: ['library'], value: 'library' },
  { label: 'Store', leftIcons: ['store'], value: 'store' },
  { label: 'Wallet', leftIcons: ['wallet'], value: 'wallet' },
  { label: 'Settings', leftIcons: ['settings'], value: 'settings', rightIcons: ['chevron_right'] },
];

const meta: Meta<SidebarComponent> = {
  title: 'Components/Layout/Sidebar',
  component: SidebarComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Responsive sidebar for app navigation. On desktop it stays visible with the current selection highlighted; on mobile it becomes a drawer with overlay and a toggle button. Use `items` for nav options (same shape as dropdown items) or project custom content via slots. Bind [(selectedIndex)] for the active item; supports theme, [(open)] for mobile drawer, and itemSelected output.',
      },
    },
    layout: 'fullscreen',
  },
  decorators: [
    moduleMetadata({
      imports: [ListItemComponent, IconComponent, ButtonComponent],
    }),
    (story) => ({
      ...story(),
      template: `
        <div style="display: flex; min-height: 100vh;">
          ${story().template}
          <main style="flex: 1; padding: 1.5rem; background: var(--color-background-main, #0a0a0a);">
            <p style="color: rgba(255,255,255,0.7);">Main content area. Resize to see sidebar as drawer on small viewports.</p>
          </main>
        </div>
      `,
    }),
  ],
  argTypes: {
    theme: {
      control: 'select',
      options: ['ghost-white', 'transparent-white', 'outline-white', 'outline-purple'],
    },
    selectedIndex: {
      control: { type: 'number', min: 0, max: 4 },
      description: 'Index of the selected nav item (visible on desktop)',
    },
    closeOnBackdropClick: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<SidebarComponent>;

export const Default: Story = {
  args: {
    items: defaultItems,
    theme: 'ghost-white',
    selectedIndex: 2,
    closeOnBackdropClick: true,
  },
  render: (args) => ({
    props: {
      ...args,
      onItemSelected: (item: SidebarItem) => console.log('Selected', item),
    },
    template: `
      <pe-sidebar
        [items]="items"
        [theme]="theme"
        [selectedIndex]="selectedIndex"
        [closeOnBackdropClick]="closeOnBackdropClick"
        (itemSelected)="onItemSelected($event)">
      </pe-sidebar>
    `,
  }),
};

export const WithHeaderAndFooter: Story = {
  args: {
    items: defaultItems,
    theme: 'transparent-white',
  },
  render: (args) => ({
    props: args,
    template: `
      <pe-sidebar [items]="items" [theme]="theme">
        <div pe-sidebar-header style="padding-bottom: 0.5rem; font-weight: 600; color: rgba(255,255,255,0.9);">
          App Menu
        </div>
        <div pe-sidebar-footer style="color: rgba(255,255,255,0.5); font-size: 12px;">
          © Example App
        </div>
      </pe-sidebar>
    `,
  }),
};

export const MobileViewport: Story = {
  args: {
    items: defaultItems,
    theme: 'ghost-white',
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <pe-sidebar [items]="items" [theme]="theme">
      </pe-sidebar>
    `,
  }),
};
