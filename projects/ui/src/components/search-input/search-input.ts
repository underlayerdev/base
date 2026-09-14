import { BreakpointObserver } from '@angular/cdk/layout';
import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  computed,
  inject,
  input,
  model,
  output,
  TemplateRef,
  viewChild,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import type {
  FormValueControl,
  ValidationError,
  WithOptionalFieldTree,
} from '@angular/forms/signals';
import { map } from 'rxjs';

import { ButtonComponent } from '../button/button';
import { IconComponent, IconName } from '../icon/icon';
import { InputComponent } from '../input/input';
import { ListItemComponent } from '../list-item/list-item';
import { ModalComponent } from '../modal/modal';
import { comboboxActiveDescendantId, comboboxOptionId, ComboboxState } from '../shared/combobox';
import {
  createFormFieldIds,
  FormFieldHelperComponent,
  FormFieldLabelComponent,
  getFormFieldDescribedBy,
} from '../shared/form-field';
import type { UiSize } from '../shared/ui-types';

export interface SearchSuggestion {
  value: string;
  label: string;
  icon?: IconName;
}

/**
 * Free-text search box with a results panel: `suggestions` (e.g. recent
 * searches) while the query is empty, swapped for `results` as soon as the
 * user types. On desktop the panel is an anchored dropdown below the field.
 * Below the phone breakpoint, tapping the field opens a full-screen `ul-modal`
 * (via `fullScreenInMobile`) instead — the same pattern as X/Twitter, Google,
 * etc.: a back button and the real field pinned to the top, results filling
 * the rest of the screen edge to edge, no card, no backdrop. `ul-modal`
 * supplies the focus trap, dialog role, and Escape-to-close; this component
 * just projects its own header/results as the modal's body content.
 * Consumers never branch on viewport or manage this themselves.
 *
 * Implements FormValueControl for Signal Forms. Use `[(value)]` for two-way
 * binding.
 */
@Component({
  selector: 'ul-search-input',
  imports: [
    NgTemplateOutlet,
    InputComponent,
    IconComponent,
    ButtonComponent,
    ListItemComponent,
    ModalComponent,
    FormFieldLabelComponent,
    FormFieldHelperComponent,
  ],
  templateUrl: './search-input.html',
  styleUrls: ['./search-input.scss'],
})
export class SearchInputComponent implements FormValueControl<string> {
  readonly size = input<UiSize>('md');
  readonly label = input<string | null>(null);
  readonly helperText = input<string | null>(null);
  readonly errorText = input<string | null>(null);
  readonly error = input<boolean>(false);
  readonly disabled = input<boolean>(false);
  readonly placeholder = input<string>('Search...');
  /** Aria-label for the back button shown in the mobile takeover. */
  readonly backLabel = input<string>('Back');
  /** Aria-label for the clear button shown in the mobile takeover when query is not empty. */
  readonly clearLabel = input<string>('Clear');
  /** Shown while the query is empty — e.g. recent searches. Replaced by `results` as soon as the user types. The consumer owns the data/persistence; this component only renders and reports selection. */
  readonly suggestions = input<SearchSuggestion[]>([]);
  /** Heading shown above `suggestions`, e.g. "Recent searches". Not shown once `results` takes over. */
  readonly suggestionsLabel = input<string | null>(null);
  /** Shown once the query is non-empty — e.g. live search results. The consumer computes/fetches these as `value` changes (via `[(value)]`/`valueChange`). */
  readonly results = input<SearchSuggestion[]>([]);
  /**
   * When set, always projects this arbitrary content (e.g. rich cards with
   * images/prices) into the panel instead of the built-in plain-text rows —
   * for both `suggestions` (query empty) and `results` (query non-empty).
   * The consumer's own template is responsible for varying its content by
   * query if it needs to. Arrow-key/Enter option-highlighting is skipped
   * while this is set — Enter always falls through to `searchSubmit` since
   * the projected content owns its own selection interaction.
   */
  readonly resultsTemplate = input<TemplateRef<unknown> | null>(null);

  readonly invalid = input<boolean>(false);
  readonly errors = input<readonly WithOptionalFieldTree<ValidationError>[]>([]);

  readonly value = model<string>('');

  /** Emitted when the user picks a suggestion, by click or keyboard. */
  readonly suggestionSelected = output<SearchSuggestion>();
  /** Emitted on Enter when no suggestion is highlighted — the free-typed query. */
  readonly searchSubmit = output<string>();

  protected readonly ids = createFormFieldIds('ul-search-input');
  /** Open/focus/highlight state and arrow-key/Escape mechanics shared with ul-search-select. */
  protected readonly combobox = new ComboboxState();

  private readonly mobileInput = viewChild<InputComponent>('mobileInput');

  /** Phone-sized viewport — below this, tapping the field opens the full-screen takeover instead of the anchored dropdown. */
  protected readonly isMobile = toSignal(
    inject(BreakpointObserver)
      .observe('(max-width: 767px)')
      .pipe(map((state) => state.matches)),
    { initialValue: false },
  );

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

  /** Whether the query is non-empty — `results` replaces `suggestions` (and its heading) once true. */
  protected readonly hasQuery = computed(() => this.value().trim().length > 0);
  protected readonly activeList = computed(() =>
    this.hasQuery() ? this.results() : this.suggestions(),
  );
  protected readonly activeListLabel = computed(() =>
    this.hasQuery() ? null : this.suggestionsLabel(),
  );

  protected readonly hasCustomResults = computed(() => !!this.resultsTemplate());

  protected readonly shouldShowPanel = computed(
    () => this.combobox.isOpen() && (this.activeList().length > 0 || this.hasCustomResults()),
  );

  protected readonly optionId = (index: number) => comboboxOptionId(this.ids.controlId, index);

  protected readonly activeDescendantId = computed(() => {
    if (!this.shouldShowPanel() || this.hasCustomResults()) return undefined;
    return comboboxActiveDescendantId(
      this.ids.controlId,
      this.activeList().length,
      this.combobox.highlightedIndex(),
    );
  });

  onValueChange(text: string): void {
    this.value.set(text);
    this.combobox.isOpen.set(true);
    this.combobox.resetHighlight();
  }

  onInputFocus(): void {
    this.combobox.open();
  }

  onInputBlur(): void {
    this.combobox.scheduleClose();
  }

  /** The visible field on mobile is a read-only trigger — typing happens in the takeover's own field, focused once it renders. */
  openMobileSearch(): void {
    this.combobox.isOpen.set(true);
    setTimeout(() => this.mobileInput()?.focus());
  }

  closeMobileSearch(): void {
    this.combobox.close();
  }

  clearInput(): void {
    this.onValueChange('');
  }

  onKeydown(event: KeyboardEvent): void {
    const list = this.activeList();
    const panelActive = this.shouldShowPanel() && list.length > 0;
    if (panelActive && this.combobox.handleNavigationKey(event, list.length)) return;
    if (event.key === 'Enter') {
      event.preventDefault();
      if (panelActive) {
        this.selectSuggestion(list[this.combobox.highlightedIndex()]);
      } else {
        this.submitSearch();
      }
    }
  }

  selectSuggestion(suggestion: SearchSuggestion): void {
    this.combobox.close();
    this.value.set(suggestion.label);
    this.suggestionSelected.emit(suggestion);
  }

  private submitSearch(): void {
    this.combobox.close();
    this.searchSubmit.emit(this.value());
  }
}
