import { Meta, StoryObj } from '../../../.storybook/types';

const meta: Meta = {
  title: 'Foundations/Layout',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Layout utilities: containers, flex, grid, and alignment classes. Use for page structure, spacing, and responsive behavior.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Containers: Story = {
  render: () => ({
    template: `
      <div class="pe-p-4">
        <h2 class="pe-typography-headline-l-regular pe-mb-8">Containers</h2>
        
        <div class="pe-gap-8" style="display: flex; flex-direction: column;">
          <div *ngFor="let container of containers">
            <h3 class="pe-typography-body-l-regular pe-mb-4">{{container.name}}</h3>
            <div [class]="container.class" class="pe-bg-grey-lvl-1">
              <div class="pe-p-4">
                <p class="pe-typography-body-m-regular">{{container.description}}</p>
                <code>.{{container.class}}</code>
              </div>
            </div>
          </div>
        </div>
      </div>
    `,
    props: {
      containers: [
        {
          name: 'Fluid Container',
          class: 'pe-container-fluid',
          description: 'Full-width container with responsive padding',
        },
        {
          name: 'Gallery Container',
          class: 'pe-container-gallery',
          description: 'Container optimized for gallery layouts with wider padding',
        },
        {
          name: 'Product Container',
          class: 'pe-container-product',
          description: 'Container optimized for product pages with max-width',
        },
        {
          name: 'Form Container',
          class: 'pe-container-form',
          description: 'Narrow container optimized for forms',
        },
      ],
    },
  }),
};

export const Grid: Story = {
  render: () => ({
    template: `
      <div class="pe-p-4">
        <h2 class="pe-typography-headline-l-regular pe-mb-8">Grid System</h2>
        
        <div class="pe-gap-8" style="display: flex; flex-direction: column;">
          <div>
            <h3 class="pe-typography-body-l-regular pe-mb-4">Basic Grid</h3>
            <div class="pe-row pe-gap-4">
              <div class="pe-col-4 pe-bg-purple pe-p-4">
                <code>.pe-col-4</code>
              </div>
              <div class="pe-col-4 pe-bg-purple pe-p-4">
                <code>.pe-col-4</code>
              </div>
              <div class="pe-col-4 pe-bg-purple pe-p-4">
                <code>.pe-col-4</code>
              </div>
            </div>
          </div>

          <div>
            <h3 class="pe-typography-body-l-regular pe-mb-4">Responsive Grid</h3>
            <div class="pe-row pe-gap-4">
              <div class="pe-col-12 pe-col-md-6 pe-col-lg-4 pe-bg-purple pe-p-4">
                <code>.pe-col-12 .pe-col-md-6 .pe-col-lg-4</code>
              </div>
              <div class="pe-col-12 pe-col-md-6 pe-col-lg-4 pe-bg-purple pe-p-4">
                <code>.pe-col-12 .pe-col-md-6 .pe-col-lg-4</code>
              </div>
              <div class="pe-col-12 pe-col-md-6 pe-col-lg-4 pe-bg-purple pe-p-4">
                <code>.pe-col-12 .pe-col-md-6 .pe-col-lg-4</code>
              </div>
            </div>
          </div>
        </div>
      </div>
    `,
  }),
};

export const Breakpoints: Story = {
  render: () => ({
    template: `
      <div class="pe-p-4">
        <h2 class="pe-typography-headline-l-regular pe-mb-8">Breakpoints</h2>
        
        <div class="pe-gap-8" style="display: flex; flex-direction: column;">
          <div *ngFor="let breakpoint of breakpoints">
            <div class="pe-bg-grey-lvl-1 pe-p-4">
              <h3 class="pe-typography-body-l-regular">{{breakpoint.name}}</h3>
              <p class="pe-typography-body-m-regular">{{breakpoint.description}}</p>
              <code>{{breakpoint.mediaQuery}}</code>
            </div>
          </div>
        </div>
      </div>
    `,
    props: {
      breakpoints: [
        {
          name: 'Extra Small (xs)',
          description: 'Default styles, no media query needed',
          mediaQuery: '@media (min-width: 0px)',
        },
        {
          name: 'Small (sm)',
          description: 'Tablets and larger',
          mediaQuery: '@media (min-width: 768px)',
        },
        {
          name: 'Medium (md)',
          description: 'Small desktops and larger',
          mediaQuery: '@media (min-width: 1024px)',
        },
        {
          name: 'Large (lg)',
          description: 'Medium desktops and larger',
          mediaQuery: '@media (min-width: 1280px)',
        },
        {
          name: 'Extra Large (xl)',
          description: 'Large desktops and larger',
          mediaQuery: '@media (min-width: 1600px)',
        },
      ],
    },
  }),
};

export const LineClamp: Story = {
  render: () => ({
    template: `
      <div class="pe-p-4">
        <h2 class="pe-typography-headline-l-regular pe-mb-8">Line Clamp</h2>
        
        <div class="pe-gap-8" style="display: flex; flex-direction: column;">
          <div *ngFor="let clamp of clamps">
            <h3 class="pe-typography-body-l-regular pe-mb-4">{{clamp.name}}</h3>
            <div class="pe-bg-grey-lvl-1 pe-p-4" style="max-width: 300px;">
              <p [class]="clamp.class" class="pe-typography-body-m-regular">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
            <code>.{{clamp.class}}</code>
          </div>
        </div>
      </div>
    `,
    props: {
      clamps: [
        { name: '1 Line', class: 'pe-line-clamp-1' },
        { name: '2 Lines', class: 'pe-line-clamp-2' },
        { name: '3 Lines', class: 'pe-line-clamp-3' },
      ],
    },
  }),
};

export const Scrollable: Story = {
  render: () => ({
    template: `
      <div class="pe-p-4">
        <h2 class="pe-typography-headline-l-regular pe-mb-8">Scrollable Containers</h2>
        
        <div class="pe-gap-8" style="display: flex; flex-direction: column;">
          <div>
            <h3 class="pe-typography-body-l-regular pe-mb-4">Vertical Scroll</h3>
            <div class="pe-bg-grey-lvl-1 pe-p-4">
              <div class="pe-scrollable" style="height: 200px;">
                <div class="pe-p-4">
                  <p class="pe-typography-body-m-regular pe-mb-4">Scrollable content with custom scrollbar that appears on hover.</p>
                  <p class="pe-typography-body-m-regular pe-mb-4">The scrollbar is thin and elegant, matching the dark theme.</p>
                  <p class="pe-typography-body-m-regular pe-mb-4">It supports both vertical and horizontal scrolling.</p>
                  <p class="pe-typography-body-m-regular pe-mb-4">The scrollbar appears with a fade effect when hovering over the content.</p>
                  <p class="pe-typography-body-m-regular pe-mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                  <p class="pe-typography-body-m-regular pe-mb-4">Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                  <p class="pe-typography-body-m-regular pe-mb-4">Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>
                </div>
              </div>
            </div>
            <code>.pe-scrollable</code>
          </div>

          <div>
            <h3 class="pe-typography-body-l-regular pe-mb-4">Horizontal Scroll</h3>
            <div class="pe-bg-grey-lvl-1 pe-p-4">
              <div class="pe-scrollable" style="width: 300px;">
                <div style="display: flex; gap: 16px; padding: 16px;">
                  <div class="pe-bg-purple pe-p-4" style="min-width: 200px;">
                    <p class="pe-typography-body-m-regular">Item 1</p>
                  </div>
                  <div class="pe-bg-purple pe-p-4" style="min-width: 200px;">
                    <p class="pe-typography-body-m-regular">Item 2</p>
                  </div>
                  <div class="pe-bg-purple pe-p-4" style="min-width: 200px;">
                    <p class="pe-typography-body-m-regular">Item 3</p>
                  </div>
                  <div class="pe-bg-purple pe-p-4" style="min-width: 200px;">
                    <p class="pe-typography-body-m-regular">Item 4</p>
                  </div>
                </div>
              </div>
            </div>
            <code>.pe-scrollable</code>
          </div>
        </div>
      </div>
    `,
  }),
};
