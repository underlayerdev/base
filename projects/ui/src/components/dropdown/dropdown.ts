import { CdkMenu, CdkMenuItem, CdkMenuTrigger } from '@angular/cdk/menu';
import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
  output,
  signal,
  ViewEncapsulation,
} from '@angular/core';

import { ButtonComponent } from '../button/button';
import { IconComponent, IconName } from '../icon/icon';
import { ListItemComponent, ListItemTheme } from '../list-item/list-item';

/**
 * Represents a single item in the dropdown menu.
 */
export type DropdownItem = {
  /** Display text for the dropdown item */
  label: string;
  /** Optional value associated with the item */
  value?: string;
  /** Icons to display on the left side of the item */
  leftIcons?: IconName[];
  /** Icons to display on the right side of the item */
  rightIcons?: IconName[];
  /** Whether the item is disabled and cannot be selected */
  disabled?: boolean;
};

/**
 * A customizable dropdown component that displays a list of selectable items.
 *
 * Features:
 * - Configurable themes (ghost-white, transparent-white)
 * - Icon support for items and trigger button
 * - Customizable trigger appearance
 * - Disabled item support
 * - Two-way binding for selected item
 *
 * @example
 * ```html
 * <!-- Basic usage -->
 * <uds-dropdown
 *   [items]="dropdownItems"
 *   [theme]="'transparent-white'"
 *   (selectedItemChange)="onItemSelected($event)">
 * </uds-dropdown>
 *
 * <!-- More options menu -->
 * <uds-dropdown
 *   [items]="actionItems"
 *   [onlyMenuTriggerIcon]="'more_options'">
 * </uds-dropdown>
 * ```
 */
@Component({
  selector: 'pe-dropdown',
  standalone: true,
  imports: [CdkMenuTrigger, CdkMenu, CdkMenuItem, NgTemplateOutlet, ListItemComponent, IconComponent, ButtonComponent],
  templateUrl: './dropdown.html',
  styleUrls: ['./dropdown.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownComponent {
  /**
   * The visual theme for the dropdown.
   * @default 'ghost-white'
   */
  theme = input<ListItemTheme>('ghost-white');

  /**
   * Array of items to display in the dropdown menu.
   * @default []
   */
  items = input<DropdownItem[]>([]);

  /**
   * Whether the dropdown is disabled.
   * @default false
   */
  disabled = input<boolean>(false);

  /**
   * Overrides the icons of the selected item in the trigger button.
   * Can override leftIcons, rightIcons, or both.
   * @default {}
   *
   * @example
   * ```typescript
   * menuTriggerIcons = {
   *  chevron_down
   * }
   * ```
   */
  menuTriggerIcons = input<Pick<DropdownItem, 'leftIcons' | 'rightIcons'>>({
    rightIcons: ['chevron_down'],
  });

  /**
   * Shows only a single icon in the trigger button, hiding the selected item's label and icons.
   * Commonly used with 'more_options' for action menus.
   * @default undefined
   *
   * @example
   * ```typescript
   * triggerIconOnly = 'more_options'
   * ```
   */
  triggerIconOnly = input<IconName>();

  /**
   * Accessible label for the icon-only trigger button.
   * @default 'Open menu'
   */
  iconOnlyLabel = input<string>('Open menu');

  /**
   * The index of the currently selected item.
   * Supports two-way binding with [(selectedIndex)].
   * @default 0
   */
  selectedIndex = model<number>(0);

  /**
   * The currently selected item with any trigger icon overrides applied.
   */
  selectedItem = computed(() => {
    const items = this.items();
    const index = this.selectedIndex();
    const fallback: DropdownItem = {
      label: '',
      value: undefined,
      leftIcons: [],
      rightIcons: [],
      disabled: false,
    };
    const item = items[index] ?? items[0] ?? fallback;

    return {
      ...item,
      ...this.menuTriggerIcons(),
    };
  });

  /**
   * Right icons for the trigger: when default is chevron_down, shows chevron_down when closed
   * and chevron_up when open. Otherwise uses selectedItem().rightIcons as-is.
   */
  triggerRightIcons = computed(() => {
    const right = this.selectedItem().rightIcons ?? [];
    const open = this.isOpen();
    if (right.length === 1 && right[0] === 'chevron_down') {
      return open ? (['chevron_up'] as IconName[]) : (['chevron_down'] as IconName[]);
    }
    return right;
  });

  /**
   * Tracks whether the menu is currently open for ARIA.
   */
  isOpen = signal(false);

  /**
   * Stable id used to link the trigger to the menu container.
   */
  readonly menuId = `pe-dropdown-menu-${Math.random().toString(36).slice(2, 11)}`;

  /**
   * Emitted when a new item is selected from the dropdown.
   */
  selectedItemChange = output<DropdownItem>();

  /**
   * Handles the selection of a dropdown item.
   * @param index - The index of the selected item
   */
  handleItemTriggered(index: number) {
    this.selectedIndex.set(index);
    this.selectedItemChange.emit(this.items()[index]);
  }

  onMenuOpened(): void {
    this.isOpen.set(true);
  }

  onMenuClosed(): void {
    this.isOpen.set(false);
  }
}
