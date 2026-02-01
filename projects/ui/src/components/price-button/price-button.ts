import { ChangeDetectionStrategy, Component, input, output, ViewEncapsulation } from '@angular/core';

import type { UiSize, UiTheme } from '../shared/ui-types';
import { ButtonComponent } from '../button/button';

import { CustomCurrencyPipe } from './custom-currency.pipe';

export type SalePosition = 'left' | 'right';
export type Currency = 'UOS' | string;

@Component({
  selector: 'pe-price-button',
  standalone: true,
  imports: [ButtonComponent, CustomCurrencyPipe],
  templateUrl: './price-button.html',
  styleUrl: './price-button.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'pe-price-button',
    '[class.pe-price-button--sale-left]': 'salePosition() === "left"',
  },
})
export class PriceButtonComponent {
  // Inputs
  readonly label = input<string>(''); // Button label
  readonly size = input<UiSize>('md'); // Button size
  readonly theme = input<UiTheme>('transparent-white'); // Button theme
  readonly disabled = input<boolean>(false); // Disabled state
  readonly salePosition = input<SalePosition>('right'); // Sale badge position
  readonly price = input<number>(0); // Price (0 = free)
  readonly originalPrice = input<number>(0); // Original price
  readonly discountBasis = input<number>(0); // Discount basis
  readonly currency = input<Currency>('USD'); // Currency

  // Outputs
  readonly buttonClick = output<MouseEvent>(); // Click event

  // Methods
  protected handleClick(event: MouseEvent): void {
    // Handle click
    if (this.disabled()) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    this.buttonClick.emit(event);
  }
}
