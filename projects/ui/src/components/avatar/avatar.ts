import { ChangeDetectionStrategy, Component, computed, effect, input, signal, ViewEncapsulation } from '@angular/core';

import { IconComponent, IconName } from '../icon/icon';
import { SkeletonComponent } from '../skeleton/skeleton';
import type { UiSize } from '../shared/ui-types';
type IconSize = '5' | '6' | '7' | '8';
/**
 * A reusable avatar component that displays user images, initials, or icons.
 * Supports multiple sizes and fallback options when an image is not available.
 * @example
 * <pe-avatar size="md" [src]="userImageUrl" [initials]="'JD'" />
 */
@Component({
  selector: 'pe-avatar',
  standalone: true,
  imports: [IconComponent, SkeletonComponent],
  template: `
    <pe-skeleton class="pe-avatar pe-avatar--{{ size() }}" [show]="loading()" variant="rect" borderRadius="full">
      <div class="pe-avatar pe-avatar--{{ size() }}">
        @if (src() && !imageError()) {
          <img
            [src]="src()"
            [alt]="alt()"
            (error)="handleImageError()"
            class="pe-avatar__image"
          />
        } @else if (initials()) {
          <span class="pe-avatar__initials">{{ initials() }}</span>
        } @else if (icon()) {
          <pe-icon [icon]="icon()!" [size]="iconSize()" />
        }
      </div>
    </pe-skeleton>
  `,
  styleUrls: ['./avatar.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class AvatarComponent {
  /** The size of the avatar */
  size = input<UiSize>('md');

  /** The image source URL */
  src = input<string | undefined>(undefined);

  /** Fallback initials to display when image is not available */
  initials = input<string | undefined>(undefined);

  /** Fallback icon to display when image and initials are not available */
  icon = input<IconName | undefined>(undefined);

  /** Alt text for the avatar image */
  alt = input<string>('');

  /** Show a skeleton placeholder instead of content while loading. */
  loading = input<boolean>(false);

  /** Internal signal to track image loading errors */
  protected readonly imageError = signal(false);

  /** Computed icon size based on avatar size */
  readonly iconSize = computed<IconSize>(() => {
    const sizeMap: Record<UiSize, IconSize> = {
      sm: '5',
      md: '6',
      lg: '7',
      xl: '8',
    };
    return sizeMap[this.size()];
  });

  constructor() {
    // Reset image error when src changes
    effect(() => {
      this.src();
      this.imageError.set(false);
    });
  }

  /** Handles image loading errors */
  protected handleImageError(): void {
    this.imageError.set(true);
  }
}
