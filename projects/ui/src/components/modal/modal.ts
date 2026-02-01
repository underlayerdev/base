import { CdkTrapFocus } from '@angular/cdk/a11y';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  HostListener,
  input,
  model,
  output,
  ViewEncapsulation,
} from '@angular/core';

import { ButtonComponent } from '../button/button';
import { IconComponent } from '../icon/icon';

export type ModalVariant =
  | 'default'
  | 'success'
  | 'error'
  | 'custom'
  | 'bottom-sheet'
  | 'confirmation';

@Component({
  selector: 'pe-modal',
  standalone: true,
  imports: [CdkTrapFocus, ButtonComponent, IconComponent],
  templateUrl: './modal.html',
  styleUrls: ['./modal.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[attr.aria-hidden]': '!open()',
  },
})
export class ModalComponent {
  /** Whether the modal is open. Supports two-way binding with [(open)]. */
  open = model<boolean>(false);

  /** Visual variant: default, success, error, custom, or bottom-sheet (mobile-only layout). */
  variant = input<ModalVariant>('default');

  /** Optional title shown in the header. */
  title = input<string | undefined>(undefined);

  /** Whether clicking the backdrop closes the modal. */
  closeOnBackdropClick = input<boolean>(true);

  /** Whether to show the close button in the header. */
  showCloseButton = input<boolean>(true);

  /** Label for the primary confirm action in the confirmation variant. */
  confirmLabel = input<string>('Confirm');

  /** Label for the secondary cancel action in the confirmation variant. */
  cancelLabel = input<string>('Cancel');

  /** Optional CSS class for the panel (e.g. for custom variant). */
  customClass = input<string | undefined>(undefined);

  /** Emitted when the modal is closed (button, backdrop, or escape). */
  closed = output<void>();

  /** Emitted when the user confirms in the confirmation variant. */
  confirmed = output<void>();

  /** Emitted when the user cancels in the confirmation variant. */
  cancelled = output<void>();

  readonly panelClass = computed(() => {
    const variant = this.variant();
    const custom = this.customClass();
    const classes = ['pe-modal__panel', `pe-modal__panel--${variant}`];
    if (custom) {
      classes.push(custom);
    }
    return classes.join(' ');
  });

  readonly isConfirmation = computed(() => this.variant() === 'confirmation');
  readonly isSuccess = computed(() => this.variant() === 'success');
  readonly isError = computed(() => this.variant() === 'error');

  modalTitle = computed(() => 
    (this.isSuccess() || this.isError()) ? '' : this.title()
  );

  readonly titleId = `pe-modal-title-${Math.random().toString(36).slice(2, 11)}`;
  readonly bodyId = `pe-modal-body-${Math.random().toString(36).slice(2, 11)}`;

  close(): void {
    this.open.set(false);
    this.closed.emit();
  }

  onConfirm(): void {
    if (!this.isConfirmation()) {
      return;
    }
    this.confirmed.emit();
    this.close();
  }

  onCancel(): void {
    if (!this.isConfirmation()) {
      return;
    }
    this.cancelled.emit();
    this.close();
  }

  onBackdropClick(event: MouseEvent): void {
    if (this.closeOnBackdropClick() && event.target === event.currentTarget) {
      this.close();
    }
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.open()) {
      this.close();
    }
  }
}
