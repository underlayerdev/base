import {
  Component,
  computed,
  input,
  model,
  output,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import type {
  FormValueControl,
  ValidationError,
  WithOptionalFieldTree,
} from '@angular/forms/signals';

import { IconComponent } from '../icon/icon';
import { InputComponent } from '../input/input';
import { ListItemComponent } from '../list-item/list-item';
import { ModalComponent } from '../modal/modal';
import {
  createFormFieldIds,
  FormFieldHelperComponent,
  FormFieldLabelComponent,
  getFormFieldDescribedBy,
} from '../shared/form-field';
import type { UiSize } from '../shared/ui-types';

export interface CategoryPickerNode {
  id: string;
  parentId: string | null;
  label: string;
  icon?: string;
  isLeaf: boolean;
}

/**
 * Picker for a hierarchical category tree of unbounded depth: a closed field
 * that opens a drill-down + search modal (one level of children at a time,
 * with a breadcrumb trail back to root) and resolves to a single leaf
 * node's id. Implements FormValueControl for Signal Forms [formField]. Use
 * [(value)] for two-way binding.
 *
 * Rows are real buttons (ul-list-item), so Tab/Shift+Tab and Enter/Space
 * already give full keyboard access without extra arrow-key wiring — unlike
 * ul-search-select's single-line combobox overlay, there's no need for
 * ComboboxState here.
 *
 * @example
 * <ul-category-picker label="Category" [nodes]="categoryNodes" [(value)]="categoryId" />
 */
@Component({
  selector: 'ul-category-picker',
  imports: [
    IconComponent,
    InputComponent,
    ListItemComponent,
    ModalComponent,
    FormFieldLabelComponent,
    FormFieldHelperComponent,
  ],
  templateUrl: './category-picker.html',
  styleUrls: ['./category-picker.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CategoryPickerComponent implements FormValueControl<string | null> {
  readonly size = input<UiSize>('md');
  readonly label = input<string | null>(null);
  readonly helperText = input<string | null>(null);
  readonly errorText = input<string | null>(null);
  readonly error = input<boolean>(false);
  readonly disabled = input<boolean>(false);
  readonly required = input<boolean>(false);
  readonly showRequiredIndicator = input<boolean>(true);
  readonly placeholder = input<string>('Select a category');
  readonly searchPlaceholder = input<string>('Search categories');
  readonly modalTitle = input<string>('Select a category');
  readonly rootLabel = input<string>('All categories');
  readonly noResultsText = input<string>('No results');
  readonly nodes = input<CategoryPickerNode[]>([]);

  readonly invalid = input<boolean>(false);
  readonly errors = input<readonly WithOptionalFieldTree<ValidationError>[]>([]);
  /** Emitted when the modal closes, whether or not a value was picked — mirrors ul-select's touch. */
  readonly touch = output<void>();

  readonly value = model<string | null>(null);

  protected readonly ids = createFormFieldIds('ul-category-picker');
  protected readonly open = signal(false);
  protected readonly currentParentId = signal<string | null>(null);
  protected readonly query = signal('');

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

  private readonly nodesById = computed(() => new Map(this.nodes().map((node) => [node.id, node])));

  protected readonly selectedNode = computed(() => {
    const id = this.value();
    return id == null ? null : (this.nodesById().get(id) ?? null);
  });

  protected readonly selectedLabel = computed(() => {
    const node = this.selectedNode();
    return node ? this.ancestorLabels(node.id).join(' › ') : '';
  });

  protected readonly currentChildren = computed(() =>
    this.nodes().filter((node) => node.parentId === this.currentParentId()),
  );

  /** Root→current ancestor chain, for the breadcrumb trail (empty at the root level). */
  protected readonly breadcrumb = computed(() => {
    const parentId = this.currentParentId();
    return parentId == null ? [] : this.ancestorNodes(parentId);
  });

  private readonly normalizedQuery = computed(() => this.query().trim().toLowerCase());
  protected readonly isSearching = computed(() => this.normalizedQuery().length > 0);

  protected readonly searchResults = computed(() => {
    const q = this.normalizedQuery();
    if (!q) return [];
    return this.nodes()
      .filter((node) => node.isLeaf && node.label.toLowerCase().includes(q))
      .map((node) => ({
        node,
        breadcrumb: this.ancestorLabels(node.id).slice(0, -1).join(' › '),
      }));
  });

  protected readonly hasNoResults = computed(
    () => this.isSearching() && this.searchResults().length === 0,
  );

  openPicker(): void {
    if (this.disabled()) return;
    const selected = this.selectedNode();
    this.currentParentId.set(selected ? selected.parentId : null);
    this.query.set('');
    this.open.set(true);
  }

  closePicker(): void {
    this.open.set(false);
    this.touch.emit();
  }

  selectNode(node: CategoryPickerNode): void {
    if (node.isLeaf) {
      this.value.set(node.id);
      this.closePicker();
    } else {
      this.currentParentId.set(node.id);
      this.query.set('');
    }
  }

  goToBreadcrumb(parentId: string | null): void {
    this.currentParentId.set(parentId);
    this.query.set('');
  }

  private ancestorNodes(id: string): CategoryPickerNode[] {
    const chain: CategoryPickerNode[] = [];
    let current = this.nodesById().get(id);
    while (current) {
      chain.unshift(current);
      current = current.parentId == null ? undefined : this.nodesById().get(current.parentId);
    }
    return chain;
  }

  private ancestorLabels(id: string): string[] {
    return this.ancestorNodes(id).map((node) => node.label);
  }
}
