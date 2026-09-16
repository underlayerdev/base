import { Component, computed, signal } from '@angular/core';
import { moduleMetadata } from '@storybook/angular';

import { Meta, StoryObj } from '../../.storybook/types';
import { AvatarComponent } from './avatar/avatar';
import { ButtonComponent } from './button/button';
import { InputComponent } from './input/input';
import { StepperComponent } from './stepper/stepper';

const STEP_LABELS = ['Name', 'Photo', 'Location'];
const TOTAL_STEPS = STEP_LABELS.length;

@Component({
  selector: 'ul-demo-onboarding',
  imports: [AvatarComponent, ButtonComponent, InputComponent, StepperComponent],
  template: `
    <div class="ul-demo-onboarding">
      <div class="ul-demo-onboarding__header">
        <ul-stepper [totalSteps]="totalSteps" [currentStep]="currentStep()" [labels]="labels" />
      </div>

      <div class="ul-demo-onboarding__content">
        @switch (currentStep()) {
          @case (1) {
            <div class="ul-demo-onboarding__step">
              <div>
                <h2 class="ul-demo-onboarding__title">What's your name?</h2>
                <p class="ul-demo-onboarding__subtitle">
                  This is how you'll appear to other users.
                </p>
              </div>
              <ul-input label="Display name" placeholder="e.g. Jane Doe" [(value)]="displayName" />
            </div>
          }
          @case (2) {
            <div class="ul-demo-onboarding__step ul-demo-onboarding__step--centered">
              <div class="ul-demo-onboarding__step-header">
                <h2 class="ul-demo-onboarding__title">Add a profile photo</h2>
                <p class="ul-demo-onboarding__subtitle">Optional — you can just continue.</p>
              </div>
              <ul-avatar size="xl" [initials]="avatarInitials()" />
            </div>
          }
          @case (3) {
            <div class="ul-demo-onboarding__step">
              <div>
                <h2 class="ul-demo-onboarding__title">Where are you browsing from?</h2>
                <p class="ul-demo-onboarding__subtitle">Optional — helps show you items nearby.</p>
              </div>
              <ul-button theme="outline-white" size="md">Use my current location</ul-button>
            </div>
          }
        }
      </div>

      <div class="ul-demo-onboarding__footer">
        <ul-button
          theme="fill-purple"
          size="md"
          [disabled]="!canContinue()"
          (buttonClick)="primaryAction()"
        >
          {{ currentStep() === totalSteps ? 'Finish' : 'Continue' }}
        </ul-button>
        @if (currentStep() > 1) {
          <ul-button theme="ghost-white" size="md" (buttonClick)="back()">Back</ul-button>
        }
      </div>
    </div>
  `,
  styles: [
    `
      .ul-demo-onboarding {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        background: #0a0a0a;
        font-family: sans-serif;
      }
      .ul-demo-onboarding__header {
        padding: 2rem 2rem 0;
      }
      .ul-demo-onboarding__content {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 2rem;
      }
      .ul-demo-onboarding__step {
        width: 320px;
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
      }
      .ul-demo-onboarding__step--centered {
        align-items: center;
      }
      .ul-demo-onboarding__step-header {
        align-self: flex-start;
      }
      .ul-demo-onboarding__title {
        color: #fff;
        font-size: 24px;
        font-weight: 800;
        margin: 0 0 8px;
      }
      .ul-demo-onboarding__subtitle {
        color: rgba(255, 255, 255, 0.6);
        font-size: 14px;
        margin: 0;
      }
      .ul-demo-onboarding__footer {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        padding: 1.5rem 2rem 2rem;
      }
      .ul-demo-onboarding__footer ul-button {
        display: block;
        width: 100%;
      }
    `,
  ],
})
class DemoOnboardingComponent {
  readonly totalSteps = TOTAL_STEPS;
  readonly labels = STEP_LABELS;
  readonly currentStep = signal(1);
  readonly displayName = signal('');
  readonly avatarInitials = computed(() => this.displayName().trim().charAt(0).toUpperCase());

  // Step 1 (name) is the only required step — the rest can always be
  // continued past without doing anything, which is what "skipping" means
  // here, rather than a separate Skip button.
  readonly canContinue = computed(() => this.currentStep() !== 1 || !!this.displayName().trim());

  primaryAction(): void {
    if (this.currentStep() === this.totalSteps) {
      this.restart();
      return;
    }
    this.currentStep.update((step) => Math.min(step + 1, this.totalSteps));
  }

  back(): void {
    this.currentStep.update((step) => Math.max(step - 1, 1));
  }

  private restart(): void {
    this.currentStep.set(1);
    this.displayName.set('');
  }
}

const meta: Meta<DemoOnboardingComponent> = {
  title: 'Demos/Onboarding',
  component: DemoOnboardingComponent,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          "Realistic mock of undermarket's onboarding flow (name required, photo/location optional) — click Continue/Back to see ul-stepper track progress in context, not just as a bare indicator. There's no separate Skip button: optional steps can always be continued past without input.",
      },
    },
  },
  decorators: [
    moduleMetadata({
      imports: [DemoOnboardingComponent],
    }),
  ],
};

export default meta;
type Story = StoryObj<DemoOnboardingComponent>;

export const Default: Story = {
  render: () => ({
    template: '<ul-demo-onboarding></ul-demo-onboarding>',
  }),
};
