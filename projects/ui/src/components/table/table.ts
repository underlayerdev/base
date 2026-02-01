import { ChangeDetectionStrategy, Component, computed, input, model, output, signal } from '@angular/core';

import { IconComponent } from '../icon/icon';
import { InputComponent } from '../input/input';
import { SkeletonComponent } from '../skeleton/skeleton';

export interface TableColumn {
  id: string;
  label: string;
  sortable?: boolean;
  filterable?: boolean;
}

export type SortDirection = 'asc' | 'desc';

/**
 * Table component for tabular data with optional sort (per-column) and global filter.
 * Uses semantic table markup; responsive with horizontal scroll on small viewports.
 */
@Component({
  selector: 'pe-table',
  standalone: true,
  imports: [InputComponent, IconComponent, SkeletonComponent],
  templateUrl: './table.html',
  styleUrls: ['./table.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent {
  readonly columns = input<TableColumn[]>([]);
  readonly data = input<Record<string, unknown>[]>([]);
  readonly sortColumn = model<string | null>(null);
  readonly sortDirection = model<SortDirection>('asc');
  readonly filterPlaceholder = input<string>('Filter...');
  readonly filterLabel = input<string>('Filter');
  readonly showGlobalFilter = input<boolean>(false);
  readonly emptyMessage = input<string>('No data');

  readonly loading = input<boolean>(false);

  readonly sortColumnChange = output<{ column: string | null; direction: SortDirection }>();
  readonly filterChange = output<string>();

  protected readonly filterQuery = signal('');

  protected readonly hasSortableColumn = computed(() =>
    this.columns().some((col) => col.sortable === true)
  );

  protected readonly filteredData = computed(() => {
    const rows = this.data();
    const query = this.filterQuery().trim().toLowerCase();
    const cols = this.columns();
    if (!query) return rows;
    return rows.filter((row) => {
      return cols.some((col) => {
        const val = this.getCellValue(row, col.id);
        return String(val).toLowerCase().includes(query);
      });
    });
  });

  protected readonly sortedData = computed(() => {
    const rows = this.filteredData();
    const colId = this.sortColumn();
    const dir = this.sortDirection();
    if (!colId) return rows;
    return [...rows].sort((a, b) => {
      const aVal = this.getCellValue(a, colId);
      const bVal = this.getCellValue(b, colId);
      const aStr = String(aVal ?? '');
      const bStr = String(bVal ?? '');
      const cmp = aStr.localeCompare(bStr, undefined, { numeric: true });
      return dir === 'asc' ? cmp : -cmp;
    });
  });

  protected readonly filterId = `pe-table-filter-${Math.random().toString(36).slice(2, 9)}`;

  getCellValue(row: Record<string, unknown>, columnId: string): unknown {
    return row[columnId];
  }

  onFilterInput(value: string): void {
    this.filterQuery.set(value);
    this.filterChange.emit(value);
  }

  toggleSort(columnId: string): void {
    const col = this.columns().find((c) => c.id === columnId);
    if (!col?.sortable) return;
    const current = this.sortColumn();
    const currentDir = this.sortDirection();
    if (current === columnId) {
      const nextDir: SortDirection = currentDir === 'asc' ? 'desc' : 'asc';
      this.sortDirection.set(nextDir);
      this.sortColumnChange.emit({ column: columnId, direction: nextDir });
      return;
    } else {
      this.sortColumn.set(columnId);
      this.sortDirection.set('asc');
      this.sortColumnChange.emit({ column: columnId, direction: 'asc' });
    }
  }

  getSortAriaSort(columnId: string): 'ascending' | 'descending' | 'none' {
    if (this.sortColumn() !== columnId) return 'none';
    return this.sortDirection() === 'asc' ? 'ascending' : 'descending';
  }
}
