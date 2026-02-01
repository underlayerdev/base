import { ChangeDetectionStrategy, Component, contentChild, input } from '@angular/core';

import { CheckboxComponent } from '../checkbox/checkbox';
import { SkeletonComponent } from '../skeleton/skeleton';

export type ListItemTheme = 'ghost-white' | 'transparent-white' | 'outline-white' | 'outline-purple';

@Component({
  selector: 'pe-list-item',
  standalone: true,
  imports: [SkeletonComponent],
  template: `
    <pe-skeleton [show]="loading()" variant="rect">
      <button
        class="pe-list-item pe-list-item--{{ theme() }}"
        [class.pe-list-item--no-focus-outline]="hideFocusOutline()"
        [class.pe-list-item--selected]="selected() || !!checkbox()?.checked"
        (click)="clickHandler()"
        [disabled]="disabled() || loading()">
        <div class="pe-list-item__before-label">
          <ng-content select="[pe-list-item-before-label]"></ng-content>
        </div>
        <div class="pe-list-item__label">
          <ng-content select="[pe-list-item-label]"></ng-content>
        </div>
        <div class="pe-list-item__after-label">
          <ng-content select="[pe-list-item-after-label]"></ng-content>
        </div>
      </button>
    </pe-skeleton>
  `,
  styleUrls: ['./list-item.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListItemComponent {
  checkbox = contentChild<CheckboxComponent>(CheckboxComponent);

  theme = input<ListItemTheme>('ghost-white');
  disabled = input<boolean>(false);
  hideFocusOutline = input<boolean>(false);
  selected = input<boolean>(false);

  loading = input<boolean>(false);

  clickHandler() {
    if (this.disabled() || this.loading()) {
      return;
    }

    if (!this.disabled()) {
      this.checkbox()?.checked.update((value) => !value);
    }
  }
}
