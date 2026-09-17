import { Component, computed, effect, input, signal, ViewEncapsulation } from '@angular/core';

import { IconComponent, IconName } from '../icon/icon';
import { SkeletonComponent } from '../skeleton/skeleton';
import type { UiSize } from '../shared/ui-types';
type IconSize = '5' | '6' | '7' | '8' | '16';

/**
 * Avatar-only size scale: the shared UiSize sizes, plus a larger '2xl' for
 * contexts where the avatar itself is the focal point (e.g. an onboarding
 * photo step) rather than one control among many. Deliberately not folded
 * into UiSize — a giant size doesn't make sense on a button or input.
 */
export type AvatarSize = UiSize | '2xl';

/**
 * A reusable avatar component that displays user images, initials, or icons.
 * Supports multiple sizes and fallback options when an image is not available.
 * @example
 * <ul-avatar size="md" [src]="userImageUrl" [initials]="'JD'" />
 */
@Component({
  selector: 'ul-avatar',
  imports: [IconComponent, SkeletonComponent],
  template: `
    <ul-skeleton
      class="ul-avatar ul-avatar--{{ size() }}"
      [show]="loading()"
      variant="rect"
      borderRadius="full"
    >
      <div class="ul-avatar ul-avatar--{{ size() }}">
        @if (hasPhoto()) {
          <img [src]="src()" [alt]="alt()" (error)="handleImageError()" class="ul-avatar__image" />
        } @else if (initials()) {
          <span class="ul-avatar__initials">{{ initials() }}</span>
        } @else if (icon()) {
          <ul-icon [icon]="icon()!" [size]="iconSize()" />
        } @else if (editable()) {
          <ul-icon icon="user" [size]="iconSize()" />
        }

        @if (editable()) {
          <div class="ul-avatar__edit-overlay" aria-hidden="true">
            <ul-icon icon="photo" [size]="iconSize()" />
          </div>
        }
      </div>
    </ul-skeleton>
  `,
  styleUrls: ['./avatar.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AvatarComponent {
  /** The size of the avatar */
  size = input<AvatarSize>('md');

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

  /**
   * Marks this avatar as a photo picker: when there's no photo to show, a
   * default person icon fills in for initials/icon, and a dimmed overlay
   * with a photo icon is layered on top to signal it's clickable — shown
   * even once a photo is set, so the user can tell they can still change
   * it, not just add one the first time. Purely visual — wrap the avatar
   * in your own button/link to actually handle the click.
   */
  editable = input<boolean>(false);

  /** Internal signal to track image loading errors */
  protected readonly imageError = signal(false);

  protected readonly hasPhoto = computed(() => !!this.src() && !this.imageError());

  /** Computed icon size based on avatar size */
  readonly iconSize = computed<IconSize>(() => {
    const sizeMap: Record<AvatarSize, IconSize> = {
      sm: '5',
      md: '6',
      lg: '7',
      xl: '8',
      '2xl': '16',
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
