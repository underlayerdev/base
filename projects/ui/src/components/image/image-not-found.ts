import { Directive, input, signal } from '@angular/core';
/**
 * Directive to handle image loading errors and display placeholders
 */
@Directive({
  selector: '[peCatchImageNotFound]',
  host: {
    '(load)': 'handleLoad()',
    '(error)': 'handleError()',
    '[class.pe-image--not-found]': 'imageNotFound()',
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
