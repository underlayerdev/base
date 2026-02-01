import { Meta, StoryObj } from '../../../.storybook/types';

const meta: Meta = {
  title: 'Foundations/Borders',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Border color and radius utilities. Use `.pe-border-*` for border colors and `.pe-rounded-*` for border radius. Complements the color and spacing foundations.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const BorderColors: Story = {
  render: () => ({
    template: `
      <div class="pe-p-4">
        <h2 class="pe-typography-headline-l-regular pe-mb-8">Border Colors</h2>
        
        <div class="pe-gap-4" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));">
          <div *ngFor="let color of colors" class="pe-p-4">
            <div [class]="color.class" class="pe-p-8 pe-rounded-2" style="border-width: 2px; border-style: solid;">
              <p class="pe-typography-body-m-regular">{{color.name}}</p>
              <code>.{{color.class}}</code>
            </div>
          </div>
        </div>
      </div>
    `,
    props: {
      colors: [
        { name: 'White Light', class: 'pe-border-white-light' },
        {
          name: 'White Medium Strong',
          class: 'pe-border-white-medium-strong',
        },
        { name: 'Purple', class: 'pe-border-purple' },
        { name: 'White Medium', class: 'pe-border-white-medium' },
        { name: 'Grey', class: 'pe-border-grey' },
        { name: 'Black', class: 'pe-border-black' },
        { name: 'White', class: 'pe-border-white' },
        { name: 'Red', class: 'pe-border-red' },
        { name: 'Green', class: 'pe-border-green' },
        { name: 'Orange', class: 'pe-border-orange' },
        { name: 'Yellow', class: 'pe-border-yellow' },
      ],
    },
  }),
};

export const BorderRadius: Story = {
  render: () => ({
    template: `
      <div class="pe-p-4">
        <h2 class="pe-typography-headline-l-regular pe-mb-8">Border Radius</h2>
        
        <div class="pe-gap-8" style="display: flex; flex-direction: column;">
          <div *ngFor="let radius of radii">
            <h3 class="pe-typography-body-l-regular pe-mb-4">{{radius.name}}</h3>
            <div [class]="radius.class" class="pe-bg-purple" style="width: 100px; height: 100px;">
            </div>
            <code>.{{radius.class}}</code>
            <p class="pe-typography-body-m-regular">{{radius.pixels}}px</p>
          </div>
        </div>
      </div>
    `,
    props: {
      radii: [
        { name: 'None', class: 'pe-rounded-none', pixels: 0 },
        { name: 'Small', class: 'pe-rounded-1', pixels: 4 },
        { name: 'Medium', class: 'pe-rounded-2', pixels: 8 },
        { name: 'Large', class: 'pe-rounded-3', pixels: 12 },
        { name: 'XLarge', class: 'pe-rounded-4', pixels: 16 },
        { name: '2XLarge', class: 'pe-rounded-6', pixels: 24 },
        { name: '3XLarge', class: 'pe-rounded-8', pixels: 32 },
        { name: '4XLarge', class: 'pe-rounded-16', pixels: 64 },
        { name: 'Full', class: 'pe-rounded-full', pixels: 4096 },
      ],
    },
  }),
};

export const Shadows: Story = {
  render: () => ({
    template: `
      <div class="pe-p-4">
        <h2 class="pe-typography-headline-l-regular pe-mb-8">Shadows</h2>
        
        <div class="pe-gap-8" style="display: flex; flex-direction: column;">
          <div *ngFor="let shadow of shadows">
            <h3 class="pe-typography-body-l-regular pe-mb-4">{{shadow.name}}</h3>
            <div [class]="shadow.class" class="pe-bg-grey-lvl-1" style="width: 200px; height: 100px;">
            </div>
            <code>.{{shadow.class}}</code>
            <p class="pe-typography-body-m-regular">{{shadow.description}}</p>
          </div>
        </div>
      </div>
    `,
    props: {
      shadows: [
        {
          name: 'None',
          class: 'pe-shadow-none',
          description: 'No shadow',
        },
        {
          name: 'Small',
          class: 'pe-shadow-sm',
          description: '0px 4px 8px rgba(0, 0, 0, 0.25), 0px 0px 4px rgba(0, 0, 0, 0.12)',
        },
        {
          name: 'Medium',
          class: 'pe-shadow-md',
          description: '0px 8px 16px rgba(0, 0, 0, 0.25), 0px 4px 8px rgba(0, 0, 0, 0.12)',
        },
        {
          name: 'Large',
          class: 'pe-shadow-lg',
          description: '0px 16px 32px rgba(0, 0, 0, 0.25), 0px 8px 16px rgba(0, 0, 0, 0.12)',
        },
      ],
    },
  }),
};

export const Blur: Story = {
  render: () => ({
    template: `
      <div class="pe-p-4">
        <h2 class="pe-typography-headline-l-regular pe-mb-8">Backdrop Blur</h2>
        
        <div class="pe-gap-8" style="display: flex; flex-direction: column;">
          <div *ngFor="let blur of blurs">
            <h3 class="pe-typography-body-l-regular pe-mb-4">{{blur.name}}</h3>
            <div [class]="blur.class" class="pe-bg-white-light" style="width: 200px; height: 100px;">
            </div>
            <code>.{{blur.class}}</code>
            <p class="pe-typography-body-m-regular">{{blur.pixels}}px blur</p>
          </div>
        </div>
      </div>
    `,
    props: {
      blurs: [
        { name: 'None', class: 'pe-blur-0', pixels: 0 },
        { name: 'Small', class: 'pe-blur-32', pixels: 32 },
        { name: 'Medium', class: 'pe-blur-128', pixels: 128 },
        { name: 'Large', class: 'pe-blur-256', pixels: 256 },
      ],
    },
  }),
};
