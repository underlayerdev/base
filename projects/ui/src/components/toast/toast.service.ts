import { Injectable, computed, inject, signal } from '@angular/core';

export type ToastKind = 'info' | 'success' | 'warning' | 'error';

export const toastIcon = (kind: ToastKind) => {
  switch (kind) {
    case 'success':
      return 'check_circle';
    case 'warning':
      return 'alert';
    case 'error':
      return 'cross_circle';
    case 'info':
      return 'info';
  }
};

export interface ToastConfig {
  readonly id: string;
  readonly message: string;
  readonly title?: string;
  readonly kind: ToastKind;
  readonly dismissible: boolean;
  /**
   * Auto-dismiss delay in milliseconds. When null or 0, the toast
   * will stay visible until the user dismisses it explicitly.
   */
  readonly durationMs: number | null;
  readonly showIcon: boolean;
}

export type ToastWithRole = {
  readonly id: string;
  readonly title?: string;
  readonly message: string;
  readonly kind: ToastKind;
  readonly dismissible: boolean;
  readonly role: 'status' | 'alert';
  readonly icon: string;
  readonly showIcon: boolean;
};

type NewToastConfig = Omit<ToastConfig, 'id'>;

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private readonly toastsSignal = signal<ToastConfig[]>([]);

  readonly toasts = computed<ToastWithRole[]>(() =>
    this.toastsSignal().map((toast) => ({
      id: toast.id,
      title: toast.title,
      message: toast.message,
      kind: toast.kind,
      dismissible: toast.dismissible,
      role: toast.kind === 'error' || toast.kind === 'warning' ? 'alert' : 'status',
      icon: toastIcon(toast.kind),
      showIcon: toast.showIcon,
    })),
  );

  show(message: string, config?: Partial<NewToastConfig>): string {
    const id = this.createId();
    const merged: ToastConfig = {
      id,
      message,
      title: config?.title,
      kind: config?.kind ?? 'info',
      dismissible: config?.dismissible ?? true,
      durationMs: config?.durationMs ?? 5000,
      showIcon: config?.showIcon ?? false,
    };

    this.toastsSignal.update((current) => [...current, merged]);

    if (merged.durationMs && merged.durationMs > 0) {
      window.setTimeout(() => {
        this.dismiss(id);
      }, merged.durationMs);
    }

    return id;
  }

  info(message: string, config?: Partial<Omit<NewToastConfig, 'kind'>>): string {
    return this.show(message, { ...config, kind: 'info' });
  }

  success(message: string, config?: Partial<Omit<NewToastConfig, 'kind'>>): string {
    return this.show(message, { ...config, kind: 'success' });
  }

  warning(message: string, config?: Partial<Omit<NewToastConfig, 'kind'>>): string {
    return this.show(message, { ...config, kind: 'warning' });
  }

  error(message: string, config?: Partial<Omit<NewToastConfig, 'kind'>>): string {
    return this.show(message, { ...config, kind: 'error' });
  }

  dismiss(id: string): void {
    this.toastsSignal.update((current) => current.filter((toast) => toast.id !== id));
  }

  clear(): void {
    this.toastsSignal.set([]);
  }

  private createId(): string {
    if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
      // eslint-disable-next-line no-restricted-globals
      return crypto.randomUUID();
    }

    return `pe-toast-${Math.random().toString(36).slice(2, 11)}`;
  }
}

