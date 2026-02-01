import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  HostListener,
  ViewEncapsulation,
  input,
  signal,
} from '@angular/core';

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

@Component({
  selector: 'pe-tooltip',
  standalone: true,
  templateUrl: './tooltip.html',
  styleUrl: './tooltip.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TooltipComponent {
  text = input<string>('');
  position = input<TooltipPosition>('top');
  disabled = input<boolean>(false);
  showDelay = input<number>(150);
  hideDelay = input<number>(100);

  private readonly visible = signal<boolean>(false);
  private showTimeoutId: number | null = null;
  private hideTimeoutId: number | null = null;

  readonly tooltipId = `pe-tooltip-${Math.random().toString(36).slice(2, 11)}`;

  @HostBinding('attr.aria-describedby')
  get ariaDescribedBy(): string | null {
    return this.visible() && !!this.text() ? this.tooltipId : null;
  }

  @HostListener('mouseenter')
  @HostListener('focusin')
  handlePointerEnter(): void {
    if (this.disabled() || !this.text()) return;
    this.scheduleShow();
  }

  @HostListener('mouseleave')
  @HostListener('focusout')
  handlePointerLeave(): void {
    this.scheduleHide();
  }

  readonly isVisible = this.visible.asReadonly();

  private scheduleShow(): void {
    this.cancelHide();
    if (this.visible()) return;

    const delay = this.showDelay();
    if (delay <= 0) {
      this.visible.set(true);
      return;
    }

    this.showTimeoutId = window.setTimeout(() => {
      this.visible.set(true);
    }, delay);
  }

  private scheduleHide(): void {
    this.cancelShow();
    if (!this.visible()) return;

    const delay = this.hideDelay();
    if (delay <= 0) {
      this.visible.set(false);
      return;
    }

    this.hideTimeoutId = window.setTimeout(() => {
      this.visible.set(false);
    }, delay);
  }

  private cancelShow(): void {
    if (this.showTimeoutId !== null) {
      window.clearTimeout(this.showTimeoutId);
      this.showTimeoutId = null;
    }
  }

  private cancelHide(): void {
    if (this.hideTimeoutId !== null) {
      window.clearTimeout(this.hideTimeoutId);
      this.hideTimeoutId = null;
    }
  }
}

