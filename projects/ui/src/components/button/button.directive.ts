import { computed, Directive, input } from '@angular/core';

import { CSS_PREFIX } from '../../config';
import type { UiSize, UiTheme } from '../shared/ui-types';

/**
 * Directive that applies styling and behavior to button elements.
 * @example
 * <button udsButton size="md" theme="fill-purple">Click me</button>
 */
@Directive({
  selector: '[peButton]',
  standalone: true,
  host: {
    '[attr.role]': '"button"',
    '[class]': 'allClasses()',
  },
})
export class ButtonDirective {
  private readonly baseClass = `${CSS_PREFIX}btn`;

  /** The size variant of the button */
  size = input<UiSize>('md');

  /** The theme variant of the button */
  theme = input<UiTheme>('fill-purple');

  /** Whether the button only contains an icon */
  iconOnly = input<boolean>(false);

  /** Whether the content should be stacked vertically */
  vertical = input<boolean>(false);

  /** Computed property for vertical state */
  protected shouldBeVertical = computed(() => this.vertical() && this.size() === 'lg');

  /** All computed classes based on current state */
  protected allClasses = computed(() => {
    const classes = [this.baseClass]; // Base class
    classes.push(`${this.baseClass}--${this.size()}`); // Size variant
    classes.push(`${this.baseClass}--${this.theme()}`); // Theme variant
    if (this.iconOnly()) {
      classes.push(`${this.baseClass}--icon-only`); // Icon only state
    }
    if (this.shouldBeVertical()) {
      classes.push(`${this.baseClass}--vertical`);
    }
    return classes;
  });
}
