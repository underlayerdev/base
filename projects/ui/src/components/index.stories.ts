import { moduleMetadata } from '@storybook/angular';
import { Meta, StoryObj } from '../../.storybook/types';

import { ButtonComponent } from './button/button';
import { HeroComponent } from './hero/hero';
import { IconComponent } from './icon/icon';
import { PillComponent } from './pill/pill';

const meta: Meta = {
  title: 'Welcome',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Welcome to the Base UI Component Library. Explore by category and try the components below.',
      },
    },
  },
  decorators: [
    moduleMetadata({
      imports: [
        HeroComponent,
        ButtonComponent,
        IconComponent,
        PillComponent,
      ],
    }),
    (story: any) => ({
      ...story(),
      template: `<div class="index-wrapper">${story().template}</div>`,
      styles: [
        ...(story().styles || []),
        `
          .index-wrapper {
            padding: 0;
            max-width: 100%;
            margin: 0 auto;
            background: linear-gradient(180deg, rgba(111, 61, 224, 0.08) 0%, transparent 40%);
            min-height: 100vh;
          }
        `,
      ],
    }),
  ],
};

export default meta;
type Story = StoryObj;

/**
 * Welcome page showcasing all components in the library.
 * Hero at top; category cards link to each subgroup's docs.
 */
export const ComponentLibrary: Story = {
  render: () => ({
    template: `
      <pe-hero
        title="Base UI Component Library"
        subtitle="A design system built with Angular: reusable components, design tokens, and accessibility built in. Browse by category below."
        [badges]="['Angular', 'Design tokens', 'Accessible']"
        [primaryAction]="{ label: 'Browse components', href: '#components-grid' }"
        [secondaryAction]="{ label: 'Design foundations', href: '#design-foundations' }"
        alignment="center"
        size="lg"
      />

      <div class="index-content" id="components-grid">
        <nav class="index-jump" aria-label="Jump to category">
          <span class="index-jump-label">Jump to:</span>
          <a href="#form-elements" class="index-jump-link">Form Elements</a>
          <a href="#actions" class="index-jump-link">Actions</a>
          <a href="#layout" class="index-jump-link">Layout</a>
          <a href="#media" class="index-jump-link">Media</a>
          <a href="#overlays-pickers" class="index-jump-link">Overlays & Pickers</a>
          <a href="#advanced" class="index-jump-link">Advanced</a>
        </nav>

        <div class="index-sections">
          <section id="form-elements" class="index-section">
            <h2 class="index-section-title">Form Elements</h2>
            <p class="index-section-desc">Inputs, selection controls, and date picking. Build forms with consistent styling and validation.</p>
            <div class="index-section-links">
              <a href="?path=/docs/components-form-elements-input--docs" class="index-pill-link"><pe-pill variant="read-only" theme="transparent-white" size="md">Input</pe-pill></a>
              <a href="?path=/docs/components-form-elements-textarea--docs" class="index-pill-link"><pe-pill variant="read-only" theme="transparent-white" size="md">Textarea</pe-pill></a>
              <a href="?path=/docs/components-form-elements-checkbox--docs" class="index-pill-link"><pe-pill variant="read-only" theme="transparent-white" size="md">Checkbox</pe-pill></a>
              <a href="?path=/docs/components-form-elements-radio--docs" class="index-pill-link"><pe-pill variant="read-only" theme="transparent-white" size="md">Radio</pe-pill></a>
              <a href="?path=/docs/components-form-elements-select--docs" class="index-pill-link"><pe-pill variant="read-only" theme="transparent-white" size="md">Select</pe-pill></a>
              <a href="?path=/docs/components-form-elements-searchselect--docs" class="index-pill-link"><pe-pill variant="read-only" theme="transparent-white" size="md">Search Select</pe-pill></a>
              <a href="?path=/docs/components-form-elements-calendar--docs" class="index-pill-link"><pe-pill variant="read-only" theme="transparent-white" size="md">Calendar</pe-pill></a>
            </div>
          </section>

          <section id="actions" class="index-section">
            <h2 class="index-section-title">Actions</h2>
            <p class="index-section-desc">Buttons, pills, and breadcrumbs. Trigger actions and guide navigation.</p>
            <div class="index-section-preview">
              <a href="?path=/docs/components-actions-button--docs" class="index-component-link"><pe-button theme="fill-purple" size="md">Button</pe-button></a>
              <a href="?path=/docs/components-actions-pill--docs" class="index-component-link"><pe-pill variant="read-only" theme="transparent-white" size="md">Pill</pe-pill></a>
              <a href="?path=/docs/components-actions-breadcrumb--docs" class="index-component-link"><pe-button theme="ghost-white" size="md">Breadcrumb</pe-button></a>
            </div>
          </section>

          <section id="layout" class="index-section">
            <h2 class="index-section-title">Layout</h2>
            <p class="index-section-desc">Structure your app: cards, tables, modals, navbars, and page sections like the hero above.</p>
            <div class="index-section-links">
              <a href="?path=/docs/components-layout-card--docs" class="index-pill-link"><pe-pill variant="read-only" theme="transparent-white" size="md">Card</pe-pill></a>
              <a href="?path=/docs/components-layout-table--docs" class="index-pill-link"><pe-pill variant="read-only" theme="transparent-white" size="md">Table</pe-pill></a>
              <a href="?path=/docs/components-layout-accordion--docs" class="index-pill-link"><pe-pill variant="read-only" theme="transparent-white" size="md">Accordion</pe-pill></a>
              <a href="?path=/docs/components-layout-collapse--docs" class="index-pill-link"><pe-pill variant="read-only" theme="transparent-white" size="md">Collapse</pe-pill></a>
              <a href="?path=/docs/components-layout-modal--docs" class="index-pill-link"><pe-pill variant="read-only" theme="transparent-white" size="md">Modal</pe-pill></a>
              <a href="?path=/docs/components-layout-sidebar--docs" class="index-pill-link"><pe-pill variant="read-only" theme="transparent-white" size="md">Sidebar</pe-pill></a>
              <a href="?path=/docs/components-layout-navbar--docs" class="index-pill-link"><pe-pill variant="read-only" theme="transparent-white" size="md">Navbar</pe-pill></a>
              <a href="?path=/docs/components-layout-footer--docs" class="index-pill-link"><pe-pill variant="read-only" theme="transparent-white" size="md">Footer</pe-pill></a>
              <a href="?path=/docs/components-layout-hero--docs" class="index-pill-link"><pe-pill variant="read-only" theme="transparent-white" size="md">Hero</pe-pill></a>
            </div>
          </section>

          <section id="media" class="index-section">
            <h2 class="index-section-title">Media</h2>
            <p class="index-section-desc">Avatars, icons, status indicators, and list items. Represent people and content.</p>
            <div class="index-section-preview index-section-preview--media">
              <a href="?path=/docs/components-media-avatar--docs" class="index-icon-link" title="Avatar"><pe-icon icon="person" size="10" /></a>
              <a href="?path=/docs/components-media-icon--docs" class="index-icon-link" title="Icon"><pe-icon icon="icon" size="10" /></a>
              <a href="?path=/docs/components-media-status--docs" class="index-icon-link" title="Status"><pe-icon icon="check_circle" size="10" /></a>
            </div>
            <div class="index-section-links">
              <a href="?path=/docs/components-media-avatar--docs" class="index-pill-link"><pe-pill variant="read-only" theme="transparent-white" size="md">Avatar</pe-pill></a>
              <a href="?path=/docs/components-media-avatar-group--docs" class="index-pill-link"><pe-pill variant="read-only" theme="transparent-white" size="md">Avatar Group</pe-pill></a>
              <a href="?path=/docs/components-media-icon--docs" class="index-pill-link"><pe-pill variant="read-only" theme="transparent-white" size="md">Icon</pe-pill></a>
              <a href="?path=/docs/components-media-status--docs" class="index-pill-link"><pe-pill variant="read-only" theme="transparent-white" size="md">Status</pe-pill></a>
              <a href="?path=/docs/components-media-list-item--docs" class="index-pill-link"><pe-pill variant="read-only" theme="transparent-white" size="md">List Item</pe-pill></a>
              <a href="?path=/docs/components-media-imagenotfound--docs" class="index-pill-link"><pe-pill variant="read-only" theme="transparent-white" size="md">ImageNotFound</pe-pill></a>
            </div>
          </section>

          <section id="overlays-pickers" class="index-section">
            <h2 class="index-section-title">Overlays & Pickers</h2>
            <p class="index-section-desc">Dropdowns and specialized pickers. Layer content and capture structured input.</p>
            <div class="index-section-links">
              <a href="?path=/docs/components-overlays-pickers-dropdown--docs" class="index-pill-link"><pe-pill variant="read-only" theme="transparent-white" size="md">Dropdown</pe-pill></a>
              <a href="?path=/docs/components-overlays-pickers-areacode--docs" class="index-pill-link"><pe-pill variant="read-only" theme="transparent-white" size="md">Area Code</pe-pill></a>
            </div>
          </section>

          <section id="advanced" class="index-section">
            <h2 class="index-section-title">Advanced</h2>
            <p class="index-section-desc">Carousels, radial progress, and composite controls like the price button.</p>
            <div class="index-section-links">
              <a href="?path=/docs/components-advanced-carousel--docs" class="index-pill-link"><pe-pill variant="read-only" theme="transparent-white" size="md">Carousel</pe-pill></a>
              <a href="?path=/docs/components-advanced-radial--docs" class="index-pill-link"><pe-pill variant="read-only" theme="transparent-white" size="md">Radial</pe-pill></a>
              <a href="?path=/docs/components-advanced-price-button--docs" class="index-pill-link"><pe-pill variant="read-only" theme="transparent-white" size="md">Price Button</pe-pill></a>
            </div>
          </section>
        </div>

        <div class="index-foundations" id="design-foundations">
          <div class="index-foundations-header">
            <pe-icon icon="palette" size="10" />
            <h2 class="index-foundations-title">Design Foundations</h2>
          </div>
          <p class="index-foundations-description">
            The component library is built on a solid foundation of design tokens including typography, colors, spacing, breakpoints, and icons.
          </p>
          <div class="index-foundations-pills">
            <pe-pill variant="read-only" theme="transparent-white" size="lg">
              <pe-icon icon="text" size="5" />
              Typography
            </pe-pill>
            <pe-pill variant="read-only" theme="transparent-white" size="lg">
              <pe-icon icon="palette" size="5" />
              Colors
            </pe-pill>
            <pe-pill variant="read-only" theme="transparent-white" size="lg">
              <pe-icon icon="grid" size="5" />
              Spacing
            </pe-pill>
            <pe-pill variant="read-only" theme="transparent-white" size="lg">
              <pe-icon icon="responsive" size="5" />
              Breakpoints
            </pe-pill>
            <pe-pill variant="read-only" theme="transparent-white" size="lg">
              <pe-icon icon="icon" size="5" />
              Icons
            </pe-pill>
          </div>
        </div>
      </div>
    `,
    styles: [
      `
        .index-content {
          padding: 2rem 1.5rem 4rem;
          max-width: 1400px;
          margin: 0 auto;
        }
        .index-jump {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 0.75rem 1.5rem;
          margin-bottom: 2.5rem;
          padding: 1rem 0;
        }
        .index-jump-label {
          font-size: 0.875rem;
          color: rgba(255, 255, 255, 0.6);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .index-jump-link {
          color: rgba(255, 255, 255, 0.85);
          text-decoration: none;
          font-size: 0.9375rem;
          padding: 0.35rem 0.75rem;
          border-radius: 6px;
          transition: background 0.2s ease, color 0.2s ease;
        }
        .index-jump-link:hover {
          color: #fff;
          background: rgba(111, 61, 224, 0.2);
        }
        .index-sections {
          display: flex;
          flex-direction: column;
          gap: 3.5rem;
          margin-bottom: 4rem;
        }
        .index-section {
          scroll-margin-top: 1rem;
          padding-bottom: 3rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }
        .index-section:last-of-type {
          border-bottom: none;
        }
        .index-section-title {
          font-size: 1.5rem;
          font-weight: 700;
          margin: 0 0 0.5rem 0;
          color: #fff;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .index-section-title::before {
          content: '';
          width: 4px;
          height: 1.25rem;
          background: rgba(111, 61, 224, 0.8);
          border-radius: 2px;
        }
        .index-section-desc {
          color: rgba(255, 255, 255, 0.7);
          font-size: 1rem;
          margin: 0 0 1.25rem 0;
          max-width: 560px;
          line-height: 1.5;
        }
        .index-section-links,
        .index-section-preview {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem 0.75rem;
          align-items: center;
        }
        .index-section-preview {
          margin-bottom: 1rem;
        }
        .index-section-preview--media .index-icon-link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.08);
          color: rgba(255, 255, 255, 0.9);
          transition: background 0.2s ease, color 0.2s ease;
        }
        .index-section-preview--media .index-icon-link:hover {
          background: rgba(111, 61, 224, 0.25);
          color: #fff;
        }
        .index-pill-link,
        .index-component-link,
        .index-icon-link {
          color: inherit;
          text-decoration: none;
          transition: opacity 0.2s ease, transform 0.15s ease;
        }
        .index-pill-link:hover,
        .index-component-link:hover {
          opacity: 0.9;
          transform: translateY(-1px);
        }
        .index-pill-link:focus-visible,
        .index-component-link:focus-visible,
        .index-icon-link:focus-visible {
          outline: 2px solid rgba(111, 61, 224, 0.8);
          outline-offset: 2px;
        }
        .index-foundations {
          margin-top: 4rem;
          padding: 3rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .index-foundations-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;
        }
        .index-foundations-header pe-icon {
          color: rgba(111, 61, 224, 1);
        }
        .index-foundations-title {
          font-size: 1.75rem;
          font-weight: 700;
          margin: 0;
          color: #ffffff;
        }
        .index-foundations-description {
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 2rem;
          font-size: 1.0625rem;
        }
        .index-foundations-pills {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .index-foundations-pills pe-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }
      `,
    ],
  }),
};
