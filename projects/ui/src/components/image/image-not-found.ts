import { Component, Directive, input, signal } from '@angular/core';
import { IconComponent, IconSize } from '../icon/icon';

/**
 * Directive to handle image loading errors and display placeholders
 */
@Directive({
  selector: '[ulCatchImageNotFound]',
  host: {
    '(load)': 'handleLoad()',
    '(error)': 'handleError()',
    '[class.ul-image--not-found]': 'imageNotFound()',
    '[style.visibility]': 'visibility()',
  },
})
export class ImageNotFoundDirective {
  // Controls whether to show a placeholder when image fails to load
  showPlaceholder = input<boolean>(true);

  // Signal to track if image failed to load
  imageNotFound = signal<boolean>(false);
  // Signal to control alt and icon visibility of broken images.
  visibility = signal<string>('hidden');

  /**
   * Handles image loading errors
   * Hides the image and optionally shows placeholder
   */
  handleError() {
    this.visibility.set('hidden');
    if (this.showPlaceholder()) {
      this.imageNotFound.set(true);
    }
  }

  /**
   * Handles successful image load
   * Shows the image and removes placeholder
   */
  handleLoad() {
    this.imageNotFound.set(false);
    this.visibility.set('visible');
  }
}

/**
 * Standalone placeholder for the case `ulCatchImageNotFound` can't cover: there is
 * no `<img>` to fail in the first place, because the source has no URL at all.
 * Renders the same icon-over-a-grey-box look as the directive's own placeholder —
 * both draw from the design system's `image_dashed` glyph and grey-lvl-1
 * background — so a "no image" listing and a "broken image" listing read
 * identically to a user.
 *
 * Positioned to fill its nearest positioned ancestor, same as the directive's
 * pseudo-element placeholder: the caller supplies a sized, `position: relative`
 * box (a gallery slot, a card's media area) and drops this in.
 */
@Component({
  selector: 'ul-image-not-found',
  template: `<ul-icon icon="image_dashed" [size]="iconSize()" />`,
  imports: [IconComponent],
  styleUrl: './image-not-found.scss',
})
export class ImageNotFoundComponent {
  readonly iconSize = input<IconSize>('12');
}
