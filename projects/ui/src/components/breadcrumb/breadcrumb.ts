import { ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';

import { IconComponent } from '../icon/icon';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  routerLink?: string | any[];
  icon?: string;
}

export type BreadcrumbSeparator = 'chevron_right' | 'slash' | 'dot';

/**
 * Breadcrumb component for displaying navigation hierarchy.
 * Supports responsive collapsing on mobile devices and customizable separators.
 *
 * @example
 * ```html
 * <pe-breadcrumb
 *   [items]="[
 *     { label: 'Home', href: '/' },
 *     { label: 'Products', href: '/products' },
 *     { label: 'Current Page' }
 *   ]"
 * />
 * ```
 */
@Component({
  selector: 'pe-breadcrumb',
  standalone: true,
  imports: [IconComponent, RouterLink],
  templateUrl: './breadcrumb.html',
  styleUrls: ['./breadcrumb.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BreadcrumbComponent {
  /** Array of breadcrumb items to display */
  items = input.required<BreadcrumbItem[]>();

  /** Separator type between breadcrumb items */
  separator = input<BreadcrumbSeparator>('chevron_right');

  /** Maximum number of items to show before collapsing (for responsive behavior) */
  maxItems = input<number | undefined>(undefined);

  /** Check if an item is the last item */
  isLastItem(index: number): boolean {
    return index === this.items().length - 1;
  }

  /** Check if an item should be shown on mobile (first, last, or within maxItems) */
  shouldShowOnMobile(index: number): boolean {
    const items = this.items();
    const max = this.maxItems();
    if (!max || items.length <= max) return true;
    if (index === 0) return true; // Always show first
    if (index >= items.length - 2) return true; // Always show last 2
    return false;
  }

  /** Check if ellipsis should be shown on mobile */
  shouldShowEllipsisOnMobile(): boolean {
    const items = this.items();
    const max = this.maxItems();
    if (!max || items.length <= max) return false;
    return items.length > max + 1; // Show ellipsis if we're hiding items
  }
}
