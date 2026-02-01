import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChild,
  effect,
  input,
  model,
  output,
  signal,
} from '@angular/core';
import type { FormValueControl, ValidationError, WithOptionalField } from '@angular/forms/signals';

import {
  createFormFieldIds,
  FormFieldHelperComponent,
  FormFieldLabelComponent,
  getFormFieldDescribedBy,
} from '../shared/form-field';
import type { UiSize } from '../shared/ui-types';

import { TextareaFieldDirective } from './textarea-field.directive';

export type TextareaResize = 'none' | 'vertical' | 'horizontal' | 'both';

/**
 * Reusable textarea. Implements FormValueControl for Signal Forms [formField].
 * Use [(value)] for two-way binding or [formField]="myForm().message".
 *
 * Content projection: [pe-textarea-field] (replaces native textarea), [pe-textarea-left-elements], [pe-textarea-right-elements].
 */
@Component({
  selector: 'pe-textarea',
  standalone: true,
  imports: [FormFieldLabelComponent, FormFieldHelperComponent],
  templateUrl: './textarea.html',
  styleUrls: ['./textarea.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextareaComponent implements FormValueControl<string> {
  readonly size = input<UiSize>('md');
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
  readonly autocomplete = input<string>('off');
  readonly rows = input<number>(3);
  readonly resize = input<TextareaResize>('vertical');

  /** When using [pe-textarea-field], pass focus state so the group border reflects it. */
  readonly groupFocused = input<boolean | null>(null);

  readonly invalid = input<boolean>(false);
  readonly errors = input<readonly WithOptionalField<ValidationError>[]>([]);
  readonly touched = model<boolean>(false);

  readonly value = model<string>('');

  protected readonly customField = contentChild(TextareaFieldDirective);
  protected readonly ids = createFormFieldIds('pe-textarea');
  protected readonly isFocused = signal(false);
  protected readonly isDirty = signal(false);
  protected readonly groupFocusedState = computed(() => this.groupFocused() ?? this.isFocused());

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

  readonly inputBlur = output<FocusEvent>();
  readonly inputFocus = output<FocusEvent>();
  readonly valueChange = output<string>();

  constructor() {
    effect(() => {
      const currentValue = this.value();
      if (this.isDirty()) {
        this.valueChange.emit(currentValue);
      }
    });
  }

  onInput(event: Event): void {
    const value = (event.target as HTMLTextAreaElement).value;
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

  focus(): void {
    if (this.customField()) return;
    const el = document.getElementById(this.ids.controlId) as HTMLTextAreaElement;
    el?.focus();
  }

  select(): void {
    const el = document.getElementById(this.ids.controlId) as HTMLTextAreaElement;
    el?.select();
  }
}
