import { Component, model } from '@angular/core';
import { moduleMetadata } from '@storybook/angular';

import { Meta, StoryObj } from '../../.storybook/types';
import { AccordionComponent, AccordionItemComponent } from './accordion/accordion';
import { AvatarComponent } from './avatar/avatar';
import { BreadcrumbComponent, BreadcrumbItem } from './breadcrumb/breadcrumb';
import { ButtonComponent } from './button/button';
import { CarouselComponent, CarouselItemComponent } from './carousel/carousel';
import { DemoAppLayoutComponent } from './demo-app-layout.stories';
import { DropdownComponent, DropdownItem } from './dropdown/dropdown';
import { FooterComponent } from './footer/footer';
import { IconComponent } from './icon/icon';
import { ImageNotFoundDirective } from './image/image-not-found';
import {
  NavbarAvatarSlotDirective,
  NavbarComponent,
  NavbarLogoSlotDirective,
  NavbarSearchSlotDirective,
} from './navbar/index';
import { PillComponent } from './pill/pill';
import { PriceButtonComponent } from './price-button/price-button';
import { RichTextComponent } from './rich-text/rich-text';
import { SearchSelectComponent } from './search-select/search-select';
import { SelectComponent } from './select/select';

const breadcrumbItems: BreadcrumbItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Games', href: '/games' },
  { label: 'Chrono Nexus' },
];

const quantityDropdownItems: DropdownItem[] = [
  { label: '1', value: '1' },
  { label: '2', value: '2' },
  { label: '3', value: '3' },
  { label: '4', value: '4' },
  { label: '5', value: '5' },
];

const platformOptions = [
  { label: 'PC', value: 'pc' },
  { label: 'PlayStation 5', value: 'ps5' },
  { label: 'Xbox Series X', value: 'xsx' },
];

const searchOptions = [
  { label: 'Chrono Nexus', value: 'chrono-nexus' },
  { label: 'Adventure Quest', value: 'adventure-quest' },
  { label: 'Space Racer', value: 'space-racer' },
  { label: 'Puzzle Master', value: 'puzzle-master' },
];

@Component({
  selector: 'ul-demo-product-page',
  imports: [
    NavbarComponent,
    NavbarLogoSlotDirective,
    NavbarSearchSlotDirective,
    NavbarAvatarSlotDirective,
    FooterComponent,
    BreadcrumbComponent,
    CarouselComponent,
    CarouselItemComponent,
    PriceButtonComponent,
    ButtonComponent,
    PillComponent,
    SelectComponent,
    DropdownComponent,
    AccordionComponent,
    AccordionItemComponent,
    IconComponent,
    ImageNotFoundDirective,
    RichTextComponent,
    SearchSelectComponent,
    AvatarComponent,
  ],
  template: `
    <div class="ul-demo-product-page">
      <ul-navbar logoHref="/" [avatarInitials]="'JD'">
        <a
          ul-navbar-logo
          href="/"
          class="ul-text-primary ul-typography-brand-headline-m-extrablack"
        >
          <img src="assets/img/logo.png" alt="Player Eleven" class="ul-demo-product-page__logo" />
        </a>
        <div ul-navbar-search>
          <ul-search-select placeholder="Search games..." [options]="searchOptions" size="md" />
        </div>
        <ul-avatar ul-navbar-avatar initials="JD" size="md" />
      </ul-navbar>

      <main class="ul-demo-product-page__main">
        <ul-breadcrumb [items]="breadcrumbItems" class="ul-demo-product-page__breadcrumb" />

        <div class="ul-demo-product-page__product-grid">
          <div class="ul-demo-product-page__gallery">
            <ul-carousel [options]="carouselOptions">
              <ul-carousel-item>
                <div class="ul-demo-product-page__gallery-slide">
                  <img
                    ulCatchImageNotFound
                    src="https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&h=450&fit=crop"
                    alt="Chrono Nexus - Game artwork"
                  />
                </div>
              </ul-carousel-item>
              <ul-carousel-item>
                <div class="ul-demo-product-page__gallery-slide">
                  <img
                    ulCatchImageNotFound
                    src="https://images.unsplash.com/photo-1511882150382-421056eb6909?w=800&h=450&fit=crop"
                    alt="Chrono Nexus - Gameplay screenshot"
                  />
                </div>
              </ul-carousel-item>
              <ul-carousel-item>
                <div class="ul-demo-product-page__gallery-slide">
                  <img
                    ulCatchImageNotFound
                    src="https://images.unsplash.com/photo-1585504198199-20277593b94f?w=800&h=450&fit=crop"
                    alt="Chrono Nexus - In-game view"
                  />
                </div>
              </ul-carousel-item>
            </ul-carousel>
          </div>

          <aside class="ul-demo-product-page__info">
            <div class="ul-demo-product-page__badges">
              <p class="ul-demo-product-page__category">Action RPG</p>
              <ul-pill theme="transparent-red" variant="read-only">Sale</ul-pill>
              <ul-button
                theme="ghost-white"
                [iconOnly]="true"
                ariaLabel="Add to wishlist"
                class="ul-demo-product-page__wishlist-btn"
              >
                <ul-icon icon="heart" size="6" />
              </ul-button>
            </div>
            <h1 class="ul-demo-product-page__title">Chrono Nexus</h1>
            <p class="ul-demo-product-page__subtitle">
              Bend time. Shape destiny. An epic journey across fractured realities.
            </p>

            <div class="ul-demo-product-page__form-block">
              <ul-select
                label="Platform"
                [options]="platformOptions"
                [(value)]="selectedPlatform"
                theme="transparent-white"
                size="md"
              />
              <ul-select
                [options]="quantityDropdownItems"
                theme="transparent-white"
                label="Quantity"
                [(value)]="selectedQuantity"
              />
            </div>

            <div class="ul-demo-product-page__price-block">
              <ul-price-button
                label="Add to cart"
                [price]="24.99"
                [originalPrice]="34.99"
                [discountBasis]="30"
                currency="USD"
                theme="fill-purple"
              />
            </div>
          </aside>
        </div>

        <div class="ul-demo-product-page__details">
          <ul-accordion [showDivider]="true">
            <ul-accordion-item [expanded]="true">
              <ng-container ul-accordion-label>Description</ng-container>
              <ng-container ul-accordion-content>
                <ul-rich-text [content]="descriptionHtml" />
              </ng-container>
            </ul-accordion-item>
            <ul-accordion-item>
              <ng-container ul-accordion-label>Specifications</ng-container>
              <ng-container ul-accordion-content>
                <ul class="ul-demo-product-page__spec-list">
                  <li><strong>Genre:</strong> Action RPG</li>
                  <li><strong>Developer:</strong> Nexus Studios</li>
                  <li><strong>Release Date:</strong> 2025</li>
                  <li><strong>Single Player:</strong> Yes</li>
                  <li><strong>Multiplayer:</strong> Co-op (2–4 players)</li>
                </ul>
              </ng-container>
            </ul-accordion-item>
            <ul-accordion-item>
              <ng-container ul-accordion-label>System Requirements</ng-container>
              <ng-container ul-accordion-content>
                <p>
                  <strong>Minimum:</strong> Windows 10 64-bit, Intel Core i5, 8 GB RAM, NVIDIA GTX
                  1060
                </p>
                <p>
                  <strong>Recommended:</strong> Windows 11 64-bit, Intel Core i7, 16 GB RAM, NVIDIA
                  RTX 3060
                </p>
              </ng-container>
            </ul-accordion-item>
            <ul-accordion-item>
              <ng-container ul-accordion-label>Shipping & Returns</ng-container>
              <ng-container ul-accordion-content>
                <p>
                  Digital products are delivered instantly. Full refund within 14 days if not
                  satisfied.
                </p>
              </ng-container>
            </ul-accordion-item>
          </ul-accordion>
        </div>
      </main>

      <ul-footer
        [socialLinks]="socialLinks"
        [links]="footerLinks"
        class="ul-demo-product-page__footer"
      >
        <ng-container ul-copyright>{{ copyrightText }}</ng-container>
      </ul-footer>
    </div>
  `,
  styles: [
    `
      .ul-demo-product-page {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        background: #0a0a0a;
      }
      .ul-demo-product-page__main {
        flex: 1;
        padding: 1.5rem 2rem 2rem;
        max-width: 1200px;
        margin: 0 auto;
        width: 100%;
      }

      .ul-demo-product-page__logo {
        display: block;
        height: 32px;
      }
      .ul-demo-product-page__product-grid {
        display: grid;
        grid-template-columns: 55fr 45fr;
        gap: 2rem;
        margin-top: 2rem;
        margin-bottom: 1.5rem;
      }
      @media (max-width: 768px) {
        .ul-demo-product-page__product-grid {
          grid-template-columns: 1fr;
        }
      }
      .ul-demo-product-page__gallery {
        border-radius: 8px;
        overflow: hidden;
      }
      .ul-demo-product-page__gallery-slide {
        aspect-ratio: 16/9;
        position: relative;
        overflow: hidden;
      }
      .ul-demo-product-page__gallery-slide img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .ul-demo-product-page__info {
        display: flex;
        flex-direction: column;
        gap: 1.25rem;
      }
      .ul-demo-product-page__category {
        margin: 0;
        font-size: 0.875rem;
        color: rgba(255, 255, 255, 0.6);
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }
      .ul-demo-product-page__title {
        margin: 0;
        font-size: 1.75rem;
        font-weight: 700;
        color: rgba(255, 255, 255, 0.95);
        line-height: 1.2;
      }
      .ul-demo-product-page__subtitle {
        margin: 0;
        font-size: 1rem;
        color: rgba(255, 255, 255, 0.7);
        line-height: 1.5;
      }
      .ul-demo-product-page__badges {
        display: flex;
        gap: 0.5rem;
        flex-wrap: wrap;
      }
      .ul-demo-product-page__price-block {
        margin-top: 0.25rem;
      }
      .ul-demo-product-page__form-block {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
      }
      .ul-demo-product-page__form-block ul-dropdown,
      .ul-demo-product-page__form-block .ul-demo-product-page__qty-wrap ul-dropdown {
        min-width: 80px;
      }
      .ul-demo-product-page__wishlist-btn {
        margin-left: auto;
      }
      .ul-demo-product-page__qty-wrap {
        display: flex;
        flex-direction: column;
        gap: 0.375rem;
      }
      .ul-demo-product-page__qty-label {
        font-size: 0.875rem;
        color: rgba(255, 255, 255, 0.7);
      }
      .ul-demo-product-page__details {
        margin-bottom: 2rem;
      }
      .ul-demo-product-page__spec-list {
        margin: 0;
        padding-left: 1.25rem;
        color: rgba(255, 255, 255, 0.85);
      }
      .ul-demo-product-page__spec-list li {
        margin-bottom: 0.5rem;
      }
      .ul-demo-product-page__details p {
        margin: 0 0 0.75rem 0;
        color: rgba(255, 255, 255, 0.85);
      }
      .ul-demo-product-page__details p:last-child {
        margin-bottom: 0;
      }
      .ul-demo-product-page__footer {
        margin-top: auto;
      }
    `,
  ],
})
class DemoProductPageComponent {
  breadcrumbItems = breadcrumbItems;
  quantityDropdownItems = quantityDropdownItems;
  platformOptions = platformOptions;
  searchOptions = searchOptions;

  selectedPlatform = model<string | null>('pc');
  selectedQuantityIndex = model(0);

  carouselOptions = { autoplay: false, pagination: true };

  descriptionHtml =
    '<h1>Chrono Nexus </h1> <p>Chrono Nexus is a stunning action RPG where you wield the power of time itself. Navigate through fractured timelines, battle temporal anomalies, and forge alliances across different eras. Features <strong>fluid combat</strong>, rich storytelling, and breathtaking visuals powered by next-gen technology.</p>';

  copyrightText = `© ${new Date().getFullYear()} Player Eleven. All rights reserved.`;
  socialLinks = [
    { url: 'https://www.facebook.com/ultra.platform', icon: 'facebook' },
    { url: 'https://twitter.com/ultra_io', icon: 'twitter' },
    { url: 'https://discord.gg/kwm49BnAqN', icon: 'discord' },
    { url: 'https://t.me/ultra_io', icon: 'telegram' },
  ];
  footerLinks = [{ url: 'https://settings.app.ultra.io/en/profile/legal', text: 'Legal' }];
}

@Component({
  selector: 'ul-demo-product-page-with-layout',
  imports: [
    DemoAppLayoutComponent,
    NavbarLogoSlotDirective,
    NavbarSearchSlotDirective,
    NavbarAvatarSlotDirective,
    FooterComponent,
    BreadcrumbComponent,
    CarouselComponent,
    CarouselItemComponent,
    PriceButtonComponent,
    ButtonComponent,
    PillComponent,
    SelectComponent,
    DropdownComponent,
    AccordionComponent,
    AccordionItemComponent,
    IconComponent,
    ImageNotFoundDirective,
    SearchSelectComponent,
    AvatarComponent,
  ],
  template: `
    <ul-demo-app-layout>
      <a ul-navbar-logo href="/" class="ul-text-primary ul-typography-brand-headline-m-extrablack">
        <img src="assets/img/logo.png" alt="Player Eleven" class="ul-demo-product-page__logo" />
      </a>
      <div ul-navbar-search>
        <ul-search-select placeholder="Search games..." [options]="searchOptions" size="md" />
      </div>
      <ul-avatar ul-navbar-avatar initials="JD" size="md" />

      <div class="ul-demo-product-page__wrapper">
        <main class="ul-demo-product-page__main">
          <ul-breadcrumb [items]="breadcrumbItems" class="ul-demo-product-page__breadcrumb" />

          <div class="ul-demo-product-page__product-grid">
            <div class="ul-demo-product-page__gallery">
              <ul-carousel [options]="carouselOptions">
                <ul-carousel-item>
                  <div class="ul-demo-product-page__gallery-slide">
                    <img
                      ulCatchImageNotFound
                      src="https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&h=450&fit=crop"
                      alt="Chrono Nexus - Game artwork"
                    />
                  </div>
                </ul-carousel-item>
                <ul-carousel-item>
                  <div class="ul-demo-product-page__gallery-slide">
                    <img
                      ulCatchImageNotFound
                      src="https://images.unsplash.com/photo-1511882150382-421056eb6909?w=800&h=450&fit=crop"
                      alt="Chrono Nexus - Gameplay screenshot"
                    />
                  </div>
                </ul-carousel-item>
                <ul-carousel-item>
                  <div class="ul-demo-product-page__gallery-slide">
                    <img
                      ulCatchImageNotFound
                      src="https://images.unsplash.com/photo-1585504198199-20277593b94f?w=800&h=450&fit=crop"
                      alt="Chrono Nexus - In-game view"
                    />
                  </div>
                </ul-carousel-item>
              </ul-carousel>
            </div>

            <aside class="ul-demo-product-page__info">
              <div class="ul-demo-product-page__badges">
                <p class="ul-demo-product-page__category">Action RPG</p>
                <ul-pill theme="transparent-red" variant="read-only">Sale</ul-pill>
                <ul-button
                  theme="ghost-white"
                  [iconOnly]="true"
                  ariaLabel="Add to wishlist"
                  class="ul-demo-product-page__wishlist-btn"
                >
                  <ul-icon icon="heart" size="6" />
                </ul-button>
              </div>
              <h1 class="ul-demo-product-page__title">Chrono Nexus</h1>
              <p class="ul-demo-product-page__subtitle">
                Bend time. Shape destiny. An epic journey across fractured realities.
              </p>

              <div class="ul-demo-product-page__form-block">
                <ul-select
                  label="Platform"
                  [options]="platformOptions"
                  [(value)]="selectedPlatform"
                  theme="transparent-white"
                  size="md"
                />
                <ul-select
                  [options]="quantityDropdownItems"
                  theme="transparent-white"
                  label="Quantity"
                  [(value)]="selectedQuantity"
                />
              </div>

              <div class="ul-demo-product-page__price-block">
                <ul-price-button
                  label="Add to cart"
                  [price]="24.99"
                  [originalPrice]="34.99"
                  [discountBasis]="30"
                  currency="USD"
                  theme="fill-purple"
                />
              </div>
            </aside>
          </div>

          <div class="ul-demo-product-page__details">
            <ul-accordion [showDivider]="true">
              <ul-accordion-item [expanded]="true">
                <ng-container ul-accordion-label>Description</ng-container>
                <ng-container ul-accordion-content>
                  <p>
                    Chrono Nexus is a stunning action RPG where you wield the power of time itself.
                    Navigate through fractured timelines, battle temporal anomalies, and forge
                    alliances across different eras. Features fluid combat, rich storytelling, and
                    breathtaking visuals powered by next-gen technology.
                  </p>
                </ng-container>
              </ul-accordion-item>
              <ul-accordion-item>
                <ng-container ul-accordion-label>Specifications</ng-container>
                <ng-container ul-accordion-content>
                  <ul class="ul-demo-product-page__spec-list">
                    <li><strong>Genre:</strong> Action RPG</li>
                    <li><strong>Developer:</strong> Nexus Studios</li>
                    <li><strong>Release Date:</strong> 2025</li>
                    <li><strong>Single Player:</strong> Yes</li>
                    <li><strong>Multiplayer:</strong> Co-op (2–4 players)</li>
                  </ul>
                </ng-container>
              </ul-accordion-item>
              <ul-accordion-item>
                <ng-container ul-accordion-label>System Requirements</ng-container>
                <ng-container ul-accordion-content>
                  <p>
                    <strong>Minimum:</strong> Windows 10 64-bit, Intel Core i5, 8 GB RAM, NVIDIA GTX
                    1060
                  </p>
                  <p>
                    <strong>Recommended:</strong> Windows 11 64-bit, Intel Core i7, 16 GB RAM,
                    NVIDIA RTX 3060
                  </p>
                </ng-container>
              </ul-accordion-item>
              <ul-accordion-item>
                <ng-container ul-accordion-label>Shipping & Returns</ng-container>
                <ng-container ul-accordion-content>
                  <p>
                    Digital products are delivered instantly. Full refund within 14 days if not
                    satisfied.
                  </p>
                </ng-container>
              </ul-accordion-item>
            </ul-accordion>
          </div>
        </main>

        <ul-footer
          [socialLinks]="socialLinks"
          [links]="footerLinks"
          class="ul-demo-product-page__footer"
        >
          <ng-container ul-copyright>{{ copyrightText }}</ng-container>
        </ul-footer>
      </div>
    </ul-demo-app-layout>
  `,
  styles: [
    `
      .ul-demo-product-page__wrapper {
        display: flex;
        flex-direction: column;
        flex: 1;
        min-height: 0;
      }
      .ul-demo-product-page__main {
        flex: 1;
        padding: 0 0 2rem;
        max-width: 1200px;
        margin: 0 auto;
        width: 100%;
      }
      .ul-demo-product-page__product-grid {
        display: grid;
        grid-template-columns: 55fr 45fr;
        gap: 2rem;
        margin-top: 2rem;
        margin-bottom: 1.5rem;
      }
      @media (max-width: 768px) {
        .ul-demo-product-page__product-grid {
          grid-template-columns: 1fr;
        }
      }
      .ul-demo-product-page__gallery {
        border-radius: 8px;
        overflow: hidden;
      }
      .ul-demo-product-page__gallery-slide {
        aspect-ratio: 16/9;
        position: relative;
        overflow: hidden;
      }
      .ul-demo-product-page__gallery-slide img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .ul-demo-product-page__info {
        display: flex;
        flex-direction: column;
        gap: 1.25rem;
      }
      .ul-demo-product-page__category {
        margin: 0;
        font-size: 0.875rem;
        color: rgba(255, 255, 255, 0.6);
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }
      .ul-demo-product-page__title {
        margin: 0;
        font-size: 1.75rem;
        font-weight: 700;
        color: rgba(255, 255, 255, 0.95);
        line-height: 1.2;
      }
      .ul-demo-product-page__subtitle {
        margin: 0;
        font-size: 1rem;
        color: rgba(255, 255, 255, 0.7);
        line-height: 1.5;
      }
      .ul-demo-product-page__badges {
        display: flex;
        gap: 0.5rem;
        flex-wrap: wrap;
      }
      .ul-demo-product-page__price-block {
        margin-top: 0.25rem;
      }
      .ul-demo-product-page__form-block {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
      }
      .ul-demo-product-page__wishlist-btn {
        margin-left: auto;
      }
      .ul-demo-product-page__details {
        margin-bottom: 2rem;
      }
      .ul-demo-product-page__spec-list {
        margin: 0;
        padding-left: 1.25rem;
        color: rgba(255, 255, 255, 0.85);
      }
      .ul-demo-product-page__spec-list li {
        margin-bottom: 0.5rem;
      }
      .ul-demo-product-page__details p {
        margin: 0 0 0.75rem 0;
        color: rgba(255, 255, 255, 0.85);
      }
      .ul-demo-product-page__details p:last-child {
        margin-bottom: 0;
      }
      .ul-demo-product-page__footer {
        margin-top: auto;
      }
    `,
  ],
})
class DemoProductPageWithLayoutComponent {
  breadcrumbItems = breadcrumbItems;
  quantityDropdownItems = quantityDropdownItems;
  platformOptions = platformOptions;
  searchOptions = searchOptions;

  selectedPlatform = model<string | null>('pc');
  selectedQuantity = model<string | null>('1');

  carouselOptions = { autoplay: false, pagination: true };

  copyrightText = `© ${new Date().getFullYear()} Player Eleven. All rights reserved.`;
  socialLinks = [
    { url: 'https://www.facebook.com/ultra.platform', icon: 'facebook' },
    { url: 'https://twitter.com/ultra_io', icon: 'twitter' },
    { url: 'https://discord.gg/kwm49BnAqN', icon: 'discord' },
    { url: 'https://t.me/ultra_io', icon: 'telegram' },
  ];
  footerLinks = [{ url: 'https://settings.app.ultra.io/en/profile/legal', text: 'Legal' }];
}

const meta: Meta<DemoProductPageComponent> = {
  title: 'Demos/Product page',
  component: DemoProductPageComponent,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Full e-commerce product page with Navbar, Footer, Breadcrumb, product image gallery (Carousel), product info sidebar (PriceButton, Pill, Select, Dropdown), and expandable details (Accordion).',
      },
    },
  },
  decorators: [
    moduleMetadata({
      imports: [
        NavbarComponent,
        NavbarLogoSlotDirective,
        NavbarSearchSlotDirective,
        NavbarAvatarSlotDirective,
        FooterComponent,
        BreadcrumbComponent,
        CarouselComponent,
        CarouselItemComponent,
        PriceButtonComponent,
        ButtonComponent,
        PillComponent,
        SelectComponent,
        DropdownComponent,
        AccordionComponent,
        AccordionItemComponent,
        IconComponent,
        ImageNotFoundDirective,
        SearchSelectComponent,
        AvatarComponent,
      ],
    }),
  ],
};

export default meta;
type Story = StoryObj<DemoProductPageComponent>;

export const Default: Story = {
  render: () => ({
    template: '<ul-demo-product-page-with-layout></ul-demo-product-page-with-layout>',
    moduleMetadata: {
      imports: [DemoProductPageWithLayoutComponent],
    },
  }),
};

export const NavbarOnly: Story = {
  render: () => ({
    template: '<ul-demo-product-page></ul-demo-product-page>',
    moduleMetadata: {
      imports: [DemoProductPageComponent],
    },
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Product page without sidebar layout. Use when the app does not have a drawer/sidebar.',
      },
    },
  },
};
