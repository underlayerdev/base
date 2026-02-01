import { ChangeDetectionStrategy, Component, computed, input, ViewEncapsulation } from '@angular/core';

/** Icon size keys from design tokens (iconography.font.size). */
export type IconSize = '4' | '5' | '6' | '7' | '8' | '10' | '12' | '16' | '24' | '32';

/** Icon weight keys from design tokens (iconography.font.weight). */
export type IconWeight = 'medium' | 'bold';

/** Icon name / glyph key from design tokens (content['icon-glyph']). Valid values match token keys. */
export type IconName = string;

// <pe-icon class="pe-icon pe-icon-size-${size} pe-icon-weight-${weight} pe-icon-${icon}" />
@Component({
  selector: 'pe-icon',
  standalone: true,
  template: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': 'hostClasses()'
  }
})
export class IconComponent {
  size = input<IconSize>('8');
  weight = input<IconWeight>('medium');
  icon = input.required<IconName>();

  readonly hostClasses = computed(() => {
    return `pe-icon pe-icon-size-${this.size()} pe-icon-weight-${this.weight()} pe-icon-${this.icon()}`;
  });
}
