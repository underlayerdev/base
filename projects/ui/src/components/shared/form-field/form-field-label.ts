import { ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';

import type { UiSize } from '../ui-types';

/**
 * Shared label for form fields (input, select, textarea).
 * Renders label text and optional required indicator.
 */
@Component({
  selector: 'pe-form-field-label',
  standalone: true,
  template: `
    @if (label()) {
      <label
        [attr.for]="for()"
        class="pe-form-field__label pe-form-field__label--{{size()}}"
        [class.pe-form-field__label--required]="required()"
      >
        {{ label() }}
        @if (required()) {
          <span class="pe-form-field__required-indicator" aria-hidden="true" title="Required"> * </span>
        }
      </label>
    }
  `,
  styleUrls: ['./form-field.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class FormFieldLabelComponent {
  readonly label = input<string | null>(null);
  readonly required = input<boolean>(false);
  readonly for = input<string>('');
  readonly size = input<UiSize>('md');
}
