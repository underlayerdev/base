import { Component, computed, input, model } from '@angular/core';
import type {
  FormCheckboxControl,
  ValidationError,
  WithOptionalFieldTree,
} from '@angular/forms/signals';

import {
  createFormFieldIds,
  FormFieldHelperComponent,
  getFormFieldDescribedBy,
} from '../shared/form-field';
import type { UiCheckboxSize } from '../shared/ui-types';

/**
 * On/off switch. Implements FormCheckboxControl for Signal Forms [formField],
 * the switch equivalent of ul-checkbox. Prefer this over ul-checkbox when the
 * change takes effect immediately (e.g. a setting) rather than being
 * submitted later with the rest of a form.
 * Use [(checked)] or [formField]="myForm().notificationsEnabled". No value property.
 */
@Component({
  selector: 'ul-toggle',
  imports: [FormFieldHelperComponent],
  template: `
    <div
      class="ul-toggle ul-toggle--{{ size() }}"
      [class.ul-toggle--error]="hasError()"
      [class.ul-toggle--disabled]="disabled()"
      [attr.aria-invalid]="hasError()"
      [attr.aria-describedby]="describedBy()"
    >
      <label
        class="ul-toggle__row"
        [class.ul-toggle__row--sm]="size() === 'sm'"
        [class.ul-toggle__row--lg]="size() === 'lg'"
        [class.ul-toggle__row--error]="hasError()"
        [attr.for]="ids.controlId"
      >
        <input
          type="checkbox"
          role="switch"
          class="ul-toggle__input"
          [id]="ids.controlId"
          [checked]="checked()"
          [disabled]="disabled()"
          [attr.aria-checked]="checked()"
          [attr.aria-describedby]="describedBy()"
          [attr.aria-invalid]="hasError()"
          (change)="onChange($event)"
          (keydown.enter)="onEnter($event)"
        />
        <span class="ul-toggle__track">
          <span class="ul-toggle__thumb"></span>
        </span>
        <span class="ul-toggle__label">
          @if (label()) {
            {{ label() }}
          }
          <ng-content />
        </span>
      </label>

      <ul-form-field-helper
        [id]="ids.helperId"
        [helperText]="helperText()"
        [errorText]="resolvedErrorText()"
        [error]="hasError()"
      />
    </div>
  `,
  styleUrls: ['./toggle.scss'],
})
export class ToggleComponent implements FormCheckboxControl {
  readonly checked = model<boolean>(false);

  readonly disabled = model<boolean>(false);
  readonly size = input<UiCheckboxSize>('default');
  /** Rendered inline next to the switch (not stacked above it, unlike ul-input/ul-checkbox's form-field label). Use ng-content instead for richer projected content. */
  readonly label = input<string | null>(null);
  readonly helperText = input<string | null>(null);
  readonly error = input<boolean>(false);
  readonly errorText = input<string | null>(null);
  readonly invalid = input<boolean>(false);
  readonly errors = input<readonly WithOptionalFieldTree<ValidationError>[]>([]);

  protected readonly ids = createFormFieldIds('ul-toggle');
  protected readonly hasError = computed(() => this.error() || this.invalid());

  protected readonly resolvedErrorText = computed(
    () =>
      this.errorText() ||
      (this.hasError() && this.errors().length ? (this.errors()[0]?.message ?? null) : null),
  );

  protected readonly describedBy = computed(() =>
    getFormFieldDescribedBy(
      this.ids.helperId,
      this.ids.errorId,
      !!this.helperText(),
      this.hasError(),
      !!this.resolvedErrorText(),
    ),
  );

  onChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.checked.set(input.checked);
  }

  onEnter(event: Event): void {
    if (this.disabled()) return;
    event.preventDefault();
    this.checked.set(!this.checked());
  }
}
