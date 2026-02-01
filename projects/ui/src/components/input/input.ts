import { ChangeDetectionStrategy, Component, computed, effect, input, model, output, signal } from '@angular/core';
import type { FormValueControl, ValidationError, WithOptionalField } from '@angular/forms/signals';

import {
  createFormFieldIds,
  FormFieldHelperComponent,
  FormFieldLabelComponent,
  getFormFieldDescribedBy,
} from '../shared/form-field';
import type { UiSize } from '../shared/ui-types';

export type InputType = 'text' | 'password' | 'email' | 'number' | 'tel' | 'url';

/** Border and hover style: border-only (hover = border only), subtle-tint (hover = border + 5% fill). */
export type InputAppearance = 'border-only' | 'subtle-tint';

/**
 * A reusable input component that follows UDS design system guidelines.
 * Implements FormValueControl for use with Signal Forms [formField] directive.
 *
 * Use [(value)] for two-way binding, or bind with [formField]="myForm().email" for Signal Forms.
 *
 * Content projection: [pe-input-left-elements], [pe-input-right-elements].
 */
@Component({
  selector: 'pe-input',
  standalone: true,
  imports: [FormFieldLabelComponent, FormFieldHelperComponent],
  templateUrl: './input.html',
  styleUrls: ['./input.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent implements FormValueControl<string> {
  readonly type = input<InputType>('text');
  readonly size = input<UiSize>('md');
  /** Border/hover style: border-only (hover = border only), subtle-tint (hover = border + 5% fill). */
  readonly appearance = input<InputAppearance>('border-only');
  readonly error = input<boolean>(false);
  readonly disabled = input<boolean>(false);
  readonly readOnly = input<boolean>(false);
  readonly required = input<boolean>(false);
  readonly placeholder = input<string>('');
  readonly label = input<string | null>(null);
  readonly helperText = input<string | null>(null);
  readonly errorText = input<string | null>(null);
  readonly maxLength = input<number | undefined>();
  readonly minLength = input<number | undefined>();
  readonly pattern = input<readonly RegExp[]>([]);
  readonly autocomplete = input<string>('off');
  /** When provided (e.g. by a parent form field), the input element uses this id instead of the internal one. */
  readonly controlId = input<string | undefined>();

  /** FormUiControl optional: bound by [formField] when invalid */
  readonly invalid = input<boolean>(false);
  /** FormUiControl optional: bound by [formField] for validation errors */
  readonly errors = input<readonly WithOptionalField<ValidationError>[]>([]);
  /** FormUiControl optional: control sets on blur */
  readonly touched = model<boolean>(false);

  readonly value = model<string>('');

  protected readonly ids = createFormFieldIds('pe-input');
  protected readonly effectiveControlId = computed(() => this.controlId() ?? this.ids.controlId);
  protected readonly effectiveHelperId = computed(() => (this.controlId() ? `${this.controlId()}-helper` : this.ids.helperId));
  protected readonly effectiveErrorId = computed(() => (this.controlId() ? `${this.controlId()}-error` : this.ids.errorId));
  protected readonly isFocused = signal(false);
  protected readonly isDirty = signal(false);

  protected readonly hasError = computed(() => this.error() || this.invalid());

  protected readonly describedBy = computed(() =>
    getFormFieldDescribedBy(
      this.effectiveHelperId(),
      this.effectiveErrorId(),
      !!this.helperText(),
      this.hasError(),
      !!this.errorText() || this.errors().length > 0
    )
  );

  // Outputs
  readonly inputBlur = output<FocusEvent>();
  readonly inputFocus = output<FocusEvent>();
  readonly valueChange = output<string>();

  constructor() {
    // Effect to emit value changes
    effect(() => {
      const currentValue = this.value();
      if (this.isDirty()) {
        this.valueChange.emit(currentValue);
      }
    });
  }

  onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.isDirty.set(true);
    this.value.set(value);
  }

  onBlur(event: FocusEvent): void {
    this.isFocused.set(false);
    this.touched.set(true);
    this.inputBlur.emit(event);
  }

  onFocus(event: FocusEvent): void {
    this.isFocused.set(true);
    this.inputFocus.emit(event);
  }

  /**
   * Programmatically focuses the input element
   */
  focus(): void {
    const inputEl = document.getElementById(this.effectiveControlId()) as HTMLInputElement;
    inputEl?.focus();
  }

  select(): void {
    const inputEl = document.getElementById(this.effectiveControlId()) as HTMLInputElement;
    inputEl?.select();
  }
}
