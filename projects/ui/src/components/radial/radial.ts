import { booleanAttribute, ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

type RadialSize = 96 | 64 | 48 | 32 | 24 | 20 | 16;

const lineWidths = {
  96: 6,
  64: 6,
  48: 5,
  32: 4,
  24: 4,
  20: 3,
  16: 3,
};

@Component({
  selector: 'pe-radial',
  standalone: true,
  templateUrl: './radial.html',
  styleUrl: './radial.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadialComponent {
  // size of the radial component in px
  readonly size = input<RadialSize>(96);
  // if true, the radial will rotate indefinitely
  readonly infinite = input<boolean, boolean>(false, {
    transform: booleanAttribute,
  });
  // percentage of the radial that is filled
  readonly percentage = input<number>(0);

  // optional accessible label for the radial
  readonly ariaLabel = input<string | null>(null);

  readonly lineWidth = computed(() => lineWidths[this.size()]);
}
