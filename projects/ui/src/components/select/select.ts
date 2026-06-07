import { ChangeDetectionStrategy, Component, computed, effect, input, model, ViewEncapsulation } from '@angular/core';
import type { FormValueControl, ValidationError, WithOptionalFieldTree } from '@angular/forms/signals';

import { DropdownComponent, DropdownItem } from '../dropdown/dropdown';
import {
  createFormFieldIds,
  FormFieldHelperComponent,
  FormFieldLabelComponent,
  getFormFieldDescribedBy,
} from '../shared/form-field';
import type { UiSize } from '../shared/ui-types';
import type { ListItemTheme } from '../list-item/list-item';

export interface SelectOption extends DropdownItem {
  /** Required value associated with the option */
  value: string;
}

/**
 * Form-friendly select built on the dropdown. Implements FormValueControl for Signal Forms [formField].
 * Use [(value)] or [formField]="myForm().country".
 *
 * @example
 * <pe-select label="Sort by" [options]="options" [(value)]="selected" />
 */
@Component({
  selector: 'pe-select',
  standalone: true,
  imports: [DropdownComponent, FormFieldLabelComponent, FormFieldHelperComponent],
  templateUrl: './select.html',
  styleUrls: ['./select.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectComponent implements FormValueControl<string | null> {
  readonly size = input<UiSize>('md');
  readonly theme = input<ListItemTheme>('transparent-white');
  readonly label = input<string | null>(null);
  readonly helperText = input<string | null>(null);
  readonly errorText = input<string | null>(null);
  readonly error = input<boolean>(false);
  readonly disabled = input<boolean>(false);
  readonly required = input<boolean>(false);
  readonly placeholder = input<string>('Select an option');
  readonly options = input<SelectOption[]>([]);

  readonly invalid = input<boolean>(false);
  readonly errors = input<readonly WithOptionalFieldTree<ValidationError>[]>([]);

  readonly value = model<string | null>(null);
  protected readonly selectedIndex = model<number>(0);

  protected readonly ids = createFormFieldIds('pe-select');

  protected readonly items = computed<DropdownItem[]>(() => {
    const opts = this.options();
    if (!opts.length) return [];
    return opts.map((option) => ({
      label: option.label ?? option.value,
      value: option.value,
      leftIcons: option.leftIcons,
      rightIcons: option.rightIcons,
      disabled: option.disabled,
    }));
  });

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

  constructor() {
    // Keep selectedIndex in sync when value or options change
    effect(() => {
      const currentValue = this.value();
      const options = this.options();

      if (currentValue == null) {
        this.selectedIndex.set(0);
        return;
      }

      const index = options.findIndex((opt) => opt.value === currentValue);
      this.selectedIndex.set(index >= 0 ? index : 0);
    });
  }

  /** Handles index changes coming from the dropdown */
  protected onSelectedIndexChange(index: number): void {
    const options = this.options();
    const option = options[index];

    this.selectedIndex.set(index);
    this.value.set(option?.value ?? null);
  }
}

