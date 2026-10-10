import { Component, computed, input, ViewEncapsulation } from '@angular/core';

/** Icon size keys from design tokens (iconography.font.size). */
export type IconSize = '4' | '5' | '6' | '7' | '8' | '10' | '12' | '16' | '24' | '32';

const DEFAULT_SIZE: IconSize = '8';

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
  /**
   * Glyph size. Left unset it renders at '8' on its own, and a container that
   * sizes its icons (e.g. ul-input) may resize it to fit; set it to keep that
   * exact size even there.
   */
  size = input<IconSize | undefined>(undefined);
  /**
   * Stroke weight of the glyph. Pass `null` to leave it out entirely, so the
   * icon takes the surrounding `font-weight` (e.g. inside bold text) instead
   * of always forcing `medium`.
   */
  weight = input<IconWeight | null>('medium');
  icon = input.required<IconName>();

  readonly hostClasses = computed(() => {
    const size = this.size();
    const sizeClasses = size
      ? `ul-icon-size-${size}`
      : `ul-icon-size-${DEFAULT_SIZE} ul-icon--default-size`;
    const weight = this.weight();
    const weightClass = weight ? ` ul-icon-weight-${weight}` : '';
    return `ul-icon ${sizeClasses}${weightClass} ul-icon-${this.icon()}`;
  });
}
