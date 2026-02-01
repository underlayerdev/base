import { Meta, StoryObj } from '../../../.storybook/types';

const meta: Meta = {
  title: 'Foundations/Typography',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Type scale and text styles. Use `.pe-typography-*` classes for headlines, body, labels, and captions with regular or bold weight. Ensures consistent type across the app.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Headlines: Story = {
  render: () => ({
    template: `
      <div class="pe-p-4">
        <h2 class="pe-typography-headline-l-regular pe-mb-8">Headlines</h2>
        
        <div class="pe-gap-8" style="display: flex; flex-direction: column;">
          <div *ngFor="let style of styles">
            <p [class]="style.class">{{style.name}}</p>
            <code>.{{style.class}}</code>
          </div>
        </div>
      </div>
    `,
    props: {
      styles: [
        {
          name: 'Headline 3XL ExtraBlack',
          class: 'pe-typography-headline-3xl-extrablack',
        },
        {
          name: 'Headline 3XL Regular',
          class: 'pe-typography-headline-3xl-regular',
        },
        {
          name: 'Headline 2XL ExtraBlack',
          class: 'pe-typography-headline-2xl-extrablack',
        },
        {
          name: 'Headline 2XL Regular',
          class: 'pe-typography-headline-2xl-regular',
        },
        {
          name: 'Headline XL ExtraBlack',
          class: 'pe-typography-headline-xl-extrablack',
        },
        {
          name: 'Headline XL Regular',
          class: 'pe-typography-headline-xl-regular',
        },
        {
          name: 'Headline L ExtraBlack',
          class: 'pe-typography-headline-l-extrablack',
        },
        {
          name: 'Headline L Regular',
          class: 'pe-typography-headline-l-regular',
        },
        {
          name: 'Headline M ExtraBlack',
          class: 'pe-typography-headline-m-extrablack',
        },
        {
          name: 'Headline M Regular',
          class: 'pe-typography-headline-m-regular',
        },
        {
          name: 'Headline S ExtraBlack',
          class: 'pe-typography-headline-s-extrablack',
        },
        {
          name: 'Headline S Regular',
          class: 'pe-typography-headline-s-regular',
        },
      ],
    },
  }),
};

export const Body: Story = {
  render: () => ({
    template: `
      <div class="pe-p-4">
        <h2 class="pe-typography-headline-l-regular pe-mb-8">Body Text</h2>
        
        <div class="pe-gap-8" style="display: flex; flex-direction: column;">
          <div *ngFor="let style of styles">
            <p [class]="style.class">{{style.name}}</p>
            <code>.{{style.class}}</code>
          </div>
        </div>
      </div>
    `,
    props: {
      styles: [
        {
          name: 'Body L ExtraBlack',
          class: 'pe-typography-body-l-extrablack',
        },
        { name: 'Body L Regular', class: 'pe-typography-body-l-regular' },
        {
          name: 'Body M ExtraBlack',
          class: 'pe-typography-body-m-extrablack',
        },
        { name: 'Body M Regular', class: 'pe-typography-body-m-regular' },
      ],
    },
  }),
};

export const Captions: Story = {
  render: () => ({
    template: `
      <div class="pe-p-4">
        <h2 class="pe-typography-headline-l-regular pe-mb-8">Captions</h2>
        
        <div class="pe-gap-8" style="display: flex; flex-direction: column;">
          <div *ngFor="let style of styles">
            <p [class]="style.class">{{style.name}}</p>
            <code>.{{style.class}}</code>
          </div>
        </div>
      </div>
    `,
    props: {
      styles: [
        {
          name: 'Caption L ExtraBlack',
          class: 'pe-typography-caption-l-extrablack',
        },
        {
          name: 'Caption L Regular',
          class: 'pe-typography-caption-l-regular',
        },
        {
          name: 'Brand Caption L ExtraBlack',
          class: 'pe-typography-brand-caption-l-extrablack',
        },
        {
          name: 'Brand Caption L Regular',
          class: 'pe-typography-brand-caption-l-regular',
        },
        {
          name: 'Caption Mono ExtraBlack',
          class: 'pe-typography-caption-mono-extrablack',
        },
        {
          name: 'Caption Mono Regular',
          class: 'pe-typography-caption-mono-regular',
        },
      ],
    },
  }),
};

export const BrandText: Story = {
  render: () => ({
    template: `
      <div class="pe-p-4">
        <h2 class="pe-typography-headline-l-regular pe-mb-8">Brand Typography</h2>
        
        <div class="pe-gap-8" style="display: flex; flex-direction: column;">
          <div *ngFor="let style of styles">
            <p [class]="style.class">{{style.name}}</p>
            <code>.{{style.class}}</code>
          </div>
        </div>
      </div>
    `,
    props: {
      styles: [
        {
          name: 'Brand Headline 3XL ExtraBlack',
          class: 'pe-typography-brand-headline-3xl-extrablack',
        },
        {
          name: 'Brand Headline 2XL ExtraBlack',
          class: 'pe-typography-brand-headline-2xl-extrablack',
        },
        {
          name: 'Brand Headline XL ExtraBlack',
          class: 'pe-typography-brand-headline-xl-extrablack',
        },
        {
          name: 'Brand Headline L ExtraBlack',
          class: 'pe-typography-brand-headline-l-extrablack',
        },
        {
          name: 'Brand Headline M ExtraBlack',
          class: 'pe-typography-brand-headline-m-extrablack',
        },
        {
          name: 'Brand Headline S ExtraBlack',
          class: 'pe-typography-brand-headline-s-extrablack',
        },
        {
          name: 'Brand Body L ExtraBlack',
          class: 'pe-typography-brand-body-l-extrablack',
        },
        {
          name: 'Brand Body M ExtraBlack',
          class: 'pe-typography-brand-body-m-extrablack',
        },
      ],
    },
  }),
};
