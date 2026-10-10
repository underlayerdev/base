import { Component, input, model, output, ViewEncapsulation } from '@angular/core';

import { ButtonComponent } from '../button/button';
import { IconComponent, IconName } from '../icon/icon';
import { ListItemComponent, ListItemTheme } from '../list-item/list-item';

/** 'bordered' draws a divider on the drawer's right edge; 'borderless' leaves it off. */
export type SidebarAppearance = 'bordered' | 'borderless';

export type SidebarItem = {
  label: string;
  value?: string;
  leftIcons?: IconName[];
  rightIcons?: IconName[];
  disabled?: boolean;
};

@Component({
  selector: 'ul-sidebar',
  imports: [ButtonComponent, IconComponent, ListItemComponent],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    '[attr.aria-hidden]': '!open()',
    '(document:keydown.escape)': 'onEscape()',
  },
})
export class SidebarComponent {
  items = input<SidebarItem[]>([]);
  theme = input<ListItemTheme>('ghost-white');
  selectedIndex = model<number>(0);
  open = model<boolean>(false);
  closeOnBackdropClick = input<boolean>(true);
  hideItemFocusOutline = input<boolean>(true);
  /** Look of the drawer's edge. Use 'borderless' where the sidebar sits beside content that already has its own edge (e.g. a settings page). */
  appearance = input<SidebarAppearance>('bordered');

  itemSelected = output<SidebarItem>();

  close(): void {
    this.open.set(false);
  }

  onOverlayClick(): void {
    if (this.closeOnBackdropClick()) {
      this.close();
    }
  }

  onItemClick(item: SidebarItem, index: number): void {
    if (item.disabled) {
      return;
    }
    this.selectedIndex.set(index);
    this.itemSelected.emit(item);
  }

  onEscape(): void {
    if (this.open()) {
      this.close();
    }
  }
}
