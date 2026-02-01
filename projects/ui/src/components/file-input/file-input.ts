import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  input,
  model,
  output,
  signal,
  viewChild,
} from '@angular/core';
import type { FormValueControl, ValidationError, WithOptionalField } from '@angular/forms/signals';

import {
  createFormFieldIds,
  FormFieldHelperComponent,
  FormFieldLabelComponent,
  getFormFieldDescribedBy,
} from '../shared/form-field';
import type { UiSize } from '../shared/ui-types';

/** Border and hover style: border-only (hover = border only), subtle-tint (hover = border + 5% fill). */
export type FileInputAppearance = 'border-only' | 'subtle-tint';

/**
 * File input component with label, helper/error text, and optional slots.
 * Implements FormValueControl<FileList | null> for use with Signal Forms [formField].
 *
 * Uses hidden native file input + visible trigger + selected file label.
 * Content projection: [pe-file-input-left-elements], [pe-file-input-right-elements].
 */
@Component({
  selector: 'pe-file-input',
  standalone: true,
  imports: [FormFieldLabelComponent, FormFieldHelperComponent],
  templateUrl: './file-input.html',
  styleUrls: ['./file-input.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileInputComponent implements FormValueControl<FileList | null> {
  readonly size = input<UiSize>('md');
  readonly appearance = input<FileInputAppearance>('border-only');
  readonly accept = input<string>('');
  readonly multiple = input<boolean>(false);
  readonly disabled = input<boolean>(false);
  readonly required = input<boolean>(false);
  readonly label = input<string | null>(null);
  readonly helperText = input<string | null>(null);
  readonly errorText = input<string | null>(null);
  /** Placeholder when no file is selected (e.g. "Choose file" or "No file chosen"). */
  readonly placeholderText = input<string>('No file chosen');
  readonly controlId = input<string | undefined>();

  readonly invalid = input<boolean>(false);
  readonly errors = input<readonly WithOptionalField<ValidationError>[]>([]);
  readonly touched = model<boolean>(false);
  readonly error = input<boolean>(false);

  readonly value = model<FileList | null>(null);

  protected readonly fileInputRef = viewChild<ElementRef<HTMLInputElement>>('fileInput');

  protected readonly ids = createFormFieldIds('pe-file-input');
  protected readonly effectiveControlId = computed(() => this.controlId() ?? this.ids.controlId);
  protected readonly effectiveHelperId = computed(() =>
    this.controlId() ? `${this.controlId()}-helper` : this.ids.helperId
  );
  protected readonly effectiveErrorId = computed(() =>
    this.controlId() ? `${this.controlId()}-error` : this.ids.errorId
  );
  protected readonly isFocused = signal(false);
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

  /** Display text for selected file(s). */
  protected readonly selectedLabel = computed(() => {
    const files = this.value();
    if (!files?.length) return this.placeholderText();
    if (files.length === 1) return files[0].name;
    return `${files.length} files selected`;
  });

  readonly inputBlur = output<FocusEvent>();
  readonly inputFocus = output<FocusEvent>();
  readonly valueChange = output<FileList | null>();

  constructor() {
    effect(() => {
      const current = this.value();
      if (current !== undefined) {
        this.valueChange.emit(current);
      }
    });
    effect(() => {
      if (this.value() === null) {
        const el = this.fileInputRef()?.nativeElement;
        if (el) el.value = '';
      }
    });
  }

  onFileChange(event: Event): void {
    const inputEl = event.target as HTMLInputElement;
    const fileList = inputEl.files;
    const next = fileList && fileList.length > 0 ? fileList : null;
    this.value.set(next);
    this.valueChange.emit(next);
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

  triggerClick(): void {
    if (this.disabled()) return;
    this.fileInputRef()?.nativeElement?.click();
  }

  focus(): void {
    const el = document.getElementById(this.effectiveControlId());
    if (el instanceof HTMLInputElement) el.focus();
  }
}
