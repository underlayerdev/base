import { Component, signal } from '@angular/core';
import { moduleMetadata } from '@storybook/angular';

import { Meta, StoryObj } from '../../.storybook/types';
import { AvatarComponent } from './avatar/avatar';
import { ButtonComponent } from './button/button';
import { CardComponent } from './card/card';
import { DemoAppLayoutComponent } from './demo-app-layout.stories';
import { IconComponent } from './icon/icon';
import {
  NavbarAvatarSlotDirective,
  NavbarLogoSlotDirective,
} from './navbar/index';
import { ListItemComponent } from './list-item/list-item';
import { RadialComponent } from './radial/radial';
import { SidebarComponent, SidebarItem } from './sidebar/sidebar';
import { StatusComponent } from './status/status';

const sidebarItems: SidebarItem[] = [
  { label: 'Home', leftIcons: ['home'], value: 'home' },
  { label: 'Library', leftIcons: ['library'], value: 'library' },
  { label: 'Store', leftIcons: ['store'], value: 'store' },
  { label: 'Wallet', leftIcons: ['wallet'], value: 'wallet' },
  { label: 'Settings', leftIcons: ['settings'], value: 'settings', rightIcons: ['chevron_right'] },
];

@Component({
  selector: 'pe-demo-dashboard',
  standalone: true,
  imports: [
    SidebarComponent,
    CardComponent,
    ButtonComponent,
    RadialComponent,
    StatusComponent,
    IconComponent,
    ListItemComponent,
  ],
  template: `
    <div class="pe-demo-dashboard">
      <pe-sidebar
        [items]="sidebarItems"
        theme="ghost-white"
        [selectedIndex]="selectedIndex()"
        (itemSelected)="onItemSelected($event)">
      </pe-sidebar>
      <main class="pe-demo-dashboard__main">
        <h1 class="pe-demo-dashboard__title">Dashboard</h1>
        <div class="pe-demo-dashboard__grid">
          <pe-card
            cardCaption="Storage"
            cardTitle="75% used"
            cardSubtitle="12.4 GB of 16 GB">
            <div udsCardFooter class="pe-demo-dashboard__card-footer">
              <pe-radial size="48" [percentage]="75" ariaLabel="Storage 75%" />
              <pe-button theme="ghost-white">View</pe-button>
            </div>
          </pe-card>
          <pe-card
            cardCaption="Status"
            cardTitle="Active"
            cardSubtitle="All systems operational">
            <div udsCardFooter class="pe-demo-dashboard__card-footer">
              <pe-status status="confirm">
                <span pe-status-title>Running</span>
              </pe-status>
              <pe-button theme="ghost-white">Details</pe-button>
            </div>
          </pe-card>
          <pe-card
            cardCaption="Tasks"
            cardTitle="8 of 10 complete"
            cardSubtitle="2 pending">
            <div udsCardFooter class="pe-demo-dashboard__card-footer">
              <pe-radial size="48" [percentage]="80" ariaLabel="Tasks 80%" />
              <pe-button theme="fill-purple">Continue</pe-button>
            </div>
          </pe-card>
          <pe-card
            cardCaption="Alerts"
            cardTitle="1 pending"
            cardSubtitle="Review required">
            <div udsCardFooter class="pe-demo-dashboard__card-footer">
              <pe-status status="alert">
                <span pe-status-title>Action needed</span>
              </pe-status>
              <pe-button theme="ghost-white">Review</pe-button>
            </div>
          </pe-card>
        </div>
      </main>
    </div>
  `,
  styles: [
    `
      .pe-demo-dashboard {
        display: flex;
        min-height: 100vh;
      }
      .pe-demo-dashboard__main {
        flex: 1;
        padding: 1.5rem 2rem;
        background: #0a0a0a;
        overflow: auto;
      }
      .pe-demo-dashboard__title {
        color: rgba(255, 255, 255, 0.9);
        font-size: 1.5rem;
        font-weight: 700;
        margin: 0 0 1.5rem 0;
      }
      .pe-demo-dashboard__grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
        gap: 1rem;
      }
      .pe-demo-dashboard__grid pe-card {
        display: block;
      }
      .pe-demo-dashboard__card-footer {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        flex-wrap: wrap;
      }
    `,
  ],
})
class DemoDashboardComponent {
  sidebarItems = sidebarItems;
  selectedIndex = signal(0);

  onItemSelected(item: SidebarItem): void {
    const idx = sidebarItems.findIndex((i) => i.value === item.value);
    if (idx >= 0) {
      this.selectedIndex.set(idx);
    }
  }
}

@Component({
  selector: 'pe-demo-dashboard-with-layout',
  standalone: true,
  imports: [
    DemoAppLayoutComponent,
    NavbarLogoSlotDirective,
    NavbarAvatarSlotDirective,
    SidebarComponent,
    CardComponent,
    ButtonComponent,
    RadialComponent,
    StatusComponent,
    IconComponent,
    ListItemComponent,
    AvatarComponent,
  ],
  template: `
    <pe-demo-app-layout [sidebarItems]="sidebarItems">
      <a pe-navbar-logo href="/" class="pe-text-primary" style="font-weight: 700; color: inherit; text-decoration: none;">
        Player Eleven
      </a>
      <pe-avatar pe-navbar-avatar initials="JD" size="md" />

      <h1 class="pe-demo-dashboard__title">Dashboard</h1>
      <div class="pe-demo-dashboard__grid">
        <pe-card
          cardCaption="Storage"
          cardTitle="75% used"
          cardSubtitle="12.4 GB of 16 GB">
          <div udsCardFooter class="pe-demo-dashboard__card-footer">
            <pe-radial size="48" [percentage]="75" ariaLabel="Storage 75%" />
            <pe-button theme="ghost-white">View</pe-button>
          </div>
        </pe-card>
        <pe-card
          cardCaption="Status"
          cardTitle="Active"
          cardSubtitle="All systems operational">
          <div udsCardFooter class="pe-demo-dashboard__card-footer">
            <pe-status status="confirm">
              <span pe-status-title>Running</span>
            </pe-status>
            <pe-button theme="ghost-white">Details</pe-button>
          </div>
        </pe-card>
        <pe-card
          cardCaption="Tasks"
          cardTitle="8 of 10 complete"
          cardSubtitle="2 pending">
          <div udsCardFooter class="pe-demo-dashboard__card-footer">
            <pe-radial size="48" [percentage]="80" ariaLabel="Tasks 80%" />
            <pe-button theme="fill-purple">Continue</pe-button>
          </div>
        </pe-card>
        <pe-card
          cardCaption="Alerts"
          cardTitle="1 pending"
          cardSubtitle="Review required">
          <div udsCardFooter class="pe-demo-dashboard__card-footer">
            <pe-status status="alert">
              <span pe-status-title>Action needed</span>
            </pe-status>
            <pe-button theme="ghost-white">Review</pe-button>
          </div>
        </pe-card>
      </div>
    </pe-demo-app-layout>
  `,
  styles: [
    `
      .pe-demo-dashboard__title {
        color: rgba(255, 255, 255, 0.9);
        font-size: 1.5rem;
        font-weight: 700;
        margin: 0 0 1.5rem 0;
      }
      .pe-demo-dashboard__grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
        gap: 1rem;
      }
      .pe-demo-dashboard__grid pe-card {
        display: block;
      }
      .pe-demo-dashboard__card-footer {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        flex-wrap: wrap;
      }
    `,
  ],
})
class DemoDashboardWithLayoutComponent {
  sidebarItems = sidebarItems;
}

const meta: Meta<DemoDashboardComponent> = {
  title: 'Demos/Dashboard',
  component: DemoDashboardComponent,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'App shell with sidebar navigation and a grid of KPI-style cards using Radial and Status.',
      },
    },
  },
  decorators: [
    moduleMetadata({
      imports: [
        SidebarComponent,
        CardComponent,
        ButtonComponent,
        RadialComponent,
        StatusComponent,
        IconComponent,
        ListItemComponent,
      ],
    }),
  ],
};

export default meta;
type Story = StoryObj<DemoDashboardComponent>;

export const Default: Story = {
  render: () => ({
    template: '<pe-demo-dashboard></pe-demo-dashboard>',
    moduleMetadata: {
      imports: [DemoDashboardComponent],
    },
  }),
};

export const WithAppLayout: Story = {
  render: () => ({
    template: '<pe-demo-dashboard-with-layout></pe-demo-dashboard-with-layout>',
    moduleMetadata: {
      imports: [DemoDashboardWithLayoutComponent],
    },
  }),
};
