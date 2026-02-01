import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormField, form, required, email } from '@angular/forms/signals';

import type { StoryObj } from '../../.storybook/types';

import { ButtonComponent } from './button/button';
import { CalendarComponent } from './calendar/calendar';
import { CheckboxComponent } from './checkbox/checkbox';
import { InputComponent } from './input/input';
import { RadioGroupComponent } from './radio/radio-group';
import { SelectComponent } from './select/select';
import type { SelectOption } from './select/select';
import { TextareaComponent } from './textarea/textarea';
import { AreaCodeComponent } from './area-code/area-code';

interface DemoFormModel {
  email: string;
  message: string;
  country: string | null;
  acceptTerms: boolean;
  date: Date | null;
  choice: string | null;
}

@Component({
  selector: 'pe-forms-signal-forms-demo',
  standalone: true,
  imports: [
    FormsModule,
    FormField,
    InputComponent,
    TextareaComponent,
    SelectComponent,
    CheckboxComponent,
    CalendarComponent,
    RadioGroupComponent,
    ButtonComponent,
    AreaCodeComponent,
  ],
  template: `
    <div class="pe-signal-forms-demo">
      <form (ngSubmit)="onSubmit($event)" class="pe-signal-forms-demo__form">
        <pe-input
          [formField]="demoForm.email"
          label="Email"
          type="email"
          helperText="We'll never share your email."
        />
        <pe-textarea
          [formField]="demoForm.message"
          label="Message"
          [rows]="4"
          helperText="Enter your message."
        />
        <pe-select
          [formField]="demoForm.country"
          label="Country"
          [options]="countryOptions"
          placeholder="Select country"
        />
        <pe-checkbox [formField]="demoForm.acceptTerms">
          I accept the terms and conditions
        </pe-checkbox>
        <pe-calendar
          [formField]="demoForm.date"
          label="Date"
          placeholder="Select date"
        />
        <pe-radio-group
          [formField]="demoForm.choice"
          name="choice"
          label="Choice"
          [options]="choiceOptions"
        />
        <div class="pe-signal-forms-demo__actions">
          <pe-button
            type="submit"
            theme="primary"
            [disabled]="!demoForm().valid()"
          >
            Submit
          </pe-button>
        </div>
      </form>
      <aside class="pe-signal-forms-demo__values">
        <h3 class="pe-signal-forms-demo__values-title">Form value</h3>
        <pe-area-code
          [content]="demoValues()"
          [showLineNumbers]="false"
        />
      </aside>
    </div>
  `,
  styles: [
    `
      .pe-signal-forms-demo {
        display: flex;
        flex-direction: row;
        gap: 2rem;
        align-items: flex-start;
        max-width: 900px;
      }
      .pe-signal-forms-demo__form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        flex: 0 1 400px;
      }
      .pe-signal-forms-demo__actions {
        margin-top: 0.5rem;
      }
      .pe-signal-forms-demo__values {
        flex: 0 1 400px;
        min-width: 0;
      }
      .pe-signal-forms-demo__values-title {
        margin: 0 0 0.5rem 0;
        font-size: 0.875rem;
        font-weight: 600;
      }
    `,
  ],
})
class SignalFormsDemoComponent {
  readonly demoModel = signal<DemoFormModel>({
    email: '',
    message: '',
    country: null,
    acceptTerms: false,
    date: null,
    choice: null,
  });

  readonly demoForm = form(this.demoModel, (p) => {
    required(p.email);
    email(p.email);
    required(p.message);
    required(p.country);
    required(p.acceptTerms);
    required(p.date);
    required(p.choice);
  });

  demoValues = computed(() => {
    const value = this.demoForm().value()
    return JSON.stringify(value, null, 2);
  });

  readonly countryOptions: SelectOption[] = [
    { value: 'us', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'de', label: 'Germany' },
    { value: 'fr', label: 'France' },
  ];

  readonly choiceOptions = [
    { value: 'a', label: 'Option A' },
    { value: 'b', label: 'Option B' },
    { value: 'c', label: 'Option C' },
  ];

  onSubmit(event: Event): void {
    event.preventDefault();
  }
}

export default {
  title: 'Demos/Signal Forms demo',
  component: SignalFormsDemoComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Demo form using Angular Signal Forms with `form()`, `required()`, and `email()`. All controls (input, textarea, select, checkbox, calendar, radio-group) are bound via `[formField]`. Form value is shown live on the right. Submit is disabled when invalid.',
      },
    },
  },
};

export const SignalFormsDemo: StoryObj<SignalFormsDemoComponent> = {
  render: () => ({
    template: '<pe-forms-signal-forms-demo></pe-forms-signal-forms-demo>',
    moduleMetadata: {
      imports: [SignalFormsDemoComponent],
    },
  }),
};
