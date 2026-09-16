import { Component, computed, input } from '@angular/core';

/**
 * Presentational step indicator for a multi-step flow (e.g. onboarding,
 * checkout) — dots connected by a line, current/completed/upcoming states.
 * Purely visual: it has no notion of step content or navigation, the
 * consumer owns that. `currentStep` is 1-indexed.
 */
@Component({
  selector: 'ul-stepper',
  template: `
    <ol class="ul-stepper" [attr.aria-label]="ariaLabel()">
      @for (step of stepIndexes(); track step) {
        <li
          class="ul-stepper__item"
          [class.ul-stepper__item--completed]="step < currentStep()"
          [class.ul-stepper__item--current]="step === currentStep()"
          [attr.aria-current]="step === currentStep() ? 'step' : null"
        >
          <span class="ul-stepper__dot"></span>
          @if (labels()[step - 1]) {
            <span class="ul-stepper__label">{{ labels()[step - 1] }}</span>
          }
        </li>
      }
    </ol>
  `,
  styleUrls: ['./stepper.scss'],
})
export class StepperComponent {
  readonly totalSteps = input.required<number>();
  readonly currentStep = input.required<number>();
  readonly labels = input<string[]>([]);
  readonly ariaLabel = input<string | null>(null);

  protected readonly stepIndexes = computed(() =>
    Array.from({ length: this.totalSteps() }, (_, i) => i + 1),
  );
}
