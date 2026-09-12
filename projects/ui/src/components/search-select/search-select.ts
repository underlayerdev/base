import { Component, computed, input, model, signal } from '@angular/core';
import type {
  FormValueControl,
  ValidationError,
  WithOptionalFieldTree,
} from '@angular/forms/signals';

import { IconComponent } from '../icon/icon';
import { InputComponent } from '../input/input';
import { ListItemComponent } from '../list-item/list-item';
import { comboboxActiveDescendantId, comboboxOptionId, ComboboxState } from '../shared/combobox';
import {
  createFormFieldIds,
  FormFieldHelperComponent,
  FormFieldLabelComponent,
  getFormFieldDescribedBy,
} from '../shared/form-field';
import type { UiSize } from '../shared/ui-types';

export interface SearchSelectOption {
  label: string;
  value: string;
}

/**
 * Combobox: search input with filterable dropdown. User types to filter options and selects a result.
 * Implements FormValueControl for use with Signal Forms [formField]. Use [(value)] for two-way binding.
 */
@Component({
  selector: 'ul-search-select',
  imports: [
    InputComponent,
    IconComponent,
    ListItemComponent,
    FormFieldLabelComponent,
    FormFieldHelperComponent,
  ],
  templateUrl: './search-select.html',
  styleUrls: ['./search-select.scss'],
})
export class SearchSelectComponent implements FormValueControl<string | null> {
  readonly size = input<UiSize>('md');
  readonly label = input<string | null>(null);
  readonly helperText = input<string | null>(null);
  readonly errorText = input<string | null>(null);
  readonly error = input<boolean>(false);
  readonly disabled = input<boolean>(false);
  readonly required = input<boolean>(false);
  readonly showRequiredIndicator = input<boolean>(true);
  readonly placeholder = input<string>('Search...');
  readonly options = input<SearchSelectOption[]>([]);
  readonly minCharsToOpen = input<number>(0);

  readonly invalid = input<boolean>(false);
  readonly errors = input<readonly WithOptionalFieldTree<ValidationError>[]>([]);

  readonly value = model<string | null>(null);

  protected readonly ids = createFormFieldIds('ul-search-select');
  protected readonly query = signal('');
  /** Open/focus/highlight state and arrow-key/Escape mechanics shared with ul-search-input. */
  protected readonly combobox = new ComboboxState();

  protected readonly listId = `${this.ids.controlId}-list`;

  protected readonly hasError = computed(() => this.error() || this.invalid());

  protected readonly describedBy = computed(() =>
    getFormFieldDescribedBy(
      this.ids.helperId,
      this.ids.errorId,
      !!this.helperText(),
      this.hasError(),
      !!this.errorText() || this.errors().length > 0,
    ),
  );

  protected readonly selectedOption = computed(() => {
    const v = this.value();
    if (v == null) return null;
    return this.options().find((opt) => opt.value === v) ?? null;
  });

  protected readonly selectedLabel = computed(() => this.selectedOption()?.label ?? '');

  protected readonly filteredOptions = computed(() => {
    const q = this.query().trim().toLowerCase();
    const opts = this.options();
    if (!q) return opts;
    return opts.filter((opt) => opt.label.toLowerCase().includes(q));
  });

  protected readonly displayText = computed(() => {
    if (this.combobox.isOpen()) return this.query();
    if (this.value() != null) return this.selectedLabel();
    return this.query();
  });

  protected readonly shouldShowPanel = computed(() => {
    if (!this.combobox.isOpen()) return false;
    const min = this.minCharsToOpen();
    return this.query().trim().length >= min;
  });

  protected readonly hasNoResults = computed(
    () => this.shouldShowPanel() && this.filteredOptions().length === 0,
  );

  protected readonly optionId = (index: number) => comboboxOptionId(this.ids.controlId, index);

  protected readonly activeDescendantId = computed(() =>
    comboboxActiveDescendantId(
      this.ids.controlId,
      this.filteredOptions().length,
      this.combobox.highlightedIndex(),
    ),
  );

  onInputValueChange(text: string): void {
    this.query.set(text);
    this.combobox.isOpen.set(true);
    this.combobox.resetHighlight();
    if (this.value() != null && text !== this.selectedLabel()) {
      this.value.set(null);
    }
  }

  onInputFocus(): void {
    this.combobox.open();
    if (this.value() != null) this.query.set(this.selectedLabel());
    this.combobox.resetHighlight();
  }

  onInputBlur(): void {
    this.combobox.scheduleClose(() => {
      if (this.value() != null) this.query.set(this.selectedLabel());
    });
  }

  onKeydown(event: KeyboardEvent): void {
    if (!this.shouldShowPanel()) return;
    const list = this.filteredOptions();
    if (list.length === 0) return;

    if (this.combobox.handleNavigationKey(event, list.length)) return;
    if (event.key === 'Enter') {
      event.preventDefault();
      this.selectOption(list[this.combobox.highlightedIndex()]);
    }
  }

  selectOption(opt: SearchSelectOption): void {
    this.combobox.close();
    this.value.set(opt.value);
    this.query.set(opt.label);
  }
}
