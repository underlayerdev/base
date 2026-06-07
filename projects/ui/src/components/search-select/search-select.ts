import { ChangeDetectionStrategy, Component, computed, input, model, output, signal } from '@angular/core';
import type { FormValueControl, ValidationError, WithOptionalFieldTree } from '@angular/forms/signals';

import { IconComponent } from '../icon/icon';
import { InputComponent } from '../input/input';
import { ListItemComponent } from '../list-item/list-item';
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
  selector: 'pe-search-select',
  standalone: true,
  imports: [
    InputComponent,
    IconComponent,
    ListItemComponent,
    FormFieldLabelComponent,
    FormFieldHelperComponent,
  ],
  templateUrl: './search-select.html',
  styleUrls: ['./search-select.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchSelectComponent implements FormValueControl<string | null> {
  readonly size = input<UiSize>('md');
  readonly label = input<string | null>(null);
  readonly helperText = input<string | null>(null);
  readonly errorText = input<string | null>(null);
  readonly error = input<boolean>(false);
  readonly disabled = input<boolean>(false);
  readonly required = input<boolean>(false);
  readonly placeholder = input<string>('Search...');
  readonly options = input<SearchSelectOption[]>([]);
  readonly minCharsToOpen = input<number>(0);

  readonly invalid = input<boolean>(false);
  readonly errors = input<readonly WithOptionalFieldTree<ValidationError>[]>([]);

  readonly value = model<string | null>(null);

  protected readonly ids = createFormFieldIds('pe-search-select');
  protected readonly query = signal('');
  protected readonly isOpen = signal(false);
  protected readonly isFocused = signal(false);
  protected readonly highlightedIndex = signal(0);
  protected blurCloseTimeout: ReturnType<typeof setTimeout> | null = null;

  protected readonly listId = `${this.ids.controlId}-list`;

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
    if (this.isOpen()) return this.query();
    if (this.value() != null) return this.selectedLabel();
    return this.query();
  });

  protected readonly shouldShowPanel = computed(() => {
    if (!this.isOpen()) return false;
    const min = this.minCharsToOpen();
    return this.query().trim().length >= min;
  });

  protected readonly hasNoResults = computed(() => this.shouldShowPanel() && this.filteredOptions().length === 0);

  protected readonly optionId = (index: number) => `${this.ids.controlId}-option-${index}`;

  protected readonly activeDescendantId = computed(() => {
    const list = this.filteredOptions();
    const idx = this.highlightedIndex();
    if (list.length === 0) return undefined;
    const safeIdx = Math.min(Math.max(0, idx), list.length - 1);
    return this.optionId(safeIdx);
  });

  onInputValueChange(text: string): void {
    this.query.set(text);
    this.isOpen.set(true);
    this.highlightedIndex.set(0);
    if (this.value() != null && text !== this.selectedLabel()) {
      this.value.set(null);
    }
  }

  onInputFocus(): void {
    this.cancelBlurClose();
    this.isFocused.set(true);
    if (this.value() != null) this.query.set(this.selectedLabel());
    this.isOpen.set(true);
    this.highlightedIndex.set(0);
  }

  onInputBlur(): void {
    this.isFocused.set(false);
    this.blurCloseTimeout = setTimeout(() => {
      this.blurCloseTimeout = null;
      this.isOpen.set(false);
      if (this.value() != null) this.query.set(this.selectedLabel());
    }, 150);
  }

  onKeydown(event: KeyboardEvent): void {
    if (!this.shouldShowPanel()) return;
    const list = this.filteredOptions();
    if (list.length === 0) return;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.highlightedIndex.set((this.highlightedIndex() + 1) % list.length);
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.highlightedIndex.set(
          this.highlightedIndex() <= 0 ? list.length - 1 : this.highlightedIndex() - 1
        );
        break;
      case 'Enter':
        event.preventDefault();
        this.selectOption(list[this.highlightedIndex()]);
        break;
      case 'Escape':
        event.preventDefault();
        this.isOpen.set(false);
        break;
      default:
        break;
    }
  }

  selectOption(opt: SearchSelectOption): void {
    this.cancelBlurClose();
    this.value.set(opt.value);
    this.query.set(opt.label);
    this.isOpen.set(false);
  }

  private cancelBlurClose(): void {
    if (this.blurCloseTimeout != null) {
      clearTimeout(this.blurCloseTimeout);
      this.blurCloseTimeout = null;
    }
  }
}
