import { ChangeDetectionStrategy, Component, computed, input, model } from '@angular/core';
import type { FormValueControl, ValidationError, WithOptionalField } from '@angular/forms/signals';

import {
  createFormFieldIds,
  FormFieldHelperComponent,
  FormFieldLabelComponent,
  getFormFieldDescribedBy,
} from '../shared/form-field';
import { RadioComponent } from './radio';

export interface RadioGroupOption {
  value: string;
  label: string;
}

/**
 * Radio group that holds the selected option value. Implements FormValueControl for Signal Forms [formField].
 * Use [(value)] or [formField]="myForm().choice". Renders pe-radio per option; value is the selected option's value.
 */
@Component({
  selector: 'pe-radio-group',
  standalone: true,
  imports: [RadioComponent, FormFieldLabelComponent, FormFieldHelperComponent],
  template: `
    <div
      class="pe-radio-group"
      [attr.aria-invalid]="hasError()"
      [attr.aria-required]="required()"
      [attr.aria-describedby]="describedBy()"
      role="radiogroup"
      [attr.aria-label]="label()"
    >
      <pe-form-field-label
        [label]="label()"
        [required]="required()"
        [for]="ids.controlId"
        size="md"
      />
      <div class="pe-radio-group__radios" [id]="ids.controlId">
        @for (opt of options(); track opt.value) {
          <pe-radio
            [name]="name()"
            [value]="opt.value"
            [checked]="value() === opt.value"
            [disabled]="disabled()"
            (selected)="value.set(opt.value)"
          >
            {{ opt.label }}
          </pe-radio>
        }
      </div>
      <pe-form-field-helper
        [id]="ids.helperId"
        [helperText]="helperText()"
        [errorText]="errorText() || (hasError() && errors().length ? (errors()[0].message ?? null) : null)"
        [error]="hasError()"
      />
    </div>
  `,
  styleUrls: ['./radio-group.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioGroupComponent implements FormValueControl<string | null> {
  readonly name = input.required<string>();
  readonly options = input<RadioGroupOption[]>([]);
  readonly label = input<string | null>(null);
  readonly helperText = input<string | null>(null);
  readonly errorText = input<string | null>(null);
  readonly error = input<boolean>(false);
  readonly disabled = input<boolean>(false);
  readonly required = input<boolean>(false);
  readonly invalid = input<boolean>(false);
  readonly errors = input<readonly WithOptionalField<ValidationError>[]>([]);

  readonly value = model<string | null>(null);

  protected readonly ids = createFormFieldIds('pe-radio-group');
  protected readonly hasError = computed(() => this.error() || this.invalid());
  protected readonly describedBy = computed(() =>
    getFormFieldDescribedBy(
      this.ids.helperId,
      this.ids.errorId,
      !!this.helperText(),
      this.hasError(),
      !!this.errorText() || this.errors().length > 0
    )
  );
}
