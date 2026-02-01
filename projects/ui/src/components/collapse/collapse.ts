import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  ElementRef,
  inject,
  input,
  model,
  signal,
  ViewChild,
} from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { ButtonComponent } from '../button/button';
import { IconComponent } from '../icon/icon';

export type CollapseVariant = 'text' | 'icon';

/**
 * A collapsible content component that supports both text and icon variants.
 * Uses CSS transitions for smooth animations and provides accessibility features.
 *
 * @example
 * ```html
 * <pe-collapse [maxHeight]="300" variant="text">
 *   <div>Collapsible content here</div>
 * </pe-collapse>
 * ```
 */
@Component({
  selector: 'pe-collapse',
  standalone: true,
  imports: [ButtonComponent, IconComponent],
  template: `
    <div [class]="computedClasses()">
      <div class="pe-collapse__content" #content [attr.aria-expanded]="!collapsed()" [attr.aria-hidden]="collapsed()">
        <ng-content />
      </div>
      @if (isCollapsible()) {
        <div class="pe-collapse__toggle">
          <pe-button
            theme="ghost-white"
            [iconOnly]="variant() === 'icon'"
            class="pe-collapse__toggle-button"
            (click)="toggle()"
            (keydown)="onToggleKeydown($event)"
            [attr.aria-label]="collapsed() ? expandLabel() : collapseLabel()">
            @if (variant() === 'text') {
              <span>
                {{ collapsed() ? expandLabel() : collapseLabel() }}
              </span>
            } @else if (variant() === 'icon') {
              <pe-icon size="6" icon="chevron_up" />
            }
          </pe-button>
        </div>
      }
    </div>
  `,
  styleUrls: ['./collapse.scss'],
  host: {
    '[style.--pe-collapse-max-height.px]': 'maxHeight()',
    '[style.--pe-collapse-full-height.px]': 'fullHeight()',
    role: 'region',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollapseComponent implements AfterViewInit {
  private readonly destroyRef = inject(DestroyRef);

  @ViewChild('content') content!: ElementRef<HTMLDivElement>;

  /**
   * The visual variant of the collapse toggle.
   * @default 'text'
   */
  variant = input<CollapseVariant>('text');

  /**
   * Controls the collapsed state of the component.
   * @default true
   */
  collapsed = model<boolean>(true);

  /**
   * Maximum height of the content when collapsed.
   * @default 200
   */
  maxHeight = input.required<number>();

  /**
   * Custom label for the expand action.
   * @default 'See more'
   */
  expandLabel = input<string>('See more');

  /**
   * Custom label for the collapse action.
   * @default 'See less'
   */
  collapseLabel = input<string>('See less');

  /** Current full height of the content */
  fullHeight = signal<number>(0);

  /** Whether the content is collapsible based on its height */
  isCollapsible = computed(() => {
    const max = Math.max(0, this.maxHeight());
    return this.fullHeight() > max;
  });

  ngAfterViewInit() {
    // Initial height calculation
    this.updateFullHeight();

    // Listen for window resize events to recalculate height
    const resizeSubscription = fromEvent(window, 'resize')
      .pipe(debounceTime(100))
      .subscribe(() => this.updateFullHeight());

    this.destroyRef.onDestroy(() => resizeSubscription.unsubscribe());
  }

  /** Updates the full height of the content */
  private updateFullHeight(): void {
    if (this.content?.nativeElement) {
      this.fullHeight.set(this.content.nativeElement.scrollHeight);
    }
  }

  /** Toggles the collapsed state */
  toggle(): void {
    this.collapsed.set(!this.collapsed());
  }

  onToggleKeydown(event: KeyboardEvent): void {
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      this.toggle();
    }
  }

  computedClasses = computed(() => {
    return {
      'pe-collapse': true,
      'pe-collapse--collapsed': this.isCollapsible() && this.collapsed(),
    };
  });
}
