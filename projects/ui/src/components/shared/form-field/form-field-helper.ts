import { ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';

/**
 * Shared helper/error text for form fields (input, select, textarea).
 * Shows error text when in error state, otherwise helper text.
 */
@Component({
  selector: 'pe-form-field-helper',
  standalone: true,
  template: `
    <span
      [id]="id()"
      class="pe-form-field__helper-text"
      [class.pe-form-field__helper-text--error]="error()"
    >
      @if (error() && errorText()) {
        {{ errorText() }}
      } @else {
        {{ helperText() }}
      }
    </span>
  `,
  styleUrls: ['./form-field.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class FormFieldHelperComponent {
  readonly id = input.required<string>();
  readonly helperText = input<string | null>(null);
  readonly errorText = input<string | null>(null);
  readonly error = input<boolean>(false);
}
