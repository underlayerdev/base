import { ChangeDetectionStrategy, Component, computed, input, ViewEncapsulation } from '@angular/core';

import { AvatarComponent } from './avatar';
import type { UiSize } from '../shared/ui-types';
import type { IconName } from '../icon/icon';

export interface AvatarData {
  src?: string;
  initials?: string;
  icon?: IconName;
  alt?: string;
}

/**
 * A reusable avatar group component that displays multiple avatars with overflow handling.
 * Supports maximum visible count and shows a "+X" indicator for remaining avatars.
 * @example
 * <pe-avatar-group [avatars]="userAvatars" [maxVisible]="3" size="md" />
 */
@Component({
  selector: 'pe-avatar-group',
  standalone: true,
  imports: [AvatarComponent],
  template: `
    <div class="pe-avatar-group pe-avatar-group--{{this.size()}}"
      [class.pe-avatar-group--stacked]="stacked()"
    >
      @for (avatar of visibleAvatars(); track $index) {
        <pe-avatar
          [size]="size()"
          [src]="avatar.src"
          [initials]="avatar.initials"
          [icon]="avatar.icon"
          [alt]="avatar.alt || ''"
          [class.pe-avatar-group__avatar]="!stacked() && $index > 0"
        />
      }
      @if (remainingCount() > 0) {
        <div class="pe-avatar-group__overflow pe-avatar-group__overflow--{{this.size()}}" 
          [class.pe-avatar-group__overflow-avatar]="!stacked()">
          <span class="pe-avatar-group__overflow-text">+{{ remainingCount() }}</span>
        </div>
      }
    </div>
  `,
  styleUrls: ['./avatar-group.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class AvatarGroupComponent {
  /** Array of avatar data to display */
  avatars = input.required<AvatarData[]>();

  /** The size of all avatars in the group */
  size = input<UiSize>('md');

  /** Maximum number of avatars to display before showing overflow indicator */
  maxVisible = input<number | null>(null);

  /** Whether avatars should overlap (stacked) or have spacing between them */
  stacked = input<boolean>(false);

  /** Computed list of visible avatars */
  readonly visibleAvatars = computed(() => {
    const max = this.maxVisible();
    const avatars = this.avatars();
    return max !== null && max > 0 ? avatars.slice(0, max) : avatars;
  });

  /** Computed count of remaining avatars not shown */
  readonly remainingCount = computed(() => {
    const max = this.maxVisible();
    if (max === null || max <= 0) return 0;
    return Math.max(0, this.avatars().length - max);
  });
}
