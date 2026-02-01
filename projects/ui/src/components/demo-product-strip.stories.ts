import { Component } from '@angular/core';
import { moduleMetadata } from '@storybook/angular';

import { Meta, StoryObj } from '../../.storybook/types';
import { ButtonComponent } from './button/button';
import { CardComponent } from './card/card';
import { DropdownComponent, DropdownItem } from './dropdown/dropdown';
import { ImageNotFoundDirective } from './image/image-not-found';
import { IconComponent } from './icon/icon';
import { ListItemComponent } from './list-item/list-item';
import { PillComponent } from './pill/pill';
import { PriceButtonComponent } from './price-button/price-button';

const quantityDropdownItems: DropdownItem[] = [
  { label: '1', value: '1' },
  { label: '2', value: '2' },
  { label: '3', value: '3' },
];

@Component({
  selector: 'pe-demo-product-strip',
  standalone: true,
  imports: [
    CardComponent,
    PriceButtonComponent,
    ButtonComponent,
    PillComponent,
    DropdownComponent,
    IconComponent,
    ImageNotFoundDirective,
    ListItemComponent,
  ],
  template: `
    <div class="pe-demo-product-strip">
      <h1 class="pe-typography-headline-l-extrablack pe-pb-4">Featured</h1>
      <div class="pe-demo-product-strip__grid">
        <pe-card
          cardCaption="Game"
          cardTitle="Adventure Quest"
          cardSubtitle="Action RPG">
            <img
            udsCardMedia
              class="pe-h-full"
              peCatchImageNotFound
              src="https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=400&h=300&fit=crop"
              alt="Adventure Quest"
            />
          <div udsCardFooter class="pe-demo-product-strip__footer">
            <pe-price-button
              label="Add to cart"
              [price]="9.99"
              currency="USD"
              theme="fill-purple"
            />
          </div>
        </pe-card>
        <pe-card
          cardCaption="Game"
          cardTitle="Space Racer"
          cardSubtitle="Racing">
          <div udsCardMedia>
            <img
              class="pe-h-full"
              peCatchImageNotFound
              src="https://images.unsplash.com/photo-1511882150382-421056eb6909?w=400&h=300&fit=crop"
              alt="Space Racer"
            />
            <pe-pill theme="fill-red" variant="read-only">Sale</pe-pill>
          </div>
          <div udsCardFooter class="pe-demo-product-strip__footer">
            <pe-price-button
              [price]="4.99"
              [originalPrice]="9.99"
              [discountBasis]="50"
              currency="USD"
              theme="fill-purple"
            />
            <pe-button theme="ghost-white">View</pe-button>
          </div>
        </pe-card>
        <pe-card
          cardCaption="Game"
          cardTitle="Puzzle Master"
          cardSubtitle="Casual">
            <img
            udsCardMedia
              peCatchImageNotFound
              src="https://images.unsplash.com/photo-1585504198199-20277593b94f?w=400&h=300&fit=crop"
              alt="Puzzle Master"
            />
          <div udsCardFooter class="pe-demo-product-strip__footer">
            <pe-dropdown
              [items]="quantityDropdownItems"
              theme="transparent-white"
              [selectedIndex]="0"
            />
            <pe-price-button
              [price]="0"
              currency="USD"
              theme="transparent-white"
            />
          </div>
        </pe-card>
      </div>
    </div>
  `,
  styles: [
    `
      .pe-demo-product-strip {
        min-height: 100vh;
        padding: 2rem;
        background: #0a0a0a;
      }
      .pe-demo-product-strip__grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        gap: 1.5rem;
        max-width: 960px;
      }
      .pe-demo-product-strip__footer {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        flex-wrap: wrap;
      }
    `,
  ],
})
class DemoProductStripComponent {
  quantityDropdownItems = quantityDropdownItems;
}

const meta: Meta<DemoProductStripComponent> = {
  title: 'Demos/Product strip',
  component: DemoProductStripComponent,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Commerce-style row of product cards with PriceButton, Pill (Sale), Dropdown (quantity) and Button.',
      },
    },
  },
  decorators: [
    moduleMetadata({
      imports: [
        CardComponent,
        PriceButtonComponent,
        ButtonComponent,
        PillComponent,
        DropdownComponent,
        IconComponent,
        ImageNotFoundDirective,
        ListItemComponent,
      ],
    }),
  ],
};

export default meta;
type Story = StoryObj<DemoProductStripComponent>;

export const Default: Story = {
  render: () => ({
    template: '<pe-demo-product-strip></pe-demo-product-strip>',
    moduleMetadata: {
      imports: [DemoProductStripComponent],
    },
  }),
};
