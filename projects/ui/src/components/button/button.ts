import { ChangeDetectionStrategy, Component, input, output, ViewEncapsulation } from '@angular/core';

import { ButtonDirective } from './button.directive';
import type { UiSize, UiTheme } from '../shared/ui-types';

/**
 * A reusable button component that supports various themes, sizes, and states.
 * @example
 * <uds-button size="md" theme="fill-purple">Click me</uds-button>
 */
@Component({
  selector: 'pe-button',
  standalone: true,
  imports: [ButtonDirective],
  template: `
    <button
      peButton
      [attr.type]="type()"
      [attr.aria-label]="ariaLabel()"
      [attr.aria-disabled]="disabled()"
      [size]="size()"
      [theme]="theme()"
      [iconOnly]="iconOnly()"
      [vertical]="vertical()"
      [disabled]="disabled()"
      (click)="handleClick($event)">
      <ng-content />
    </button>
  `,
  styleUrls: ['./button.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ButtonComponent {
  /** The size of the button */
  size = input<UiSize>('md');

  /** The visual theme of the button */
  theme = input<UiTheme>('fill-purple');

  /** Whether the button only contains an icon */
  iconOnly = input<boolean>(false);

  /** Whether the button content should be stacked vertically (only applies to lg size) */
  vertical = input<boolean>(false);

  /** Whether the button is disabled */
  disabled = input<boolean>(false);

  /** The button type attribute */
  type = input<'button' | 'submit' | 'reset'>('button');

  /** Optional aria-label for accessibility */
  ariaLabel = input<string | undefined>(undefined);

  /** Click event emitter with proper type safety */
  buttonClick = output<MouseEvent>();

  /** Handles the click event and prevents it if button is disabled */
  protected handleClick(event: MouseEvent): void {
    if (this.disabled()) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    this.buttonClick.emit(event);
  }
}
