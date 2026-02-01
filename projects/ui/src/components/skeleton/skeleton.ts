import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation, computed, input } from '@angular/core';

export type SkeletonVariant = 'rect' | 'text';

export type SkeletonBorderRadius = 'xs' | 'sm' | 'md' | 'lg' | 'full';

@Component({
  selector: 'pe-skeleton',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skeleton.html',
  styleUrls: ['./skeleton.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkeletonComponent {
  readonly variant = input<SkeletonVariant>('rect');
  readonly width = input<string | null>(null);
  readonly height = input<string | null>(null);
  readonly lines = input<number>(3);
  readonly borderRadius = input<SkeletonBorderRadius | null>(null);
  readonly show = input<boolean>(true);

  readonly hostStyles = computed(() => {
    const width = this.width();
    const height = this.height();

    return {
      width: width ?? null,
      height: height ?? null,
    } as const;
  });

  readonly lineWidths = computed(() => {
    const count = Math.max(1, this.lines());
    const widths: string[] = [];

    for (let index = 0; index < count; index += 1) {
      const base = 100;
      const step = 8;
      const value = Math.max(40, base - index * step);
      widths.push(`${value}%`);
    }

    return widths;
  });

  readonly radiusClass = computed(() => {
    const radius = this.borderRadius();
    return radius ? `pe-skeleton--radius-${radius}` : null;
  });

  trackByIndex(index: number): number {
    return index;
  }
}

