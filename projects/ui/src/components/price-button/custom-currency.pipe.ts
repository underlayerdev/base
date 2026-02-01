import { CurrencyPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

/**
 * Extends Angular's CurrencyPipe to use the custom symbol 'ᕫ' for 'UOS' currency code.
 * For all other codes, behaves exactly like CurrencyPipe.
 */
@Pipe({
  name: 'peCurrency',
  standalone: true,
})
export class CustomCurrencyPipe extends CurrencyPipe implements PipeTransform {
  private static readonly UOS_SYMBOL = 'ᕫ';

  override transform(
    value: number | string,
    currencyCode?: string,
    display?: 'code' | 'symbol' | 'symbol-narrow' | string | boolean,
    digitsInfo?: string,
    locale?: string,
  ): string | null;
  override transform(
    value: null | undefined,
    currencyCode?: string,
    display?: 'code' | 'symbol' | 'symbol-narrow' | string | boolean,
    digitsInfo?: string,
    locale?: string,
  ): null;
  override transform(
    value: number | string | null | undefined,
    currencyCode?: string,
    display?: 'code' | 'symbol' | 'symbol-narrow' | string | boolean,
    digitsInfo?: string,
    locale?: string,
  ): string | null {
    const customDisplay = currencyCode === 'UOS' ? CustomCurrencyPipe.UOS_SYMBOL : display;
    return this.separateCurrencyAndPrice(super.transform(value, currencyCode, customDisplay, digitsInfo, locale));
  }

  private separateCurrencyAndPrice(input: string | null): string | null {
    // Match non-digits at the start (currency), then the number
    const match = input?.match(/^(\D+)?(\d+(\.\d+)?)/);
    if (match) {
      const symbol = match[1] ? match[1].trim() : '';
      const price = match[2];
      // Join with a space if symbol exists
      return symbol ? `${symbol} ${price}` : price;
    }
    // Return input if no match
    return input;
  }
}
