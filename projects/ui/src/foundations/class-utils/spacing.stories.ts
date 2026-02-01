import { Meta, StoryObj } from '../../../.storybook/types';

const meta: Meta = {
  title: 'Foundations/Spacing',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Spacing scale and utility classes for margins, padding, and gap. Use `.pe-m-*`, `.pe-p-*`, `.pe-gap-*` with scale values (1–9, etc.) for consistent layout.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Margins: Story = {
  render: () => ({
    template: `
      <div class="pe-p-4">
        <h2 class="pe-typography-headline-l-regular pe-mb-8">Margins</h2>
        
        <div class="pe-gap-8" style="display: flex; flex-direction: column;">
          <div *ngFor="let size of sizes">
            <h3 class="pe-typography-body-l-regular pe-mb-4">Margin {{size.name}}</h3>
            <div class="pe-bg-grey-lvl-1" style="width: fit-content;">
              <div [class]="'pe-m-' + size.value" class="pe-bg-purple" style="width: 100px; height: 100px;">
              </div>
            </div>
            <code>.pe-m-{{size.value}}</code>
            <p class="pe-typography-body-m-regular">{{size.pixels}}px</p>
          </div>
        </div>
      </div>
    `,
    props: {
      sizes: [
        { name: '1', value: '1', pixels: 4 },
        { name: '2', value: '2', pixels: 8 },
        { name: '3', value: '3', pixels: 12 },
        { name: '4', value: '4', pixels: 16 },
        { name: '5', value: '5', pixels: 20 },
        { name: '6', value: '6', pixels: 24 },
        { name: '7', value: '7', pixels: 28 },
        { name: '8', value: '8', pixels: 32 },
        { name: '9', value: '9', pixels: 36 },
        { name: '10', value: '10', pixels: 40 },
        { name: '11', value: '11', pixels: 44 },
        { name: '12', value: '12', pixels: 48 },
        { name: '14', value: '14', pixels: 56 },
        { name: '15', value: '15', pixels: 60 },
        { name: '16', value: '16', pixels: 64 },
        { name: '20', value: '20', pixels: 80 },
        { name: '24', value: '24', pixels: 96 },
        { name: '28', value: '28', pixels: 112 },
        { name: '32', value: '32', pixels: 128 },
      ],
    },
  }),
};

export const Padding: Story = {
  render: () => ({
    template: `
      <div class="pe-p-4">
        <h2 class="pe-typography-headline-l-regular pe-mb-8">Padding</h2>
        
        <div class="pe-gap-8" style="display: flex; flex-direction: column;">
          <div *ngFor="let size of sizes">
            <h3 class="pe-typography-body-l-regular pe-mb-4">Padding {{size.name}}</h3>
            <div [class]="'pe-p-' + size.value" class="pe-bg-purple" style="width: fit-content;">
              <div class="pe-bg-grey-lvl-1" style="width: 100px; height: 100px;">
              </div>
            </div>
            <code>.pe-p-{{size.value}}</code>
            <p class="pe-typography-body-m-regular">{{size.pixels}}px</p>
          </div>
        </div>
      </div>
    `,
    props: {
      sizes: [
        { name: '1', value: '1', pixels: 4 },
        { name: '2', value: '2', pixels: 8 },
        { name: '3', value: '3', pixels: 12 },
        { name: '4', value: '4', pixels: 16 },
        { name: '5', value: '5', pixels: 20 },
        { name: '6', value: '6', pixels: 24 },
        { name: '7', value: '7', pixels: 28 },
        { name: '8', value: '8', pixels: 32 },
        { name: '9', value: '9', pixels: 36 },
        { name: '10', value: '10', pixels: 40 },
        { name: '11', value: '11', pixels: 44 },
        { name: '12', value: '12', pixels: 48 },
        { name: '14', value: '14', pixels: 56 },
        { name: '15', value: '15', pixels: 60 },
        { name: '16', value: '16', pixels: 64 },
        { name: '20', value: '20', pixels: 80 },
        { name: '24', value: '24', pixels: 96 },
        { name: '28', value: '28', pixels: 112 },
        { name: '32', value: '32', pixels: 128 },
      ],
    },
  }),
};

export const Gaps: Story = {
  render: () => ({
    template: `
      <div class="pe-p-4">
        <h2 class="pe-typography-headline-l-regular pe-mb-8">Gaps</h2>
        
        <div class="pe-gap-8" style="display: flex; flex-direction: column;">
          <div *ngFor="let size of sizes">
            <h3 class="pe-typography-body-l-regular pe-mb-4">Gap {{size.name}}</h3>
            <div [class]="'pe-gap-' + size.value" style="display: flex;">
              <div class="pe-bg-purple" style="width: 100px; height: 100px;"></div>
              <div class="pe-bg-purple" style="width: 100px; height: 100px;"></div>
              <div class="pe-bg-purple" style="width: 100px; height: 100px;"></div>
            </div>
            <code>.pe-gap-{{size.value}}</code>
            <p class="pe-typography-body-m-regular">{{size.pixels}}px</p>
          </div>
        </div>
      </div>
    `,
    props: {
      sizes: [
        { name: '1', value: '1', pixels: 4 },
        { name: '2', value: '2', pixels: 8 },
        { name: '3', value: '3', pixels: 12 },
        { name: '4', value: '4', pixels: 16 },
        { name: '5', value: '5', pixels: 20 },
        { name: '6', value: '6', pixels: 24 },
        { name: '7', value: '7', pixels: 28 },
        { name: '8', value: '8', pixels: 32 },
        { name: '9', value: '9', pixels: 36 },
        { name: '10', value: '10', pixels: 40 },
        { name: '11', value: '11', pixels: 44 },
        { name: '12', value: '12', pixels: 48 },
        { name: '14', value: '14', pixels: 56 },
        { name: '15', value: '15', pixels: 60 },
        { name: '16', value: '16', pixels: 64 },
        { name: '20', value: '20', pixels: 80 },
        { name: '24', value: '24', pixels: 96 },
        { name: '28', value: '28', pixels: 112 },
        { name: '32', value: '32', pixels: 128 },
      ],
    },
  }),
};

export const DirectionalSpacing: Story = {
  render: () => ({
    template: `
      <div class="pe-p-4">
        <h2 class="pe-typography-headline-l-regular pe-mb-8">Directional Spacing</h2>
        
        <div class="pe-gap-8" style="display: flex; flex-direction: column;">
          <div *ngFor="let type of types">
            <h3 class="pe-typography-body-l-regular pe-mb-4">{{type.name}}</h3>
            <div class="pe-bg-grey-lvl-1 pe-p-4">
              <div [class]="type.class" class="pe-bg-purple" style="width: 100px; height: 100px;">
              </div>
            </div>
            <code>.{{type.class}}</code>
            <p class="pe-typography-body-m-regular">{{type.description}}</p>
          </div>
        </div>
      </div>
    `,
    props: {
      types: [
        {
          name: 'Margin X',
          class: 'pe-mx-4',
          description: 'Horizontal margin (left and right)',
        },
        {
          name: 'Margin Y',
          class: 'pe-my-4',
          description: 'Vertical margin (top and bottom)',
        },
        {
          name: 'Margin Top',
          class: 'pe-mt-4',
          description: 'Top margin only',
        },
        {
          name: 'Margin Right',
          class: 'pe-mr-4',
          description: 'Right margin only',
        },
        {
          name: 'Margin Bottom',
          class: 'pe-mb-4',
          description: 'Bottom margin only',
        },
        {
          name: 'Margin Left',
          class: 'pe-ml-4',
          description: 'Left margin only',
        },
        {
          name: 'Padding X',
          class: 'pe-px-4',
          description: 'Horizontal padding (left and right)',
        },
        {
          name: 'Padding Y',
          class: 'pe-py-4',
          description: 'Vertical padding (top and bottom)',
        },
        {
          name: 'Padding Top',
          class: 'pe-pt-4',
          description: 'Top padding only',
        },
        {
          name: 'Padding Right',
          class: 'pe-pr-4',
          description: 'Right padding only',
        },
        {
          name: 'Padding Bottom',
          class: 'pe-pb-4',
          description: 'Bottom padding only',
        },
        {
          name: 'Padding Left',
          class: 'pe-pl-4',
          description: 'Left padding only',
        },
      ],
    },
  }),
};
