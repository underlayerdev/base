import { Meta, StoryObj } from '../../../.storybook/types';
import { UiSize, UiTheme } from '../shared/ui-types';

import { PriceButtonComponent, SalePosition } from './price-button';

const meta: Meta<PriceButtonComponent> = {
  title: 'Components/Actions/Price Button',
  component: PriceButtonComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Button that shows a price (or "Free" when 0), with optional original price and sale badge. Supports label override, size, theme (same as pe-button), sale position (left/right), and currency. Use for purchase or download actions.',
      },
    },
  },
  argTypes: {
    label: {
      control: 'text',
      description:
        'Text label to display on the button. If empty and price > 0, shows the price. If price is 0, shows "Free".',
    },
    size: {
      options: ['sm', 'md', 'lg'],
      control: { type: 'radio' },
      description: 'Button size',
    },
    theme: {
      options: [
        'fill-purple',
        'fill-white',
        'fill-yellow',
        'fill-red',
        'transparent-purple',
        'transparent-white',
        'transparent-red',
        'transparent-black',
        'ghost-purple',
        'ghost-white',
        'ghost-red',
        'ghost-green',
      ],
      control: { type: 'select' },
      description: 'Visual theme of the button.',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the button when true.',
    },
    salePosition: {
      options: ['left', 'right'],
      control: { type: 'radio' },
      description: 'Position of the sale badge: left or right.',
    },
    price: {
      control: { type: 'number', min: 0 },
      description: 'Current price to display. 0 means free.',
    },
    originalPrice: {
      control: { type: 'number', min: 0 },
      description: 'Original price before discount. If different from price and discountBasis > 0, shows a sale badge.',
    },
    discountBasis: {
      control: { type: 'number', min: 0, max: 100 },
      description: 'Discount percentage to display if on sale.',
    },
    currency: {
      control: 'text',
      description: 'Currency code (e.g., USD, EUR, UOS). For UOS, a custom symbol is shown.',
    },
  },
  args: {
    size: 'md' as UiSize,
    theme: 'fill-yellow' as UiTheme,
    disabled: false,
    salePosition: 'right' as SalePosition,
    price: 9.99,
    originalPrice: 19.99,
    discountBasis: 50,
    currency: 'USD',
  },
};

export default meta;
type Story = StoryObj<PriceButtonComponent>;

/**
 * Default price button story showing a typical use case with a discount.
 */
export const Default: Story = {
  args: {},
  render: (args) => ({
    props: args,
    template: `
      <pe-price-button
        [label]="label"
        [size]="size"
        [theme]="theme"
        [disabled]="disabled"
        [salePosition]="salePosition"
        [price]="price"
        [originalPrice]="originalPrice"
        [discountBasis]="discountBasis"
        [currency]="currency"
      ></pe-price-button>
    `,
  }),
};

/**
 * Story for a free item (price = 0).
 */
export const Free: Story = {
  args: {
    price: 0,
    originalPrice: 0,
    discountBasis: 0,
    theme: 'fill-purple' as UiTheme,
  },
};

/**
 * Story for a price button with no discount.
 */
export const NoDiscount: Story = {
  args: {
    price: 15,
    originalPrice: 0,
    discountBasis: 0,
    theme: 'transparent-white' as UiTheme,
  },
};

/**
 * Story for a left-aligned sale badge.
 */
export const SaleLeft: Story = {
  args: {
    salePosition: 'left',
    price: 5,
    originalPrice: 10,
    discountBasis: 50,
    label: '',
  },
};

/**
 * Story for a disabled price button.
 */
export const Disabled: Story = {
  args: {
    disabled: true,
    price: 9.99,
    originalPrice: 19.99,
    discountBasis: 50,
    label: 'Unavailable',
  },
};
