import { Meta, StoryObj } from '../../../.storybook/types';

const meta: Meta = {
  title: 'Foundations/Colors',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Design system color palette. Background (`.pe-bg-*`), text (`.pe-text-*`), and border utilities for main, grey levels, white, black, and semantic colors.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const BackgroundColors: Story = {
  render: () => ({
    template: `
      <div class="pe-p-4">
        <h2 class="pe-typography-headline-l-regular">Background Colors</h2>
        
        <div class="pe-gap-4" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));">
          <div *ngFor="let color of colors" class="pe-p-4">
            <div [class]="color.class" class="pe-p-8 pe-rounded-2">
              <p class="pe-typography-body-m-regular">{{color.name}}</p>
              <code>.{{color.class}}</code>
            </div>
          </div>
        </div>
      </div>
    `,
    props: {
      colors: [
        { name: 'Main', class: 'pe-bg-main' },
        { name: 'Grey Level 1', class: 'pe-bg-grey-lvl-1' },
        { name: 'Grey Level 2', class: 'pe-bg-grey-lvl-2' },
        { name: 'White Light', class: 'pe-bg-white-light' },
        { name: 'Black Strong', class: 'pe-bg-black-strong' },
        { name: 'Black Medium', class: 'pe-bg-black-medium' },
        { name: 'White Extra Light', class: 'pe-bg-white-extra-light' },
        { name: 'Main Strong', class: 'pe-bg-main-strong' },
        { name: 'Purple', class: 'pe-bg-purple' },
        { name: 'Purple Light', class: 'pe-bg-purple-light' },
        { name: 'White', class: 'pe-bg-white' },
        { name: 'White Medium Strong', class: 'pe-bg-white-medium-strong' },
        { name: 'Green Light', class: 'pe-bg-green-light' },
        { name: 'Green', class: 'pe-bg-green' },
        { name: 'Red Light', class: 'pe-bg-red-light' },
        { name: 'Red', class: 'pe-bg-red' },
        { name: 'Orange Light', class: 'pe-bg-orange-light' },
        { name: 'Orange', class: 'pe-bg-orange' },
        { name: 'White Medium Light', class: 'pe-bg-white-medium-light' },
      ],
    },
  }),
};

export const TextColors: Story = {
  render: () => ({
    template: `
      <div class="pe-p-4">
        <h2 class="pe-typography-headline-l-regular">Text Colors</h2>
        
        <div class="pe-gap-4" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));">
          <div *ngFor="let color of colors" class="pe-p-4">
            <div class="pe-bg-grey-lvl-1 pe-p-8 pe-rounded-2">
              <p [class]="color.class" class="pe-typography-body-m-regular">{{color.name}}</p>
              <code>.{{color.class}}</code>
            </div>
          </div>
        </div>
      </div>
    `,
    props: {
      colors: [
        { name: 'Primary', class: 'pe-text-primary' },
        { name: 'Secondary', class: 'pe-text-secondary' },
        { name: 'Tertiary', class: 'pe-text-tertiary' },
        { name: 'Disabled', class: 'pe-text-disabled' },
        { name: 'Purple', class: 'pe-text-purple' },
        { name: 'Green', class: 'pe-text-green' },
        { name: 'Red', class: 'pe-text-red' },
        { name: 'Orange', class: 'pe-text-orange' },
        { name: 'Yellow', class: 'pe-text-yellow' },
        { name: 'Inverted', class: 'pe-text-inverted' },
        { name: 'Purple Inverted', class: 'pe-text-purple-inverted' },
        { name: 'Inverted Strong', class: 'pe-text-inverted-strong' },
      ],
    },
  }),
};

export const InteractiveColors: Story = {
  render: () => ({
    template: `
      <div class="pe-p-4">
        <h2 class="pe-typography-headline-l-regular">Interactive Surface Colors</h2>
        
        <div class="pe-gap-4" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));">
          <div *ngFor="let surface of surfaces" class="pe-p-4">
            <h3 class="pe-typography-body-l-regular pe-mb-2">{{surface.name}}</h3>
            <div [class]="surface.class" class="pe-p-8 pe-rounded-2 pe-mb-2">
              Default
            </div>
            <div [class]="surface.class + ':hover'" class="pe-p-8 pe-rounded-2 pe-mb-2">
              Hover
            </div>
            <div [class]="surface.class + ':active'" class="pe-p-8 pe-rounded-2 pe-mb-2">
              Active
            </div>
            <div [class]="surface.class + ':selected'" class="pe-p-8 pe-rounded-2 pe-mb-2">
              Selected
            </div>
            <div [class]="surface.class + ':disabled'" class="pe-p-8 pe-rounded-2">
              Disabled
            </div>
            <code>.{{surface.class}}</code>
          </div>
        </div>
      </div>
    `,
    props: {
      surfaces: [
        {
          name: 'Solid Grey Level 1',
          class: 'pe-interactive-surface-solid-grey-lvl-1',
        },
        {
          name: 'Solid Grey Level 2',
          class: 'pe-interactive-surface-solid-grey-lvl-2',
        },
        { name: 'Solid Purple', class: 'pe-interactive-surface-solid-purple' },
        { name: 'Solid Red', class: 'pe-interactive-surface-solid-red' },
        { name: 'Solid White', class: 'pe-interactive-surface-solid-white' },
        { name: 'Solid Yellow', class: 'pe-interactive-surface-solid-yellow' },
        { name: 'Solid Green', class: 'pe-interactive-surface-solid-green' },
        { name: 'Solid Orange', class: 'pe-interactive-surface-solid-orange' },
        {
          name: 'Transparent Purple',
          class: 'pe-interactive-surface-transparent-purple',
        },
        {
          name: 'Transparent Red',
          class: 'pe-interactive-surface-transparent-red',
        },
        {
          name: 'Transparent White',
          class: 'pe-interactive-surface-transparent-white',
        },
        {
          name: 'Transparent Orange',
          class: 'pe-interactive-surface-transparent-orange',
        },
        {
          name: 'Transparent Green',
          class: 'pe-interactive-surface-transparent-green',
        },
        {
          name: 'Transparent Black',
          class: 'pe-interactive-surface-transparent-black',
        },
        {
          name: 'Transparent Yellow',
          class: 'pe-interactive-surface-transparent-yellow',
        },
        { name: 'Ghost Purple', class: 'pe-interactive-surface-ghost-purple' },
        { name: 'Ghost Red', class: 'pe-interactive-surface-ghost-red' },
        { name: 'Ghost White', class: 'pe-interactive-surface-ghost-white' },
        { name: 'Ghost Green', class: 'pe-interactive-surface-ghost-green' },
      ],
    },
  }),
};
