import { CdkMenu, CdkMenuTrigger } from '@angular/cdk/menu';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
  model,
  output,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import type { FormValueControl, ValidationError, WithOptionalFieldTree } from '@angular/forms/signals';

import {
  createFormFieldIds,
  FormFieldHelperComponent,
  FormFieldLabelComponent,
  getFormFieldDescribedBy,
} from '../shared/form-field';
import { ButtonComponent } from '../button/button';
import { IconComponent } from '../icon/icon';
import type { IconSize } from '../icon/icon';
import type { UiSize } from '../shared/ui-types';

export type CalendarMode = 'date' | 'time' | 'datetime';

export interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  isDisabled: boolean;
}

export interface TimeSelection {
  hour: number;
  minute: number;
}

/**
 * Calendar component. Implements FormValueControl&lt;Date | null&gt; for Signal Forms [formField].
 * Use [(value)] or [formField]="myForm().date". Form model field should be Date | null.
 */
@Component({
  selector: 'pe-calendar',
  standalone: true,
  imports: [
    CdkMenuTrigger,
    CdkMenu,
    ButtonComponent,
    IconComponent,
    FormFieldLabelComponent,
    FormFieldHelperComponent,
  ],
  templateUrl: './calendar.html',
  styleUrls: ['./calendar.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class CalendarComponent implements FormValueControl<Date | null> {
  readonly mode = input<CalendarMode>('date');
  readonly value = model<Date | null>(null);
  readonly size = input<UiSize>('md');
  readonly error = input<boolean>(false);
  readonly disabled = input<boolean>(false);
  readonly readOnly = input<boolean>(false);
  readonly required = input<boolean>(false);
  readonly placeholder = input<string>('');
  readonly label = input<string | null>(null);
  readonly helperText = input<string | null>(null);
  readonly errorText = input<string | null>(null);
  readonly minDate = input<Date | null>(null);
  readonly maxDate = input<Date | null>(null);
  readonly minTime = input<Date | null>(null);
  readonly maxTime = input<Date | null>(null);
  readonly locale = input<string>('en-US');
  readonly showCalendarIcon = input<boolean>(true);

  readonly invalid = input<boolean>(false);
  readonly errors = input<readonly WithOptionalFieldTree<ValidationError>[]>([]);

  protected readonly ids = createFormFieldIds('pe-calendar');

  readonly isOpen = signal(false);
  readonly currentMonth = signal<Date>(new Date());
  readonly selectedTime = signal<TimeSelection | null>(null);

  readonly buttonSize = computed<UiSize>(() => {
    const size = this.size();

    if (size === 'sm') return 'sm';
    if (size === 'md') return 'md';
    if (size === 'lg') return 'lg';
    if (size === 'xl') return 'xl';

    return 'md';
  });

  readonly iconSize = computed<IconSize>(() => {
    const size = this.size();

    if (size === 'sm') return '6';
    if (size === 'md') return '7';
    if (size === 'lg') return '8';

    // xl calendar uses a slightly larger icon
    return '10';
  });

  readonly defaultPlaceholder = computed(() => {
    const mode = this.mode();
    if (this.placeholder()) return this.placeholder();
    if (mode === 'date') return 'Select date';
    if (mode === 'time') return 'Select time';
    return 'Select date and time';
  });

  readonly displayValue = computed(() => {
    const val = this.value();
    if (!val) return '';
    const mode = this.mode();
    const locale = this.locale();

    if (mode === 'date') {
      return new Intl.DateTimeFormat(locale, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }).format(val);
    }

    if (mode === 'time') {
      return new Intl.DateTimeFormat(locale, {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }).format(val);
    }

    return new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).format(val);
  });

  protected readonly hasError = computed(() => this.error() || this.invalid());

  protected readonly resolvedErrorText = computed(
    () =>
      this.errorText() ||
      (this.hasError() && this.errors().length ? (this.errors()[0]?.message ?? null) : null)
  );

  readonly describedBy = computed(() =>
    getFormFieldDescribedBy(
      this.ids.helperId,
      this.ids.errorId,
      !!this.helperText(),
      this.hasError(),
      !!this.resolvedErrorText()
    )
  );

  readonly calendarDays = computed<CalendarDay[]>(() => {
    const month = this.currentMonth();
    const selected = this.value();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const firstDay = new Date(month.getFullYear(), month.getMonth(), 1);
    const lastDay = new Date(month.getFullYear(), month.getMonth() + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - startDate.getDay());

    const days: CalendarDay[] = [];
    const current = new Date(startDate);

    for (let i = 0; i < 42; i++) {
      const date = new Date(current);
      date.setHours(0, 0, 0, 0);

      const isCurrentMonth = date.getMonth() === month.getMonth();
      const isToday = date.getTime() === today.getTime();
      const isSelected =
        selected !== null &&
        date.getTime() === new Date(selected).setHours(0, 0, 0, 0);
      const isDisabled = this.isDateDisabled(date);

      days.push({
        date,
        isCurrentMonth,
        isToday,
        isSelected,
        isDisabled,
      });

      current.setDate(current.getDate() + 1);
    }

    return days;
  });

  readonly monthYearLabel = computed(() => {
    const month = this.currentMonth();
    return new Intl.DateTimeFormat(this.locale(), {
      month: 'long',
      year: 'numeric',
    }).format(month);
  });

  readonly hourOptions = computed(() => {
    const hours: number[] = [];
    for (let i = 0; i < 24; i++) {
      hours.push(i);
    }
    return hours;
  });

  readonly minuteOptions = computed(() => {
    const minutes: number[] = [];
    for (let i = 0; i < 60; i += 5) {
      minutes.push(i);
    }
    return minutes;
  });

  readonly selectedHour = computed(() => {
    const val = this.value();
    if (!val) return this.selectedTime()?.hour ?? 0;
    return val.getHours();
  });

  readonly selectedMinute = computed(() => {
    const val = this.value();
    if (!val) return this.selectedTime()?.minute ?? 0;
    return val.getMinutes();
  });

  readonly opened = output<void>();
  readonly closed = output<void>();

  constructor() {
    // Keep currentMonth and selectedTime in sync with the external value
    effect(() => {
      const val = this.value();
      if (val) {
        this.currentMonth.set(new Date(val.getFullYear(), val.getMonth(), 1));
        if (this.mode() !== 'date') {
          this.selectedTime.set({
            hour: val.getHours(),
            minute: val.getMinutes(),
          });
        }
      }
    });
  }

  /**
   * Closes the CDK menu by simulating an Escape key press.
   * This lets the CDK handle all focus and cleanup logic.
   */
  private closeMenuViaEscape(): void {
    const escapeEvent = new KeyboardEvent('keydown', {
      key: 'Escape',
      code: 'Escape',
      keyCode: 27,
      bubbles: true,
      cancelable: true,
    });

    document.dispatchEvent(escapeEvent);
    this.isOpen.set(false);
    this.closed.emit();
  }

  isDateDisabled(date: Date): boolean {
    const min = this.minDate();
    const max = this.maxDate();
    const dateOnly = new Date(date);
    dateOnly.setHours(0, 0, 0, 0);

    if (min) {
      const minOnly = new Date(min);
      minOnly.setHours(0, 0, 0, 0);
      if (dateOnly < minOnly) return true;
    }

    if (max) {
      const maxOnly = new Date(max);
      maxOnly.setHours(0, 0, 0, 0);
      if (dateOnly > maxOnly) return true;
    }

    return false;
  }

  isTimeDisabled(hour: number, minute: number): boolean {
    const min = this.minTime();
    const max = this.maxTime();
    if (!min && !max) return false;

    const testDate = new Date();
    testDate.setHours(hour, minute, 0, 0);

    if (min) {
      const minHour = min.getHours();
      const minMinute = min.getMinutes();
      if (hour < minHour || (hour === minHour && minute < minMinute)) {
        return true;
      }
    }

    if (max) {
      const maxHour = max.getHours();
      const maxMinute = max.getMinutes();
      if (hour > maxHour || (hour === maxHour && minute > maxMinute)) {
        return true;
      }
    }

    return false;
  }

  selectDate(date: Date): void {
    if (this.isDateDisabled(date)) return;

    const mode = this.mode();
    const currentValue = this.value();
    let newDate: Date;

    if (mode === 'date') {
      newDate = new Date(date);
      newDate.setHours(0, 0, 0, 0);
    } else if (mode === 'time') {
      const time = this.selectedTime();
      newDate = new Date(date);
      if (time) {
        newDate.setHours(time.hour, time.minute, 0, 0);
      } else {
        newDate.setHours(0, 0, 0, 0);
      }
    } else {
      const time = this.selectedTime() ?? {
        hour: currentValue?.getHours() ?? 0,
        minute: currentValue?.getMinutes() ?? 0,
      };
      newDate = new Date(date);
      newDate.setHours(time.hour, time.minute, 0, 0);
    }

    this.value.set(newDate);

    if (mode === 'date') {
      this.closeMenuViaEscape();
    }
  }

  selectTime(hour: number, minute: number): void {
    if (this.isTimeDisabled(hour, minute)) return;

    this.selectedTime.set({ hour, minute });

    const mode = this.mode();
    const currentValue = this.value();
    let newDate: Date;

    if (mode === 'time') {
      newDate = new Date();
      newDate.setHours(hour, minute, 0, 0);
    } else {
      const baseDate = currentValue ?? new Date();
      newDate = new Date(baseDate);
      newDate.setHours(hour, minute, 0, 0);
    }

    this.value.set(newDate);

    if (mode === 'time' || mode === 'datetime') {
      this.closeMenuViaEscape();
    }
  }

  previousMonth(): void {
    const current = this.currentMonth();
    const newMonth = new Date(current.getFullYear(), current.getMonth() - 1, 1);
    this.currentMonth.set(newMonth);
  }

  nextMonth(): void {
    const current = this.currentMonth();
    const newMonth = new Date(current.getFullYear(), current.getMonth() + 1, 1);
    this.currentMonth.set(newMonth);
  }

  selectToday(): void {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    this.selectDate(today);
  }

  clear(): void {
    this.value.set(null);
    this.selectedTime.set(null);
  }

  open(): void {
    if (this.disabled() || this.readOnly()) return;
    this.isOpen.set(true);
    this.opened.emit();
  }

  close(): void {
    this.isOpen.set(false);
    this.closed.emit();
  }

  onMenuOpened(): void {
    this.isOpen.set(true);
    this.opened.emit();
  }

  onMenuClosed(): void {
    this.isOpen.set(false);
    this.closed.emit();
  }

  focus(): void {
    const trigger = document.getElementById(this.ids.controlId);
    trigger?.focus();
  }
}
