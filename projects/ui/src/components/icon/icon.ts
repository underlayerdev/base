import { Component, computed, input, ViewEncapsulation } from '@angular/core';

/** Icon size keys from design tokens (iconography.font.size). */
export type IconSize = '4' | '5' | '6' | '7' | '8' | '10' | '12' | '16' | '24' | '32';

/** Icon weight keys from design tokens (iconography.font.weight). */
export type IconWeight = 'medium' | 'bold';

/** Icon name / glyph key from design tokens (content['icon-glyph']). Valid values match token keys. */
export type IconName = string;

// <ul-icon class="ul-icon ul-icon-size-${size} ul-icon-weight-${weight} ul-icon-${icon}" />
// (no ul-icon-weight-* class when weight is null)
@Component({
  selector: 'ul-icon',
  template: ``,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': 'hostClasses()',
  },
})
export class IconComponent {
  size = input<IconSize>('8');
  /**
   * Stroke weight of the glyph. Pass `null` to leave it out entirely, so the
   * icon takes the surrounding `font-weight` (e.g. inside bold text) instead
   * of always forcing `medium`.
   */
  weight = input<IconWeight | null>('medium');
  icon = input.required<IconName>();

  readonly hostClasses = computed(() => {
    const weight = this.weight();
    const weightClass = weight ? ` ul-icon-weight-${weight}` : '';
    return `ul-icon ul-icon-size-${this.size()}${weightClass} ul-icon-${this.icon()}`;
  });
}
