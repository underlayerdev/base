import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  input,
  model,
  output,
  ViewEncapsulation,
} from '@angular/core';

import { ButtonComponent } from '../button/button';
import { IconComponent, IconName } from '../icon/icon';
import { ListItemComponent, ListItemTheme } from '../list-item/list-item';

export type SidebarItem = {
  label: string;
  value?: string;
  leftIcons?: IconName[];
  rightIcons?: IconName[];
  disabled?: boolean;
};

@Component({
  selector: 'pe-sidebar',
  standalone: true,
  imports: [ButtonComponent, IconComponent, ListItemComponent],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[attr.aria-hidden]': '!open()',
  },
})
export class SidebarComponent {
  items = input<SidebarItem[]>([]);
  theme = input<ListItemTheme>('ghost-white');
  selectedIndex = model<number>(0);
  open = model<boolean>(false);
  closeOnBackdropClick = input<boolean>(true);
  hideItemFocusOutline = input<boolean>(true);

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

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.open()) {
      this.close();
    }
  }
}
